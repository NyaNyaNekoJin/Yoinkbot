const commando = require('discord.js-commando');
const fs = require('fs');
const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')

module.exports = class RouletteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roulette',
            group: 'misc',
            memberName: 'roulette',
            description: 'Ask a question and the bot will return with the username of someone.',
            args:[
              { 
                  key:'text',
                  prompt: 'What would you like to ask?',
                  type: 'string',
              }
            ]
            
        })
      }
    async run (msg, { text }) {
      let people = await msg.guild.members.fetch();
      let winner = msg.guild.members.cache.random().user.tag
      console.log(winner)
        
      const embed = new Discord.MessageEmbed()
      .setTitle(msg.author.tag + ' asked ' + text)
      .setDescription(winner)

      msg.channel.send(embed)

        const id = msg.author.id
        console.log(id)
        const name = msg.member.user.tag;
        console.log(name)
        var information = [];
        information.push(name, id)
        var savedinfo = fs.readFileSync("./information.txt", {"encoding": "utf-8"});
        
      var newinfo = savedinfo;
    fs.writeFileSync("information.txt", newinfo.toString())
    
    fs.appendFileSync("information.txt", information.toString())

    fs.readFile("./information.txt", function (err, data) {
        if (err) throw err;
        var datata = data.toString('utf-8')
        if(data.includes('Xurxx#7879')){
         console.log((datata.length / 29) - .689655172413794)
        }
      });
    }

}