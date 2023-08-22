import 'dotenv/config';
import fs from 'fs';

import clone from './modules/clone.js';
import connect from './modules/connect.js';

process.env.SETTINGS_FILE_PATH = './settings.json';
process.env.PRELOAD_FILE_PATH = './assets';

async function main() {
    try {
        const accountData = await load_account_data(process.env.SETTINGS_FILE_PATH);
        set_env(accountData);
        await check_preload(process.env.PRELOAD_FILE_PATH+`/${accountData.discord_guild}.json`);
        connect();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function load_account_data(filePath) {
    try {
        const raw_data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(raw_data);
    } catch (error) {
        throw new Error("Failed to load account data.");
    }
}

function set_env(accountData) {
    process.env.account_token = accountData.account_token;
    process.env.user_agent = accountData.user_agent;
    process.env.discord_guild = accountData.discord_guild;
    process.env.file_path = `${process.env.PRELOAD_FILE_PATH}/${accountData.discord_guild}.json`;
}

async function check_preload(filePath) {
    if (!fs.existsSync(filePath)) {
        await clone();
    }
}

main();
