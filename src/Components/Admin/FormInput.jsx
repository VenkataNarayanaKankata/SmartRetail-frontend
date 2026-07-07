function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  options = [],
  rows = 4,
  placeholder = "",
}) {
  return (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-semibold">
        {label}
      </label>

      {/* TEXTAREA */}

      {type === "textarea" ? (
        <textarea
          className="form-control"
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === "select" ? (

        /* SELECT */

        <select
          className="form-select"
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">Select {label}</option>

          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

      ) : (

        /* INPUT */

        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />

      )}
    </div>
  );
}

export default FormInput;