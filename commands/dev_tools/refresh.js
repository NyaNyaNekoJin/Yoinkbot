//Currently Broken (OCT 9 2020) Not high priority to fix soon.
const commando = require('discord.js-commando');
const fetch = require('node-fetch')
const fs = require('fs')
const Discord = require('discord.js')
prefix = '?'
const client = new commando.CommandoClient()

module.exports = class CopyPastaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'refresh',
            group: 'misc',
            memberName: 'refresh',
            description: 'Refreshes a bot command',
        })
    }
    async run (msg) {
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        //const command = args.shift().toLowerCase();
        if (!args.length) return msg.channel.send(`You didn't pass any command to reload, ${msg.author}!`);
        const commandName = args[0].toLowerCase();
        console.log(client.commands)
        const command = client.commands.get(commandName)
            || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);
        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            msg.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.msg}\``);
        }





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