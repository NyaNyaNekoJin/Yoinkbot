const commando = require('discord.js-commando');
const fs = require('fs');
const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')
const prefix  = '?'
module.exports = class OneThousandCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'react',
            group: 'misc',
            memberName: 'react',
            description: 'React to the previous message.',
            args:[
              { 
                  key:'text',
                  prompt: 'What emoji do you want me to react with?',
                  type: 'string',
              }
          ]
        })
    }
    async run (msg, { text }) {
        const society = '769377185734590494'
    
      const args = msg.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
     msg.delete()
     //msg.react(args[0])
     const amount = (parseInt(0)) + 1;
if (args[0] === 'society'){
    args[0] = society
}
     msg.channel.messages.fetch({
         limit: amount,
     }).then((messages) => {
         var i = 0;
         messages.forEach(function(message) {
             i++;
             if (i === amount) {
                 message.react(args[0]).catch(console.error);
             }
         })
     });
     

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