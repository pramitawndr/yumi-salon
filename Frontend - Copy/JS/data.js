const SERVICE_CAPACITY = 2; 
const ADMIN_EMAIL = "yumi@admin.com";
const ADMIN_PASS = "akuadmin";

// Aturan Durasi dan Kapasitas per Kategori
const CATEGORY_RULES = {
    'RAMBUT': { 
        durationHours: 2, 
        capacity: SERVICE_CAPACITY 
    },
    'WAJAH': { 
        durationHours: 2, 
        capacity: SERVICE_CAPACITY 
    },
    'TUBUH': { 
        durationHours: 1, 
        capacity: SERVICE_CAPACITY 
    },
    'DEFAULT': { 
        durationHours: 1, 
        capacity: SERVICE_CAPACITY 
    } 
};

const servicesData = [
    // --- RAMBUT ---
    { 
        id: 'potong-rambut', 
        category: 'RAMBUT', 
        name: 'Potong Rambut', 
        shortDescription: 'Ciptakan gaya rambut terbaru, termasuk cuci dan penataan akhir.', 
        description: `<h3>Signature Cut & Style</h3><p>Layanan dimulai dengan konsultasi mendalam, pencucian, pemotongan presisi, dan diakhiri dengan penataan profesional.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 40.000 - 70.000',
        images: [ 
            '../img/potong-rambut.jpg.jpg',
            '../img/potong-rambut-2.jpg'
        ] 
    },
    { 
        id: 'cuci-blow', 
        category: 'RAMBUT', 
        name: 'Cuci & Blow Dry', 
        shortDescription: 'Rambut bersih, harum, dan ditata bervolume sempurna.', 
        description: `<p>Rasakan sensasi keramas yang memanjakan, diikuti dengan teknik blow dry untuk menghasilkan volume yang tahan lama.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 40.000 - 80.000',
        images: [ 
            '../img/cuci-rambut.jpg.jpg',
            '../img/blow-dry.jpg.jpg'
        ] 
    },
    { 
        id: 'creambath', 
        category: 'RAMBUT', 
        name: 'Creambath Treatment', 
        shortDescription: 'Perawatan tradisional dengan pijatan kepala, bahu, dan punggung.', 
        description: `<p>Perawatan Creambath klasik menggunakan krim alami yang menutrisi, diperkaya pijatan relaksasi.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 70.000 - 125.000',
        images: [ 
            '../img/creambath-treatment.jpg.jpg',
            '../img/creambath-treatment-2.jpg.jpg'
        ] 
    },

    // --- WAJAH ---
    { 
        id: 'eyelash', 
        category: 'WAJAH', 
        name: 'Eyelash Extension', 
        shortDescription: 'Bulu mata lentik, tebal, dan tahan lama.', 
        description: `<p>Pemasangan bulu mata individu oleh ahli profesional, disesuaikan dengan bentuk mata Anda.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 150.000 - 250.000',
        images: [ 
            '../img/eyelash.jpg',
            '../img/eyelash-2.jpg'

        ] 
    },

    // --- TUBUH ---
    { 
        id: 'mani-pedi', 
        category: 'TUBUH', 
        name: 'Manicure / Pedicure', 
        shortDescription: 'Perawatan lengkap kuku tangan dan kaki Anda.', 
        description: `<p>Layanan Manicure/Pedicure yang meliputi pembersihan, shaping, dan perawatan kutikula.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 100.000 - 250.000',
        images: [ 
            '../img/manicure.jpg.jpg',
            '../img/pedicure.jpg.jpg'
        ] 
    },
];
