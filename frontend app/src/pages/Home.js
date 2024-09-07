// src/screens/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importer le fichier CSS

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenue sur la page de paiement Bitcoin</h1>
            <nav>
                <ul>
                    <li><Link to="/generate-invoice">Générer une Facture</Link></li>
                    <li><Link to="/verify-payment">Vérifier un Paiement</Link></li>
                    <li><Link to="/invoices">Voir les Factures</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
