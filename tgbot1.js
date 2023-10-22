const TelegramBot = require("node-telegram-bot-api");
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const fs = require("fs");
const path = require("path");

const bot = new TelegramBot(botToken, { polling: true });

let savedChatId; // Переменная для хранения chatId

const sslCertPath = "/app/";



const tlsOptions = {
  key: fs.readFileSync(path.join(sslCertPath, "privkey.pem")),
  cert: fs.readFileSync(path.join(sslCertPath, "fullchain.pem")),
};



bot.setWebHook('https://gamy-season-repair.glitch.me/' + botToken, {
  key: tlsOptions.key,
  cert: tlsOptions.cert
});



bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;

  // Создаем объекты `WebAppInfo` с описанием TWA.
  const webApp1 = {
    title: 'Приложение 1',
    url: 'https://gamy-season-repair.glitch.me/base',
  };

  const webApp2 = {
    title: 'Приложение 2',
    url: 'https://gamy-season-repair.glitch.me/page1',
  };

  const webApp3 = {
    title: 'Приложение 3',
    url: 'https://gamy-season-repair.glitch.me/page2',
  };

  // Создаем три кнопки `InlineKeyboardButtonWebApp` с описанием TWA.
  const button1 = {
    type: 'InlineKeyboardButtonWebApp',
    web_app: webApp1,
    text: 'Запустить приложение 1',
  };

  const button2 = {
    type: 'InlineKeyboardButtonWebApp',
    web_app: webApp2,
    text: 'Запустить приложение 2',
  };

  const button3 = {
    type: 'InlineKeyboardButtonWebApp',
    web_app: webApp3,
    text: 'Запустить приложение 3',
  };

  // Создаем массив кнопок.
  const keyboard = [
    [button1],
    [button2],
    [button3],
  ];

  // Опции для отправки сообщения.
  const options = {
    reply_markup: {
      inline_keyboard: keyboard,
    },
    caption: 'Добро пожаловать! Выберите приложение для запуска:',
  };

  // Отправляем сообщение с inline-клавиатурой и картинкой.
  bot.sendPhoto(chatId, 'https://avatars.dzeninfra.ru/get-zen_doc/5210731/pub_632b35dc6e80b608f2ad5748_632b36344b36fe6d110ec81d/scale_1200', options);
});


bot.getMe().then(me => {
   // Сохраняем id пользователя (user_id)
   const userId = me.id;
   console.log(`User ID: ${userId}`);
   
   // Получение chat_id по user_id
   bot.getChat(userId).then(chat => {
       const chatId = chat.id;
       console.log(`Chat ID: ${chatId}`);
   });
});







module.exports = bot;