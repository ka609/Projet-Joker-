// src/pages/AuthHomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthHomePage.css'; // Importer le CSS pour styliser la page si nécessaire

const AuthHomePage = () => {
  return (
    <div className="auth-home">
      <h1>Bienvenue</h1>
      <p>Vous devez vous connecter ou créer un compte pour accéder à l'application.</p>
      <div className="auth-buttons">
        <Link to="/login" className="auth-link">Se connecter</Link>
        <Link to="/signup" className="auth-link">Créer un compte</Link>
      </div>
    </div>
  );
};

export default AuthHomePage;
