import got from 'got';

import get_image from '../workers/get_image.js';
import super_properties from '../workers/super_properties.js';

export default class {
    static async get_info(discord_id) {
        var {body} = await got.get(`https://discord.com/api/v9/guilds/${discord_id}`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent
            },
            throwHttpErrors: false
        });
        return JSON.parse(body);
    };

    static async get_channels(discord_id) {
        var {body} = await got.get(`https://discord.com/api/v9/guilds/${discord_id}/channels`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent
            },
            throwHttpErrors: false
        });
        return JSON.parse(body);
    };

    static async get_channel(channel_id) {
        var {body} = await got.get(`https://discord.com/api/v9/channels/${channel_id}`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent
            },
            throwHttpErrors: false
        });
        return JSON.parse(body);
    };

    static async create_guild(name, icon) {
        var {body} = await got.post(`https://discord.com/api/v9/guilds`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent,
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Brave\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-discord-timezone": "Europe/Madrid",
                "x-super-properties": super_properties()
            },
            throwHttpErrors: false,
            body: JSON.stringify({
                name,
                icon: await get_image(`https://cdn.discordapp.com/icons/${process.env.discord_guild}/${icon}.webp`),
                channels:[],
                system_channel_id:null,
                guild_template_code:"2TffvPucqHkN"
            })
        });
        return JSON.parse(body);
    };

    static async delete_channel(channel_id) {
        var {body} = await got.delete(`https://discord.com/api/v9/channels/${channel_id}`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent
            },
            throwHttpErrors: false
        });
        return JSON.parse(body);
    }

    static async create_channel(discord_id, name, type, parent_id) {
        var {body} = await got.post(`https://discord.com/api/v9/guilds/${discord_id}/channels`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent,
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Brave\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-discord-timezone": "Europe/Madrid",
                "x-super-properties": super_properties()
            },
            body: JSON.stringify({
                type,
                name,
                parent_id,
                permission_overwrites:[]
            }),
            throwHttpErrors: false
        });
        return JSON.parse(body);
    }

    static async get_webhook(channel_id) {
        var {body} = await got.post(`https://discord.com/api/v9/channels/${channel_id}/webhooks`, {
            headers: {
                "authorization": process.env.account_token,
                "user-agent": process.env.user_agent,
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Brave\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-discord-timezone": "Europe/Madrid",
                "x-super-properties": super_properties()
            },
            body: JSON.stringify({
                name:"Mirror Bot"
            }),
            throwHttpErrors: false
        });
        return JSON.parse(body);
    };

    static async send_mensage(payload, webhook) {
        return await got.post(webhook, {
            headers: {
                "content-type": "application/json",
            },
            throwHttpErrors: false,
            body:JSON.stringify(payload)
        });
    }
}