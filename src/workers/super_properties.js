export default () => {
    return Buffer.from(JSON.stringify({
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
    })).toString('base64')
}