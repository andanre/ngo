import axios from 'axios';

const API_URL = 'http://localhost:6000/documents';

export const fetchDocuments = async () => {
  try {
    const response = await axios.get(API_URL);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Data yang diterima tidak sesuai: ", response.data);
      return [];
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil dokumen:", error);
    return []; // Kembalikan array kosong jika terjadi kesalahan
  }
};
