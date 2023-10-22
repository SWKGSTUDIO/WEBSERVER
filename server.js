const fastify = require("fastify")({
  logger: false,
});

const path = require("path");

const fs = require("fs");

const seo = require("./src/seo.json");

const sslCertPath = "/app/";

const tlsOptions = {
  key: fs.readFileSync(path.join(sslCertPath, "privkey.pem")),
  cert: fs.readFileSync(path.join(sslCertPath, "fullchain.pem")),
};

const serverUrl = 'https://gamy-season-repair.glitch.me';

const bot = require("./tgbot1");




fastify.get('/.well-known/acme-challenge/dh_QxuyHHOOEkAg9RWm-09rp53PxxL2LxNC8bKI_s8k', (request, reply) => {

  const challengeContent = 'dh_QxuyHHOOEkAg9RWm-09rp53PxxL2LxNC8bKI_s8k.ngdhUyhKxp9L77kDf31eB7YWg9HU8wn3Zr5vxZylKtQ';

  reply.code(200).send(challengeContent);
});



fastify.post("/api/contact-manager", async (request, reply) => {

  const message = request.body.message;

  const chatId = request.body.chatId;

  reply.send({
    status: "success",
  });
});




fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

let favorites = [];




fastify.get("/", function (request, reply) {
  const chatId = request.query.chatId;
  return reply.view("base", { seo: seo, chatId: chatId });
});


fastify.get("/screen_2", function (request, reply) {

  reply.sendFile("screen_2.html");
});




fastify.post('/api/chatId', (request, reply) => {
  const chatId = request.body.chatId;
  
  console.log(`Received chatId: ${chatId}`);

  reply.send({ success: true });
});



fastify.get("/base", function (request, reply) {
  const chatId = request.query.chatId;
  return reply.view("base", { seo: seo, chatId: chatId });
});








fastify.get("/page1", function (request, reply) {

  return reply.view("page1", { seo: seo });
});



fastify.get("/dop1", function (request, reply) {

  return reply.view("dop1", { seo: seo });
});



fastify.get("/page2", function (request, reply) {

  return reply.view("page2", { seo: seo });
});

fastify.get("/page3", function (request, reply) {

  return reply.view("page3", { seo: seo });
});

fastify.post("/", function (request, reply) {
  const chatId = request.body.message.chat.id;
  bot.sendMessage(chatId, "Ваше сообщение");
});

fastify.post("/sendTelegramMessage", function (request, reply) {
  const chatId = request.body.chatId;
  bot.sendMessage(chatId, "Ваше сообщение в Telegram");
  reply.send({ success: true });
});

fastify.post("/webhook", function (request, reply) {
  const update = request.body;

  if (update.fromWebApp) {

  }

  reply.send({ ok: true });
});



// fastify.post("/showVariants", function (request, reply) {
//   console.log("Запрос на показ вариантов недвижимости получен.");

//   if (savedChatId) {
//     const realEstateData = [
//       '1. Квартира в центре - $100,000',
//       '2. Дом за городом - $250,000',
//       '3. Дом на берегу озера - $300,000',
//       '4. Комната в общежитии - $30,000',
//       '5. Земельный участок под строительство - $50,000',
//     ];


//     const detailsButton = {
//       text: "Подробнее",
//       callback_data: "details",
//     };

//     // Отправьте каждый вариант недвижимости в отдельном сообщении с кнопкой "Подробнее"
//     realEstateData.forEach((property, index) => {
//       const message = `${index + 1}. ${property}`;
//       const options = {
//         reply_markup: JSON.stringify({
//           inline_keyboard: [[detailsButton]],
//         }),
//       };

//       bot.sendMessage(savedChatId, message, options, (error, message) => {
//         if (error) {
//           console.error(error);
//         } else {
//           // В сообщении успешно отправлено, можно сделать что-то еще, если нужно
//         }
//       });
//     });

//     // Логируйте успешное выполнение запроса
//     console.log("Варианты недвижимости успешно отправлены.");

//     reply.send({ success: true, message: 'Варианты недвижимости отправлены' });
//   } else {
//     // Логируйте ошибку, если chatId не найден
//     console.error("chatId не найден.");
//     reply.send({ error: 'chatId не найден' });
//   }
// });

fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);




fastify.get("/getChat", async function (request, reply) {
  try {
    const chatId = await getChatId();
    reply.send({ chatId: chatId });
  } catch (error) {
    console.error("Ошибка при получении chat ID:", error);
    reply.send({ error: "Не удалось получить chat ID" });
  }
});


function getChatId() {
  return bot.getMe().then(me => {
    const userId = me.id;
    return bot.getChat(userId).then(chat => {
      const chatId = chat.id;
      return chatId;
    });
  });
}



// bot.getMe().then(me => {
//    // Сохраняем id пользователя (user_id)
//    const userId = me.id;
//    console.log(`User ID: ${userId}`);
   
//    // Получение chat_id по user_id
//    bot.getChat(userId).then(chat => {
//        const chatId = chat.id;
//        console.log(`Chat ID: ${chatId}`);
//    });
// });


// let savedChatId; // Переменная для хранения chatId





// bot.onText(/\/start/, msg => {
//   const chatId = msg.chat.id;

//   // Создаем объекты `WebAppInfo` с описанием TWA.
//   const webApp1 = {
//     title: 'Приложение 1',
//     url: 'https://gamy-season-repair.glitch.me/page1',
//   };

//   const webApp2 = {
//     title: 'Приложение 2',
//     url: 'https://gamy-season-repair.glitch.me/page2',
//   };

//   const webApp3 = {
//     title: 'Приложение 3',
//     url: 'https://gamy-season-repair.glitch.me/page3',
//   };

//   // Создаем три кнопки `InlineKeyboardButtonWebApp` с описанием TWA.
//   const button1 = {
//     type: 'InlineKeyboardButtonWebApp',
//     web_app: webApp1,
//     text: 'Запустить приложение 1',
//   };

//   const button2 = {
//     type: 'InlineKeyboardButtonWebApp',
//     web_app: webApp2,
//     text: 'Запустить приложение 2',
//   };

//   const button3 = {
//     type: 'InlineKeyboardButtonWebApp',
//     web_app: webApp3,
//     text: 'Запустить приложение 3',
//   };

//   // Создаем массив кнопок.
//   const keyboard = [
//     [button1],
//     [button2],
//     [button3],
//   ];

//   // Опции для отправки сообщения.
//   const options = {
//     reply_markup: {
//       inline_keyboard: keyboard,
//     },
//     caption: 'Добро пожаловать! Выберите приложение для запуска:',
//   };

//   // Отправляем сообщение с inline-клавиатурой и картинкой.
//   bot.sendPhoto(chatId, 'https://avatars.dzeninfra.ru/get-zen_doc/5210731/pub_632b35dc6e80b608f2ad5748_632b36344b36fe6d110ec81d/scale_1200', options);
// });




