const connection = require("../../configs/db");
const COOLDOWN_TIME = 24 * 60 * 60 * 1000;

module.exports = {
  config: {
    name: "diaria",
    aliases: ["dia", "daily"],
  },
  run: async (bot, message, args, tools) => {
    const userId = message.author.id;
    const guildId = message.guild.id;
    connection.query(
      `SELECT * FROM registro WHERE user_id = ? AND guild_id = ?`,
      [userId, guildId],
      (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
          // O usuário nunca reivindicou as recompensas diárias antes, envie uma mensagem de erro
          message.reply(
            "Você não possui registro ainda. Use o comando `registro` para criar um registro e começar a receber recompensas diárias."
          );
        } else {
          // O usuário já tem registro, execute o restante do comando
          const lastClaimedDate = new Date(results[0].last_claimed);
          const currentDate = new Date();

          const timeSinceLastClaimed =
            currentDate.getTime() - lastClaimedDate.getTime();

          if (timeSinceLastClaimed >= COOLDOWN_TIME) {
            // Já passou o tempo de espera, atualize a entrada na tabela e conceda as recompensas
            const newCoins = Math.max(Math.floor(Math.random() * 100) + 1, 20);;
            const somaNewCoins = results[0].coins + newCoins;
            const newGems = Math.floor(Math.random() * 10) + 1;
            const somaNewGems = results[0].gems + newGems;

            connection.query(
              "UPDATE registro SET coins = ?, gems = ?, last_claimed = ? WHERE user_id = ? AND guild_id = ?",
              [somaNewCoins, somaNewGems, currentDate, userId, guildId],
              (error, results) => {
                if (error) throw error;
                message.reply(
                  `${message.author.username} você acabou de receber **🔆 ${newCoins}** moedas sagradas e **${newGems}** gemas celestiais!`
                );
              }
            );
          } else {
            // Ainda não passou o tempo de espera, informe ao usuário quanto tempo falta
            const remainingTime = COOLDOWN_TIME - timeSinceLastClaimed;
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor(
              (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
            );

            message.reply(
              `você já coletou suas moedas sagradas hoje! Tente novamente em: ${remainingHours} horas e ${remainingMinutes} minutos.`
            );
          }
        }
      }
    );
  },
};
