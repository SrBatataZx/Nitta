const { EmbedBuilder } = require("discord.js");
const connection = require("../../configs/db");
const { default_prefix } = require("../../configs/config.json");
const prefix = default_prefix

module.exports = async (bot, message, args) => {
  if (message.mentions.has(bot.user.id)) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Você está perdido? Estou aqui para te ajudar!`,
        iconURL: bot.user.avatarURL(),
      })
      .setFooter({
        text: message.author.username,
        iconURL: message.author.avatarURL(),
      })
      .setColor("#ff0066")
      .setDescription(
        `Olá jovem guerreiro, estava em minha caminhada matinal e escutei por seus gritos, se estiver perdido use \`${prefix}ajuda\`. Lembrando, uma viagem pode ser muito perigosa se você estiver sozinho!`
      );
    message.reply({ embeds: [embed] });
  }
  //#region xp por mensagem
  const userId = message.author.id;
  if (!message.guild) return;
  const guildId = message.guild.id;

  connection.query(
    "SELECT * FROM registro WHERE user_id = ? AND guild_id = ?",
    [userId, guildId],
    async (error, results, fields) => {
      if (error) throw error;

      if (results.length === 0) {
        connection.query(
          "INSERT INTO registro (user_id, guild_id, xp) VALUES (?, ?, ?)",
          [userId, guildId, 0],
          (error, results, fields) => {
            if (error) throw error;
          }
        );
      } else {
        const xpAmount = Math.floor(Math.random() * 50) + 0;
        const currentXp = results[0].xp || 0;
        const newXp = currentXp + xpAmount;

        connection.query(
          "UPDATE registro SET xp = ? WHERE user_id = ? AND guild_id = ?",
          [newXp, userId, guildId],
          (error, results, fields) => {
            if (error) throw error;
          }
        );
      }
    }
  );
  //#endregion

  //#region executar comandos
  const frases = [
    `Não reconheci esse comando, de uma olhada em \`${prefix}ajuda\`!`,
    `Esse comando pode não existir, de um olhada em \`${prefix}ajuda\`!`,
  ];
  let fras = frases[Math.floor(Math.random() * frases.length)];

  var args = message.content.substring(prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)
  )
    return;

  let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (command) {
    command.run(bot, message, args);
    const ebd = new EmbedBuilder()
      .setDescription(
        `\`${message.author.username}#${message.author.discriminator}\` executou \`${cmd}\` em \`${message.guild.name}\``
      )
      .setFooter({ text: `Executado dia ` })
      .setTimestamp();
    bot.channels.cache.get("878417697233338418").send({ embeds: [ebd] });
  } else {
    message.reply(`${fras}`);
  }
  //#endregion
};