// src/pages/SettingsPage.js
import React from 'react';

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <h1>Paramétres</h1>
            <p>Configurer vos préférences utilisateur ici.</p>
            <form>
                <label>
                    Changer l'adresse e-mail :
                    <input type="email" placeholder="Nouvelle adresse e-mail" />
                </label>
                <br />
                <label>
                    Modifier le mot de passe :
                    <input type="password" placeholder="Nouveau mot de passe" />
                </label>
                <br />
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default SettingsPage;
