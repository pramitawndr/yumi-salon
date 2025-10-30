// Variabel Konten (diambil dari serviceHandler.js, tapi didefinisikan ulang agar jelas)
// let currentServiceForBooking; 
// (Asumsi: serviceHandler.js dimuat sebelum app.js)

function hideAllPages() { 
    const pages = ['mainContent', 'serviceDetailPage', 'hargaKontakPage', 'adminDashboardPage'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('d-none');
    });
} 

/** Menampilkan halaman berdasarkan ID dan memperbarui URL/Title */
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
}

// --- EVENT LISTENER & INISIALISASI ---
document.addEventListener('DOMContentLoaded', function() {

    // 1. EVENT LISTENER: MODAL BOOKING (Membuka Modal)
    document.body.addEventListener('click', function(e) { 
        const clickedElement = e.target.closest('.book-now-service');
        if (clickedElement) { 
            e.preventDefault(); 
            
            let targetServiceId = clickedElement.dataset.serviceid;
            // serviceHandler.js memastikan currentServiceForBooking di-set
            const serviceData = servicesData.find(s => s.id === targetServiceId); 
            
            if (serviceData) { 
                currentServiceForBooking = serviceData; // Update global variable
                
                const bookingModalService = document.getElementById('bookingModalService');
                const bookingDateInput = document.getElementById('bookingDateService');
                const customerNameInput = document.getElementById('customerNameService');

                document.getElementById('bookingServiceName').textContent = serviceData.name;
                
                // Atur tanggal minimum hari ini
                bookingDateInput.min = new Date().toISOString().split('T')[0];
                
                bookingModalService.classList.remove('d-none'); 
                
                // Ambil nama dari auth.js
                if (currentCustomerName) {
                    customerNameInput.value = currentCustomerName;
                    customerNameInput.disabled = true;
                } else {
                    customerNameInput.value = '';
                    customerNameInput.disabled = false;
                }
                
                // Default tanggal ke hari ini saat modal dibuka
                bookingDateInput.value = new Date().toISOString().split('T')[0];
                // renderTimeSlots adalah fungsi dari booking.js
                renderTimeSlots(bookingDateInput.value, currentServiceForBooking.id); 

            } else { 
                alert("Gagal memuat detail layanan untuk booking."); 
            } 
        } 
    }); 
    
    // EVENT LISTENER: NAVIGASI & LAYANAN
    
    // Link Layanan Dropdown & Showcase
    document.querySelectorAll('.service-link').forEach(link => { 
        link.addEventListener('click', function(e) { 
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
    
    document.querySelectorAll('.nav-link, .service-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        toggler?.click();
        }
    });
    });

    
    // Navigasi Utama
    document.getElementById('homeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); }); 
    document.getElementById('homeNavLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });
    document.getElementById('kontakBookingLink')?.addEventListener('click', (e) => { e.preventDefault(); showKontakPage(); });
    document.getElementById('heroBookingNavBtn')?.addEventListener('click', (e) => { e.preventDefault(); showKontakPage(); }); 
    document.getElementById('footerHomeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });
    document.getElementById('footerKontakLink')?.addEventListener('click', (e) => { e.preventDefault(); showKontakPage(); });
    document.querySelectorAll('.back-to-home').forEach(button => { button.addEventListener('click', showMainContent); });
    document.getElementById('adminHomeLink')?.addEventListener('click', (e) => { e.preventDefault(); showMainContent(); });

    
    // 3. INISIALISASI AKHIR
    showMainContent();
}); 