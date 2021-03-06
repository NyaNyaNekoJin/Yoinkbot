const commando = require('discord.js-commando');
const fetch = require('node-fetch')
const fs = require('fs')
const Discord = require('discord.js')
const talkedRecently = new Set();


module.exports = class HolupCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'holup',
            group: 'reddit',
            memberName: 'holup',
            description: 'Sends a holup meme from r/holup',
        })
    }
    async run (msg) {
  const user = msg.member.user.tag
      if (talkedRecently.has(msg.author.id)) {
        return msg.channel.send("Cooldown! Wait 3 seconds before this command again. - " + user);
        
} else {

       // the user can type the command ... your command code goes here :)

    
        function loadMemes() {
            // Fetch JSON
            return (
             fetch('https://www.reddit.com/r/holup/hot/.json')
              .then((res) => res.json())
              // Return the actual posts
              .then((json) => json.data.children)
            );
           }
          
           function postRandomMeme(msg) {
            return loadMemes().then((posts) => {
             // Get a random post's title and URL
             const { title, url } = posts[Math.floor(Math.random() * posts.length)].data;
             const posturl = 'https://www.reddit.com/search?q=url:' + url;
             // Create the embed
             const embed = new Discord.MessageEmbed({
              title,
              image: { url },
              url: posturl,
              //description: { url },
              footer: { text: 'Subreddit : r/holup,' + " Yoinkbot collects your usernames and tag to improve our services, to find out whats being collected contact the bot owner with the command '?owner'" },
             });
             // Send the embed
             return msg.channel.send(embed);
            });
           }
          
           postRandomMeme(msg);



        const id = msg.author.id
        console.log(id)
        const name = msg.member.user.tag;
        console.log(name)
        var information = [];
        information.push(name, id)
        var savedinfo = fs.readFileSync("./information.txt", {"encoding": "utf-8"});
        
      var newinfo = savedinfo;
    fs.writeFileSync("information.txt", (newinfo))
    
    fs.appendFileSync("information.txt", (information))

    fs.readFile("./information.txt", function (err, data) {
        if (err) throw err;
        var datata = data.toString('utf-8')
        console.log((datata.length / 29) - .689655172413794)
      });
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(msg.author.id);
    }, 3000);
}
}