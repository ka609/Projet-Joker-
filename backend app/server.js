const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 10e4d40d3cd14427358986fe1ce91987ce509a84

// Firebase Admin SDK
const admin = require('firebase-admin');

// Charger la clé privée Firebase pour le compte de service
<<<<<<< HEAD
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

=======
const serviceAccount = require('./datafire-d4025-firebase-adminsdk-jru6x-b2278502bb.json');
>>>>>>> 10e4d40d3cd14427358986fe1ce91987ce509a84

// Initialiser Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com'  // Remplacez par votre URL Firebase
});

// Firestore instance
const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

// Sequelize et la base de données sont commentés car nous allons utiliser Firebase
// const sequelize = require('./database');
// const Invoice = require('./models/Invoice');

// sequelize.sync({ alter: true }).then(() => {
//     console.log("Base de données synchronisée");
// });

const macaroon = fs.readFileSync(path.join(__dirname, './admin.macaroon')).toString('hex');

const lndApi = axios.create({
    baseURL: 'https://my-first-node.m.voltageapp.io:8080/v1',
    headers: {
        'Grpc-Metadata-macaroon': macaroon,
        'Content-Type': 'application/json'
    }
});

async function generateQRCode(text) {
    try {
        return await qrcode.toDataURL(text);
    } catch (error) {
        console.error('Erreur lors de la génération du code QR:', error);
        throw error;
    }
}

app.post('/generate-invoice', async (req, res) => {
    const { amount, memo } = req.body;

    try {
        // Création de la facture avec l'API LND
        const response = await lndApi.post('/invoices', {
            value: amount.toString(),
            memo: "Facture générée",
            expiry: 3600
        });

        const paymentRequest = response.data.payment_request;
        const createdAt = response.data.creation_date;
        const updatedAt = response.data.settle_date || createdAt;

        // Générer le QR code
        const qrCode = await generateQRCode(paymentRequest);

        // Vérification si la `paymentRequest` est bien présente
        if (!paymentRequest) {
            throw new Error("Erreur: paymentRequest est null");
        }

        // Création de la facture dans Firebase (Firestore)
        const invoiceRef = db.collection('invoices').doc();
        await invoiceRef.set({
            amount: amount,
            paymentRequest: paymentRequest,
            createdAt: new Date(),
            paid: false  // Par défaut à `false`
        });
        console.log("Invoice created in Firestore");

        // Retour de la facture créée avec le QR code
        res.status(200).json({
            id: invoiceRef.id,
            amount: amount,
            paymentRequest: paymentRequest,
            date: new Date(),
            paid: false,
            qrCode
        });
    } catch (error) {
        // Gérer les erreurs et envoyer une réponse appropriée
        console.error('Erreur lors de la génération de la facture:', error);
        res.status(500).json({ message: 'Erreur lors de la génération de la facture' });
    }
});

app.post('/pay-invoice', async (req, res) => {
    const { paymentRequest } = req.body;

    try {
        const response = await lndApi.post('/payinvoice', { payment_request: paymentRequest });
        res.json(response.data);
    } catch (error) {
        console.error('Erreur lors du paiement de la facture:', error);
        res.status(500).json({ message: 'Erreur lors du paiement de la facture', error: error.message });
    }
});

app.post('/verify-payment', async (req, res) => {
    const { paymentHash } = req.body;

    try {
        const response = await lndApi.get(`/invoice/${paymentHash}`);

        const isPaid = response.data.settled;

        // Mettre à jour le statut de la facture dans Firestore
        const invoiceRef = db.collection('invoices').where('paymentRequest', '==', paymentHash);
        const invoiceSnapshot = await invoiceRef.get();

        if (!invoiceSnapshot.empty) {
            invoiceSnapshot.forEach(async (doc) => {
                await doc.ref.update({ paid: isPaid });
            });
        }

        res.json({ status: isPaid ? 'Paiement confirmé' : 'En attente' });
    } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
        res.status(500).send({ error: 'Erreur lors de la vérification du paiement' });
    }
});

app.get('/invoices', async (req, res) => {
    try {
        const invoicesSnapshot = await db.collection('invoices').get();
        const invoices = invoicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ invoices });
    } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error);
        res.status(500).send({ error: 'Erreur lors de la récupération des factures' });
    }
});

app.delete('/delete-invoice', async (req, res) => {
    const { paymentRequest } = req.body;

    try {
        const invoiceRef = db.collection('invoices').where('paymentRequest', '==', paymentRequest);
        const invoiceSnapshot = await invoiceRef.get();

        if (!invoiceSnapshot.empty) {
            invoiceSnapshot.forEach(async (doc) => {
                await doc.ref.delete();
            });
            res.status(200).json({ message: 'Facture supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Facture non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la facture:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la facture' });
    }
});

// Route pour la page d'aide
app.get('/aide', (req, res) => {
    res.render('aide');  // Assurez-vous d'avoir un fichier `aide.ejs` ou équivalent
});

// Route pour la page de paramétrage
app.get('/parametres', (req, res) => {
    res.render('parametres');  // Assurez-vous d'avoir un fichier `parametres.ejs` ou équivalent
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
