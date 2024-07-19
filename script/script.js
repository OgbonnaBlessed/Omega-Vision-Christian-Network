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
    
})


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

// const typed = new Typed('.multiple-text', {
    //     strings: ['Welcome to Omega Vision Christian Network, the Adullam of destiny.', 'We are a family of Love.', 'The Love of the Father compels us.'],
//     typeSpeed: 30,
//     backSpeed: 50,
//     backDelay: 1000,
//     loop: false
// });