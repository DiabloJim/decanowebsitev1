// ===== HOME PAGE SCRIPT =====
const reviewBtn = document.getElementById('reviewBtn');
const reviewModal = document.getElementById('reviewModal');
const form = document.getElementById('hire-form');
const popup = document.getElementById('popup');
const loadingModal = document.getElementById('serviceLoadingModal');
const thankYouModal = document.getElementById('serviceThankYouModal');

document.getElementById('scrollToServices')?.addEventListener('click', () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.hire-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const serviceBox = this.closest('.service-box');
        const serviceName = serviceBox.querySelector('h3').textContent;

        document.getElementById('serviceInput').value = serviceName;
        document.getElementById('service-name').textContent = serviceName;

        popup.style.display = 'flex';
        form.style.display = 'block';
        reviewModal.style.display = 'none';
    });
});

document.getElementById('close-btn')?.addEventListener('click', () => {
    popup.style.display = 'none';
});

reviewBtn?.addEventListener('click', () => {
    const requiredFields = [
        { id: 'serviceInput', name: 'Service' },
        { id: 'emailInput', name: 'Email' },
        { id: 'contactInput', name: 'Contact Number' }
    ];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = document.getElementById(requiredFields[i].id);
        const value = field.value.trim();

        if (!value) {
            alert(`${requiredFields[i].name} is required.`);
            field.focus();
            return;
        }

        if (requiredFields[i].id === 'emailInput' && !value.includes('@')) {
            alert("Please enter a valid email address with '@'.");
            field.focus();
            return;
        }
    }

    const service = document.getElementById('serviceInput').value;
    const company = document.getElementById('companyInput').value || '—';
    const email = document.getElementById('emailInput').value;
    const contact = document.getElementById('contactInput').value;

    document.getElementById('reviewService').textContent = service;

    const serviceBox = Array.from(document.querySelectorAll('.service-box'))
        .find(box => box.querySelector('h3').textContent === service);
    const price = serviceBox.querySelector('.price').textContent;

    document.getElementById('reviewPrice').textContent = price;
    document.getElementById('reviewCompany').textContent = company;
    document.getElementById('reviewEmail').textContent = email;
    document.getElementById('reviewContact').textContent = contact;

    form.style.display = 'none';
    reviewModal.style.display = 'block';
});

document.getElementById('goBack')?.addEventListener('click', () => {
    reviewModal.style.display = 'none';
    form.style.display = 'block';
});

document.getElementById('confirmSubmit')?.addEventListener('click', () => {
    reviewModal.style.display = 'none';
    if (loadingModal) loadingModal.classList.add('open');

    const formData = new FormData();
    formData.append('service', document.getElementById('serviceInput').value);
    formData.append('company', document.getElementById('companyInput').value);
    formData.append('email', document.getElementById('emailInput').value);
    formData.append('contact', document.getElementById('contactInput').value);

    fetch('https://script.google.com/macros/s/AKfycbzFMD5vOfKfpmRJlxjUCerKLBLjb2czlF3P7vFcgbAgKQuI6txH8DVAQx0xvMDQHtAW/exec', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        if (response.result === "success") {
            const bar = document.getElementById('serviceLoadingBar');
            if (bar) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = '100%';
                }, 100);
            }

            setTimeout(() => {
                if (loadingModal) loadingModal.classList.remove('open');
                if (thankYouModal) thankYouModal.classList.add('open');
            }, 2100);
        } else {
            throw new Error("Google Script error: " + response.message);
        }
    })
    .catch(error => {
        console.error('Submission failed:', error);
        alert("There was a problem submitting the form.");
        if (loadingModal) loadingModal.classList.remove('open');
    });
});

document.getElementById('serviceClose')?.addEventListener('click', () => {
    if (thankYouModal) thankYouModal.classList.remove('open');
    popup.style.display = 'none';
    const bar = document.getElementById('serviceLoadingBar');
    if (bar) bar.style.width = '0%';
});

window.addEventListener("load", () => {
    const leftText = document.querySelector(".left-side-text");
    const orbitWrapper = document.querySelector(".system-orbit-wrapper");

    setTimeout(() => {
        leftText?.classList.add("show");
        setTimeout(() => {
            orbitWrapper?.classList.add("show");
        }, 600);
    }, 600);
});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function revealServices() {
    const header = document.querySelector('.services-header');
    const serviceCards = document.querySelectorAll('.service-box');

    if (isInViewport(header) && !header.classList.contains('show')) {
        header.classList.add('show');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, 200 * index);
        });
        window.removeEventListener('scroll', revealServices);
    }
}

window.addEventListener('scroll', revealServices);
document.getElementById('scrollToServices')?.addEventListener('click', () => {
    setTimeout(revealServices, 500);
});

// ===== ABOUT PAGE SCRIPT =====
let aboutAnimated = false;
function animateAboutSection() {
    if (aboutAnimated) return;

    const header = document.querySelector('.about-header');
    const boxes = document.querySelectorAll('.about-box, .why-hire-box');

    if (isInViewport(header)) {
        header.classList.add('animate');
        boxes.forEach(box => box.classList.add('animate'));
        aboutAnimated = true;
    }
}

