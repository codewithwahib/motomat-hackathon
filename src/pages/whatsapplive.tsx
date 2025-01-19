// WhatsappLiveChat.tsx
import React from 'react';

const WhatsAppLiveChat: React.FC = () => {
  const handleClick = () => {
    const phoneNumber = '1234567890'; // Replace with your WhatsApp number
    const message = 'Hello! How can I help you today?';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <img src="/whatsapp-icon.svg" alt="WhatsApp" className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppLiveChat;
