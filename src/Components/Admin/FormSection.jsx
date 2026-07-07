function FormSection({ title, children }) {
  return (
    <div className="admin-form-section mb-4">
      <h5 className="mb-3">{title}</h5>

      <div className="row">
        {children}
      </div>
    </div>
  );
}

export default FormSection;