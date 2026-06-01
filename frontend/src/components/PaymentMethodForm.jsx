import { useState } from 'react';

const initialForm = {
  type: 'tarjeta',
  alias: '',
  institution: '',
  currency: 'MXN',
  identifier: '',
};

function PaymentMethodForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="form-card clean-form" onSubmit={handleSubmit}>
      <div className="form-grid two-columns">
        <label>
          Tipo de método
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="tarjeta">Tarjeta</option>
            <option value="cuenta_bancaria">Cuenta bancaria</option>
            <option value="clabe">CLABE</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Moneda
          <input
            name="currency"
            value={form.currency}
            onChange={handleChange}
            placeholder="MXN"
            minLength="3"
            maxLength="3"
            required
          />
        </label>
      </div>

      <label>
        Alias
        <input
          name="alias"
          value={form.alias}
          onChange={handleChange}
          placeholder="Ej. Tarjeta principal"
          minLength="2"
          required
        />
      </label>

      <label>
        Institución
        <input
          name="institution"
          value={form.institution}
          onChange={handleChange}
          placeholder="Ej. Banco Demo"
          minLength="2"
          required
        />
      </label>

      <label>
        Identificador
        <input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Número de tarjeta, cuenta o CLABE"
          minLength="4"
          required
        />
        <small>Se guardará enmascarado y con hash seguro para evitar duplicados.</small>
      </label>

      <button className="button primary full-width" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar método'}
      </button>
    </form>
  );
}

export default PaymentMethodForm;
