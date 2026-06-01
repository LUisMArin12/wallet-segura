import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Perfil</p>
          <h1>Hola, {user?.name}</h1>
          <p className="muted">Administra tu wallet con datos enmascarados y sesión segura.</p>
        </div>
        <Link className="button primary" to="/payment-methods/new">Agregar método</Link>
      </div>

      <div className="profile-card">
        <div>
          <span>Nombre</span>
          <strong>{user?.name}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{user?.email}</strong>
        </div>
        <div>
          <span>ID usuario</span>
          <strong>#{user?.id}</strong>
        </div>
      </div>

      <div className="action-panel">
        <div>
          <h2>Wallet segura</h2>
          <p className="muted">Consulta, activa o desactiva tus métodos de pago desde un solo lugar.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Ver métodos</Link>
      </div>
    </section>
  );
}

export default DashboardPage;
