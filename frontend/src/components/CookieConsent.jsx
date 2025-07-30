import React, { useState, useEffect } from "react";

const COOKIE_KEY = "cookieConsent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem(COOKIE_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <span className="mb-2 md:mb-0">
        This website uses cookies to enhance the user experience. By continuing, you agree to our use of cookies.
      </span>
      <div className="flex gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => handleConsent(true)}
        >
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleConsent(false)}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent; 