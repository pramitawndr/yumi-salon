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

// Data Layanan (Harus tersedia secara global untuk semua file JS)
const servicesData = [
    // --- RAMBUT (2 JAM) ---
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
    { 
        id: 'anti-dandruff', 
        category: 'RAMBUT', 
        name: 'Anti Dandruff', 
        shortDescription: 'Perawatan kulit kepala khusus untuk mengatasi ketombe.', 
        description: `<p>Treatment khusus untuk membersihkan kulit kepala dari ketombe dan mengurangi rasa gatal.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 80.000 - 130.000',
        images: [ 
            '../img/anti-dandruff.jpg.jpg',
            '../img/anti-dandruff-2.jpg.jpg'
        ] 
    },
    { 
        id: 'hair-spa', 
        category: 'RAMBUT', 
        name: 'Hair Spa', 
        shortDescription: 'Perawatan rambut kering dan kusam, menjadikannya lembut dan berkilau.', 
        description: `<p>Memberikan nutrisi intensif untuk rambut yang rusak dan memerlukan kelembapan ekstra.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 200.000',
        images: [ 
            '../img/hair-spa.jpg.jpg',
            '../img/hair-spa-2.jpg.jpg' 
        ] 
    },
    { 
        id: 'hair-mask', 
        category: 'RAMBUT', 
        name: 'Hair Mask', 
        shortDescription: 'Perawatan untuk memperbaiki struktur rambut yang rusak akibat proses kimia.', 
        description: `<p>Masker rambut kaya protein untuk menguatkan helai rambut dari dalam.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 150.000',
        images: [ 
            '../img/hair-mask.jpg.jpg',
            '../img/hair-mask-2.jpg.jpg' 
        ] 
    },

    // --- WAJAH (2 JAM) ---
    { 
        id: 'facial-acne', 
        category: 'WAJAH', 
        name: 'Facial Acne', 
        shortDescription: 'Pembersihan mendalam khusus untuk kulit berjerawat dan sensitif.', 
        description: `<p>Perawatan wajah yang fokus pada pengangkatan komedo dan pencegahan jerawat baru, menggunakan produk anti-bakteri.</p>`,
        price: 'Harga',
        detailPrice: 'Rp. 250.000', 
        images: [ 
            '../img/facial-acne.jpg.jpg',
            '../img/facial-acne-2.jpg.jpg' 
        ] 
    },
    { 
        id: 'facial-whitening', 
        category: 'WAJAH', 
        name: 'Facial Whitening', 
        shortDescription: 'Mencerahkan warna kulit dan mengurangi flek hitam.', 
        description: `<p>Facial dengan serum pencerah yang efektif meratakan warna kulit dan memberikan kilau alami.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 300.000',
        images: [ 
            '../img/facial-whitening.jpg.jpg',
            '../img/facial-whitening-2.jpg.jpg'  
        ] 
    },
    { 
        id: 'facial-anti-aging', 
        category: 'WAJAH', 
        name: 'Facial Anti Aging', 
        shortDescription: 'Mengurangi kerutan dan mengencangkan kulit wajah.', 
        description: `<p>Treatment khusus untuk meminimalkan garis halus dan mengembalikan elastisitas kulit.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 500.000',
        images: [ 
            '../img/facial-anti-aging.jpg.jpg',
            '../img/facial-anti-aging-2.jpg.jpg' 
        ] 
    },
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

    // --- TUBUH (1 JAM) ---
    { 
        id: 'body-massage', 
        category: 'TUBUH', 
        name: 'Body Massage', 
        shortDescription: 'Pijatan relaksasi meredakan tegang dan memulihkan energi.', 
        description: `<p>Pijatan relaksatif selama 60/90 menit menggunakan minyak aromaterapi pilihan untuk melepaskan ketegangan.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 250.000',
        images: [ 
            '../img/body-massage.jpg.jpg'
        ] 
    },
    { 
        id: 'body-scrub', 
        category: 'TUBUH', 
        name: 'Body Scrub / Lulur', 
        shortDescription: 'Mengangkat sel kulit mati untuk kulit yang cerah dan halus.', 
        description: `<p>Proses eksfoliasi dengan lulur tradisional pilihan, diikuti dengan pembilasan dan pelembap.</p>`, 
        price: 'Harga',
        detailPrice: 'Rp. 300.000',
        images: [ 
            '../img/body-scrub.jpg.jpg' 
        ] 
    },
    { 
        id: 'waxing', 
        category: 'TUBUH', 
        name: 'Waxing', 
        shortDescription: 'Menghilangkan bulu halus hingga ke akar dengan minim rasa sakit.', 
        description: `<p>Layanan penghilangan bulu (waxing) cepat dan higienis untuk berbagai area tubuh.</p>`, 
        price: 'Harga',
        detailPrice: '<p>Rp. 200.000 - 400.000.</p>',
        images: [  
            '../img/waxing.jpg'
        ] 
    },
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
