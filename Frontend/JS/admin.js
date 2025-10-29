/** * Mendapatkan data reservasi dari localStorage. */
function getReservations() {
    try {
        const data = localStorage.getItem('yumi_reservations');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading localStorage", e);
        return [];
    }
}

/** Menyimpan data reservasi ke localStorage.*/
function saveReservations(reservations) {
    localStorage.setItem('yumi_reservations', JSON.stringify(reservations));
}

/** * Merender daftar reservasi di tabel Admin Dashboard.*/
function renderReservations(reservations, filterDate = null) {
    const tableBody = document.getElementById('reservationsTableBody');
    const totalReservationsEl = document.getElementById('totalReservations');
    if (!tableBody || !totalReservationsEl) return;

    tableBody.innerHTML = '';

    // Filter data jika ada tanggal yang dipilih
    let filteredReservations = reservations;
    if (filterDate) {
        filteredReservations = reservations.filter(res => res.date === filterDate);
    }

    // Tampilkan total
    totalReservationsEl.textContent = filteredReservations.length;

    if (filteredReservations.length === 0) {
        const row = tableBody.insertRow();
        row.innerHTML = `<td colspan="7" class="text-center text-muted py-4">Tidak ada reservasi ditemukan${filterDate ? ` untuk tanggal ${filterDate}` : ''}.</td>`;
        return;
    }

    // Sorting berdasarkan tanggal dan waktu
    filteredReservations.sort((a, b) => {
        if (a.date !== b.date) {
            return new Date(a.date) - new Date(b.date);
        }
        return a.time.localeCompare(b.time); 
    });

    // Render baris tabel
    filteredReservations.forEach(res => {
        const row = tableBody.insertRow();

        // Logika warna status
        let statusClass = 'text-muted';
        if (res.status === 'Booked') {
            statusClass = 'text-success fw-bold';
        } else if (res.status === 'Cancelled') {
            statusClass = 'text-danger fw-bold';
        }

        row.innerHTML = `
            <td>#${res.id}</td>
            <td>${res.date}</td>
            <td>${res.time}</td>
            <td>${res.serviceName}</td>
            <td>${res.customer}</td>
            <td><span class="${statusClass}">${res.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-danger btn-xs cancel-res me-2" data-id="${res.id}" ${res.status === 'Cancelled' ? 'disabled' : ''}>Batal</button>
                <button class="btn btn-sm btn-danger btn-xs delete-res" data-id="${res.id}">Hapus</button>
            </td>
        `;

        // Tambahkan event listener untuk tombol Batal
        row.querySelector('.cancel-res')?.addEventListener('click', (e) => {
            const resId = parseInt(e.currentTarget.dataset.id);
            if (confirm(`Yakin ingin membatalkan reservasi oleh ${res.customer} untuk ${res.serviceName} pada ${res.date} jam ${res.time}?`)) {
                cancelReservation(resId);
            }
        });
    });

    // Event Listener untuk Filter Tanggal di Admin
    document.getElementById('adminDateFilter')?.addEventListener('change', (e) => {
        renderReservations(getReservations(), e.target.value);
    });

    // Event Listener untuk Reset Filter
    document.getElementById('resetFilterBtn')?.addEventListener('click', () => {
        document.getElementById('adminDateFilter').value = '';
        renderReservations(getReservations());
    });
}

/** * Membatalkan reservasi berdasarkan ID dan menyimpan kembali data.*/
function cancelReservation(id) {
    const reservations = getReservations();
    const index = reservations.findIndex(res => res.id === id);
    if (index !== -1) {
        reservations[index].status = 'Cancelled';
        saveReservations(reservations);
        const currentFilter = document.getElementById('adminDateFilter')?.value;
        renderReservations(getReservations(), currentFilter);
        alert("Reservasi berhasil dibatalkan.");
    }
}

/** Menghapus permanen reservasi berdasarkan ID dan menyimpan kembali data. */
function deleteReservation(id) {
    let reservations = getReservations();
    // Filter semua reservasi kecuali yang memiliki ID yang cocok
    const initialLength = reservations.length;
    reservations = reservations.filter(res => res.id !== id);

    if (reservations.length < initialLength) {
        saveReservations(reservations);
        const currentFilter = document.getElementById('adminDateFilter')?.value;
        renderReservations(getReservations(), currentFilter);
        alert("Reservasi berhasil dihapus permanen.");
    } else {
        alert("Gagal menghapus reservasi. ID tidak ditemukan.");
    }
}