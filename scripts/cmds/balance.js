module.exports = {
  config: {
    name: "balance",
    aliases: ["bal"],
    version: "1.1",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "xem số tiền của bạn",
      en: "view your money"
    },
    longDescription: {
      vi: "xem số tiền hiện có của bạn hoặc người được tag",
      en: "view your money or the money of the tagged person"
    },
    category: "economy",
    guide: {
      vi: "   {pn}: xem số tiền của bạn"
        + "\n   {pn} <@tag>: xem số tiền của người được tag",
      en: "   {pn}: view your money"
        + "\n   {pn} <@tag>: view the money of the tagged person"
    }
  },

  langs: {
    vi: {
      money: "Bạn đang có %1$",
      moneyOf: "%1 đang có %2$"
    },
    en: {
      money: "━━━━[𝙱𝚊𝚕𝚊𝚗𝚌𝚎]━━━━\nYou have %1$ 💰",
      moneyOf: "━━━━[𝙱𝚊𝚕𝚊𝚗𝚌𝚎]━━━━\n%1 has %2$ 💰"
    }
  },

  formatNumber: function (num) {
    return num.toLocaleString(); // Format number with commas
  },

  onStart: async function ({ message, usersData, event, getLang }) {
    if (Object.keys(event.mentions).length > 0) {
      const uids = Object.keys(event.mentions);
      let msg = "";
      for (const uid of uids) {
        const userMoney = await usersData.get(uid, "money");
        const fullMoney = this.formatNumber(userMoney || 0); // Format number
        msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), fullMoney) + '\n';
      }
      return message.reply(msg);
    }

    const userData = await usersData.get(event.senderID);
    const fullMoney = this.formatNumber(userData.money || 0); // Format number
    message.reply(getLang("money", fullMoney));
  }
};
