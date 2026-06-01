import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <p className="section-label">Acceso</p>
        <h1>Iniciar sesión</h1>
        <p className="muted">Entra para administrar tus métodos de pago.</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-card clean-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>

          <button className="button primary full-width" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
      </div>
    </section>
  );
}

export default LoginPage;
