const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "lines",
    aliases: ["line", "sads", "squote"],
    version: "1.0",
    author: "Minato",
    role: 0,
    shortDescription: { en: "Get a random sad quote." },
    longDescription: { en: "Fetch a random sad quote from the predefined list." },
    category: "fun",
    guide: { en: "Use {p}lines to get a random sad quote." }
  },
  onStart: async function ({ api, event }) {
    try {
      // Define an array of sad lines
      const sadLines = [
        "The journey of a thousand miles begins with one step.",
        "Life is what happens when you're busy making other plans.",
        "Get busy living or get busy dying.",
        "You have within you right now, everything you need to deal with whatever the world can throw at you.",
        "Believe you can and you're halfway there."
      ];
      
      

      // React to the message with a waiting symbol
      const waitingSymbol = "⌛";
      await api.setMessageReaction(waitingSymbol, event.messageID);

      // Randomly select a sad line
      const randomIndex = Math.floor(Math.random() * sadLines.length);
      const selectedSadLine = sadLines[randomIndex];

      // Send the selected sad line as a message
      const messageBody = `"${selectedSadLine}"`;
      api.sendMessage(messageBody, event.threadID, (err, info) => {
        if (err) {
          console.error('Error occurred:', err);
          const errorMessage = `An error occurred while sending the sad line: ${err.message}`;
          api.sendMessage(errorMessage, event.threadID, (err) => {
            if (err) {
              console.error('Error occurred:', err);
            }
          });
        } else {
          // React with a success symbol
          const successSymbol = "✅";
          api.setMessageReaction(successSymbol, event.messageID, (err) => {
            if (err) {
              console.error('Error occurred:', err);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error occurred:', error);
      const errorMessage = `An error occurred while sending the sad line: ${error.message}`;
      api.sendMessage(errorMessage, event.threadID, (err) => {
        if (err) {
          console.error('Error occurred:', err);
        }
      });
    }
  }
};
