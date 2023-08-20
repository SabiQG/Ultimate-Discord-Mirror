import guild_actions from "../requests/guild_actions.js";

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async (discord_id) => {
    var channels = await guild_actions.get_channels(discord_id);
    for (let channel of channels) {
        await guild_actions.delete_channel(channel.id);
        await pause(200);
    };
};