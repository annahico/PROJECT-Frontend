import React from 'react';
import './CustomInput.css';

export const CustomInput = ({ disabled, design, type, name, placeholder, value, functionProp, functionBlur }) => {

  const handleBlur = (e) => {
    if (typeof functionBlur === 'function') {
      functionBlur(e);
    }
  };

  return (
    <input
      disabled={disabled}
      className={design}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || undefined}
      onChange={(e) => functionProp(e)}
      onBlur={handleBlur}
    />
  );
};
