const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");
const { modouso } = require("../../configs/arquivos_json/modUso.json");

module.exports = {
  config: {
    name: "uso",
    aliases: ["moduso"],
  },
  run: async (bot, message, args) => {
    switch (args[0]) {
      //#region inicioCase
      case undefined: {
        const embed = new EmbedBuilder()
          .setColor("#ff0066")
          .setAuthor({
            name: "Sua ajuda chegou",
            iconURL: bot.user.avatarURL(),
          })
          .addFields(
            {
              name: "Administração",
              value: "`limpar`, `expulsar`, `enquete`",
              inline: true
            },
            { name: "ADM. Configuração", value: "`prefix`", inline: true },
            {
              name: "Modificaveis",
              value: "`frase`",
              inline: true
            },
            {
              name: "Economia",
              value: "`dia`, `pagar`, `perfil`",
              inline: true
            },
            {
              name: "Entretenimento",
              value: "`flip`, `falar`, `acao`",
              inline: true,
            },
            {
              name: "Geral",
              value: "`user`, `svinfo`, `uso`,`info`,`ajuda`",
              inline: true
            }
            
          )
          .setImage("https://data.whicdn.com/images/287575135/original.gif")
          .setFooter({
            text: `» Digite '${default_prefix}modouso <NomeComando>' para detalhes do comando! \n» Comando original Nitta`,
            iconURL: message.author.avatarURL(),
          });
        message.reply({ embeds: [embed] });
        break;
      }
      //#endregion
      //#region começo case modouso
      case "expulsar": {
        message.reply(
          `\`\`\`${default_prefix}${modouso.pt.administracao.expulsar}\`\`\``
        );
        break;
      }
      case "limpar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.administracao.limpar}\`\`\``);
        break;
      }
      case "enquete": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.administracao.enquete}\`\`\``);
        break;
      }
      case "prefix": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.administracao.modificaveisadm.setprefix}\`\`\``);
        break;
      }
      case "perfil": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.economia.carteira}\`\`\``);
        break;
      }
      case "dia": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.economia.dia}\`\`\``);
        break;
      }
      case "pagar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.economia.pagar}\`\`\``);
        break;
      }
      case "flip": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.entretenimento.flip}\`\`\``);
        break;
      }
      case "falar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.entretenimento.falar}\`\`\``);
        break;
      }
      case "acao": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.entretenimento.ação}\`\`\``);
        break;
      }
      case "user": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.geral.user}\`\`\``);
        break;
      }
      case "svinfo": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.geral.svinfo}\`\`\``);
        break;
      }
      case "uso": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.geral.moduso}\`\`\``);
        break;
      }
      case "info": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.geral.info}\`\`\``);
        break;
      }
      case "ajuda": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.geral.ajuda}\`\`\``);
        break;
      }
      case "frase": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.modificaveis.frase}\`\`\``);
        break;
      }
      //#endregion
    }
  },
};
