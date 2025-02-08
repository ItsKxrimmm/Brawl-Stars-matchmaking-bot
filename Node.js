// made by kxrimmmm
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const queue = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!join') {
    queue.push(msg.author);
    msg.reply('You have been added to the queue!');

    if (queue.length >= 6) {
      const team1 = [queue.shift(), queue.shift(), queue.shift()];
      const team2 = [queue.shift(), queue.shift(), queue.shift()];

      const channel = msg.guild.channels.cache.find(channel => channel.name === 'matchmaking');
      if (channel) {
        channel.send(`**Team 1:** ${team1.join(', ')} vs **Team 2:** ${team2.join(', ')}`);

        // Create voice channels for each team
        msg.guild.channels.create('Team 1', { type: 'voice' }).then(team1Channel => {
          team1.forEach(member => {
            member.voice.setChannel(team1Channel);
          });
        });

        msg.guild.channels.create('Team 2', { type: 'voice' }).then(team2Channel => {
          team2.forEach(member => {
            member.voice.setChannel(team2Channel);
          });
        });
      } else {
        msg.reply('A channel named "matchmaking" is required for team announcements.');
      }
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
