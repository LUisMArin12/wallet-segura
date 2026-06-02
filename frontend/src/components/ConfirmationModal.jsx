import { useEffect } from 'react';

function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmClassName = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape' && !loading) {
        onCancel();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-describedby="confirmation-modal-description"
        aria-labelledby="confirmation-modal-title"
        aria-modal="true"
        className="confirmation-modal"
        role="dialog"
      >
        <div>
          <p className="section-label">Confirmacion</p>
          <h2 id="confirmation-modal-title">{title}</h2>
          <p className="muted" id="confirmation-modal-description">
            {message}
          </p>
        </div>

        <div className="modal-actions">
          <button className="button secondary" type="button" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button className={`button ${confirmClassName}`} type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Actualizando...' : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmationModal;
