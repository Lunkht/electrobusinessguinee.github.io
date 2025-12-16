// js/whatsapp-chat.js

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-chat-button');
    const whatsappPopup = document.querySelector('.whatsapp-chat-popup');
    const closePopupButton = document.querySelector('.close-popup');
    const sendButton = document.querySelector('.whatsapp-chat-footer .send-button');
    const messageInput = document.querySelector('.whatsapp-chat-footer .message-input');

    const phoneNumber = '+224625315887'; // User's WhatsApp number

    // Toggle chat popup visibility
    whatsappButton.addEventListener('click', function() {
        whatsappPopup.classList.toggle('active');
    });

    closePopupButton.addEventListener('click', function() {
        whatsappPopup.classList.remove('active');
    });

    // Send message
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            messageInput.value = ''; // Clear input after sending
            whatsappPopup.classList.remove('active'); // Close popup after sending
        }
    }
});