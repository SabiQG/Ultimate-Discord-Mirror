import web_socket from 'ws';

import ws_auth_payload from '../workers/ws_auth_payload.js';
import send_message from '../workers/send_message.js';

import logger from '../helpers/logger.js';

const GATEWAY_URL = 'wss://gateway.discord.gg/?encoding=json&v=9';
const RECONNECT_DELAY = 2000; 

export default function init_webSocket() {
    const ws = new web_socket(GATEWAY_URL);

    ws.on('open', handle_open);
    ws.on('message', handle_message);
    ws.on('error', handle_error);
    ws.on('close', handle_close);

    function handle_open() {
        logger('Connected to Discord gateway.');
    }

    function handle_message(data) {
        if (Array.isArray(data)) {
            data.forEach(process_data);
        } else {
            process_data(data);
        }
    }

    function handle_error(error) {
        logger('WebSocket Error:', error);
    }

    function handle_close(code, reason) {
        logger(`WebSocket Closed. Code: ${code}, Reason: ${reason}`);
        if (code === 1001 || code === 1006) {
            setTimeout(init_webSocket, RECONNECT_DELAY);
        }
    }

    function process_data(data) {
        let message;
        try {
            message = JSON.parse(data);
        } catch (error) {
            logger('Failed to parse message:', error);
            return;
        }
        
        const { op, t, d } = message;

        if (op === 10) {
            maintain_heartbeat(d.heartbeat_interval);
            authenticate();
        }

        if (t === 'MESSAGE_CREATE' && d.guild_id === process.env.discord_guild) {
            send_message(d);
        }
    }

    function maintain_heartbeat(interval) {
        setInterval(() => {
            ws.send(JSON.stringify({ op: 1, d: null }));
        }, interval);
    }

    function authenticate() {
        ws.send(JSON.stringify(ws_auth_payload()));
    }
}
