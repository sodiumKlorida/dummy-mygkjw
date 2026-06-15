function updateDateTime() {
    const now = new Date();

    // Format Tanggal Indonesia
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('id-ID', optionsDate);

    // Format Jam (HH:MM:SS)
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';

    // Masukkan ke dalam elemen HTML
    document.getElementById('current-date').textContent = dateString;
    document.getElementById('current-time').textContent = timeString;
}

// Jalankan fungsi setiap 1 detik
setInterval(updateDateTime, 1000);

// Jalankan pertama kali saat halaman dimuat
updateDateTime();