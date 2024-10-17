import React from 'react';
import './WidgetPengaduan.css';

const WidgetPengaduan: React.FC = () => {
    const handlePencemaranClick = () => {
        // Rute ke nomor telepon
        window.location.href = 'https://wa.me/+6281373842897'; // nomor telepon
    };

    const handlePersampahanClick = () => {
        // Rute ke halaman pengaduan
        window.location.href = '/pengaduan';
    };

    const handleKritikSaranClick = () => {
        // Rute ke halaman pengaduan
        window.location.href = '/pengaduan';
    };

    return (
        <div className="layanan-container">
            <h2>LAYANAN PENGADUAN</h2>
            <div className="layanan-items">
                <button className="layanan-item" onClick={handlePencemaranClick}>
                    <i className="fas fa-phone-alt"></i>
                    <h3>Pencemaran Lingkungan</h3>
                    <p>Layanan Pengaduan Dugaan Pencemaran Lingkungan</p>
                </button>
                <button className="layanan-item" onClick={handlePersampahanClick}>
                    <i className="fas fa-trash-alt"></i>
                    <h3>Persampahan</h3>
                    <p>Layanan Pengaduan Persampahan</p>
                </button>
                <button className="layanan-item" onClick={handleKritikSaranClick}>
                    <i className="fas fa-comments"></i>
                    <h3>Kritik dan Saran</h3>
                    <p>Layanan Kritik Dan Saran</p>
                </button>
            </div>
        </div>
    );
};

export default WidgetPengaduan;
