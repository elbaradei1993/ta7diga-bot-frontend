// Function to get the token from the URL
function getTokenFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
}

// Function to start the video chat
async function startVideoChat() {
    const token = getTokenFromUrl();
    if (!token) {
        alert('No token found. Please start the bot and use the provided link.');
        return;
    }

    try {
        const response = await fetch('https://your-railway-backend-url.com/api/videochat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        const data = await response.json();
        if (data.chat_link) {
            document.getElementById('response').innerHTML = `
                <p>You have been paired! Click <a href="${data.chat_link}" target="_blank">here</a> to start the video chat.</p>
            `;
        } else {
            document.getElementById('response').innerText = data.message || 'Waiting for another user...';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred. Please try again.';
    }
}

// Attach the startVideoChat function to the button
document.getElementById('startBtn').addEventListener('click', startVideoChat);
