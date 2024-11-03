module.exports = {
    config: {
        name: "reagir",
        aliases: []
    },
    run: async (bot, message, args) => {
        if (args.length < 3) {
            return message.reply("Uso: !reagir <id_mensagem> <emoji> <cargo_mencionado_ou_nome>");
        }

        const messageId = args[0];
        const emojiInput = args[1];
        const roleInput = args.slice(2).join(" ");

        // Verifica se o argumento do cargo é uma menção e obtém o ID
        const roleId = roleInput.startsWith("<@&") && roleInput.endsWith(">")
            ? roleInput.slice(3, -1)
            : null;

        const role = roleId
            ? message.guild.roles.cache.get(roleId)
            : message.guild.roles.cache.find(r => r.name === roleInput);

        if (!role) {
            return message.reply("Cargo não encontrado! Certifique-se de mencionar o cargo ou fornecer o nome corretamente.");
        }

        // Verifica se o emoji é um emoji personalizado ou um emoji padrão
        let emoji;
        if (emojiInput.startsWith("<:") && emojiInput.endsWith(">")) {
            const emojiParts = emojiInput.split(":");
            const emojiId = emojiParts[emojiParts.length - 1].slice(0, -1);
            emoji = message.guild.emojis.cache.get(emojiId);
        } else {
            emoji = emojiInput; // Trata como um emoji padrão
        }

        if (!emoji) {
            return message.reply("Emoji não encontrado! Certifique-se de que o emoji personalizado está correto.");
        }

        try {
            const targetMessage = await message.channel.messages.fetch(messageId);
            if (!targetMessage) {
                return message.reply("Mensagem não encontrada no canal atual.");
            }

            await targetMessage.react(emoji);

            // Armazene o ID da mensagem, emoji (id para personalizado ou nome para padrão), e cargo
            message.client.reactionRoles = message.client.reactionRoles || new Map();
            message.client.reactionRoles.set(messageId, { emoji: emoji.id || emoji, roleId: role.id });

            message.reply(`Reaja com ${emoji} na mensagem ${messageId} para receber o cargo ${role.name}!`);
        } catch (error) {
            console.error("Erro ao reagir à mensagem:", error);
            message.reply("Houve um erro ao configurar a reação. Verifique se o ID da mensagem está correto.");
        }
    }
}
