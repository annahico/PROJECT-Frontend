import React from 'react';
import './HoursAddress.css';

export default function HoursAddressCard({ title, text, subtext }) {
  return (
    <div className='HoursAddressCardDesign'>
      <div className='HoursAddressTitle'>
        {title}
      </div>
      <div className='HoursAddressText'>
        <p>
          {text}
        </p>
      </div>
      <div className='HoursAddressSubtext'>
        <p>
          {subtext}
        </p>
      </div>
    </div>
  );
}

// Example usage:
// <HoursAddressCard title="title" text="text" subtext="subtext" />
