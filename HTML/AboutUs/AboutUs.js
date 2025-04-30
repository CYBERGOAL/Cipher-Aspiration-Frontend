// Scroll-to-Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

// Show/Hide Scroll-to-Top Button on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to Top on Button Click
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add Hover Effect to Sections
const sections = document.querySelectorAll('.about-container h2, .about-container ul li');
sections.forEach(section => {
    section.addEventListener('mouseover', () => {
        section.style.color = '#007bff';
        section.style.transition = 'color 0.3s ease';
    });
    section.addEventListener('mouseout', () => {
        section.style.color = '';
    });
});

// Animate Sections on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeIn');
        }
    });
}, {
    threshold: 0.1
});

const animatedElements = document.querySelectorAll('.about-container h2, .about-container p, .about-container ul li');
animatedElements.forEach(element => observer.observe(element));