// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaymentVerification from './pages/PaymentVerification';
import InvoiceList from './pages/InvoiceList';
import './App.css';
import InvoicePage from './pages/InvoicePage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate-invoice" element={<InvoicePage />} />
                <Route path="/verify-payment" element={<PaymentVerification />} />
                <Route path="/invoices" element={<InvoiceList />} />
            </Routes>
        </Router>
    );
}

export default App;
