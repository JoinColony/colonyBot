# colonyBot

> GitHub bot for linking issues to Colony tasks

## Setup

```sh
# Install dependencies
npm install

# Run typescript
npm run build

# Run the bot
npm start
```

This will set you up with the bot server running locally. If it's the first time, visit `https://localhost:3000` in a browser to create a development GitHub App and generate a `.env` file. Make sure to compare this to the `.env.example` and add anything that's missing afterwards.

Probot automatically sets you up with a `smee.io` proxy which makes your local bot instance accessible from the outside world. It also sets this as the webhook endpoint for your app on GitHub. However, this doesn't support proxying our custom `/colony/*` endpoints, so we'll need to run something else to make the bot accessible from the outside world, such as `ngrok`.

```sh
ngrok http 3000
```

Copy the `https` URL that gives you, and set it as the "Setup URL" for your app.
