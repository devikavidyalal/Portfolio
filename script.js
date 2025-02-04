// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typewriter Effect for Header Text
const headerText = "Hi, I'm Devika T V";
const headerSubtext = "Student Engineer | Python | Flask | Django | Machine Learning | Content Writing";
let i = 0;
let j = 0;

function typeWriter() {
    // Clear existing text
    document.querySelector("header h1").innerHTML = "";
    document.querySelector("header p").innerHTML = "";

    // Type header text
    if (i < headerText.length) {
        document.querySelector("header h1").innerHTML += headerText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else if (j < headerSubtext.length) {
        document.querySelector("header p").innerHTML += headerSubtext.charAt(j);
        j++;
        setTimeout(typeWriter, 50);
    }
}

// Start the typewriter effect after the page loads
//window.onload = typeWriter;

// Function to open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside the modal
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});