const a = require('axios');

module.exports = {
  config: {
    name: "upscaleai",
    aliases: ["4k", "upscale"],
    version: "1.0.1",
    author: "Shikaki| Base Code: JARiF | API : Rishad",
    countDown: 15,
    role: 0,
    longDescription: "Upscale your image.",
    category: "utility",
    guide: {
      en: "{pn} reply to an image"
    }
  },

  onStart: async function ({ message, args, event, api }) {
    let imageUrl;

    api.setMessageReaction("⌛", event.messageID, () => { }, true);

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | Reply must be an image." },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "❌ | Reply to an image." }, event.threadID);

      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }

    try {
      const response = await a.get(`https://for-devs.onrender.com/api/upscale?imageurl=${encodeURIComponent(imageUrl)}&apikey=r-7c30109ae31d72214eee8978`, { responseType: 'stream' });

      message.reply({ body: "✅ | Image Upscaled.", attachment: response.data });

      api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
      message.reply("❌ | Error: " + error.message);

      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
  }
};
