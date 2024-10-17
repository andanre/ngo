import React from 'react';
import { assets } from '../assets';
import './UnderMaintanance.css'; // Make sure to create and import a CSS file for styling

const Maintainance001: React.FC = () => {
    return (
        <div className="maintenance">
            <img src={assets.maintanance} alt="Maintenance" className="maintenance" />
        </div>
    );
};

export default Maintainance001;
