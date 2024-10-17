import React, {  useState } from "react"
import "./PengaduanSubmit.css"

const LayananPengaduan: React.FC = () => {

    type mailType = {
        name: string,
        phone: string,
        subject: string,
        message: string
    }
    const [form_data, setFormData] = useState<mailType>({name: "", phone:"", subject: "", message: ""})


    return (
        <div className="contact-container">
            <form className="contact-form">
                 <h2>KONTAK KAMI</h2>
                <div className="form-group">
                    <input type="text" value={form_data.name} onChange={(e) => setFormData({...form_data, name: e.target.value})} placeholder="Nama Lengkap" className="form-control" />
                    {/* <input type="email" placeholder="Email" className="form-control" /> */}
                </div>
                <div className="form-group">
                    <input type="text" value={form_data.phone} onChange={(e) => setFormData({...form_data, phone: e.target.value})} placeholder="Telpon" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="text" value={form_data.subject} onChange={e => setFormData({...form_data, subject: e.target.value})} placeholder="Subject" className="form-control" />
                </div>
                <div className="form-group">
                    <textarea value={form_data.message} onChange={e => setFormData({...form_data, message: e.target.value}) } placeholder="Isi Pesan" className="form-control"></textarea>
                </div>
                {/* <div className="form-group verification">
                    <input type="text" placeholder="Kode Verifikasi" className="form-control" />
                </div> */}
                <a rel="nofollow" href={`mailto:dlh.tangg4mus@gmail.com?subject=${form_data.subject}&body=${`Halo Nama saya ${form_data.name}, Berikut pesan yang saya ingin sampaikan:\n${form_data.message}`}`} className="submit-btn">KIRIM PESAN</a>
            </form>
            <div className="contact-info">
                <h3>KANTOR</h3>
                <p><strong>Telpon:</strong> +6281373842897</p>
                <p><strong>Email:</strong> DLH.Tangg4mus@gmail.com</p>
                <p><strong>Alamat:</strong> Tanggamus</p>
            </div>
        </div>
    )
}

export default LayananPengaduan;