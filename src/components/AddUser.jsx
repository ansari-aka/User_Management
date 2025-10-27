import React, { useState } from "react";

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function AddUser({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim() || !validateEmail(form.email))
      err.email = "Valid email is required";
    if (!form.phone.trim()) err.phone = "Phone is required";
    if (!form.company.trim()) err.company = "Company is required";

    setErrors(err);
    if (Object.keys(err).length > 0) return;

    // call parent onAdd
    onAdd({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
    });
  }

  return (
    <div className="form-wrap">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </label>

        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </label>

        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} />
          {errors.company && (
            <div className="field-error">{errors.company}</div>
          )}
        </label>

        <div className="form-actions">
          <button className="btn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
