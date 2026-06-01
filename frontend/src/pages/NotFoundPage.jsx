import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Página no encontrada</h1>
      <p className="muted">La ruta solicitada no existe.</p>
      <Link className="button" to="/dashboard">Ir al inicio</Link>
    </section>
  );
}

export default NotFoundPage;
