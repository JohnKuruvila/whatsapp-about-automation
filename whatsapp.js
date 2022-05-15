#!/usr/bin/env node

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const client = new Client({
  authStrategy: new LocalAuth(), // your authstrategy here
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-extensions"],
  },
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  cron.schedule("0 0 * * *", () => setStatus());
  setStatus();
});

client.initialize();

const BIRTH_DATE = "01/01/2000";
const EXPECTED_LIFE_EXPECTANCY_IN_DAYS = 29200; // 80 years

function setStatus() {
  let daysSinceBirth = getNumberOfDays(new Date(BIRTH_DATE), new Date());
  let percentageDone = (
    (daysSinceBirth / EXPECTED_LIFE_EXPECTANCY_IN_DAYS) *
    100
  ).toFixed(2);
  client.setStatus("Day " + daysSinceBirth + " (" + percentageDone + "%)");
  console.log(`Set days status to ${daysSinceBirth}`);
}

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}
