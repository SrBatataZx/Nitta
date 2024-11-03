module.exports = async (bot, reaction, user) => {
    // Ignorar reações do próprio bot
    if (user.bot) return;

    // Certifique-se de que estamos monitorando apenas a guilda
    if (!reaction.message.guild) return;

    // Verifique se a reação corresponde a alguma configuração salva
    const reactionData = bot.reactionRoles?.get(reaction.message.id);
    if (!reactionData) return;

    // Verifique se o emoji corresponde
    const emojiId = reaction.emoji.id; // ID do emoji, se for um emoji personalizado
    const emojiName = reaction.emoji.name; // Nome do emoji, se for padrão ou personalizado
    const isCustomEmoji = emojiId !== null; // Verifica se é um emoji personalizado

    // Verificação refinada do emoji (customizado ou padrão)
    if ((isCustomEmoji && emojiId === reactionData.emoji) || (!isCustomEmoji && emojiName === reactionData.emoji)) {
        const role = reaction.message.guild.roles.cache.get(reactionData.roleId);
        const member = reaction.message.guild.members.cache.get(user.id);

        if (role && member) {
            // Adiciona o cargo ao usuário
            try {
                await member.roles.add(role);
                //console.log(`Cargo ${role.name} adicionado para ${user.username}.`);
            } catch (error) {
                console.error("Erro ao adicionar cargo:", error);
            }
        }
    }
}
