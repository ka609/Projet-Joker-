// src/pages/HelpPage.js
import React from 'react';

const HelpPage = () => {
    return (
        <div className="help-page">
            <h1>Aide</h1>
            <p>Bienvenue sur la page d'aide. Ici, vous trouverez des informations sur l'utilisation de l'application.</p>
            <ul>
                <li>Comment générer une facture ?</li>
                <li>Comment vérifier un paiement ?</li>
                <li>Comment réinitialiser votre mot de passe ?</li>
            </ul>
        </div>
    );
};

export default HelpPage;
