module.exports = async (bot,reaction, user) => {
  const mensagemID = reaction.bot.mensagemID;  // Acessa o ID da mensagem armazenada
  const emojiEscolhido = reaction.bot.emojiEscolhido;  // Acessa o emoji armazenado
  const cargoID = reaction.bot.cargoID;  // Acessa o ID do cargo armazenado
  
  if (!mensagemID || !emojiEscolhido || !cargoID) {
      console.log("Variáveis não definidas corretamente");
      return;
  }

  if (reaction.message.id === mensagemID && reaction.emoji.name === emojiEscolhido) {
      const guild = reaction.message.guild;
      const cargo = guild.roles.cache.get(cargoID);
      const membro = guild.members.cache.get(user.id);

      if (cargo && membro) {
          try {
              await membro.roles.add(cargo);
              console.log(`Cargo ${cargo.name} foi atribuído a ${user.tag}`);
          } catch (error) {
              console.error(`Erro ao adicionar cargo: ${error}`);
          }
      } else {
          console.log("Não consegui encontrar o cargo ou o membro.");
      }
  }
};
