// Variabel Modal & Form (diakses secara lokal di DOMContentLoaded)
let bookingModalService;
let bookingFormService;
let bookingDateInput;
let customerNameInput;
let selectedTimeHiddenInput;
let timeSlotError;

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


// --- FUNGSI UTAMA UNTUK BOOKING SLOTS ---

/**
 * Menghitung slot waktu yang tersedia berdasarkan aturan kategori.
 * Bergantung pada: servicesData, CATEGORY_RULES (dari data.js)
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

/**
 * Fungsi render slot waktu di modal
 */
function renderTimeSlots(dateString, serviceId) {
    const timeSlotsContainer = document.getElementById('availableTimeSlots');
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


// --- LOGIKA BOOKING MODAL di DOMContentLoaded ---

document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen modal booking
    bookingModalService = document.getElementById('bookingModalService');
    bookingFormService = document.getElementById('bookingFormService');
    bookingDateInput = document.getElementById('bookingDateService');
    customerNameInput = document.getElementById('customerNameService');
    selectedTimeHiddenInput = document.getElementById('selectedTimeHidden');
    timeSlotError = document.getElementById('timeSlotError');
    
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

    // 3. Proses SUBMIT Booking
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
            
            // Pengecekan Ketersediaan slot ganda (Race Condition Check)
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
            // Reset status input nama
            customerNameInput.disabled = false;
        } else { 
            alert("Harap isi semua kolom dan pilih jam yang tersedia."); 
        } 
    }); 
});