import { useApp } from '../contexts/AppContext.jsx';
import { useState } from 'react';

export default function DynamicForm() {
  const { currentCategory, currentScheme, openCategory, addSubmission, switchView } = useApp();
  const [formData, setFormData] = useState({});

  if (!currentCategory || !currentScheme) {
    switchView('schemesView');
    return null;
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addSubmission(formData);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <button
        onClick={() => openCategory(currentCategory.id)}
        className="btn-secondary mb-6 pl-3"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{currentScheme.name}</h2>
        <p className="text-slate-500 mt-2">Fill the required details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Client Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label">Full Name</label>
              <input type="text" name="customerName" required className="input-field" placeholder="Enter full name" onChange={handleChange} />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input type="tel" name="customerPhone" required className="input-field" placeholder="Mobile number" onChange={handleChange} />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input type="email" name="customerEmail" required className="input-field" placeholder="Email address" onChange={handleChange} />
            </div>
            <div>
              <label className="label">Aadhaar / Nat. ID</label>
              <input type="text" name="customerAadhaar" required className="input-field" placeholder="Aadhaar number" onChange={handleChange} />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" name="customerDob" required className="input-field" onChange={handleChange} />
            </div>
            <div>
              <label className="label">Occupation</label>
              <input type="text" name="customerOcc" required className="input-field" placeholder="Current occupation" onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Full Address / Pincode</label>
              <textarea name="customerAddress" required className="input-field" rows="2" placeholder="Residential address" onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Annual Income (Optional)</label>
              <select name="customerIncome" className="input-field" onChange={handleChange}>
                <option value="">Select Income Bracket</option>
                <option value="< 2.5L">Below 2.5 Lakhs</option>
                <option value="2.5L - 5L">2.5 Lakhs to 5 Lakhs</option>
                <option value="> 5L">Above 5 Lakhs</option>
              </select>
            </div>
          </div>
        </div>

        {currentScheme.fields && currentScheme.fields.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Required Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentScheme.fields.map((f, i) => (
                <div key={i}>
                  <label className="label">{f.l}</label>
                  {f.t === 'select' ? (
                    <select name={f.n} required className="input-field" onChange={handleChange}>
                      <option value="">Select Option</option>
                      {f.o.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input type={f.t} name={f.n} className="input-field" required onChange={handleChange} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ padding: '16px' }}>
          Submit Application
        </button>
      </form>
    </div>
  );
}