let teamAnimated = false;
function animateTeamSection() {
    if (teamAnimated) return;

    const section = document.querySelector('.team-section');
    const boxes = document.querySelectorAll('.team-box');

    if (isInViewport(section)) {
        section.classList.add('visible');

        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('show');
            }, index * 1000);
        });

        teamAnimated = true;
    }
}

window.addEventListener('scroll', () => {
    animateAboutSection();
    animateTeamSection();
});

window.addEventListener('load', () => {
    animateAboutSection();
    animateTeamSection();
});

// ===== PROJECT PAGE SCRIPT =====
function animateProjects() {
    const header = document.querySelector('.projects-header');
    const description = document.querySelector('.project-description-box');
    const cards = document.querySelectorAll('.project-card');

    if (isInViewport(header)) {
        header.classList.add('show');
    }

    if (isInViewport(description)) {
        description.classList.add('show');
    }

    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('show');
        }
    });
}

window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);

// ===== JOIN US PAGE SCRIPT =====
const joinForm = document.getElementById("joinForm");
const joinReviewModal = document.getElementById("reviewModal");
const joinThankYouModal = document.getElementById("thankYouModal");
const reviewList = document.getElementById("reviewList");
const joinLoadingModal = document.getElementById("loadingModal");
const refillBtn = document.getElementById("refill");
const noRefillBtn = document.getElementById("noRefill");
const joinLoadingBar = document.getElementById("loadingBar");

document.getElementById("reviewButton")?.addEventListener("click", () => {
    const requiredFields = [
        { id: 'firstname', name: 'First Name' },
        { id: 'middlename', name: 'Middle Initial' },
        { id: 'lastname', name: 'Last Name' },
        { id: 'age', name: 'Age' },
        { id: 'address', name: 'Address' },
        { id: 'email', name: 'Email' },
        { id: 'education', name: 'Education' }
    ];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = joinForm[requiredFields[i].id];
        const value = field.value.trim();

        if (!value) {
            alert(`${requiredFields[i].name} is required.`);
            field.focus();
            return;
        }

        if (requiredFields[i].id === 'email' && !value.includes('@')) {
            alert("Please enter a valid email address with '@'.");
            field.focus();
            return;
        }
    }

    reviewList.innerHTML = `
        <li><strong>First Name:</strong> ${joinForm.firstname.value}</li>
        <li><strong>Middle Initial:</strong> ${joinForm.middlename.value}</li>
        <li><strong>Last Name:</strong> ${joinForm.lastname.value}</li>
        <li><strong>Age:</strong> ${joinForm.age.value}</li>
        <li><strong>Address:</strong> ${joinForm.address.value}</li>
        <li><strong>Email:</strong> ${joinForm.email.value}</li>
        <li><strong>Education:</strong> ${joinForm.education.value}</li>
    `;
    joinReviewModal.classList.add("open");
});

document.getElementById("closeReview")?.addEventListener("click", () => {
    joinReviewModal.classList.remove("open");
});

document.getElementById("finalSubmit")?.addEventListener("click", () => {
    joinReviewModal.classList.remove("open");
    joinLoadingModal.classList.add("open");

    joinLoadingBar.style.width = "0%";
    setTimeout(() => {
        joinLoadingBar.style.width = "100%";
    }, 100);

    const formData = new FormData();
    formData.append('firstname', joinForm.firstname.value);
    formData.append('middlename', joinForm.middlename.value);
    formData.append('lastname', joinForm.lastname.value);
    formData.append('age', joinForm.age.value);
    formData.append('address', joinForm.address.value);
    formData.append('email', joinForm.email.value);
    formData.append('education', joinForm.education.value);

    fetch('https://script.google.com/macros/s/AKfycbxvI1SEJ8VsCzZSRnAz5gxYQzyE_vMhPkgQZpbwNe6QciA9jSxkRWcnawirSahy4flm-w/exec', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        if (response.result === "success") {
            setTimeout(() => {
                joinLoadingModal.classList.remove("open");
                joinThankYouModal.classList.add("open");
            }, 2100);
        } else {
            throw new Error("Google Script error: " + response.message);
        }
    })
    .catch(error => {
        console.error('Submission failed:', error);
        alert("There was a problem submitting the form.");
        joinLoadingModal.classList.remove("open");
    });
});

refillBtn?.addEventListener("click", () => {
    joinForm.reset();
    joinThankYouModal.classList.remove("open");
});

noRefillBtn?.addEventListener("click", () => {
    window.location.href = "personalweb.html";
});

function animateJoinSection() {
    const leftText = document.querySelector('.left-side-text');
    const formBox = document.querySelector('.form-container');

    if (isInViewport(leftText) && !leftText.classList.contains('animate')) {
        leftText.classList.add('animate');
    }

    if (isInViewport(formBox) && !formBox.classList.contains('animate')) {
        formBox.classList.add('animate');
    }
}

window.addEventListener('scroll', animateJoinSection);
window.addEventListener('load', animateJoinSection);