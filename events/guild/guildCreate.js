const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");

module.exports = async (bot, guild, message) => {
  bot.users.fetch(guild.ownerId, false).then((user) => {
    user.send(
      `Obrigado por me convidar para ${guild.name}. \nUtilize ${default_prefix}ajuda para ver meus comandos!`
    );
  });
  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setDescription(`Fui adicionada em \`${guild.name}\``)
    .setFooter({ text: `Fui adicionada dia ` })
    .setTimestamp();
  bot.channels.cache.get("878108271439904818").send({ embeds: [embed] });
/**
  // Query para criar a tabela se não existir
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS servers (
      server_id VARCHAR(255) PRIMARY KEY,
      server_name VARCHAR(255),
      member_count INT
  );
`;
// Executa a query para criar a tabela
connection.query(createTableQuery, (err) => {
  if (err) {
      console.error("Erro ao criar a tabela 'servers':", err);
      return;
  }

  // Obtenha os dados do servidor
  const serverId = guild.id;
  const serverName = guild.name;
  const memberCount = guild.memberCount;

  // Query para inserir dados na tabela `servers`
  const insertQuery = `
      INSERT INTO servers (server_id, server_name, member_count)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
          server_name = VALUES(server_name),
          member_count = VALUES(member_count)
  `;

  // Executa a query para inserir ou atualizar dados
  connection.query(insertQuery, [serverId, serverName, memberCount], (err) => {
      if (err) {
          console.error("Erro ao inserir dados do servidor no banco de dados:", err);
      } else {
          console.log(`Dados do servidor "${serverName}" inseridos/atualizados com sucesso!`);
      }
    });
  });
*/
};
