const Discord= require('discord.js')
const db = require('quick.db')
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: 'whitelist',
    aliases: ["wl"],
    run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
 
        if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {

     if(args[0]){
        let member = client.users.cache.get(message.author.id);
        if (args[0]) {
            member = client.users.cache.get(args[0]);
        } else {
            return message.channel.send(`Aucun membre trouvé pour \`${args[0]|| "rien"}\``)

        }
        if (message.mentions.members.first()) {
            member = client.users.cache.get(message.mentions.members.first().id);
        }
        if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0]|| "rien"}\``)
        if (db.get(`${message.guild.id}.${member.id}.wlmd`) === true) { return message.channel.send(`${member.username} est déjà whitelist`)}
      db.add(`${message.guild.id}.wlcount`,1)
        db.push(`${message.guild.id}.wl`,  member.id)
        db.set(`${message.guild.id}.${member.id}.wlmd`, true)

            message.channel.send(`${member.username} est maintenant dans la whitelist`)
        
       } else if(!args[0]) {

try {
    let own = db.get(`${message.guild.id}.wl`) 
    let ownc = db.get(`${message.guild.id}.wlcount`) 
    if(ownc === null|| "Nan" )ownc=1
    let p0 = 0;
    let p1 = 30;
    let page = 1;

    let embed = new Discord.MessageEmbed()
   embed.setTitle("Whitelist")
    .setColor(color)
    .setDescription(!own ? "None":own .map((user, i) => `<@${user}>`).slice(0, 30).join("\n")
    )
        .setFooter(`${page}/${Math.ceil(ownc||1/ 30)} • discord.gg/exodedev-fivem`)
      message.channel.send(embed).then(async tdata => {

    if (ownc> 30) {
     
       await tdata.react("◀");
        await sleep(230);
     await tdata.react("▶");
        await sleep(230);
    }


    const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

    data_res.on("collect", async (reaction) => {

        if (reaction.emoji.name === "◀") {

            p0 = p0 - 30;
            p1 = p1 - 30;
            page = page - 1

            if (p0 < 0) {
                return
            }
            if (p0 === undefined || p1 === undefined) {
                return
            }


            embed  .setDescription(own
    
                        .map((user, i) => `<@${user}>`)

                .slice(0, 30)
    )

        .setFooter(`${page}/${Math.ceil(ownc/ 30)} • discord.gg/exodedev-fivem`)
            tdata.edit(embed);

        }

        if (reaction.emoji.name === "▶") {

            p0 = p0 + 30;
            p1 = p1 + 30;

            page++;

            if (p1 > ownc+ 30) {
                return
            }
            if (p0 === undefined || p1 === undefined) {
                return
            }


            embed  .setDescription(own
    
                        .map((user, i) => `<@${user}>`)

                .slice(0, 30)
    )
                .setFooter(`${page}/${Math.ceil(ownc/ 30)} • discord.gg/exodedev-fivem`)
                tdata.edit(embed);

        }

    

        await reaction.users.remove(message.author.id);

    })
      })
} catch (error) {
    console.log(error)
}
}
} else {

}

    }
}