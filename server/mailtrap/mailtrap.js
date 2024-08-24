const { MailtrapClient } = require('mailtrap');
require('dotenv').config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'Reszult',
};
module.exports = {
  mailtrapClient,
  sender,
};
