class AppHeader extends HTMLElement {
    connectedCallback() {
        // Mengambil judul halaman dari atribut, jika tidak ada default ke 'Ringkasan Dashboard'
        const pageTitle = this.closest('base-layout')?.getAttribute('page-title') || 'Ringkasan Dashboard';
        const pageDesc = this.closest('base-layout')?.getAttribute('page-desc') || 'Selamat datang kembali di panel kendali MY-GKJW.';

        this.innerHTML = `
        <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
            <div>
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">${pageTitle}</h2>
                <p class="text-gray-500 text-sm mt-1">${pageDesc}</p>
            </div>

            <div class="flex flex-wrap gap-4 items-center">
                <div class="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-md border border-indigo-100 self-start sm:self-center transition-all hover:border-indigo-200">
                    <div class="text-start">
                        <p id="current-date" class="text-sm font-bold text-gray-800 leading-tight">-</p>
                        <p id="current-time" class="text-xs font-semibold text-indigo-600 mt-0.5">-</p>
                    </div>
                    <div class="p-2 bg-indigo-600 text-white rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                <div class="flex items-center gap-6 bg-white px-6 py-4 rounded-2xl shadow-md border border-indigo-100 self-start sm:self-center transition-all hover:border-indigo-200">
                    <div class="text-start xs:block">
                        <p class="text-sm font-bold leading-none">Ezra Gilang</p>
                        <p class="text-xs font-semibold text-indigo-600 mt-0.5">Admin</p>
                    </div>
                    <div class="relative">
                        <div class="w-10 h-10 bg-indigo-600 text-white font-black text-sm rounded-xl flex items-center justify-center shadow-sm border border-indigo-100">
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </header>
        `;
        
        // Memanggil fungsi jam setelah elemen HTML di-inject ke DOM
        this.initClock();
    }

    // Fungsi initClock harus berada di dalam lingkup class AppHeader
    initClock() {
        const updateClock = () => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';

            const dateEl = this.querySelector('#current-date');
            const timeEl = this.querySelector('#current-time');
            
            if (dateEl) dateEl.textContent = dateStr;
            if (timeEl) timeEl.textContent = timeStr;
        };
        
        setInterval(updateClock, 1000);
        updateClock();
    }
}

customElements.define('app-header', AppHeader);