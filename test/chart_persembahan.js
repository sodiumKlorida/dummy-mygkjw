function updateGraphPeriod() {
    const now = new Date();
    const options = { month: 'long', year: 'numeric' };
    const monthYearString = now.toLocaleDateString('id-ID', options); // Hasil: "Juni 2026"

    document.getElementById('graph-month').textContent = monthYearString;
    document.getElementById('current-month-badge').textContent = monthYearString;
}
// Jalankan saat load
updateGraphPeriod();