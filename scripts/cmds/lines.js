const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "randomtext",
    aliases: ['rt', 'random' ],
    version: "1.0",
    author: "Vex_kshitiz",
    role: 0,
    shortDescription: { en: "Sends a random text from a predefined list." },
    longDescription: { en: "Get a random motivational quote or fun fact from our curated list." },
    category: "fun",
    guide: { en: "Use {p}randomtext to receive a random text." }
  },
  onStart: async function ({ api, event, args, prefix }) {
    try {
      console.log('Received message:', event.body);
      console.log('Prefix:', prefix);

      const texts = [
        "The journey of a thousand miles begins with one step.",
        "Life is what happens when you're busy making other plans.",
        "Get busy living or get busy dying.",
        "You have within you right now, everything you need to deal with whatever the world can throw at you.",
        "Believe you can and you're halfway there."
      ];

      const getRandomText = () => {
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
      };

      const messageText = event.body.toLowerCase();
      console.log('Message text:', messageText);
      console.log('Prefix + line:', prefix + 'line');

      if (messageText.startsWith(prefix + 'line')) {
        console.log('Match found!');
        const responseText = getRandomText();
        await api.sendMessage(responseText, event.threadID, event.messageID);
      } else {
        console.log('No match found.');
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage(`An error occurred.`, event.threadID, event.messageID);
    }
  }
};
