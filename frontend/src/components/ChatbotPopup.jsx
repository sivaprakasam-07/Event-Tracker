// src/components/ChatbotPopup.jsx
import React, { useState } from "react";

const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // IMPORTANT: Replace YOUR-BOT-ID with your actual Chatbase bot ID
    const botId = "I6i8CvE1HqXQcuZUeCDfv";

    // It's good practice to warn if the default ID is still in use.
    if (botId === "I6i8CvE1HqXQcuZUeCDfv") {
        console.warn(
            "ChatbotPopup: Please update 'YOUR-BOT-ID' in ChatbotPopup.jsx with your actual Chatbase bot ID."
        );
        // Optionally, you could prevent rendering or show a placeholder if the ID isn't set.
    }

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={toggleChatbot}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl z-50 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Toggle Chatbot"
            >
                {/* You can use an SVG icon here instead of text */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.006 3 11.5c0 2.581.858 4.953 2.285 6.713L3 21l2.754-1.239C7.094 20.042 9.447 20.25 12 20.25z"
                    />
                </svg>
            </button>

            {/* Modal Popup */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
                    onClick={toggleChatbot} // Close modal on backdrop click
                >
                    <div
                        className="bg-white rounded-lg shadow-2xl w-full max-w-md h-3/4 md:h-4/5 flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
                    >
                        <div className="flex justify-between items-center p-3 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Event Chatbot
                            </h3>
                            <button
                                onClick={toggleChatbot}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                                aria-label="Close Chatbot"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow p-0 overflow-hidden">
                            {/* Adjusted padding to 0 for iframe to take full space */}
                            <iframe
                                src={`https://www.chatbase.co/chatbot-iframe/${botId}`}
                                width="100%"
                                height="100%"
                                style={{ border: "none" }} // Tailwind class `border-none` can also be used
                                title="Event Chatbot"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotPopup;
