const API_VERSION = 1;

require('dotenv').config();

const app = require(`./v${API_VERSION}/app`);
const db = require(`./v${API_VERSION}/configs/db`);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});