import { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Card, Badge } from 'react-bootstrap';
import { fetchData } from '../../api/service'; // Mengambil data dari service.ts
import moment from 'moment';  // Menggunakan moment.js untuk menghitung waktu
import { useNavigate } from 'react-router-dom'; // Untuk navigasi antar halaman

export const Article1 = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  // Menginisialisasi state untuk hover
  const navigate = useNavigate();  // Hook untuk navigasi

  // Fungsi untuk mengambil data post terbaru
  const getLatestPosts = async () => {
    try {
      const response = await fetchData('/post');
      const sortedPosts = response
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Urutkan berdasarkan waktu upload
        .slice(0, 3);  // Ambil 6 data terbaru
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Menghitung waktu berapa lama yang lalu post di-upload
  const timeAgo = (date: string) => {
    return moment(date).fromNow();  // Menggunakan moment.js untuk menghitung waktu
  };

  // Memanggil getLatestPosts saat komponen di-load
  useEffect(() => {
    getLatestPosts();
  }, []);

  // Fungsi untuk menentukan warna berdasarkan tipe post
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ARTIKEL':
        return 'primary'; // Biru
      case 'BERITA':
        return 'warning'; // Orange
      case 'AKTIVITAS':
        return 'success'; // Hijau
      default:
        return 'secondary'; // Warna default jika tipe tidak dikenali
    }
  };

  // Fungsi untuk navigasi ke halaman semua post
  const navigateToAllPosts = () => {
    navigate('/berita'); // Ganti '/all-posts' dengan route yang sesuai di aplikasi Anda
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {posts.map((post, index) => (
          <Col md={3} key={index} className="mb-5 mx-4">
            <Card 
              className="h-100  blog-horizontal shadow-sm"
              onMouseEnter={() => setHoveredIndex(index)}  // Mengatur state hover
              onMouseLeave={() => setHoveredIndex(null)}  // Menghapus state hover
              style={{ borderRadius: '10px' }} 
            >
              {/* Gaya gambar diatur secara inline, dengan animasi hover */}
              <Card.Img
                variant="top"
                src={post.url}
                style={{
                  height: '250px',      // Tinggi gambar sedikit lebih kecil
                  objectFit: 'cover',   // Gambar mengisi container dengan proporsi yang benar
                  width: '100%',        // Gambar memenuhi lebar card
                  transition: 'transform 0.3s ease',  // Tambahkan animasi transisi
                  transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)'  // Membesar ketika dihover
                }}
                alt={post.title}
              />
              <Card.Body>
                <Card.Text className="text-muted">{timeAgo(post.createdAt)}</Card.Text>
                <Card.Title style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2, // Batasi judul menjadi 2 baris
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '16px'
                }}>
                  <b>{post.title}</b>
                </Card.Title>
                <p>
                  {/* Gunakan Badge dari React Bootstrap untuk memberikan warna */}
                  <Badge bg={getTypeColor(post.type)}>{post.type}</Badge>
                </p>
                <div>
                    <p style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Batasi judul menjadi 2 baris
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '13px'
                    }}>
                        {post.content}
                    </p>
                </div>
                <Button variant="outline-success" onClick={() => navigate(`/berita/post/${post.id}`)}>Baca Lebih Lanjut</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tombol untuk melihat semua post */}
      <Row className="justify-content-center mt-4">
        <Button variant="success" size="lg" onClick={navigateToAllPosts} className="w-auto">
          <b>Lihat Semua Post</b>
        </Button>
      </Row>
    </Container>
  );
};
