// Variabel Konten (Harus ada di global scope karena digunakan oleh app.js dan booking.js)
let currentServiceForBooking = null;

// --- FUNGSI RENDERING LAYANAN ---

/**
 * Mengisi konten detail layanan (termasuk carousel).
 * Bergantung pada: servicesData (dari data.js)
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
    const priceElement = document.getElementById('service-priceS');
    const detailPriceElement = document.getElementById('service-detail-priceS');
    const carouselIndicators = document.getElementById('serviceCarouselIndicators');
    const carouselInner = document.getElementById('serviceCarouselInner');
    const detailBookingBtn = serviceDetailPage.querySelector('.book-now-service');


    if (!service) { console.error(`Service data not found.`); return;}

    currentServiceForBooking = service; // Set service saat ini

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
    if (priceElement) {
        priceElement.textContent = service.price || 'Harga Tidak Tersedia';
    }
    if (detailPriceElement) {
        detailPriceElement.innerHTML = service.detailPrice || '';
    }
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
        if (carouselElement && typeof bootstrap !== 'undefined' && bootstrap.Carousel) { 
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
 * Bergantung pada: servicesData (dari data.js)
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
    
    // Visibilitas tombol booking diatur setelah semua dirender
    // Asumsi: isAdminLoggedIn sudah diinisialisasi oleh auth.js
    updateBookingButtonsVisibility(isAdminLoggedIn); 
}

/**
 * Mengontrol visibilitas tombol booking jika admin login.
 * Bergantung pada: isAdminLoggedIn (dari auth.js)
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