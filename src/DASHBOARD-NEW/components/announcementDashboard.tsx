import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Pagination, Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { fetchData, addData, updateData, deleteData } from '../../api/service';  // Menggunakan fungsi dari service.ts
import { ToastContainer, toast } from 'react-toastify';  // Tambahkan react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS untuk react-toastify

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string; // Tanggal pembuatan
}

const AnnouncementDashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Items per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetchData('/announcements/private');  // Menggunakan fetchData dari service.ts
      const sortedData = response.sort((a: Announcement, b: Announcement) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setAnnouncements(sortedData);
      setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleShowModal = (announcement?: Announcement) => {
    if (announcement) {
      setFormData(announcement);
      setCurrentId(announcement.id);
      setIsEditing(true);
    } else {
      setFormData({ title: '', content: '' });
      setIsEditing(false);
    }
    setShow(true);
  };

  const handleAddOrEditAnnouncement = async () => {
    try {
      if (isEditing && currentId !== null) {
        await updateData(`/announcements/${currentId}`, formData);  // Menggunakan updateData dari service.ts
        toast.success('Announcement updated successfully');
        fetchAnnouncements();  // Refresh data setelah update
      } else {
        await addData('/announcements', formData);  // Menggunakan addData dari service.ts
        toast.success('Announcement created successfully');
        fetchAnnouncements();  // Refresh data setelah penambahan
      }
      setShow(false);
    } catch (error) {
      toast.error('Failed to save announcement');
      console.error('Error adding or editing announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await deleteData(`/announcements/${id}`);  // Menggunakan deleteData dari service.ts
      toast.success('Announcement deleted successfully');
      fetchAnnouncements();  // Refresh data setelah penghapusan
    } catch (error) {
      toast.error('Failed to delete announcement');
      console.error('Error deleting announcement:', error);
    }
  };

  const currentData = announcements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container className="my-5">
      
      <ToastContainer /> {/* Ini akan menampilkan notifikasi toast */}
      <Row className="justify-content-center">
      <div style={{fontSize: '20px', margin: '20px'}}> <b>Dashboard Pengumuman</b></div>
        <Col md={12}>
          <Card>
            <CardBody>
            <div className="announcement-dashboard">
              <Button variant="primary" onClick={() => handleShowModal()}>Add Announcement</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((ann,index) => (
                    <tr key={ann.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{ann.title}</td>
                      <td>{ann.content}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleShowModal(ann)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDeleteAnnouncement(ann.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>

              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>{isEditing ? 'Edit Announcement' : 'Add Announcement'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter announcement title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Content</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter announcement content"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                  <Button variant="primary" onClick={handleAddOrEditAnnouncement}>{isEditing ? 'Update' : 'Save'}</Button>
                </Modal.Footer>
              </Modal>
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnouncementDashboard;
  