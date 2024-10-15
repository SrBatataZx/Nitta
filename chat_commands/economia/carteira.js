const { EmbedBuilder } = require("discord.js"); // puxando a livraria 'discord.js'
const connection = require("../../configs/db");

module.exports = {
  config: {
    name: "carteira",
    aliases: ["saldo"]
  },
  run: async (bot, message, args, tools) => {
    let userId;
    if (message.mentions.members.first()) {
      userId = message.mentions.members.first().id;
    } else {
      userId = message.author.id;
    }
    let mentionMember = message.mentions.members.first();
    const guildId = message.guild.id;
    connection.query(
      "SELECT coins, gems, xp FROM registro WHERE user_id = ? AND guild_id = ?",
      [userId, guildId],
      (error, results) => {
        if (error) throw error;
        if (results.length === 0) {
          message.reply(
            `${mentionMember} ainda não possui registro.`
          );
        } else {
          const coins = results[0].coins;
          const gems = results[0].gems;
          const xp = results[0].xp;
          const title = userId === message.author.id ? "Seu saldo" : `Saldo do usuário ${mentionMember.user.username}`;
          const embed = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(`${coins} moedas e ${gems} gemas seu xp: ${xp}`)
            .setColor("#00ff00")
            .setFooter({
              text: `${message.author.username}`,
              iconURL: message.author.avatarURL(),
            })
            .setTimestamp();
          message.channel.send({ embeds: [embed] });
        }
      }
    );
  },
};
