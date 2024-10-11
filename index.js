const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
  } = require("discord.js");
require("dotenv").config();
const bot = new Client({
  allowedMentions: { parse: ["users"], repliedUser: true },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});

["aliases", "commands"].forEach((x) => (bot[x] = new Collection()));
["command", "event"].forEach((x) => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN)