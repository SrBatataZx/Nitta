const connection = require("../../configs/db");

module.exports = async (bot, member) => {
  const userId = member.id;
  const guildId = member.guild.id;
  connection.query(
    `SELECT 1 FROM registro LIMIT 1`,
    (error, results, fields) => {
      if (error) {
        // A tabela não existe, então vamos criá-la e registrar a pessoa
        connection.query(
          `CREATE TABLE registro (
              user_id VARCHAR(20),
              guild_id VARCHAR(20),
              xp INT(11) NOT NULL DEFAULT 0,
              coins INT(11) NOT NULL DEFAULT 0,
              gems INT(11) NOT NULL DEFAULT 0,
              last_claimed DATETIME,
              PRIMARY KEY (user_id, guild_id)
            )`,
          (error, results, fields) => {
            if (error) throw error;
            console.log("Tabela registro criada com sucesso!");

            // Registrar a pessoa com last_claimed como valor padrão "1970-01-01 00:00:00"
            connection.query(
              `INSERT INTO registro (user_id, guild_id, last_claimed) VALUES (?, ?, ?)`,
              [userId, guildId, "1970-01-01 00:00:00"],
              (error, results, fields) => {
                if (error) throw error;
                console.log("Usuário registrado com sucesso!");
              }
            );
          }
        );
      } else {
        // A tabela já existe, então vamos verificar se a pessoa já está registrada
        connection.query(
          `SELECT * FROM registro WHERE user_id = ? AND guild_id = ?`,
          [userId, guildId],
          (error, results, fields) => {
            if (error) throw error;

            if (results.length === 0) {
              // A pessoa não está registrada nesta guild, então vamos registrá-la
              connection.query(
                `INSERT INTO registro (user_id, guild_id, last_claimed) VALUES (?, ?, ?)`,
                [userId, guildId, "1970-01-01 00:00:00"],
                (error, results, fields) => {
                  if (error) throw error;
                  console.log("Usuário registrado com sucesso!");
                }
              );
            } else {
              // A pessoa já está registrada nesta guild
              console.log("Usuário já registrado nesta guild.");
            }
          }
        );
      }
    }
  );
};
