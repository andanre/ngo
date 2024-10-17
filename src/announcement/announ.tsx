import React, { useState, useEffect } from 'react';
import { Card, Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { fetchData } from '../api/service'; // Adjust the path if necessary
import {  FaWhatsapp } from 'react-icons/fa';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const formatDate = (date: Date | string): string => {
    return format(new Date(date), "d MMMM yyyy", { locale: id });
}

interface Announcement {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 5;

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await fetchData('/announcements');
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const shareUrl = window.location.href; // Gets the current URL to share
    const encodedUrl = encodeURIComponent(shareUrl);

    return (
        <>
            <Container fluid style={{ backgroundColor: '#729762', height: '250px', color: 'white', textAlign: 'center' }}>
                <h1 className="mb-3" style={{ paddingTop: '90px', fontSize: '30px' }}>Pengumuman</h1>
                <h5 className="mb-3">Dinas Lingkungan Hidup Kabupaten Tanggamus</h5>
            </Container>
            <Container className="mt-4">
                {currentAnnouncements.map((announcement, index) => (
                    <Card key={index} className="mb-4 shadow-sm" style={{ border: 'none' }}>
                        <Card.Header className='mt-3 mb-3' style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                            {new Date(announcement.createdAt).toLocaleDateString()}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>{announcement.title}</Card.Title>
                            <Card.Text style={{ fontSize: '13px' }}>
                                {announcement.content}
                            </Card.Text>
                            <Container>
                                <Row className="mt-4 mb-5">
                                    <Col xs="auto">
                                        <span style={{ marginRight: '2px', fontSize: '12px', verticalAlign: 'middle' }}>Share:</span>
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="success" style={{ backgroundColor: '#25D366' }} href={`https://wa.me/?text=Pengumuman%20(${formatDate(announcement.createdAt)}):%0A%0A*${announcement.title}*%0A%0A${announcement.content}%0A%0A${encodedUrl}`} target="_blank" >
                                            <FaWhatsapp size={8} color="#fff" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                ))}

                <Pagination>
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: Math.ceil(announcements.length / announcementsPerPage) }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(announcements.length / announcementsPerPage)} />
                    <Pagination.Last onClick={() => paginate(Math.ceil(announcements.length / announcementsPerPage))} disabled={currentPage === Math.ceil(announcements.length / announcementsPerPage)} />
                </Pagination>
            </Container>
        </>
    );
}

export default AnnouncementsPage;
