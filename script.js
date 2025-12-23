// --- 1. وظائف اختيار الدور والتحقق ---

function selectRole(role) {
    localStorage.setItem('userRole', role);
    window.location.href = "login.html";
}

function limitLength(element, max) {
    if(element.value.length > max) {
        element.value = element.value.slice(0, max);
    }
}

function login() {
    const role = localStorage.getItem('userRole');
    const nameInput = document.getElementById('userName');
    const idInput = document.getElementById('idNumber');
    const mobileInput = document.getElementById('mobileNumber');
    
    const idError = document.getElementById('idError');
    const mobileError = document.getElementById('mobileError');

    if(idError) idError.style.display = 'none';
    if(mobileError) mobileError.style.display = 'none';
    idInput.classList.remove('input-error');
    mobileInput.classList.remove('input-error');

    let isValid = true;

    if (!idInput.value || idInput.value.length !== 10) {
        if(idError) {
            idError.textContent = "ID number must be 10 digits";
            idError.style.display = 'block';
        }
        idInput.classList.add('input-error');
        isValid = false;
    }

    if (!mobileInput.value || mobileInput.value.length !== 10) {
        if(mobileError) {
            mobileError.textContent = "Mobile number must be 10 digits";
            mobileError.style.display = 'block';
        }
        mobileInput.classList.add('input-error');
        isValid = false;
    }

    if (isValid) {
        const enteredName = nameInput.value || "User";
        
        if (role === 'doctor') {
            localStorage.setItem('docName', enteredName);
            window.location.href = "doctor-dashboard.html";
        } else {
            localStorage.setItem('patientName', enteredName);
            window.location.href = "patient-dashboard.html";
        }
    }
}

// --- 2. وظائف الربط وتفعيل الأزرار ---

document.addEventListener('DOMContentLoaded', function() {
    
    // أ. عرض اسم المريض
    const welcomeText = document.getElementById('welcomeName');
    const savedName = localStorage.getItem('patientName');
    if (welcomeText && savedName) {
        welcomeText.textContent = `Hello ${savedName},`;
    }

    // ب. عرض اسم الدكتور
    const welcomeDocText = document.getElementById('welcomeDoctorName');
    const savedDocName = localStorage.getItem('docName');
    if (welcomeDocText && savedDocName) {
        welcomeDocText.textContent = `Hello Dr. ${savedDocName},`;
    }

    function bindButton(btnId, targetPage) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.onclick = function() {
                window.location.href = targetPage;
            };
        }
    }

    // --- [1] تفعيل أزرار المريض ---
    bindButton('medicine-btn', 'medicine.html');
    bindButton('exams-btn', 'exams.html');
    bindButton('doctors-btn', 'doctors.html');
    bindButton('chat-btn', 'chat.html');
    bindButton('account-btn', 'account.html');

    // --- [2] تفعيل أزرار الدكتور (الجديدة) ---
    bindButton('doctor-account-btn', 'doctor-account.html');
    bindButton('medicine-stock-btn', 'medicine-stock.html');
    bindButton('records-btn', 'patient-records.html');
    bindButton('staff-contact-btn', 'staff-contact.html');
    bindButton('evaluate-btn', 'evaluate-doctor.html');

    // --- [3] معالجة زر المواعيد المشترك ---
    // هذا الكود يتأكد إذا كنتِ دكتور يفتح صفحة الدكتور، وإذا مريض يفتح صفحة المريض
    const appBtn = document.getElementById('appointments-btn');
    if (appBtn) {
        appBtn.onclick = function() {
            const role = localStorage.getItem('userRole');
            if (role === 'doctor') {
                window.location.href = "appointments-doctor.html";
            } else {
                window.location.href = "appointments.html";
            }
        };
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
