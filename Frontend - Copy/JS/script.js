// ==== FILE: script.js (LOGIKA ADMIN & BOOKING COMPLETE) ====

// ==== KONSTANTA & DATA ====
const SERVICE_CAPACITY = 2; // Maksimal 2 reservasi per slot waktu untuk setiap layanan
const ADMIN_EMAIL = "yumi@admin.com";
const ADMIN_PASS = "akuadmin";

// Aturan Durasi dan Kapasitas per Kategori
const CATEGORY_RULES = {
    'RAMBUT': { durationHours: 2, capacity: SERVICE_CAPACITY },
    'WAJAH': { durationHours: 2, capacity: SERVICE_CAPACITY },
    'TUBUH': { durationHours: 1, capacity: SERVICE_CAPACITY },
    'DEFAULT': { durationHours: 1, capacity: SERVICE_CAPACITY } 
};

// Data Layanan
const servicesData = [
    // --- RAMBUT (2 JAM) ---
    { id: 'potong-rambut', category: 'RAMBUT', name: 'Potong Rambut', shortDescription: 'Ciptakan gaya rambut terbaru, termasuk cuci dan penataan akhir.', description: `<h3>Signature Cut & Style</h3><p>Layanan dimulai dengan konsultasi mendalam, pencucian, pemotongan presisi, dan diakhiri dengan penataan profesional.</p>`, images: [ 'https://images.unsplash.com/photo-1599387739545-6c3914947050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://picsum.photos/800/450?random=1' ] },
    { id: 'cuci-blow', category: 'RAMBUT', name: 'Cuci & Blow Dry', shortDescription: 'Rambut bersih, harum, dan ditata bervolume sempurna.', description: `<p>Rasakan sensasi keramas yang memanjakan, diikuti dengan teknik blow dry untuk menghasilkan volume yang tahan lama.</p>`, images: [ 'https://images.unsplash.com/photo-1605497788014-e7ef00a62f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' ] },
    { id: 'creambath', category: 'RAMBUT', name: 'Creambath Treatment', shortDescription: 'Perawatan tradisional dengan pijatan kepala, bahu, dan punggung.', description: `<p>Perawatan Creambath klasik menggunakan krim alami yang menutrisi, diperkaya pijatan relaksasi.</p>`, images: [ 'https://images.unsplash.com/photo-1560066984-13fbad135046?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' ] },
    { id: 'anti-dandruff', category: 'RAMBUT', name: 'Anti Dandruff', shortDescription: 'Perawatan kulit kepala khusus untuk mengatasi ketombe.', description: `<p>Treatment khusus untuk membersihkan kulit kepala dari ketombe dan mengurangi rasa gatal.</p>`, images: [ 'https://picsum.photos/800/450?random=13' ] },
    { id: 'hair-spa', category: 'RAMBUT', name: 'Hair Spa', shortDescription: 'Perawatan rambut kering dan kusam, menjadikannya lembut dan berkilau.', description: `<p>Memberikan nutrisi intensif untuk rambut yang rusak dan memerlukan kelembapan ekstra.</p>`, images: [ 'https://picsum.photos/800/450?random=14' ] },
    { id: 'hair-mask', category: 'RAMBUT', name: 'Hair Mask', shortDescription: 'Perawatan untuk memperbaiki struktur rambut yang rusak akibat proses kimia.', description: `<p>Masker rambut kaya protein untuk menguatkan helai rambut dari dalam.</p>`, images: [ 'https://picsum.photos/800/450?random=15' ] },
    
    // --- WAJAH (2 JAM) ---
    { id: 'facial-acne', category: 'WAJAH', name: 'Facial Acne', shortDescription: 'Pembersihan mendalam khusus untuk kulit berjerawat dan sensitif.', description: `<p>Perawatan wajah yang fokus pada pengangkatan komedo dan pencegahan jerawat baru, menggunakan produk anti-bakteri.</p>`, images: [ 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' ] },
    { id: 'facial-whitening', category: 'WAJAH', name: 'Facial Whitening', shortDescription: 'Mencerahkan warna kulit dan mengurangi flek hitam.', description: `<p>Facial dengan serum pencerah yang efektif meratakan warna kulit dan memberikan kilau alami.</p>`, images: [ 'https://picsum.photos/800/450?random=32' ] },
    { id: 'facial-anti-aging', category: 'WAJAH', name: 'Facial Anti Aging', shortDescription: 'Mengurangi kerutan dan mengencangkan kulit wajah.', description: `<p>Treatment khusus untuk meminimalkan garis halus dan mengembalikan elastisitas kulit.</p>`, images: [ 'https://picsum.photos/800/450?random=33' ] },
    { id: 'eyelash', category: 'WAJAH', name: 'Eyelash Extension', shortDescription: 'Bulu mata lentik, tebal, dan tahan lama.', description: `<p>Pemasangan bulu mata individu oleh ahli profesional, disesuaikan dengan bentuk mata Anda.</p>`, images: [ 'https://picsum.photos/800/450?random=42' ] },
    
    // --- TUBUH (1 JAM) ---
    { id: 'body-massage', category: 'TUBUH', name: 'Body Massage', shortDescription: 'Pijatan relaksasi meredakan tegang dan memulihkan energi.', description: `<p>Pijatan relaksatif selama 60/90 menit menggunakan minyak aromaterapi pilihan untuk melepaskan ketegangan.</p>`, images: [ 'https://images.unsplash.com/photo-1519824143160-d6c8b85b974b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' ] },
    { id: 'body-scrub', category: 'TUBUH', name: 'Body Scrub / Lulur', shortDescription: 'Mengangkat sel kulit mati untuk kulit yang cerah dan halus.', description: `<p>Proses eksfoliasi dengan lulur tradisional pilihan, diikuti dengan pembilasan dan pelembap.</p>`, images: [ 'https://picsum.photos/800/450?random=51' ] },
    { id: 'waxing', category: 'TUBUH', name: 'Waxing', shortDescription: 'Menghilangkan bulu halus hingga ke akar dengan minim rasa sakit.', description: `<p>Layanan penghilangan bulu (waxing) cepat dan higienis untuk berbagai area tubuh.</p>`, images: [ 'https://picsum.photos/800/450?random=56' ] },
    { id: 'mani-pedi', category: 'TUBUH', name: 'Manicure / Pedicure', shortDescription: 'Perawatan lengkap kuku tangan dan kaki Anda.', description: `<p>Layanan Manicure/Pedicure yang meliputi pembersihan, *shaping*, dan perawatan kutikula.</p>`, images: [ 'https://picsum.photos/800/450?random=61' ] },
];
// ==== AKHIR DATA LAYANAN ====


// ====================================
// FUNGSI UTAMA UNTUK ADMIN DASHBOARD
// ====================================

/**
 * Mendapatkan data reservasi dari localStorage.
 */
function getReservations() {
    try {
        const data = localStorage.getItem('yumi_reservations');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading localStorage", e);
        return [];
    }
}

/**
 * Menyimpan data reservasi ke localStorage.
 */
function saveReservations(reservations) {
    localStorage.setItem('yumi_reservations', JSON.stringify(reservations));
}

/**
 * Merender daftar reservasi di tabel Admin Dashboard.
 */
function renderReservations(reservations, filterDate = null) {
    const tableBody = document.getElementById('reservationsTableBody');
    const totalReservationsEl = document.getElementById('totalReservations');
    if (!tableBody || !totalReservationsEl) return;

    tableBody.innerHTML = '';
    
    // 1. Filter data jika ada tanggal yang dipilih
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

    // 2. Sorting berdasarkan tanggal dan waktu
    filteredReservations.sort((a, b) => {
        if (a.date !== b.date) {
            return new Date(a.date) - new Date(b.date);
        }
        return a.time.localeCompare(b.time); 
    });

    // 3. Render baris tabel
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
                <button class="btn btn-sm btn-outline-danger btn-xs cancel-res" data-id="${res.id}" ${res.status === 'Cancelled' ? 'disabled' : ''}>Batal</button>
            </td>
        `;
        
        // Tambahkan event listener untuk tombol Batal
        row.querySelector('.cancel-res')?.addEventListener('click', (e) => {
            if (confirm(`Yakin ingin membatalkan reservasi oleh ${res.customer} untuk ${res.serviceName} pada ${res.date} jam ${res.time}?`)) {
                cancelReservation(res.id);
            }
        });
    });
}

/**
 * Membatalkan reservasi berdasarkan ID dan menyimpan kembali data.
 */
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

// ====================================
// FUNGSI UTAMA UNTUK BOOKING SLOTS
// ====================================

/**
 * Menghitung slot waktu yang tersedia berdasarkan aturan kategori.
 */
function getAvailableTimeSlots(dateString, serviceId) {
    const reservations = getReservations();
    const service = servicesData.find(s => s.id === serviceId);
    const categoryKey = service?.category.toUpperCase() || 'DEFAULT';
    const rule = CATEGORY_RULES[categoryKey];
    const { durationHours, capacity } = rule;
    
    // Jam operasional: 09:00 sampai 21:00
    const OPEN_HOUR = 9;
    const CLOSE_HOUR = 21; 

    const timeSlots = [];
    for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour += durationHours) {
        const time = `${hour < 10 ? '0' : ''}${hour}:00`;
        const endHour = hour + durationHours;
        if (endHour > CLOSE_HOUR) break; 

        // Hitung jumlah reservasi yang sudah ada untuk slot ini
        const count = reservations.filter(res => 
            res.serviceId === serviceId &&
            res.date === dateString &&
            res.time === time &&
            res.status === 'Booked' // Hanya hitung yang berstatus 'Booked'
        ).length;

        timeSlots.push({ time, isAvailable: count < capacity });
    }
    return timeSlots;
}

// ====================================
// FUNGSI UTAMA UNTUK AUTH (LOGIN/LOGOUT)
// ====================================

// --- Variabel Global Auth (diambil dari localStorage) ---
let isAdminLoggedIn = false;
let currentCustomerName = null; 

/**
 * Mengambil status login dari localStorage saat halaman dimuat.
 */
function initAuthStatus() {
    const status = localStorage.getItem('auth_status');
    if (status) {
        const authData = JSON.parse(status);
        if (authData.isLoggedIn) {
            if (authData.isAdmin) {
                performAdminLoginRender();
            } else {
                currentCustomerName = authData.name;
                performCustomerLoginRender();
            }
        }
    }
}

/**
 * Menyimpan status login ke localStorage.
 */
function saveAuthStatus(isLoggedIn, isAdmin, name = null) {
    localStorage.setItem('auth_status', JSON.stringify({ isLoggedIn, isAdmin, name }));
}

/**
 * Merender tampilan Navbar setelah Admin login.
 */
function performAdminLoginRender() {
    isAdminLoggedIn = true;
    const loginBtn = document.getElementById("loginBtn");
    const authSection = document.querySelector('.auth-section');

    document.getElementById('loggedInUserInfo')?.remove();

    const userInfo = document.createElement('div');
    userInfo.id = 'loggedInUserInfo';
    userInfo.className = 'logged-in-user dropdown';
    userInfo.innerHTML = `
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            Admin 🔑
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
            <li><a class="dropdown-item" href="#" id="adminDashboardLink">Dashboard</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" id="logoutLink">Logout</a></li>
        </ul>
    `;
    authSection.appendChild(userInfo); 
    loginBtn.classList.add('d-none'); 

    // Pasang Listener Logout & Dashboard
    document.getElementById('logoutLink').addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });
    document.getElementById('adminDashboardLink').addEventListener('click', (e) => { e.preventDefault(); showAdminDashboard(); });
}

/**
 * Merender tampilan Navbar setelah Pelanggan login.
 */
function performCustomerLoginRender() {
    isAdminLoggedIn = false;
    const loginBtn = document.getElementById("loginBtn");
    const authSection = document.querySelector('.auth-section');

    document.getElementById('loggedInUserInfo')?.remove();
    
    const userInfo = document.createElement('div');
    userInfo.id = 'loggedInUserInfo';
    userInfo.className = 'logged-in-user dropdown';
    userInfo.innerHTML = `
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            Hai, ${currentCustomerName} 👋
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
            <li><a class="dropdown-item text-danger" href="#" id="logoutLink">Logout</a></li>
        </ul>
    `;
    authSection.appendChild(userInfo);
    loginBtn.classList.add('d-none');
    
    // Pasang Listener Logout
    document.getElementById('logoutLink').addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });
}

/**
 * Menangani proses logout.
 */
function handleLogout() {
    saveAuthStatus(false, false, null);
    
    isAdminLoggedIn = false;
    currentCustomerName = null;
    
    document.getElementById('loggedInUserInfo')?.remove();

    const loginBtn = document.getElementById("loginBtn");
    loginBtn.classList.remove('d-none');
    loginBtn.textContent = 'Login';
    
    showMainContent(); 
}

// ====================================
// FUNGSI NAVIGATION & DISPLAY
// ====================================

// --- Variabel Konten ---
let currentServiceForBooking = null;

function hideAllPages() { 
    const pages = ['mainContent', 'serviceDetailPage', 'hargaKontakPage', 'adminDashboardPage'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('d-none');
    });
} 

function showPage(pageElement, pageTitleSuffix = "Home", activeNavLinkId = 'homeNavLink') {
    hideAllPages();
    if (pageElement) {
        pageElement.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.title = `Yumi Salon - ${pageTitleSuffix}`; 
        
        // Atur status active pada Navbar
        document.querySelectorAll('.navbar-nav .nav-link, .dropdown-toggle').forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(activeNavLinkId);
        if (activeLink) {
            const parentDropdownToggle = activeLink.closest('.dropdown')?.querySelector('.dropdown-toggle');
            if (parentDropdownToggle && !activeLink.classList.contains('nav-link')) { parentDropdownToggle.classList.add('active'); }
            else if (activeLink.classList.contains('nav-link')) { activeLink.classList.add('active'); }
        } else if (activeNavLinkId !== 'none') { document.getElementById('homeNavLink')?.classList.add('active'); }
    } else { 
        console.error("Target page element not found!"); 
        showPage(document.getElementById('mainContent'), "Home", 'homeNavLink'); 
    }
}

function showMainContent() { 
    showPage(document.getElementById('mainContent'), "Home", 'homeNavLink'); 
    updateBookingButtonsVisibility(isAdminLoggedIn); 
} 

function showServiceDetailContent(serviceId) {
    const serviceData = servicesData.find(s => s.id === serviceId);
    currentServiceForBooking = serviceData; 
    let activeParentId = 'none';
    if (serviceData) { 
        const category = (serviceData.category || '').toUpperCase(); 
        if (category === 'RAMBUT') activeParentId = 'navbarDropdownRambut'; 
        else if (category === 'WAJAH') activeParentId = 'navbarDropdownWajah'; 
        else if (category === 'TUBUH') activeParentId = 'navbarDropdownTubuh';
    }
    showPage(document.getElementById('serviceDetailPage'), serviceData?.name || "Detail Layanan", activeParentId);
    displayServiceDetail(serviceData);
    updateBookingButtonsVisibility(isAdminLoggedIn);
}

function showKontakPage() { 
    showPage(document.getElementById('hargaKontakPage'), "Kontak & Booking", 'kontakBookingLink'); 
    updateBookingButtonsVisibility(isAdminLoggedIn);
    renderBookingAccordion();
}

function showAdminDashboard() {
    if (!isAdminLoggedIn) {
        alert("Akses ditolak. Anda bukan Admin.");
        showMainContent();
        return;
    }
    showPage(document.getElementById('adminDashboardPage'), "Admin Dashboard", 'none');
    renderReservations(getReservations());
    updateBookingButtonsVisibility(isAdminLoggedIn);
}

// Fungsi render slot waktu di modal
function renderTimeSlots(dateString, serviceId) {
    const timeSlotsContainer = document.getElementById('availableTimeSlots');
    const selectedTimeHiddenInput = document.getElementById('selectedTimeHidden');
    const timeSlotError = document.getElementById('timeSlotError');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    timeSlotsContainer.innerHTML = ''; 
    selectedTimeHiddenInput.value = ''; 
    timeSlotError.classList.add('d-none'); 

    const slots = getAvailableTimeSlots(dateString, serviceId);
    
    if (slots.length === 0) {
        timeSlotsContainer.innerHTML = '<p class="text-muted small">Layanan ini tidak tersedia di jam operasional yang tersisa.</p>';
        confirmBookingBtn.disabled = true;
        return;
    }

    slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('btn', 'btn-xs', 'fw-bold');
        btn.textContent = slot.time;
        
        if (!slot.isAvailable) {
            btn.classList.add('disabled-slot');
            btn.disabled = true;
            btn.title = "Slot Penuh";
        } else {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#availableTimeSlots .btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedTimeHiddenInput.value = slot.time;
                timeSlotError.classList.add('d-none');
            });
        }
        timeSlotsContainer.appendChild(btn);
    });

    confirmBookingBtn.disabled = false;
}

/**
 * Mengisi konten detail layanan (termasuk carousel).
 */
function displayServiceDetail(service) {
    const serviceDetailPage = document.getElementById('serviceDetailPage');
    const bannerElement = document.getElementById('serviceDetailBanner');
    const bannerTitle = document.getElementById('bannerTitleS');
    const bannerShortDesc = document.getElementById('bannerShortDescS'); 
    
    const breadcrumbCategoryEl = document.getElementById('breadcrumb-categoryS');
    const breadcrumbServiceNameEl = document.getElementById('breadcrumb-service-nameS');
    const titleElement = document.getElementById('service-titleS'); 
    const shortDescElement = document.getElementById('service-short-descS');
    const descriptionElement = document.getElementById('service-descriptionS');
    const carouselIndicators = document.getElementById('serviceCarouselIndicators');
    const carouselInner = document.getElementById('serviceCarouselInner');
    const detailBookingBtn = serviceDetailPage.querySelector('.book-now-service');


    if (!service) { console.error(`Service data not found.`); return;}

    // 1. Update Title & Banner
    document.title = `${service.name} - Yumi Salon`; 
    
    if (bannerElement) {
        const bannerImgSrc = service.images && service.images.length > 0 ? service.images[0] : '';
        bannerElement.style.backgroundImage = bannerImgSrc ? `url('${bannerImgSrc}')` : 'none';
        bannerElement.style.backgroundColor = bannerImgSrc ? '' : '#e75480'; 
    }

    if (bannerTitle) bannerTitle.textContent = service.name;
    if (bannerShortDesc) bannerShortDesc.textContent = service.shortDescription || '';
    
    // 2. Update Breadcrumb & Detail Konten Utama
    breadcrumbCategoryEl.textContent = service.category || 'Layanan';
    breadcrumbServiceNameEl.textContent = service.name;
    titleElement.textContent = service.name;
    shortDescElement.textContent = service.shortDescription || '';
    descriptionElement.innerHTML = service.description || '<p><em>Detail belum tersedia.</em></p>';
    if (detailBookingBtn) detailBookingBtn.dataset.serviceid = service.id;

    // 3. Update Carousel
    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';
    
    if (service.images && Array.isArray(service.images) && service.images.length > 0) {
        const imagesToShow = service.images.slice(0, 5); 

        imagesToShow.forEach((imgUrl, index) => {
            const indicator = document.createElement('button'); indicator.type = 'button'; indicator.dataset.bsTarget = '#serviceImageCarousel'; 
            indicator.dataset.bsSlideTo = index.toString(); indicator.setAttribute('aria-label', `Slide ${index + 1}`); 
            if (index === 0) { indicator.classList.add('active'); indicator.setAttribute('aria-current', 'true'); } carouselIndicators.appendChild(indicator);
            const item = document.createElement('div'); item.className = `carousel-item${index === 0 ? ' active' : ''}`;
            if(typeof imgUrl === 'string' && imgUrl.trim() !== '') { 
                item.innerHTML = `<img src="${imgUrl}" class="d-block w-100 rounded" alt="${service.name} slide ${index + 1}">`; 
            }
            else { 
                item.innerHTML = `<div class="d-block w-100 bg-light rounded d-flex align-items-center justify-content-center" style="min-height: 350px;"><small class="text-muted">Gambar ${index + 1} Tdk Tersedia</small></div>`; 
            }
            carouselInner.appendChild(item);
        });

        // Re-inisialisasi Bootstrap Carousel
        const carouselElement = document.getElementById('serviceImageCarousel');
        if (carouselElement) { 
            const carouselInstance = bootstrap.Carousel.getInstance(carouselElement); 
            if (carouselInstance) { carouselInstance.dispose(); } 
            new bootstrap.Carousel(carouselElement); 
        }

        // Tampilkan navigasi carousel jika > 1 gambar
        const prevButton = serviceDetailPage.querySelector('.carousel-control-prev'); 
        const nextButton = serviceDetailPage.querySelector('.carousel-control-next'); 
        if(prevButton) prevButton.classList.toggle('d-none', service.images.length <= 1); 
        if(nextButton) nextButton.classList.toggle('d-none', service.images.length <= 1); 
        
    } else { 
        // Placeholder jika tidak ada gambar
        carouselInner.innerHTML = '<div class="carousel-item active"><div class="d-block w-100 bg-light rounded d-flex align-items-center justify-content-center" style="min-height: 350px;"><p class="text-muted"><em>Tidak ada gambar.</em></p></div></div>'; 
        carouselIndicators.innerHTML = ''; 
        const prevButton = serviceDetailPage.querySelector('.carousel-control-prev'); 
        const nextButton = serviceDetailPage.querySelector('.carousel-control-next'); 
        if(prevButton) prevButton.classList.add('d-none'); 
        if(nextButton) nextButton.classList.add('d-none'); 
    }
}

/**
 * Merender accordion booking di halaman Kontak & Booking.
 */
function renderBookingAccordion() {
    const accordionEl = document.getElementById('bookingAccordion');
    if (!accordionEl) return;
    accordionEl.innerHTML = ''; 

    const categories = {
        'RAMBUT': { icon: 'fas fa-cut', items: [] },
        'WAJAH': { icon: 'fas fa-mask', items: [] },
        'TUBUH': { icon: 'fas fa-spa', items: [] },
    };

    servicesData.forEach(service => {
        const categoryKey = service.category.toUpperCase();
        if (categories[categoryKey]) {
            categories[categoryKey].items.push(service);
        }
    });

    Object.entries(categories).forEach(([key, data]) => {
        if (data.items.length === 0) return;

        const categoryName = key.charAt(0) + key.slice(1).toLowerCase();
        const collapseId = `collapse${categoryName}`;

        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.innerHTML = `
            <h2 class="accordion-header" id="heading${categoryName}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                    <i class="${data.icon} text-pink me-2"></i> Layanan ${categoryName}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="heading${categoryName}" data-bs-parent="#bookingAccordion">
                <div class="accordion-body d-flex flex-wrap gap-2">
                    ${data.items.map(s => 
                        `<a href="#" class="btn btn-sm book-now-service" data-serviceid="${s.id}">${s.name}</a>`
                    ).join('')}
                </div>
            </div>
        `;
        accordionEl.appendChild(item);
    });
    
    updateBookingButtonsVisibility(isAdminLoggedIn); 
}

/**
 * Mengontrol visibilitas tombol booking jika admin login.
 */
function updateBookingButtonsVisibility(isAdmin) {
    const detailBookingBtn = document.querySelector('#serviceDetailPage .book-now-service');
    if (detailBookingBtn) {
        detailBookingBtn.classList.toggle('d-none', isAdmin);
    }
    
    const heroBookingBtn = document.querySelector('.hero-content .book-now-service');
    if (heroBookingBtn) {
        heroBookingBtn.classList.toggle('d-none', isAdmin);
    }

    const contactBookingLinks = document.querySelectorAll('#bookingAccordion .book-now-service');
    contactBookingLinks.forEach(btn => {
        btn.classList.toggle('d-none', isAdmin);
    });
}


// ====================================
// DOM CONTENT LOADED
// ====================================

document.addEventListener('DOMContentLoaded', function() {

    // --- Variabel Modal & Form ---
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const bookingModalService = document.getElementById('bookingModalService');
    const bookingFormService = document.getElementById('bookingFormService');
    const bookingDateInput = document.getElementById('bookingDateService');
    const customerNameInput = document.getElementById('customerNameService');
    const selectedTimeHiddenInput = document.getElementById('selectedTimeHidden');
    const timeSlotError = document.getElementById('timeSlotError');


    // 1. INIT AUTH STATUS
    initAuthStatus();


    // 2. EVENT LISTENER: MODAL LOGIN
    document.getElementById("loginBtn")?.addEventListener("click", (e) => { 
        e.preventDefault(); 
        loginModal?.classList.remove("d-none"); 
    }); 
    document.getElementById("closeModal")?.addEventListener("click", () => { loginModal?.classList.add("d-none"); }); 
    loginModal?.addEventListener("click", (e) => { if (e.target === loginModal) loginModal.classList.add("d-none"); }); 
    
    loginForm?.addEventListener("submit", (e) => { 
        e.preventDefault(); 
        const email = document.getElementById("email")?.value.trim(); 
        const password = document.getElementById("password")?.value.trim(); 
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            saveAuthStatus(true, true, "Admin"); 
            performAdminLoginRender();
            alert("Login Admin Berhasil! 🔑 Anda diarahkan ke Dashboard Reservasi.");
            loginModal.classList.add("d-none");
            showAdminDashboard();
            loginForm.reset(); 
            return; 
        }
        
        if (email && password) {
            // Logika sederhana untuk mendapatkan nama dari email (sebelum @)
            let rawName = email.split("@")[0];
            currentCustomerName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            saveAuthStatus(true, false, currentCustomerName); 
            performCustomerLoginRender();
            
            alert(`Login berhasil!\nSelamat datang, ${currentCustomerName} 💖`); 
            loginModal.classList.add("d-none"); 
            showMainContent();
            loginForm.reset(); 
        } else { 
            alert("Silakan isi Email dan Password terlebih dahulu!"); 
        } 
    }); 

    // 3. EVENT LISTENER: MODAL BOOKING
    document.body.addEventListener('click', function(e) { 
        const clickedElement = e.target.closest('.book-now-service');
        if (clickedElement) { 
            e.preventDefault(); 
            if (isAdminLoggedIn) { 
                alert("Anda login sebagai Admin. Admin tidak dapat membuat reservasi di sistem ini.");
                return;
            }
            
            let targetServiceId = clickedElement.dataset.serviceid;
            currentServiceForBooking = servicesData.find(s => s.id === targetServiceId);
            
            if (currentServiceForBooking) { 
                document.getElementById('bookingServiceName').textContent = currentServiceForBooking.name;
                
                // Atur tanggal minimum hari ini
                bookingDateInput.min = new Date().toISOString().split('T')[0];
                
                bookingModalService.classList.remove('d-none'); 
                
                if (currentCustomerName) {
                    customerNameInput.value = currentCustomerName;
                    customerNameInput.disabled = true;
                } else {
                    customerNameInput.value = '';
                    customerNameInput.disabled = false;
                }
                
                // Default tanggal ke hari ini saat modal dibuka
                bookingDateInput.value = new Date().toISOString().split('T')[0];
                renderTimeSlots(bookingDateInput.value, currentServiceForBooking.id);

            } else { 
                alert("Gagal memuat detail layanan untuk booking."); 
            } 
        } 
    }); 
    
    // Listener perubahan tanggal untuk update slot jam
    bookingDateInput?.addEventListener('change', () => {
        if (currentServiceForBooking) {
            renderTimeSlots(bookingDateInput.value, currentServiceForBooking.id);
        }
    });

    document.getElementById('closeBookingModalService')?.addEventListener('click', () => { bookingModalService?.classList.add('d-none'); bookingFormService?.reset(); }); 
    bookingModalService?.addEventListener('click', (e) => { 
        if (e.target === bookingModalService) { 
            bookingModalService.classList.add('d-none'); bookingFormService?.reset(); 
        } 
    }); 
    
    bookingFormService?.addEventListener('submit', (e) => { 
        e.preventDefault(); 
        const selectedDate = bookingDateInput.value; 
        const selectedTime = selectedTimeHiddenInput.value; 
        const customerName = customerNameInput.value.trim();
        
        if (!selectedTime) { 
            timeSlotError.classList.remove('d-none');
            alert("Mohon pilih salah satu slot jam yang tersedia.");
            return;
        }

        if (currentServiceForBooking && selectedDate && customerName) { 
            
            const existingReservations = getReservations();
            const categoryKey = currentServiceForBooking.category.toUpperCase();
            const capacity = CATEGORY_RULES[categoryKey]?.capacity || SERVICE_CAPACITY;
            
            // Pengecekan Ketersediaan slot ganda 
            const currentSlotCount = existingReservations.filter(res => 
                res.serviceId === currentServiceForBooking.id &&
                res.date === selectedDate &&
                res.time === selectedTime &&
                res.status === 'Booked'
            ).length;

            if (currentSlotCount >= capacity) {
                alert(`Maaf, slot yang Anda pilih (${selectedTime}) baru saja terisi. Silakan refresh slot atau pilih waktu lain. 🚫`);
                renderTimeSlots(bookingDateInput.value, currentServiceForBooking.id); // Perbarui slot
                return; 
            }
            
            // Simpan Reservasi Baru
            const newReservation = {
                // Gunakan id unik yang lebih baik
                id: Date.now(), 
                serviceId: currentServiceForBooking.id,
                serviceName: currentServiceForBooking.name,
                date: selectedDate,
                time: selectedTime,
                customer: customerName,
                status: 'Booked'
            };

            existingReservations.push(newReservation);
            saveReservations(existingReservations);

            alert(`Reservasi untuk ${currentServiceForBooking.name} oleh ${customerName} berhasil!\nTanggal: ${selectedDate}\nJam: ${selectedTime}`); 
            
            bookingModalService.classList.add('d-none'); 
            bookingFormService.reset(); 
            // Pastikan input nama kembali ke status awal jika sebelumnya adalah Admin
            customerNameInput.disabled = false;
        } else { 
            alert("Harap isi semua kolom dan pilih jam yang tersedia."); 
        } 
    }); 

    // 4. EVENT LISTENER: NAVIGASI & ADMIN FILTER
    
    // Link Layanan Dropdown & Showcase
    document.querySelectorAll('.service-link').forEach(link => { link.addEventListener('click', function(e) { 
        e.preventDefault(); 
        const serviceId = this.dataset.serviceid; 
        if (serviceId) { 
            showServiceDetailContent(serviceId); 
            // Tutup navbar di HP setelah klik link
            const toggler = document.querySelector('.navbar-toggler'); 
            const navbarCollapse = document.getElementById('navbarNavDropdown');
            if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                toggler?.click();
            }
        } 
    }); 
});
    
    // Navigasi Utama
    document.getElementById('homeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); }); 
    document.getElementById('homeNavLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });
    document.getElementById('kontakBookingLink')?.addEventListener('click', (e) => { e.preventDefault(); showKontakPage(); }); 
    document.getElementById('footerHomeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });
    document.getElementById('footerKontakLink')?.addEventListener('click', (e) => { e.preventDefault(); showKontakPage(); });
    document.querySelectorAll('.back-to-home').forEach(button => { button.addEventListener('click', showMainContent); });

    // Admin Filter
    const adminDateFilter = document.getElementById('adminDateFilter');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    if (adminDateFilter) { 
        adminDateFilter.addEventListener('change', (e) => { 
            renderReservations(getReservations(), e.target.value); 
        }); 
    }
    if (resetFilterBtn) { 
        resetFilterBtn.addEventListener('click', () => { 
            if (adminDateFilter) adminDateFilter.value = ''; 
            renderReservations(getReservations()); 
        }); 
    }
    document.getElementById('adminHomeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });


    // 5. INISIALISASI AKHIR
    showMainContent();

}); // Akhir DOMContentLoaded