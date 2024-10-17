import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Breadcrumb, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { fetchData } from '../../api/service'; // Pastikan Anda memiliki fungsi fetchData yang tepat untuk API

interface Post {
  id: number;
  title: string;
  url: string;
  content: string;
  createdAt: string;
  type: string;
}

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;  // Jumlah posts per halaman
  const navigate = useNavigate();
  const { type } = useParams(); // Ekstrak tipe dari URL

  useEffect(() => {
    const getPosts = async () => {
      try {
        let data: Post[] = await fetchData('/post'); // Ganti dengan API endpoint yang sesuai
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        // Filter posts berdasarkan tipe jika tipe ada dalam URL
        if (type) {
          data = data.filter(post => post.type.toUpperCase() === type.toUpperCase());
        }

        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    getPosts();
  }, [type]); // Dependensi useEffect diubah untuk menyertakan 'type'

  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'ARTIKEL': return 'primary';
      case 'AKTIVITAS': return 'success';
      case 'BERITA': return 'warning';
      default: return 'secondary';
    }
  };

  const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <Container fluid style={{ padding: 0 }}>
        <div className="bg-image" style={{ backgroundColor: '#729762', height: '250px', color: 'white', textAlign: 'center' }}>
          <h1 className="mb-3" style={{ paddingTop: '90px', fontSize: '30px' }}>Post Terbaru</h1>
          <h5 className="mb-3">Dinas Lingkungan Hidup Kabupaten Tanggamus</h5>
        </div>
      </Container>
      <Container>

        <Breadcrumb 
               className='mb-5 mt-5' 
               style={{
               fontSize: '15px',
                 }}>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", style: { textDecoration: 'none',color: "#729762" } }}><b>Home</b></Breadcrumb.Item>
            <Breadcrumb.Item active>Post</Breadcrumb.Item>
        </Breadcrumb>

        <Row xs={1} md={2} lg={3} className="g-4">
          {currentPosts.map(post => (
            <Col key={post.id}>
              <Card>
                <Card.Img variant="top" src={post.url} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
                  <Card.Title style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: "14px"
                  }}><b>{post.title}</b></Card.Title>
                  <Badge bg={getBadgeColor(post.type)}>{post.type}</Badge>
                  <Card.Text style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: "11px"
                  }}>{post.content}</Card.Text>
                  <Button variant="outline-success" onClick={() => navigate(`/berita/post/${post.id}`)}>Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination style={{ paddingTop: '20px', paddingBottom: '20px'}}>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage >= totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage >= totalPages} />
        </Pagination>
      </Container>
    </>
  );
};

export default NewsPage;
