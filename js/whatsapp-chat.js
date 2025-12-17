// js/whatsapp-chat.js

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-chat-button');
    const whatsappPopup = document.querySelector('.whatsapp-chat-popup');
    const closePopupButton = document.querySelector('.close-popup');
    const sendButton = document.querySelector('.whatsapp-chat-footer .send-button');
    const messageInput = document.querySelector('.whatsapp-chat-footer .message-input');

    const defaultNumber = '224625315887';
    const phoneNumber = (whatsappButton && whatsappButton.dataset.phone ? whatsappButton.dataset.phone.replace(/[^\d]/g, '') : defaultNumber);
    const path = location.pathname.toLowerCase();
    let context = 'nos services';
    if (path.includes('trainings') || path.includes('formations')) context = 'nos formations';
    else if (path.includes('services')) context = 'nos services';
    else if (path.includes('shop')) context = 'la boutique';
    else if (path.includes('voyage')) context = 'l’assistance voyage';
    else if (path.includes('contact')) context = 'le contact';

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

    addQuickReplies();

    function sendMessage() {
        const typed = messageInput.value.trim();
        const message = typed || `Bonjour, je souhaite des informations sur ${context}.`;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent);
        let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        if (!isMobile) {
            whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        }
        window.open(whatsappUrl, '_blank');
        messageInput.value = '';
        whatsappPopup.classList.remove('active');
    }

    function addQuickReplies() {
        const footer = document.querySelector('.whatsapp-chat-footer');
        if (!footer) return;
        const container = document.createElement('div');
        container.className = 'quick-replies';
        const replies = [
            { label: 'Formations', text: 'Bonjour, je veux des infos sur vos formations.' },
            { label: 'Services', text: 'Bonjour, je veux des infos sur vos services.' },
            { label: 'Boutique', text: 'Bonjour, quels produits avez-vous en stock ?' },
            { label: 'Voyage', text: 'Bonjour, je veux des infos pour les visas et billets.' }
        ];
        replies.forEach(r => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = r.label;
            btn.addEventListener('click', function() {
                messageInput.value = r.text;
                sendMessage();
            });
            container.appendChild(btn);
        });
        footer.prepend(container);
    }
});
