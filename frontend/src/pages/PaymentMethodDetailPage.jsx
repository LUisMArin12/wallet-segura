import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

function formatPaymentType(type) {
  const labels = {
    tarjeta: 'Tarjeta',
    cuenta_bancaria: 'Cuenta bancaria',
    clabe: 'CLABE',
    otro: 'Otro',
  };

  return labels[type] || type;
}

function PaymentMethodDetailPage() {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [changingStatus, setChangingStatus] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  async function loadDetail() {
    try {
      const data = await apiRequest(`/payment-methods/${id}`);
      setPaymentMethod(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange() {
    if (!paymentMethod) return;

    const nextStatus = paymentMethod.status === 'active' ? 'inactive' : 'active';
    setConfirmationStatus(nextStatus);
  }

  async function confirmStatusChange() {
    if (!paymentMethod || !confirmationStatus) return;

    setChangingStatus(true);
    setError('');

    try {
      const updated = await apiRequest(`/payment-methods/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: confirmationStatus }),
      });
      setPaymentMethod(updated);
      setConfirmationStatus(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setChangingStatus(false);
    }
  }

  function cancelStatusChange() {
    setConfirmationStatus(null);
  }

  useEffect(() => {
    loadDetail();
  }, [id]);

  if (loading) return <p className="muted">Cargando detalle...</p>;

  const isActive = paymentMethod?.status === 'active';
  const isDeactivation = confirmationStatus === 'inactive';

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Detalle</p>
          <h1>{paymentMethod?.alias || 'Método de pago'}</h1>
          <p className="muted">Información segura y enmascarada.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Volver</Link>
      </div>

      {error && <div className="alert error">{error}</div>}

      {paymentMethod && (
        <div className="detail-layout">
          <article className="detail-hero-card">
            <div className="card-topline">
              <span className={`status-dot ${isActive ? 'active' : 'inactive'}`} aria-hidden="true" />
              <span>{isActive ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p className="card-eyebrow">{formatPaymentType(paymentMethod.type)}</p>
            <h2>{paymentMethod.masked_identifier}</h2>
            <p className="muted">{paymentMethod.institution}</p>

            <button
              className={`button ${isActive ? 'ghost' : 'primary'}`}
              type="button"
              onClick={handleStatusChange}
              disabled={changingStatus}
            >
              {changingStatus ? 'Actualizando...' : isActive ? 'Desactivar método' : 'Activar método'}
            </button>
          </article>

          <article className="detail-card">
            <dl className="detail-list">
              <div>
                <dt>Alias</dt>
                <dd>{paymentMethod.alias}</dd>
              </div>
              <div>
                <dt>Institución</dt>
                <dd>{paymentMethod.institution}</dd>
              </div>
              <div>
                <dt>Tipo</dt>
                <dd>{formatPaymentType(paymentMethod.type)}</dd>
              </div>
              <div>
                <dt>Moneda</dt>
                <dd>{paymentMethod.currency}</dd>
              </div>
              <div>
                <dt>Creado</dt>
                <dd>{new Date(paymentMethod.created_at).toLocaleString()}</dd>
              </div>
              {paymentMethod.updated_at && (
                <div>
                  <dt>Última actualización</dt>
                  <dd>{new Date(paymentMethod.updated_at).toLocaleString()}</dd>
                </div>
              )}
            </dl>
          </article>
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(confirmationStatus)}
        title={isDeactivation ? 'Desactivar método de pago' : 'Activar método de pago'}
        message={
          isDeactivation
            ? '¿Seguro que deseas desactivar este método de pago?'
            : '¿Deseas activar nuevamente este método de pago?'
        }
        confirmLabel={isDeactivation ? 'Desactivar' : 'Activar'}
        confirmClassName={isDeactivation ? 'danger' : 'primary'}
        loading={changingStatus}
        onCancel={cancelStatusChange}
        onConfirm={confirmStatusChange}
      />
    </section>
  );
}

export default PaymentMethodDetailPage;
