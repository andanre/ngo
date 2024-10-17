import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Pagination as BootstrapPagination } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import { Document } from '../../types';  // Pastikan import ini sesuai dengan lokasi tipe data Document Anda
import { fetchData } from '../../api/service'; // Pastikan path ini benar
import { Breadcrumb } from 'react-bootstrap';

const ITEMS_PER_PAGE = 10;


// Komponen Pagination
interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === page}
        onClick={() => handlePageChange(number)}
        
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return (
    <BootstrapPagination >
      <BootstrapPagination.Prev
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      />
      {items}
      <BootstrapPagination.Next
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      />
    </BootstrapPagination>
  );
};

// Komponen DocumentTable
interface DocumentTableProps {
  documents: Document[];
  currentPage: number;
  itemsPerPage: number;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, currentPage, itemsPerPage }) => {
  return (
    <Table style={{ fontSize: "14px", borderCollapse: "collapse", width: "100%" }} hover>
    <thead>
      <tr style={{ backgroundColor: "#729762", color: "#ffffff", padding: "12px 8px" }}>
        <th style={{ padding: "12px 8px", border: "none" }}>No</th>
        <th style={{ padding: "12px 8px", border: "none" }}>Nama Dokumen</th>
        <th style={{ padding: "12px 8px", border: "none" }}>Jenis</th>
        <th style={{ padding: "12px 8px", border: "none" }}>Deskripsi</th>
        <th style={{ textAlign: 'center', padding: "12px 8px", border: "none" }}>Tanggal Upload</th>
        <th style={{ textAlign: 'center', padding: "12px 8px", border: "none" }}>Download</th>
      </tr>
    </thead>
    <tbody>
      {documents.map((doc, index) => (
        <tr key={doc.id} style={{
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Zebra striping
          cursor: 'pointer', // Cursor as pointer to indicate interactivity
          borderBottom: '1px solid #ddd' // Only bottom border
        }}>
          <td style={{ padding: "12px 8px", border: "none" }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
          <td style={{ padding: "12px 8px", border: "none" }}>{doc.title}</td>
          <td style={{ padding: "12px 8px", border: "none" }}>{doc.type}</td>
          <td style={{ padding: "12px 8px", border: "none" }}>{doc.content.slice(0, 200)}...</td>
          <td style={{ textAlign: 'center', padding: "12px 8px", border: "none" }}>{new Date(doc.createdAt).toLocaleDateString()}</td>
          <td style={{ textAlign: 'center', padding: "12px 8px", border: "none" }}>
            <a href={doc.url} download style={{ color: 'inherit', textDecoration: 'none' }}>
              <FaDownload />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  );
};

// Komponen DocumentScreen
const DocumentScreen: React.FC = () => {
  const { type = 'Perencanaan' } = useParams<{ type: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadDocuments = async () => {
      const data = await fetchData(`/documents?type=${type}`); // Mengambil dokumen berdasarkan tipe

      const filteredDocuments = data.filter((doc: { type: string; }) => doc.type.toLowerCase() === type.toLowerCase());
      filteredDocuments.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;
      setDocuments(filteredDocuments.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
    };

    loadDocuments();
  }, [type, page]);

  return (
    <>
      <Container fluid style={{ padding: 0 }}>
        <div className="bg-image" style={{ backgroundColor: '#729762', height: '250px', color: 'white', textAlign: 'center' }}>
          <h1 className="mb-3" style={{ paddingTop: '90px', fontSize: '30px' }}>Dokumen</h1>
          <h5 className="mb-3">Dinas Lingkungan Hidup Kabupaten Tanggamus</h5>
        </div>
      </Container>

      <Container>

        <Breadcrumb
          className='mb-5 mt-5'
          style={{
            fontSize: '15px',
          }}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", style: { textDecoration: 'none', color: "#729762" } }}><b>Home</b></Breadcrumb.Item>
          <Breadcrumb.Item active>Dokumen</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col >
         
            <DocumentTable documents={documents} currentPage={page} itemsPerPage={ITEMS_PER_PAGE} />
          <div className="mt-5 mb-5">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
          </Col>
        </Row>
      </Container>
    </>

  );
};

export default DocumentScreen;
