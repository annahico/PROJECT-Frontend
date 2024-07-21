import React from 'react';
import HoursAddressCard from '../../common/HoursAddress/HoursAddress';
import './Home.css';
export const Home = () => {
     return (
         <div className="homeDesign">
            <div className='LeftHome'>
                <div className='HADivider'>
                    <HoursAddressCard title="HOURS" text="MON-FRI" subtext="9:00-:14:00" />
                </div>
                <div className='HADivider'>
                    <HoursAddressCard title="ADDRESS" text="LONDON" subtext="Leadenhall Market" />
                </div>
            </div>
            <div className='RightHome'>
                <img src=''></img>
            </div>
         </div>
     )
}