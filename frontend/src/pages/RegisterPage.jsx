import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <p className="section-label">Registro</p>
        <h1>Crear cuenta</h1>
        <p className="muted">Registra tu usuario para comenzar con la wallet.</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-card clean-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} minLength="2" required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={handleChange} minLength="8" required />
          </label>

          <button className="button primary full-width" type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-footer">¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </section>
  );
}

export default RegisterPage;
