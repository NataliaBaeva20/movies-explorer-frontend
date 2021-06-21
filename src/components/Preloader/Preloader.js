import React from 'react'
import './Preloader.css'

const Preloader = ({isActive}) => {
    return (
        <div className={`preloader ${!isActive && 'preloader_inactive'}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
