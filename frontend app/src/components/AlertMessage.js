// src/components/AlertMessage.js
import React, { useEffect, useState } from 'react';

const AlertMessage = ({ message, type = 'success', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer); // Nettoyage du timer
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;
