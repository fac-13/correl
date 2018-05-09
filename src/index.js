const app = require('./app.js');

app.listen(app.get('port'), () => {
  console.log(`The server is running on http://localhost:${app.get('port')}`);
});