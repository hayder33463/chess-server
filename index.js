const WebSocket = require('ws');
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port });

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

console.log(`WebSocket server running on port ${port}`);
