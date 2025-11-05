let currentCaptcha = '';
let isPasswordVisible = false;

function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

function drawCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate new captcha
    currentCaptcha = generateCaptcha();
    
    // Draw text
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#1e293b';
    ctx.textBaseline = 'middle';
    
    // Draw each character with slight rotation
    for (let i = 0; i < currentCaptcha.length; i++) {
        ctx.save();
        const x = 20 + (i * 35);
        const y = 25;
        const angle = (Math.random() - 0.5) * 0.3;
        
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(currentCaptcha[i], 0, 0);
        ctx.restore();
    }
    
    // Draw random lines
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    // Draw noise dots
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            1,
            0,
            2 * Math.PI
        );
        ctx.fill();
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    isPasswordVisible = !isPasswordVisible;
    
    if (isPasswordVisible) {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
}

function forgotPassword(event) {
    event.preventDefault();
    alert('Silakan hubungi administrator untuk reset password.');
}

function loginAsAssessor() {
    alert('Login sebagai Tim Penilai');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captcha').value.toUpperCase();
    
    if (captchaInput !== currentCaptcha) {
        alert('Captcha tidak sesuai! Silakan coba lagi.');
        return;
    }
    
    if (username && password) {
        alert('Login berhasil!\nUsername: ' + username);
        // Tambahkan redirect atau API call di sini
        // window.location.href = 'dashboard.html';
    }
});

// Generate captcha saat halaman dimuat
window.addEventListener('load', function() {
    drawCaptcha();
});