// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PaymentVerification from './pages/PaymentVerification';
import InvoiceList from './pages/InvoiceList';
import InvoicePage from './pages/InvoicePage';
import HelpPage from './pages/HelpPage';         // Import de la page d'aide
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import PasswordResetPage from './pages/PasswordResetPage';
import SignupPage from './pages/SignupPage';
import AuthHomePage from './pages/AuthHomePage'; // Importer la nouvelle page
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Assure-toi que le chemin est correct
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        {/* Redirige vers la page d'accueil après connexion */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth-home" />} />
        <Route path="/generate-invoice" element={user ? <InvoicePage /> : <Navigate to="/auth-home" />} />
        <Route path="/verify-payment" element={user ? <PaymentVerification /> : <Navigate to="/auth-home" />} />
        <Route path="/invoices" element={user ? <InvoiceList /> : <Navigate to="/auth-home" />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        
        {/* Routes pour l'authentification */}
        <Route path="/auth-home" element={<AuthHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
