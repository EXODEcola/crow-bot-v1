const Discord= require('discord.js')
const db = require('quick.db')
function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms)})}
  const ms = require('ms')

module.exports = {
name: 'embed',
aliases: [],
run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color

if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {

    if(!message.guild) return;
    const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
    const embede = new Discord.MessageEmbed()
    embede.setTitle(`Embed personalisé`)
    embede.setColor(color)
    embede.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
🖊・Modifier le titre de l'embed
💬・Modifier la description de l'embed
🕵️・Modifier l'auteur de l'embed
🔻・Modifier le footer de l'embed
🔳・Modifier le thumbnail de l'embed
🖼️・Modifier l'image de l'embed
🌐・Modifier l'url du titre
🎨・Modifier la couleur de l'embed
🕙・Ajouter un timestamp sur l'embed
➕・Ajouter un field sur l'embed
➖・Enlever un field de l'embed
📥・Copier un embed
📑・Modifier un embed du bot
❌・Annuler
✅・Envoyer l'embed

   `)



    let msg = await message.channel.send("Chargement")

    await msg.react('🖊️')
    await sleep(250);
    await msg.react('💬')
    await sleep(250);
    await msg.react('🕵️')
    await sleep(250);
    await msg.react('🔻')
    await sleep(250);
    await msg.react('🔳')
    await sleep(250);
    await msg.react('🖼️')
    await sleep(250);
    await msg.react('🌐')
    await sleep(250);
    await msg.react('🎨')
    await sleep(250);
    await msg.react('🕙')
    await sleep(250);
    await msg.react('➕')
    await sleep(250);
    await msg.react('➖')
    await sleep(250);
await msg.react('📥')
  await sleep(250);
     await msg.react('📑')
   await sleep(250);
    await msg.react('❌')
    await sleep(250); 
    await msg.react('✅')
                await msg.react('✅').then(async (m) => {
msg.edit("" , embede)
const embedbase = new Discord.MessageEmbed()
.setDescription ("** **")

       let msgg = await message.channel.send(embedbase)

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
        collector.on("collect", async (reaction, user) => {
            if (reaction._emoji.name === "🖊️") {
                let question = await message.channel.send("Quel **Titre** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                    collected.first().delete()
                    question.delete()
                    embedbase.setTitle(collected.first().content)
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "💬") {
                let question = await message.channel.send("Quel **Description** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                    collected.first().delete()
                    question.delete()
                    embedbase.setDescription(collected.first().content)
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier la Description !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "🕵️") {
                const embedquest = new Discord.MessageEmbed()
                let question = await message.channel.send("Quel **Author** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                        collected.first().delete()
                        question.delete()
                        if (collected.first().mentions.users.size <= 0)
                        {
                            auteur = collected.first().content;
                            const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
                            const auteurImg = (await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})).first();
                            question2.delete();
                            auteurImg.delete();
                            const img = auteurImg.content
                            const liens = [
                                "https://",
                                "http://",
                                "https",
                                "http"
                            ];
                            if (!liens.some(word => img.includes(word))){
                                embedbase.setAuthor(auteur)
                                message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }

                                if (liens.some(word => img.includes(word))){
                            embedbase.setAuthor(auteur, auteurImg.content)
                                }
                        }
                        if (collected.first().mentions.users.size > 0) 
                        {
                            auteur = collected.first().mentions.users.first();
     
                            embedbase.setAuthor(auteur.username, auteur.displayAvatarURL({dynamic: true}));
                        }
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier l'Author !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }
            
          if (reaction._emoji.name === "🔻") {
                const embedquest = new Discord.MessageEmbed()
                let question = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                        collected.first().delete()
                        question.delete()
                        if (collected.first().mentions.users.size <= 0)
                        {
                            footer = collected.first().content;
                            const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
                            const footerImg = (await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})).first();
                            question2.delete();
                            footerImg.delete();
                            const img = footerImg.content
                            const liens = [
                                "https://",
                                "http://",
                                "https",
                                "http"
                            ];
                            if (!liens.some(word => img.includes(word))){
                                embedbase.setFooter(footer)
                                message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }

                                if (liens.some(word => img.includes(word))){
                            embedbase.setFooter(footer, footerImg.content)
                                }
                        }
                        if (collected.first().mentions.users.size > 0) 
                        {
                            footer = collected.first().mentions.users.first();
     
                            embedbase.setFooter(footer.username, footer.displayAvatarURL({dynamic: true}));
                        }
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "🔳") {
                let question = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                    const thumbnail = collected.first().content
                    const liens = [
                        "https://",
                        "http://",
                        "https",
                        "http"
                    ];
                    if (!liens.some(word => thumbnail.includes(word))){
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                   

                    collected.first().delete()
                    question.delete()
                    embedbase.setThumbnail(collected.first().content)
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier le Thumbnail !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }
            
            if (reaction._emoji.name === "🖼️") {
                let question = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                        const image = collected.first().content
                        const liens = [
                            "https://",
                            "http://",
                            "https",
                            "http"
                        ];
                        if (!liens.some(word => image.includes(word))){
                            collected.first().delete()
                            question.delete()
                            return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                       
            
                    collected.first().delete()
                    question.delete()
                    embedbase.setImage(collected.first().content, {size: 4096})
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "🌐") {
                let question = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                        const url = collected.first().content
                        const liens = [
                            "https://",
                            "http://",
                            "https",
                            "http"
                        ];
                        if (!liens.some(word => url.includes(word))){
                            collected.first().delete()
                            question.delete()
                            return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                       
                            
                    collected.first().delete()
                    question.delete()
                    embedbase.setURL(collected.first().content)
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier l'Url !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "🎨") {
                let question = await message.channel.send("Quel **Couleur** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                    collected.first().delete()
                    question.delete()
                    embedbase.setColor(collected.first().content)
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

            if (reaction._emoji.name === "⏱️") {

                    embedbase.setTimestamp()
                    msgg.edit(embedbase).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier le Timestamp !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                  })
            }

            if (reaction._emoji.name === "➕") {
                let question = await message.channel.send("Quel **Field** voulez-vous attribuez à l'embed ? (\`cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                    collected.first().delete()
                    question.delete()
                    titleField = collected.first().content
                    const question2 = await message.channel.send('Quelle est votre **Field** de l\'embed ? (\ `Annuler \` pour annuler)');
                    const descField = (await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})).first()
                    const lowcase = descField.content.toLowerCase()
                    if (lowcase === "cancel") {
                        descField.delete() 
                        question2.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
                    
                    descField.delete()
                    question2.delete()
                    embedbase.addField(titleField, descField.content);
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé mais je ne peux pas modifier le Field !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }
            if (reaction._emoji.name === "➖") {
                const msgQuestionFieldTitle = await message.channel.send('Merci de mettre le titre du field à retirer');
                const field_title = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first();
                msgQuestionFieldTitle.delete();
                field_title.delete();
                let indexField = '';
                msgg.fields.map(field => {
                    if (indexField !== '') return;
                    if (field.name === field_title.content) indexField+=msgg.fields.indexOf(field);
                })
                if (indexField === '') return message.channel.send('Aucun field trouvé').then(msg => msg.delete({timeout: 50000}))
                delete msgg.fields[indexField];
                msgEmbedForEditing.edit(msgg);
            }
            if (reaction._emoji.name === "📥") {
                const msgQuestionChannelID = await message.channel.send("Merci de mettre l'id du salon");
                const channel_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                msgQuestionChannelID.delete();
                channel_id.delete();
                if(!Number(channel_id.content)||!message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({timeout: 5000}));
               const msgQuestionMessageID = await message.channel.send("Merci de mettre l'id du message");
               const message_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
               msgQuestionMessageID.delete();
               message_id.delete();
               if(!Number(message_id.content)||!message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
               const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
               if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({timeout: 50000}));
               if (msg.partial) {
                try {
                    await msg.fetch()
                } catch {
                    return
                }
            }
               msgg.edit({embed: msg.embeds[0].toJSON()})
            }
            if (reaction._emoji.name === "📑") {
                const msgQuestionChannel_ID = await message.channel.send("Merci de mettre l'id du salon");
                const channel_ID = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                msgQuestionChannel_ID.delete();
                channel_ID.delete();
              if(!Number(channel_ID.content)||!message.guild.channels.cache.get(channel_ID.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({timeout: 5000}));
              const msgQuestionMessage_ID = await message.channel.send("Merci de mettre l'id du message");
              const message_ID = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
              msgQuestionMessage_ID.delete();
              message_ID.delete();
              if(!Number(message_ID.content)||!message.guild.channels.cache.get(channel_ID.content).messages.fetch(message_ID.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
              const msg1 = await message.guild.channels.cache.get(channel_ID.content).messages.fetch(message_ID.content)
              msg1.edit(msgg.embeds);
            }
            if (reaction._emoji.name === "✅") {
                let question = await message.channel.send("Dans quel **Channel** voulez-vous envoyez l'embed ?(\`Cancel\` pour Annulé)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    if (lowercase === "cancel") {
                        collected.first().delete()
                        question.delete()
                        return message.channel.send("L'opération a été Annulée !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                    collected.first().delete()
                    question.delete()
                    let collect = collected.first()
                    let channel = collect.mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)
                    if(channel == undefined){
                        return message.channel.send("L'opération a été Annulée, le salon spécifié n'existe pas !").then((mm) => mm.delete({ timeout: 2500 })) }
                    
                    await channel.send(embedbase)
            
                }).catch(async (err) => {
                        console.log(err)
                        message.channel.send("**Désolé, mais je ne peux pas envoyer l'embed **").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
            }

           
            await reaction.users.remove(message.author.id);
        })
    });
} else {

}

}
}