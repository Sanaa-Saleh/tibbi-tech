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

    // إعادة ضبط الحالة
    idError.style.display = 'none';
    mobileError.style.display = 'none';
    idInput.classList.remove('input-error');
    mobileInput.classList.remove('input-error');

    let isValid = true;

    // فحص رقم الهوية
    if (!idInput.value || idInput.value.length !== 10) {
        idError.textContent = "ID number must be 10 digits";
        idError.style.display = 'block';
        idInput.classList.add('input-error');
        isValid = false;
    }

    // فحص رقم الجوال
    if (!mobileInput.value || mobileInput.value.length !== 10) {
        mobileError.textContent = "Mobile number must be 10 digits";
        mobileError.style.display = 'block';
        mobileInput.classList.add('input-error');
        isValid = false;
    }

    if (isValid) {
        // حفظ الاسم في الذاكرة
        localStorage.setItem('patientName', nameInput.value || "Patient");
        
        if (role === 'patient') {
            window.location.href = "patient-dashboard.html";
        } else {
            window.location.href = "doctor-dashboard.html";
        }
    }
}

// --- 2. وظائف الربط وتفعيل الأزرار عند تحميل الصفحة ---

document.addEventListener('DOMContentLoaded', function() {
    
    // أ. عرض اسم المريض في الـ Dashboard
    const welcomeText = document.getElementById('welcomeName');
    const savedName = localStorage.getItem('patientName');
    if (welcomeText && savedName) {
        welcomeText.textContent = `Hello ${savedName},`;
    }

    // ب. دالة مساعدة لربط الأزرار بالصفحات
    function bindButton(btnId, targetPage) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.onclick = function() {
                window.location.href = targetPage;
            };
        }
    }

    // ج. تفعيل جميع أزرار قائمة المريض
    bindButton('medicine-btn', 'medicine.html');         // الأدوية
    bindButton('appointments-btn', 'appointments.html'); // المواعيد
    bindButton('exams-btn', 'exams.html');               // الفحوصات الطبية
    bindButton('doctors-btn', 'doctors.html');           // الأطباء
    bindButton('chat-btn', 'chat.html');                 // المحادثة
    bindButton('account-btn', 'account.html');           // حسابي

    // د. تفعيل أيقونات Lucide (إذا كانت موجودة)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
