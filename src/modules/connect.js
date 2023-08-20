import web_socket from 'ws';
import zlib from 'zlib-sync';

import ws_auth_payload from '../workers/ws_auth_payload.js';
import send_message from '../workers/send_message.js';

import logger from '../helpers/logger.js';

const gateway_url = 'wss://gateway.discord.gg/?encoding=json&v=9';
let inflate = new zlib.Inflate({ chunkSize: 65535, flush: zlib.Z_SYNC_FLUSH });
var ws;

export default () => {
    ws = new web_socket(gateway_url);

    ws.on('open', () => {
        logger('Connected to Discord gateway.');
    });

    ws.on('message', (data) => {
        if (Array.isArray(data)) {
            for (let message of data) {
                handle_message(message);
            }
        } else {
            handle_message(data);
        }
    });

    function handle_message(data) {
        if (data instanceof ArrayBuffer) {
            const messages = [];
            inflate.push(data, zlib.Z_SYNC_FLUSH);
            if (inflate.result) {
                const message = JSON.parse(inflate.result.toString());
                messages.push(message);
            }
            for (let message of messages) {
                process_message(message);
            }
        } else {
            const message = JSON.parse(data);
            process_message(message);
        }
    }

    function process_message(message) {
        if (message.op === 10) { 
            setInterval(() => {
                ws.send(JSON.stringify({ op: 1, d: null })); 
            }, message.d.heartbeat_interval);
    
            ws.send(JSON.stringify(ws_auth_payload()));
        }

        if (message.t === 'MESSAGE_CREATE' && message.d.guild_id === process.env.discord_guild) {
            send_message(message.d);
        }    
    }

    ws.on('error', (error) => {
        logger('WebSocket Error:', error);
    });
    
    ws.on('close', (code, reason) => {
        logger(`WebSocket Closed. Code: ${code}, Reason: ${reason}`);
    });
    
}


