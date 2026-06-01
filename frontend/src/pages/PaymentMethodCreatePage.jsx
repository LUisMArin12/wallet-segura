import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import PaymentMethodForm from '../components/PaymentMethodForm.jsx';

function PaymentMethodCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(payload) {
    setError('');

    if (payload.identifier.trim().length < 4) {
      setError('El identificador debe tener mínimo 4 caracteres');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest('/payment-methods', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      navigate(`/payment-methods/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Nuevo método</p>
          <h1>Alta de método de pago</h1>
          <p className="muted">El identificador completo nunca se muestra ni se guarda en texto plano.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Volver</Link>
      </div>

      {error && <div className="alert error">{error}</div>}
      <PaymentMethodForm onSubmit={handleCreate} loading={loading} />
    </section>
  );
}

export default PaymentMethodCreatePage;
