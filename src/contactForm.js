document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      formMessage.textContent = 'All fields are required.';
      formMessage.style.color = '#dc3545';
      return;
    }

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.style.color = '#28a745';
        form.reset();
      } else {
        formMessage.textContent = 'Failed to send message. Please try again.';
        formMessage.style.color = '#dc3545';
      }
    } catch (error) {
      console.error('Error:', error);
      formMessage.textContent = 'An error occurred. Please try again.';
      formMessage.style.color = '#dc3545';
    }
  });
});