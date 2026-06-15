class BaseLayout extends HTMLElement {
    connectedCallback() {

        // Ambil konten asli di dalam tag <base-layout> untuk ditaruh ke area konten utama
        const originalContent = this.innerHTML;

        this.innerHTML = `
        <div class="bg-white text-gray-800 antialiased h-screen flex overflow-hidden w-full">
            
            <app-sidebar></app-sidebar>

            <main class="flex-1 p-6 md:p-10 h-screen max-w-7xl mx-auto w-full bg-white flex flex-col overflow-hidden">
                
                <app-header></app-header>

                <div class="flex-1 flex flex-col min-h-0 w-full">
                    ${originalContent}
                </div>
                
            </main>
        </div>
        `;

        // Inisialisasi Logika Jalannya Dropdown Custom
        this.initCustomDropdown();
    }

    initCustomDropdown() {
        const btn = document.getElementById('dropdownBtn');
        const menu = document.getElementById('dropdownMenu');
        const selectedText = document.getElementById('dropdownSelectedText');
        const options = document.querySelectorAll('.dropdown-item');

        // Proteksi jika halaman lain memakai BaseLayout tapi tidak punya dropdown ini
        if (!btn || !menu) return;

        // 1. Aksi Buka / Tutup Dropdown
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        // 2. Aksi Memilih Item di Dropdown
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Ubah teks tombol sesuai pilihan
                selectedText.innerText = option.innerText;

                // Reset semua gaya aktif item, lalu pasang ke yang baru dipilih
                options.forEach(opt => {
                    opt.classList.remove('bg-indigo-50', 'text-indigo-600', 'font-semibold');
                });
                option.classList.add('bg-indigo-50', 'text-indigo-600', 'font-semibold');

                // Tutup menu setelah memilih
                menu.classList.add('hidden');

                // SIAP DIGUNAKAN: Kamu bisa membaca nilai pilihannya lewat atribut ini
                const selectedValue = option.getAttribute('data-value');
                console.log("Wilayah dipilih:", selectedValue);

                // Opsional: Jika kamu butuh trigger filter data fungsi tabel, panggil di sini
            });
        });

        // 3. Tutup otomatis jika pengguna klik di luar area dropdown
        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    }
}
customElements.define('base-layout', BaseLayout);