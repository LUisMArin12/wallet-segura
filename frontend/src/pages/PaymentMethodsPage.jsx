import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import PaymentMethodCard from '../components/PaymentMethodCard.jsx';

function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [changingId, setChangingId] = useState(null);

  async function loadPaymentMethods() {
    try {
      const data = await apiRequest('/payment-methods');
      setPaymentMethods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(paymentMethodId, status) {
    setChangingId(paymentMethodId);
    setError('');

    try {
      const updated = await apiRequest(`/payment-methods/${paymentMethodId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      setPaymentMethods((current) =>
        current.map((paymentMethod) =>
          paymentMethod.id === paymentMethodId ? updated : paymentMethod
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setChangingId(null);
    }
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const activeCount = paymentMethods.filter((method) => method.status === 'active').length;
  const inactiveCount = paymentMethods.length - activeCount;

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Wallet</p>
          <h1>Métodos de pago</h1>
          <p className="muted">Administra tus métodos sin exponer datos sensibles.</p>
        </div>
        <Link className="button primary" to="/payment-methods/new">Nuevo método</Link>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total</span>
          <strong>{paymentMethods.length}</strong>
        </div>
        <div className="summary-card">
          <span>Activos</span>
          <strong>{activeCount}</strong>
        </div>
        <div className="summary-card">
          <span>Inactivos</span>
          <strong>{inactiveCount}</strong>
        </div>
      </div>

      {loading && <p className="muted">Cargando métodos...</p>}
      {error && <div className="alert error">{error}</div>}

      {!loading && paymentMethods.length === 0 && (
        <div className="empty-state">
          <h2>No hay métodos registrados</h2>
          <p className="muted">Agrega tu primer método de pago para comenzar.</p>
          <Link className="button primary" to="/payment-methods/new">Agregar método</Link>
        </div>
      )}

      <div className="payment-grid">
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodCard
            key={paymentMethod.id}
            paymentMethod={paymentMethod}
            changingStatus={changingId === paymentMethod.id}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </section>
  );
}

export default PaymentMethodsPage;
