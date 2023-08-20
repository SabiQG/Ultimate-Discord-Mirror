# Discord User Account Based Server Mirror 2023

**Create a perfect mirror of your Discord server with a single click!**

The Discord User Account Based Server Mirror is an open-source tool that allows you to create a 1:1 copy of any Discord server you wish to mirror. It captures all the messages, images, gifs, files, and pretty much everything from the source server and transfers them to the new one.

## Features
- **1:1 Server Mirroring**: Perfectly replicates the original server's structure, channels, and messages.
- **Multimedia Support**: Supports file uploads, images, gifs, and all Discord media types.
- **Easy Configuration**: Simply update the `settings.json` and you're good to go!
- **Open Source**: Customize and expand the project as per your needs.

## Prerequisites

Before you get started, ensure you have:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.
- Your Discord account token (see below for instructions on how to retrieve it).
- User-agent and Discord guild ID for the server you wish to mirror.

## Setup & Configuration

1. **Retrieve Your Discord Account Token**:
    - Open Discord in a browser (not the app).
    - Right-click anywhere and select 'Inspect' or 'Inspect Element'.
    - Navigate to the 'Network' tab.
    - In any fetch request, look at the sent headers.
    - Look for the '**Authorization**' header value, there you will find your account token.
    - **Caution**: Never share this token, as it provides full access to your Discord account.

2. **Update `settings.json`**:
    - Fill in the following fields:
        - `account_token`: Your Discord account token.
        - `user-agent`: Your browser's user-agent string.
        - `discord_guild`: The ID of the Discord server you want to mirror.
    ```json
    {
        "account_token": "YOUR_DISCORD_TOKEN",
        "user-agent": "YOUR_USER_AGENT",
        "discord_guild": "DISCORD_GUILD_ID"
    }
    ```

3. **Install Dependencies & Run**:
    ```bash
    npm i
    npm run start
    ```

## Contribution

Feel free to fork the repository and submit pull requests! All contributions are welcome.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Important Notice

Be advised that operating a self-bot on Discord may violate Discord's Terms of Service. The author of this tool is not liable for any repercussions you may encounter for its use.