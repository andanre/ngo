import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Card, ButtonGroup, Pagination } from 'react-bootstrap';
import { fetchData, addData, updateData, deleteData } from '../../api/service';  // Import fungsi dari service.ts
import { ToastContainer, toast } from 'react-toastify';

interface Post {
  id: number;
  title: string;
  content: string;
  type: 'ARTIKEL' | 'AKTIVITAS' | 'BERITA';
  url: string;
  createdAt: string;
}

const PostDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({ id: 0, title: '', content: '', type: 'ARTIKEL', url: null });
  const [isEdit, setIsEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postTypeFilter, setPostTypeFilter] = useState<string>('ALL');  // Memperbaiki variabel postTypeFilter
  const itemsPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchData('/post/private');  // Menggunakan fetchData dari service.ts
        const sortedPosts = response.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPosts(sortedPosts);
        setTotalPages(Math.ceil(sortedPosts.length / itemsPerPage));
        filterPosts(sortedPosts);  // Memanggil filter setelah data diambil
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    filterPosts(posts);  // Memfilter ulang posting saat postTypeFilter berubah
  }, [postTypeFilter]);

  const filterPosts = (postsToFilter: Post[]) => {
    const filtered = postTypeFilter === 'ALL'
      ? postsToFilter
      : postsToFilter.filter(post => post.type === postTypeFilter);
    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handleShowModal = (post?: Post) => {
    if (post) {
      setFormData(post);
      setIsEdit(true);
    } else {
      setFormData({ id: 0, title: '', content: '', type: 'ARTIKEL', url: null });
      setIsEdit(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEdit(false);
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('type', formData.type);

      // Jika gambar ada, tambahkan ke FormData
      if (formData.url instanceof File) {
        formDataToSend.append('url', formData.url);  // Mengirim file gambar sebagai file, bukan binary string
      }

      const endpoint = isEdit ? `/post/${formData.id}` : '/post';
      const method = isEdit ? updateData : addData;

      await method(endpoint, formDataToSend);  // Kirim FormData, bukan JSON
      handleCloseModal();

      toast.success('Post successfully ' + (isEdit ? 'updated' : 'added') + '!');
      // Refresh posts after success
      try {
        const response = await fetchData('/post');  // Menggunakan fetchData dari service.ts
        const sortedPosts = response.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPosts(sortedPosts);
        setTotalPages(Math.ceil(sortedPosts.length / itemsPerPage));
        filterPosts(sortedPosts);  // Memanggil filter setelah data diambil
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to ' + (isEdit ? 'update' : 'add') + ' post!');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteData(`/post/${id}`);  // Menggunakan deleteData dari service.ts
        setPosts(posts.filter(post => post.id !== id));
        filterPosts(posts.filter(post => post.id !== id));  // Memfilter ulang setelah delete
        toast.success('Post successfully deleted!');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post!');
      }
    };
  }
  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
      <div style={{fontSize: '20px', margin: '20px'}}> <b>Dashoard Post (Berita, Artikel, Aktivitas)</b></div>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Add Post</Button>
              <Form.Select aria-label="Filter by Post Type" onChange={(e) => setPostTypeFilter(e.target.value)}>
                <option value="ALL">All Types</option>
                <option value="ARTIKEL">Artikel</option>
                <option value="AKTIVITAS">Aktivitas</option>
                <option value="BERITA">Berita</option>
              </Form.Select>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>URL</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td><img src={post.url} alt={post.title} style={{ width: '50px' }} /></td>
                      <td>{post.type}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td>
                        <ButtonGroup>
                          <Button variant="warning" onClick={() => handleShowModal(post)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <Pagination.First onClick={() => handleChangePage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map(page => (
                  <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handleChangePage(page + 1)}>
                    {page + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage >= totalPages} />
                <Pagination.Last onClick={() => handleChangePage(totalPages)} disabled={currentPage >= totalPages} />
              </Pagination>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{isEdit ? 'Edit Post' : 'Add Post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formType">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'ARTIKEL' | 'AKTIVITAS' | 'BERITA' })}
                        required
                      >
                        <option value="ARTIKEL">ARTIKEL</option>
                        <option value="AKTIVITAS">AKTIVITAS</option>
                        <option value="BERITA">BERITA</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formUrl">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          if (file) {
                            setFormData({ ...formData, url: file });
                          }
                        }}
                        required={!isEdit}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  <Button variant="primary" onClick={handleSubmit}>{isEdit ? 'Update Post' : 'Save Post'}</Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default PostDashboard;
