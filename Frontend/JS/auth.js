let isAdminLoggedIn = false;
let currentCustomerName = null;

/** Mengambil status login dari localStorage saat halaman dimuat. */
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

/** Menyimpan status login ke localStorage.*/
function saveAuthStatus(isLoggedIn, isAdmin, name = null) {
    localStorage.setItem('auth_status', JSON.stringify({ isLoggedIn, isAdmin, name }));
}

/** Merender tampilan Navbar setelah Admin login. */
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

    // Pasang Listener Logout & Dashboard (diarahkan ke app.js)
    document.getElementById('logoutLink')?.addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });
    document.getElementById('adminDashboardLink')?.addEventListener('click', (e) => { e.preventDefault(); showAdminDashboard(); });
    updateBookingButtonsVisibility(true);
}

/** Merender tampilan Navbar setelah Pelanggan login. */
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
   
    // Pasang Listener Logout (diarahkan ke app.js)
    document.getElementById('logoutLink')?.addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });
    updateBookingButtonsVisibility(false);
}

/** Menangani proses logout. */
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

// --- LOGIKA LOGIN MODAL di DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");

    // 1. INIT AUTH STATUS (Dijalankan pertama kali)
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
            showMainContent(); // Kembali ke halaman utama
            loginForm.reset();
        } else {
            alert("Silakan isi Email dan Password terlebih dahulu!");
        }
    });
});