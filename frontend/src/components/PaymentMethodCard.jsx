import { Link } from 'react-router-dom';

function formatPaymentType(type) {
  const labels = {
    tarjeta: 'Tarjeta',
    cuenta_bancaria: 'Cuenta bancaria',
    clabe: 'CLABE',
    otro: 'Otro',
  };

  return labels[type] || type;
}

function PaymentMethodCard({ paymentMethod, onStatusChange, changingStatus }) {
  const isActive = paymentMethod.status === 'active';
  const nextStatus = isActive ? 'inactive' : 'active';

  return (
    <article className="payment-card">
      <div className="card-topline">
        <span className={`status-dot ${isActive ? 'active' : 'inactive'}`} aria-hidden="true" />
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      </div>

      <div className="payment-card-main">
        <p className="card-eyebrow">{formatPaymentType(paymentMethod.type)}</p>
        <h3>{paymentMethod.alias}</h3>
        <p className="muted">{paymentMethod.institution}</p>
      </div>

      <div className="payment-identifier">{paymentMethod.masked_identifier}</div>

      <dl className="meta-list">
        <div>
          <dt>Moneda</dt>
          <dd>{paymentMethod.currency}</dd>
        </div>
        <div>
          <dt>ID</dt>
          <dd>#{paymentMethod.id}</dd>
        </div>
      </dl>

      <div className="card-actions">
        <Link className="button secondary" to={`/payment-methods/${paymentMethod.id}`}>
          Detalle
        </Link>
        <button
          className={`button ${isActive ? 'ghost' : 'primary'}`}
          type="button"
          disabled={changingStatus}
          onClick={() => onStatusChange(paymentMethod.id, nextStatus)}
        >
          {changingStatus ? 'Actualizando...' : isActive ? 'Desactivar' : 'Activar'}
        </button>
      </div>
    </article>
  );
}

export default PaymentMethodCard;
