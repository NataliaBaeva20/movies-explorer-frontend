import React from 'react'
import './Preloader.css'

const Preloader = ({isActive, isAuth}) => {
    return (
        <div className={`preloader ${!isActive && 'preloader_inactive'} ${isAuth && 'preloader_small'}`}>
            <div className={`preloader__container ${isAuth && 'preloader__container_small'}`}>
                <span className={`preloader__round ${isAuth && 'preloader__round_small'}`}></span>
            </div>
        </div>
    )
};

export default Preloader
