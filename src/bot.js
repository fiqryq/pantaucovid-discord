require('dotenv').config();

// Init Token
const {Client} = require('discord.js');
const client = new Client();
const axios = require('axios');
const moment = require('moment');
client.login(process.env.DISCORDJS_BOT_TOKEN)

// Command
const PREFIX = "/";

let url = 'https://covid19.mathdro.id/api/countries/ID';

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in`);
})

// Convert to number format
function numberFormat(number){
    return number.toLocaleString("id-ID");
}

// convert date format using moment
function convertStrDateToPattern(strDate , pattern, local){
    return moment(strDate).locale(local).format(pattern);
}

// what the fuck is this? i still code on response axioss wew.
async function getResponse() {
    try {
      const response = await axios.get(url);
      
        client.on('message',(message) => {
            if(message.author.bot) return;
            if(message.content.startsWith(PREFIX)){
                const CMD_NAME = message.content.substring(PREFIX.length);
                if (CMD_NAME === 'info'){
                    message.reply(`jumlah kasus`)
                }
                if (CMD_NAME === 'positif'){
                    message.channel.send('Total kasus positif Indonesia : ' + numberFormat(response.data.confirmed.value))
                }
                if (CMD_NAME === 'sembuh'){
                    message.channel.send('Total kasus sembuh Indonesia : ' + numberFormat(response.data.recovered.value))

                }
                if(CMD_NAME === 'meninggal'){
                    message.channel.send('Total kasus meninggal Indonesia : ' + numberFormat(response.data.deaths.value))
                }
                if(CMD_NAME === 'kasus'){
                    message.channel
                    .send('Update kasus corona di indonesia : \n'
                    + convertStrDateToPattern(response.data.lastUpdate,'LLLL ','id-ID') 
                    + numberFormat(response.data.confirmed.value))
                }
            } 
        })

    } catch (error) {
      console.error(error);
    }
  }

getResponse();

