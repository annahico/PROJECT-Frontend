import React from 'react';
import { Link } from 'react-router-dom';
import './InfoCard.css';

// Example usage:
// <InfoCard logo={<YourLogoComponent />} title="Your Title" text="Your Text" url="/your-url" />

export default function InfoCard({ logo, title, text, url }) {
  return (
    <div className='InfoCardDesign'>
      <div className='InfoCardLogo'>
        {logo}
      </div>
      <div className='InfoCardTitle'>
        <p>{title}</p>
      </div>
      <div className='InfoCardText'>
        <p>{text}</p>
      </div>
      <div className='InfoCardUrl'>
        <Link to={url}>LEARN MORE</Link>
      </div>
    </div>
  );
}
