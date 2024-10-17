import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Pagination, CardBody, Card, Col, Row, Container } from 'react-bootstrap';
import { fetchData, addData, updateData, deleteData } from '../../api/service';  // Assuming these functions are correctly implemented
import { ToastContainer, toast } from 'react-toastify';

interface Media {
  id: number;
  title: string;
  url: string | File;
  type: 'image' | 'video';
  createdAt: string;
}


const MediaDashboard = () => {
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<Media>({ id: 0, title: '', url: '', type: 'image', createdAt: new Date().toISOString() });
  const [filterType, setFilterType] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaPerPage] = useState(10);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetchData('/media/private');
      const sortedMedia = response.sort((a: Media, b: Media) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMediaFiles(sortedMedia);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to fetch media');
    }
  };

  const handleShowModal = (media?: Media) => {
    setFormData(media || { id: 0, title: '', url: '', type: 'image', createdAt: new Date().toISOString() });
    setShow(true);
  };

  const handleAddOrEditMedia = async () => {
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('type', formData.type);

    if (formData.url instanceof File && formData.type === 'image') {
      dataToSend.append('url', formData.url);
    } else {
      dataToSend.append('url', formData.url.toString());
    }

    try {
      if (formData.id) {
        await updateData(`/media/${formData.id}`, dataToSend);
        setMediaFiles(mediaFiles.map(media => media.id === formData.id ? { ...media, ...formData } : media));
      } else {
        const newMedia = await addData('/media', dataToSend);
        setMediaFiles([newMedia, ...mediaFiles]);
      }
      toast.success('Media Added or Updated Successfully');
      fetchMedia();
    } catch (error) {
      console.error('Error saving media:', error);
      toast.error('Error Adding or Editing Media');
    }
    setShow(false);
  };

  const handleDeleteMedia = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        await deleteData(`/media/${id}`);
        setMediaFiles(mediaFiles.filter(media => media.id !== id));
        toast.success('Media deleted successfully');
      } catch (error) {
        console.error('Error deleting media:', error);
        toast.error('Failed to delete media');
      }
    }
  };

  const totalPages = Math.ceil(mediaFiles.length / mediaPerPage);
  const indexOfLastMedia = currentPage * mediaPerPage;
  const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
  const currentMediaFiles = mediaFiles.slice(indexOfFirstMedia, indexOfLastMedia);


  const renderMediaContent = (media: Media) => {
    if (media.type === 'video') {
      // Extract YouTube ID from the URL
      const videoId = new URL(media.url as string).searchParams.get('v');
      return (
        <a href={media.url as string} target="_blank" rel="noopener noreferrer">
          <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt={media.title} style={{ width: '100px' }} />
        </a>
      );
    } else {
      // Handle image URL or File object
      const imageUrl = media.url instanceof File ? URL.createObjectURL(media.url) : media.url as string;
      return <img src={imageUrl} alt={media.title} style={{ width: '100px' }} />;
    }
  };

  return (
    <>
    <Container className="my-5">
      <Row className="justify-content-center">
        <div style={{fontSize: '20px', margin: '20px'}}> <b>Dashoard Media (Foto & Video)</b></div>
        <Col md={12}>
          <Card>
            <CardBody>
              <div className="media-dashboard">
                <Button variant="primary" onClick={() => handleShowModal()}>Add Media</Button>
                <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mb-3">
                  <option value="All">All</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </Form.Select>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>URL</th>
                      <th>Type</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMediaFiles.map((media, index) => (
                      <tr key={media.id}>
                        <td>{index + 1 + (currentPage - 1) * mediaPerPage}</td>
                        <td>{media.title}</td>
                        <td>{renderMediaContent(media)}</td>
                        <td>{media.type}</td>
                        <td>{new Date(media.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Button variant="warning" onClick={() => handleShowModal(media)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDeleteMedia(media.id)}>Delete</Button>
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
                  <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages} />
                  <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages} />
                </Pagination>
                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Edit Media' : 'Add Media'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter media title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video', url: '' })}
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </Form.Control>
                      </Form.Group>
                      {formData.type === 'video' ? (
                        <Form.Group controlId="formURL">
                          <Form.Label>Video URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter YouTube video link"
                            value={formData.url as string}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          />
                        </Form.Group>
                      ) : (
                        <Form.Group controlId="formFile">
                          <Form.Label>Image File</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const file = e.target.files ? e.target.files[0] : null;
                              if (file) {
                                setFormData({ ...formData, url: file });
                              }
                            }}
                          />
                        </Form.Group>
                      )}
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddOrEditMedia}>{formData.id ? 'Update' : 'Save'}</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
    </>
  );
};

export default MediaDashboard;
