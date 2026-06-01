import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PaymentMethodsPage from './pages/PaymentMethodsPage.jsx';
import PaymentMethodCreatePage from './pages/PaymentMethodCreatePage.jsx';
import PaymentMethodDetailPage from './pages/PaymentMethodDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <>
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/payment-methods/new" element={<PaymentMethodCreatePage />} />
            <Route path="/payment-methods/:id" element={<PaymentMethodDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
