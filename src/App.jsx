import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import React from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {

  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;