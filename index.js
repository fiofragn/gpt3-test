const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const openai_api_key = process.env.OPENAI_API_KEY;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if(msg.author.bot) return;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions',
                                      {
                                        prompt: msg.content,
                                        temperature: 0.5,
                                        max_tokens: 100,
                                      },
                                      {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${openai_api_key}`
                                        }
                                      });
    msg.reply(response.data.choices[0].text);
});

const token = process.env.DISCORD_TOKEN;
client.login(token);
