let sidebar_icon = document.querySelector('.sidebar-icon'),
nav = document.querySelector('nav');

sidebar_icon.addEventListener('click', () => {
    nav.classList.toggle('active');
    sidebar_icon.classList.toggle("active");
});

document.onclick = function(e){
    if (!sidebar_icon.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        sidebar_icon.classList.remove('active')
    }
};

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSubMenuLinks = document.querySelectorAll('.toggle-sub-menu');
    let currentOpenSubMenu = null;

    toggleSubMenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const subMenu = this.nextElementSibling;
            const icon = this.querySelector('i');

            if (subMenu === currentOpenSubMenu) {
                subMenu.style.display = 'none';
                icon.classList.remove('rotate');
                currentOpenSubMenu = null;
            } else {
                if (currentOpenSubMenu) {
                    currentOpenSubMenu.style.display = 'none';
                    const openIcon = currentOpenSubMenu.previousElementSibling.querySelector('i');
                    openIcon.classList.remove('rotate');
                }
                subMenu.style.display = 'block';
                icon.classList.add('rotate');
                currentOpenSubMenu = subMenu;
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-list')) {
            if (currentOpenSubMenu) {
                currentOpenSubMenu.style.display = 'none';
                const icon = currentOpenSubMenu.previousElementSibling.querySelector('i');
                icon.classList.remove('rotate');
                currentOpenSubMenu = null;
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('newsletterModal');
    var closeModalIcon = document.getElementById('closeModal');
    var emailInput = document.getElementById('emailInput');
    var subscribeButton = document.getElementById('submit');
    var messageDiv = document.getElementById('message');

    function showModal() {
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    // Show modal after 5 seconds
    setTimeout(showModal, 5000);

    // Close modal when cancel icon is clicked
    closeModalIcon.addEventListener('click', function() {
        closeModal();
    });

    // Subscribe button click event
    subscribeButton.addEventListener('click', function() {
        var emailAddress = emailInput.value.trim();
        if (validateEmail(emailAddress)) {
            // Valid email address
            messageDiv.innerHTML = '<p class="success-message">You will now start receiving our newsletters.</p>';
            // Clear input field
            emailInput.value = '';
            // Move email to Google Sheets
            addToGoogleSheet(emailAddress);
        } else {
            // Invalid email address
            messageDiv.innerHTML = '<p class="error-message">Please enter a valid email address.</p>';
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
});

const navShortcut = document.getElementById('navShortcut');
const navbar = document.getElementById('navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navShortcut.style.display = 'block';
    } else {
        navShortcut.style.display = 'none';
    }
});

function scrollToNavbar() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Optional: To hide the shortcut button when it gets close to the navbar
window.addEventListener('scroll', () => {
    if (window.scrollY < navbarHeight) {
        navShortcut.style.display = 'none';
    } else {
        navShortcut.style.display = 'block';
    }
});

ScrollReveal({ 
    reset: false,
    distance: '120px',
    duration: 2000,
    delay: 0
});

ScrollReveal().reveal('section p', { origin: 'bottom' });
ScrollReveal().reveal('section h1', { origin: 'top' });
ScrollReveal().reveal('.sub-title', { origin: 'left' });
ScrollReveal().reveal('.sermon-box', { origin: 'bottom' });

const form = document.forms['contact-form'];
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => response.json())
        .then(data => {
            alert("Thank you! Your form has been submitted successfully.");
            console.log(data); // Log the response data
            window.location.reload(); // Refresh the page after submission
        })
        .catch(error => console.error('Error!', error.message));
});