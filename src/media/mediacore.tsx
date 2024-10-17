import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Breadcrumb, Modal } from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';  // useLocation to detect current pathname
import moment from 'moment';
import { fetchData } from '../api/service'; // Ensure this path is correct
import YouTube from 'react-youtube';

interface Media {
  id: number;
  title: string;
  url: string;
  content: string;
  createdAt: string;
  type: string;  // 
}

const Mediacore: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;  // Number of posts per page
  const { type } = useParams();
  

  useEffect(() => {
    const getMedia = async () => {
      try {
        // Fetch data from either '/media/image' or '/media/video' based on the current route
        let data: Media[] = await fetchData(`/media`);
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                if (type) {
           data = data.filter(post => post.type.toUpperCase() === type.toUpperCase());
         }

         setMedia(data);
        
      } catch (error) {
        console.error("Failed to fetch Media:", error);
      }
    };
    getMedia();
  }, [type]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       let data: Post[] = await fetchData('/post'); // Ganti dengan API endpoint yang sesuai
  //       data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
  //       // Filter posts berdasarkan tipe jika tipe ada dalam URL
  //       if (type) {
  //         data = data.filter(post => post.type.toUpperCase() === type.toUpperCase());
  //       }

  //       setPosts(data);
  //     } catch (error) {
  //       console.error("Failed to fetch posts:", error);
  //     }
  //   };
  //   getPosts();
  // }, [type]); // Dependensi useEffect diubah untuk menyertakan 'type'

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = media.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(media.length / postsPerPage);

  const [show, setShow] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const handleShow = (item: Media) => {
    setSelectedMedia(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const renderMediaContent = (media: Media) => {
    if (media.type === 'video') {
      const videoId = media.url.split('v=')[1];
      return <YouTube videoId={videoId} />;
    } else {
      return <img src={media.url} alt={media.title} style={{ width: '100%' }} />;
    }
  };

  return (
    <>
      <Container fluid style={{ padding: 0 }}>
        <div className="bg-image" style={{ backgroundColor: '#729762', height: '250px', color: 'white', textAlign: 'center' }}>
          <h1 className="mb-3" style={{ paddingTop: '90px', fontSize: '30px' }}>Gallery</h1>
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
          <Breadcrumb.Item active>Media</Breadcrumb.Item>
        </Breadcrumb>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {currentPosts.map(media => (
            <Col key={media.id} onClick={() => handleShow(media)}>
              <Card>
                <Card.Body>
                  <Card.Title style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: "14px"
                  }}><b>{media.title}</b></Card.Title>
                  {media.type === 'video' ? 
                    <Card.Img variant="top" src={`https://img.youtube.com/vi/${media.url.split('v=')[1]}/0.jpg`} style={{ height: '200px', objectFit: 'cover' }} /> :
                    <Card.Img variant="top" src={media.url} style={{ height: '200px', objectFit: 'cover' }} />
                  }
                  <Card.Text>{moment(media.createdAt).fromNow()}</Card.Text>
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
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedia?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedMedia && renderMediaContent(selectedMedia)}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}

export default Mediacore;
