import "./CustomInput.css";

export const CustomInput = ({ design, type, name, placeholder, functionProp, functionBlur, msgError, disabled, value }) => {
    return (
        <div>
        <input
          disabled={disabled}
          className={design}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={functionProp}
          onBlur={functionBlur}
        />
        {msgError && <div className="error-message">{msgError}</div>}
      </div>
    );
}


