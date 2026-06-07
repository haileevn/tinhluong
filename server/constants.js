/** Thông tin nhà phát triển — dùng chung server & export */
const DEV_NAME = 'Hải Lê';
const DEV_PHONE = '0937.777.791';
const DEV_PHONE_TEL = '0937777791';
const DEV_SITE = 'H2T.life';
const DEV_URL = 'https://h2t.life';
const DEV_CREDIT = `Dev by ${DEV_SITE} - ${DEV_NAME} | ${DEV_PHONE}`;
const DEV_CREDIT_HTML = `Dev by <a href="${DEV_URL}" style="color:#888;text-decoration:none;">${DEV_SITE}</a> - ${DEV_NAME} | <a href="tel:${DEV_PHONE_TEL}" style="color:#888;text-decoration:none;">${DEV_PHONE}</a>`;

module.exports = {
  DEV_NAME,
  DEV_PHONE,
  DEV_PHONE_TEL,
  DEV_SITE,
  DEV_URL,
  DEV_CREDIT,
  DEV_CREDIT_HTML,
};
