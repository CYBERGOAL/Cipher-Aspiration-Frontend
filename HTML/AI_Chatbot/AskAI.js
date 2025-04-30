document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const voiceInputBtn = document.getElementById('voice-input-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const personalitySelect = document.getElementById('personality');

    // Initialize voice recognition
    let recognition;
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
    }

    // Ensure consistent dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Load dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // AI response templates based on personality
    const aiResponses = {
        friendly: [
            "I'm happy to help! Here's what I think about that...",
            "Great question! Let me share some thoughts...",
            "I'd love to assist with that. From my perspective...",
            "Thanks for asking! Here's what I can tell you...",
            "That's something I can definitely help with! I think..."
        ],
        professional: [
            "Based on medical research, the appropriate approach would be...",
            "Clinical evidence suggests that...",
            "From a professional standpoint, I recommend considering...",
            "According to best practices in healthcare, you should...",
            "The medical consensus on this matter indicates..."
        ],
        casual: [
            "Hey there! So here's the deal...",
            "So about that... I think...",
            "Let me break it down for you...",
            "Here's my take on it...",
            "Just thinking out loud here..."
        ]
    };

    // Current AI personality
    let currentPersonality = 'friendly';

    // Event Listeners
    voiceInputBtn.addEventListener('click', startVoiceInput);
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    clearChatBtn.addEventListener('click', clearChat);
    personalitySelect.addEventListener('change', setPersonality);

    // Load chat history from local storage
    loadChatHistory();

    // Functions
    function startVoiceInput() {
        if (!recognition) {
            showNotification("Speech recognition is not supported in your browser");
            return;
        }

        // Add visual indicator that voice input is active
        voiceInputBtn.classList.add('voice-active');

        recognition.onstart = () => {
            showNotification("Voice recognition started. Speak now...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            voiceInputBtn.classList.remove('voice-active');
        };

        recognition.onerror = (event) => {
            showNotification("Error: " + event.error);
            voiceInputBtn.classList.remove('voice-active');
        };

        recognition.onend = () => {
            voiceInputBtn.classList.remove('voice-active');
        };

        recognition.start();
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        addMessageToChat(message, 'user');
        userInput.value = '';

        // Simulate AI response with typing effect
        const loadingDots = addMessageToChat('...', 'ai', 'loading-dots');

        // Simulate AI thinking time (0.5 to 1.5 seconds)
        setTimeout(() => {
            // Remove loading dots
            loadingDots.remove();

            // Generate AI response
            const aiResponse = generateAIResponse(message);
            addMessageToChat(aiResponse, 'ai');

            // Save chat history
            saveChatHistory();
        }, Math.random() * 1000 + 500);
    }

    function addMessageToChat(text, sender, className = '') {
        const messageElement = document.createElement('p');
        messageElement.className = sender + (className ? ' ' + className : '');
        messageElement.textContent = text;

        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return messageElement;
    }

    function generateAIResponse(userMessage) {
        // Get random response based on personality
        const responses = aiResponses[currentPersonality];
        const randomIntro = responses[Math.floor(Math.random() * responses.length)];

        // Simple keyword-based responses
        let response = "";

        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            response = `${randomIntro} How can I assist you with your medical questions today?`;
        }
        else if (userMessage.toLowerCase().includes('help')) {
            response = `${randomIntro} I can provide information on medical conditions, treatments, medications, and general health advice. What specific area do you need help with?`;
        }
        else if (userMessage.toLowerCase().includes('thank')) {
            response = `You're welcome! Is there anything else you'd like assistance with?`;
        }
        else {
            // Generate a more detailed simulated response
            response = `${randomIntro} This is a simulated response to your question about "${userMessage.substring(0, 30)}${userMessage.length > 30 ? '...' : ''}". In a real implementation, this would connect to an actual AI service for intelligent responses.`;
        }

        return response;
    }

    function clearChat() {
        // Confirm before clearing
        if (chatMessages.children.length > 0) {
            if (confirm("Are you sure you want to clear the chat history?")) {
                chatMessages.innerHTML = '';
                localStorage.removeItem('chatHistory');
            }
        }
    }

    function setPersonality() {
        currentPersonality = personalitySelect.value;
        showNotification(`AI Personality set to: ${currentPersonality}`);
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = '#00796b';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.opacity = '0';

        notification.textContent = message;

        document.body.appendChild(notification);

        // Animation
        setTimeout(() => { notification.style.opacity = '1'; }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function saveChatHistory() {
        // Save only if there are messages
        if (chatMessages.children.length > 0) {
            const history = [];

            // Save each message with its sender type
            for (const messageElement of chatMessages.children) {
                history.push({
                    text: messageElement.textContent,
                    sender: messageElement.classList.contains('user') ? 'user' : 'ai'
                });
            }

            localStorage.setItem('chatHistory', JSON.stringify(history));
        }
    }

    function loadChatHistory() {
        const history = localStorage.getItem('chatHistory');

        if (history) {
            const messages = JSON.parse(history);

            // Add each message to the chat
            messages.forEach(message => {
                addMessageToChat(message.text, message.sender);
            });
        }
    }

    // Add a welcome message (only if it's a new chat)
    if (chatMessages.children.length === 0) {
        setTimeout(() => {
            addMessageToChat("Hello! I'm your medical AI assistant. How can I help you today?", 'ai');
        }, 1000);
    }

    // Handle tab navigation
    const currentPage = window.location.pathname;
    const tabLinks = document.querySelectorAll('.tab-link');

    tabLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.endsWith(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.backgroundColor = 'rgba(0, 150, 136, 0.1)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.backgroundColor = 'transparent';
            }
        });
    });

    // Footer functionality (if needed for dynamic updates or interactions)
    console.log("Footer loaded successfully.");
});

// Highlight the AI note on page load
window.addEventListener('load', () => {
    const aiNote = document.querySelector('.ai-note');
    if (aiNote) {
        aiNote.style.transition = 'background-color 0.5s ease';
        aiNote.style.backgroundColor = '#e0f7fa';
        setTimeout(() => {
            aiNote.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }, 2000);
    }
});