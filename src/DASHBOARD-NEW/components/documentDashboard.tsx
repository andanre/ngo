import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Pagination, Container, Row, Col, Card } from 'react-bootstrap';
import { fetchData, addData, updateData, deleteData } from '../../api/service';  // Menggunakan fungsi dari service.ts
import { ToastContainer, toast } from 'react-toastify';

interface Document {
  id: number;
  title: string;
  url: string;
  content: string;
  type: string;
  createdAt: string;
}

const DocumentDashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState<Document>({ id: 0, title: '', url: '', content: '', type: 'Perencanaan', createdAt: '' });
  const [searchTitle, setSearchTitle] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 15;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetchData('/documents/private');  // Menggunakan fetchData dari service.ts
      const sortedDocuments = response.sort(
        (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDocuments(sortedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleShowModal = (document?: Document) => {
    setEditMode(!!document);
    setCurrentDocument(document || null);
    setFormData(document || { id: 0, title: '', url: '', content: '', type: 'Perencanaan', createdAt: '' });
    setShow(true);
  };

  const handlePostDocument = async () => {
    try {
      const response = await addData('/documents', formData);  // Menggunakan addData dari service.ts
      const newDocuments = [...documents, response].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDocuments(newDocuments);
      setShow(false);
      toast.success('Post successfully ' +  'added' + '!');
      
    } catch (error) {
      console.error('Error posting document:', error);
      toast.error('Post failed to post!');
    }
  };

  const handleEditDocument = async () => {
    if (!currentDocument) return;
    try {
      const response = await updateData(`/documents/${currentDocument.id}`, formData);  // Menggunakan updateData dari service.ts
      const newDocuments = documents.map(doc => (doc.id === currentDocument.id ? { ...doc, ...response } : doc));
      setDocuments(newDocuments);
      setShow(false);
      toast.success('Post successfully ' +  'edited' + '!');
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to post!');
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await deleteData(`/documents/${id}`);  // Menggunakan deleteData dari service.ts
      const updatedDocuments = documents.filter(doc => doc.id !== id);
      setDocuments(updatedDocuments);
      toast.success('Post successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Post failed to deleted!');
    }
  }
  };

  const handleAddOrEditDocument = () => {
    if (editMode) {
      handleEditDocument();
    } else {
      handlePostDocument();
    }
  };

  const filteredDocuments = documents.filter(doc =>
    (filterType === 'All' || doc.type === filterType) && doc.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = filteredDocuments.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(filteredDocuments.length / docsPerPage);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <div style={{fontSize: '20px', margin: '20px'}}> <b>Dashboard Dokumen</b></div>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Button variant="primary" onClick={() => handleShowModal()}>Add Document</Button>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                className="mt-3"
              />
              <Form.Control
                as="select"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="mb-3"
              >
                <option value="All">All Types</option>
                <option value="Perencanaan">Perencanaan</option>
                <option value="Inovasi">Inovasi</option>
                <option value="Persampahan">Persampahan</option>
                <option value="Pengaduan">Pengaduan</option>
                <option value="Pengawasan">Pengawasan</option>
                <option value="Pengendalian">Pengendalian</option>
              </Form.Control>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>URL</th>
                    <th>Content</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocs.map((doc, index) => (
                    <tr key={doc.id}>
                      <td>{index + 1 + (currentPage - 1) * docsPerPage}</td>
                      <td>{doc.title}</td>
                      <td><a href={doc.url} target="_blank" rel="noopener noreferrer">Visit</a></td>
                      <td>{doc.content}</td>
                      <td>{doc.type}</td>
                      <td>{new Date(doc.createdAt).toLocaleString()}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleShowModal(doc)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDeleteDocument(doc.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                    {page}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Document' : 'Add Document'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter document title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter URL"
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter content"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control 
                as="select" 
                value={formData.type}
                
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Perencanaan">Perencanaan</option>
                <option value="Inovasi">Inovasi</option>
                <option value="Persampahan">Persampahan</option>
                <option value="Pengaduan">Pengaduan</option>
                <option value="Pengawasan">Pengawasan</option>
                <option value="Pengendalian">Pengendalian</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddOrEditDocument}>{editMode ? 'Update' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </Container>
  );
};

export default DocumentDashboard;
