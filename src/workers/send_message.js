import fs from 'fs/promises';

import guild_actions from '../requests/guild_actions.js';

import logger from '../helpers/logger.js';

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const PAUSE_DURATION = 1500;

export default async (message) => {
    const payload = construct_payload(message);
    logger(`New message from "${payload.username}" at "${message.channel_id}".`);
    const webhook = await get_webhook(message.channel_id);
    var {statusCode} = await guild_actions.send_mensage(payload, webhook);
    if (statusCode !== 204) logger(`Error sending webhook from "${payload.username}" at "${message.channel_id}".`);
}

function construct_payload({ content, embeds, attachments, author, sticker_items }) {
    if (attachments.length > 0) {
        for (let attachment of attachments) {
            if (attachment.content_type.includes("image/")) {
                embeds.push({
                    "color": null,
                    "image": {
                      "url": attachment.url
                    }
                });
            } else if (attachment.content_type.includes("application/")) {
                embeds.push({
                    "title": "New file uploaded:",
                    "description": `[${attachment.filename}](${attachment.url})`,
                    "fields": [
                        {
                          "name": "Size",
                          "value": Math.floor((attachment.size / 1000) * 100) / 100+" KB"
                        }
                    ],
                    "color": null
                });
            }
        }
    }

    embeds = embeds.filter((data) => data.type !== 'gifv');

    return {
        content,
        embeds,
        attachments:[],
        sticker_items,
        username: author.global_name || author.username,
        avatar_url: `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.webp`
    };
}

async function get_webhook(channel_id) {
    const filePath = `${process.env.PRELOAD_FILE_PATH}/${process.env.discord_guild}.json`;
    const data = await read_data(filePath);

    if (data.channels[channel_id] && data.channels[channel_id].url) {
        return data.channels[channel_id].url;
    }

    if (!data.channels[channel_id]) {
        await process_channel(data, channel_id);
    }

    const { url } = await guild_actions.get_webhook(data.channels[channel_id].id);
    if (url) {
        data.channels[channel_id].url = url;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return url;
    }
}

async function process_channel(data, channel_id) {
    const { parent_id, name, type } = await guild_actions.get_channel(channel_id);
    if (parent_id && !data.parent[parent_id]) {
        const res = await guild_actions.get_channel(parent_id);
        const { id } = await guild_actions.create_channel(data.mirror_guild, res.name, res.type);
        data.parent[parent_id] = id;
        await pause(PAUSE_DURATION);
    }
    const { id } = await guild_actions.create_channel(data.mirror_guild, name, type, data.parent[parent_id]);
    data.channels[channel_id] = { id };
}

async function read_data(path) {
    const rawData = await fs.readFile(path, 'utf-8');
    return JSON.parse(rawData);
}