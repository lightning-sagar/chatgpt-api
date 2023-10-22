require('dotenv').config();
const accessToken = process.env.REACT_APP_API_KEY;
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const chatContainer = document.getElementById('chat-container');
const loadingSpinner = document.getElementById('loading-spinner');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message) {
        // Display loading spinner
        loadingSpinner.style.display = 'inline-block';

        // Send the user's message to the ChatGPT API
        const response = await sendMessageToChatGPT(message);

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        // Check for the "clear" command
        if (message.toLowerCase() === "clear") {
            // Clear the chat container
            chatContainer.innerHTML = '';
        } else {
            // Display the user's message and ChatGPT's response in the chat container
            displayMessage('You', message, 'user');
            displayMessage('ChatGPT', response.choices[0].message.content, 'chatgpt');
            console.log(response.choices[0].message.content);
        }

        // Clear the input field
        messageInput.value = '';
    }
});

// Function to send a message to the ChatGPT API
// Function to send a message to the ChatGPT API
async function sendMessageToChatGPT(message) {
  // Continue with the ChatGPT API call as usual
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const accessToken = process.env.REACT_APP_API_KEY;

  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
              {
                  role: 'system',
                  content: 'You are a helpful assistant.'
              },
              {
                  role: 'user',
                  content: message
              }
          ]
      })
  });

  if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;
  } else {
      console.error('Error:', response.statusText);
      return null;
  }
}




function displayMessage(sender, text, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatContainer.appendChild(messageDiv);
} 
