import fs from 'fs';
import progress from 'progress';

import guild_actions from "../requests/guild_actions.js";

const PAUSE_DURATION = 2000;
const MIN_RANDOM_PAUSE = 500;
const MAX_RANDOM_PAUSE = 2500;

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async (discord_guild, mirror_guild) => {
    const channels = await guild_actions.get_channels(discord_guild);
    const category_channels = channels.filter(channel => channel.type == 4);
    const result = initialize_result(discord_guild, mirror_guild);
    const progress_bar = initialize_bar(channels.length);

    for (let category of category_channels) {
        const { id } = await guild_actions.create_channel(mirror_guild, category.name, category.type);
        result.parent[category.id] = id;
        progress_bar.tick();
        await pause(PAUSE_DURATION);
        const childChannels = channels.filter(channel => channel.parent_id == category.id);
        await process_category(childChannels, id, mirror_guild, result, progress_bar);
    }
    save_data(result, discord_guild);
}

function initialize_result(discord_guild, mirror_guild) {
    return {
        discord_guild,
        mirror_guild,
        channels: {},
        parent: {}
    };
}

function initialize_bar(total_channels) {
    return new progress('Clone progress : :bar :percent', { total: total_channels, width: 40 });
}

async function process_category(child_channels, parent_id, mirror_guild, result, progress_bar) {
    for (let channel of child_channels) {
        const res = await guild_actions.create_channel(mirror_guild, channel.name, channel.type, parent_id);
        result.channels[channel.id] = { id: res.id };
        progress_bar.tick();
        await pause(random_pause());
    }
}

function random_pause() {
    return Math.floor(Math.random() * (MAX_RANDOM_PAUSE - MIN_RANDOM_PAUSE + 1)) + MIN_RANDOM_PAUSE;
}

function save_data(result, discord_guild) {
    const directory_path = process.env.PRELOAD_FILE_PATH;
    if (!fs.existsSync(directory_path)) {
        fs.mkdirSync(directory_path, { recursive: true });
    }
    const file_path = `${directory_path}/${discord_guild}.json`;
    fs.writeFileSync(file_path, JSON.stringify(result, null, 2));
}
