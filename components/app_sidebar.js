class AppSidebar extends HTMLElement {
    constructor() {
        super();
        // Mengambil status terakhir dari localStorage. Jika tidak ada, default: false (terbuka)
        this.isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    }

    connectedCallback() {
        this.render();
    }

    // Fungsi untuk mengubah status lipat dan menyimpannya ke memori browser
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;

        // Simpan status terbaru ke localStorage berbentuk string ('true' / 'false')
        localStorage.setItem('sidebar-collapsed', this.isCollapsed);

        this.render();

        // Kirim event ke parent layout agar konten utama tahu lebar berubah
        this.dispatchEvent(new CustomEvent('sidebar-toggle', {
            detail: { collapsed: this.isCollapsed },
            bubbles: true
        }));
    }

    render() {
        const activePage = this.closest('base-layout')?.getAttribute('active-page') || 'dashboard';

        // Helper untuk class menu biasa & saat dilipat
        const getMenuClass = (pageName) => {
            const baseClass = "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ";
            const activeStyle = activePage === pageName
                ? "bg-white text-indigo-600 shadow-md font-bold "
                : "text-indigo-100 hover:bg-indigo-700/50 hover:text-white font-medium ";

            const collapseStyle = this.isCollapsed ? "justify-center px-2" : "";

            return `${baseClass} ${activeStyle} ${collapseStyle}`;
        };

        // Mengubah ukuran lebar sidebar secara dinamis
        const sidebarWidth = this.isCollapsed ? "w-20" : "w-64";

        this.innerHTML = `
        <aside class="${sidebarWidth} bg-indigo-600 text-white flex flex-col justify-between p-4 hidden md:flex h-screen sticky top-0 left-0 shrink-0 border-r border-indigo-700 transition-all duration-300 relative">
            
            <button onclick="this.closest('app-sidebar').toggleSidebar()" 
                class="absolute top-1/2 -translate-y-1/2 -right-3.5 z-50 w-7 h-7 bg-white text-indigo-600 rounded-full border border-gray-200 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all cursor-pointer group"
                title="${this.isCollapsed ? 'Buka Sidebar' : 'Lipat Sidebar'}">
                
                <svg class="w-4 h-4 transition-transform duration-300 ${this.isCollapsed ? 'rotate-180' : ''}" 
                    fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                </svg>
            </button>

            <div>
                <div class="flex ${this.isCollapsed ? 'flex-col gap-2' : 'gap-2'} items-center mb-8 px-2 py-4 border-b border-indigo-500/40 select-none">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                        <img src="assets/Frame 4.png" alt="MY-GKJW" class="w-full h-full object-contain">
                    </div>
                    <div class="${this.isCollapsed ? 'hidden' : 'block'}">
                        <h1 class="text-lg font-extrabold tracking-tight leading-none">MY-ADMIN</h1>
                    </div>
                </div>

                <nav class="space-y-2">
                    <a href="indexv2.html" class="${getMenuClass('dashboard')}" title="Dashboard">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 012 2H6a2 2 0 012-2V6zM14 14h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4a2 2 0 012-2z"></path>
                        </svg>
                        <span class="${this.isCollapsed ? 'hidden' : 'block'}">Dashboard</span>
                    </a>
                    
                    <a href="jemaat.html" class="${getMenuClass('jemaat')}" title="Data Jemaat">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <span class="${this.isCollapsed ? 'hidden' : 'block'}">Data Jemaat</span>
                    </a>
                    
                    <a href="kegiatan.html" class="${getMenuClass('kegiatan')}" title="Kegiatan & Jadwal">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span class="${this.isCollapsed ? 'hidden' : 'block'}">Kegiatan & Jadwal</span>
                    </a>
                    
                    <a href="persembahan.html" class="${getMenuClass('persembahan')}" title="Data Persembahan">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="${this.isCollapsed ? 'hidden' : 'block'}">Persembahan</span>
                    </a>
                    
                    <a href="laporan.html" class="${getMenuClass('laporan')}" title="Laporan & Rekap">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span class="${this.isCollapsed ? 'hidden' : 'block'}">Laporan & Rekap</span>
                    </a>
                </nav>
            </div>

            <div class="border-t border-indigo-500/40 pt-4">
                <a href="index.html" class="flex items-center ${this.isCollapsed ? 'justify-center p-2' : 'justify-between p-2.5'} w-full hover:bg-indigo-700/50 rounded-xl transition-all group" title="Logout / Keluar">
                    <div class="flex items-center gap-3 ${this.isCollapsed ? 'hidden' : 'block'}">
                        <p class="text-sm font-bold leading-none text-indigo-100 group-hover:text-white transition-colors">Logout</p>
                    </div>
                    <div class="p-1">
                        <svg class="w-5 h-5 text-indigo-100 group-hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </aside>
        `;
    }
}
customElements.define('app-sidebar', AppSidebar);