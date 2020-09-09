'use strict';
const axios = require('axios');
const { IncomingWebhook } = require('@slack/webhook');

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

async function validaDisponibilidadeUrl(url) {
  await axios.get(url).then(async function(response){
    return true
  })
  .catch(async function (error)  {
    await webhook.send({

      "attachments": [
        {
          "color": "#ab0909",
          "author_name": "Cypher",
          "author_link": "https://vgraphs.com/images/agents/cypher-avatar.jpg",
          "author_icon": "https://vgraphs.com/images/agents/cypher-avatar.jpg",
          "text":  'Ocorreu um erro ao tentar acessar a url: '+ url+', '+error,
          "fields": [
            {
              "title": "Prioridade",
              "value": "Alta",
              "short": false
            }
          ]
        }
      ]
    });
  })
}

module.exports = {
  '*/30 * * * * *': async () => {
    let monitorados = await strapi.query('monitorados').find()
    for (const item of monitorados)  await validaDisponibilidadeUrl(item.url)
  },
};
