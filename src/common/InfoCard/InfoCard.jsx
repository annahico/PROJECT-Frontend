import React from 'react'
import './InfoCard.css'
import { Link } from 'react-router-dom'

    <InfoCard logo="logo" title="title" text="text" url="url"/>

export default function InfoCard({logo, title, text, url}) {
    return (
        <div className='InfoCardDesign'>
            <div className='InfoCardLogo'>
                {logo}
            </div>
        <div className='InfoCardTitle'>
            <p>
                {title}
            </p>
        </div>
        <div className='InfoCardText'>
            <p>
                {text}
            </p>
        </div>
        <div className='InfoCardUrl'>
            <a href={url}>LEARN MORE</a>
        </div>
        </div>
    )
}