const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
  ws.on('message', message => {
    // إرسال الرسالة لكل العملاء الآخرين
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send('Connected to chess server!');
});
