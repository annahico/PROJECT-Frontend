import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LinkButton.css';

export const LinkButton = ({ path, title }) => {
  const navigate = useNavigate();

  return (
    <div className="linkButtonDesign" onClick={() => navigate(path)}>
      {title}
    </div>
  );
};
