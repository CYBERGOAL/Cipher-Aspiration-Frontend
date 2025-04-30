// Dynamic Greeting
document.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.querySelector(".main-content .content h1");
    const currentHour = new Date().getHours();
    let greetingMessage = "Welcome to Cipher Aspiration";

    if (currentHour < 12) {
        greetingMessage = "Good Morning! Welcome to Cipher Aspiration";
    } else if (currentHour < 18) {
        greetingMessage = "Good Afternoon! Welcome to Cipher Aspiration";
    } else {
        greetingMessage = "Good Evening! Welcome to Cipher Aspiration";
    }

    greetingElement.textContent = greetingMessage;
});

// Scroll-to-Top Button
const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "↑";
scrollToTopButton.classList.add("scroll-to-top");
document.body.appendChild(scrollToTopButton);

scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.padding = "10px";
scrollToTopButton.style.border = "none";
scrollToTopButton.style.borderRadius = "5px";
scrollToTopButton.style.backgroundColor = "#007BFF";
scrollToTopButton.style.color = "#fff";
scrollToTopButton.style.cursor = "pointer";
scrollToTopButton.style.display = "none";

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
