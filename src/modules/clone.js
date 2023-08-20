import guild_actions from '../requests/guild_actions.js';

import wipe_server from '../workers/wipe_server.js';
import clone_channels from '../workers/clone_channels.js';

import logger from '../helpers/logger.js';

export default async () => {
    logger("Getting server info.");
    var { name, icon } = await guild_actions.get_info(process.env.discord_guild);
    logger("Creating mirror server.");
    var { id } = await guild_actions.create_guild(name, icon);
    logger("Deleting default mirror channels.");
    await wipe_server(id);
    logger("Cloning server channels.");
    await clone_channels(process.env.discord_guild, id);
    logger("Server successfully cloned.");
};