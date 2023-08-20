export default () => {
    return {
        "op": 2,
        "d": {
            "token": process.env.account_token,
            "capabilities": 16381,
            "properties": {
                "os": "Windows",
                "browser": "Chrome",
                "device": "",
                "system_locale": "en-US",
                "browser_user_agent": process.env.user_agent,
                "browser_version": "116.0.0.0",
                "os_version": "10",
                "referrer": "https://www.google.com/",
                "referring_domain": "www.google.com",
                "search_engine": "google",
                "referrer_current": "https://discord.com/",
                "referring_domain_current": "discord.com",
                "release_channel": "stable",
                "client_build_number": 221235,
                "client_event_source": null
            },
            "presence": {
                "status": "online",
                "since": 0,
                "activities": [],
                "afk": false
            },
            "compress": false,
            "client_state": {
                "guild_versions": {},
                "highest_last_message_id": "0",
                "read_state_version": 0,
                "user_guild_settings_version": -1,
                "user_settings_version": -1,
                "private_channels_version": "0",
                "api_code_version": 0
            }
        }
    }
}