import { Card, Row, Col, Container, CardBody } from 'react-bootstrap';
import { useEffect, useState } from 'react';


const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    posts: 0,
    documents: 0,
    media: 0,
    announcements: 0
  });

  // Function to fetch data from each API endpoint and update the corresponding count
  const fetchDataFromApi = async (dataType: string) => {
    try {
      // Fetch data from the API
      const response = await fetch(`http://localhost:5000/${dataType}`);
      const data = await response.json();
      
      console.log(`Fetched data for ${dataType}:`, data); // Debugging log

      // Determine the correct state key for the current dataType
      const stateKey = dataType === 'post' ? 'posts' : dataType;

      // Update state only if data exists
      if (data && data.length > 0) {
        setDataCounts(prevCounts => ({
          ...prevCounts,
          [stateKey]: data.length // Set the correct count based on the response length
        }));
      } else {
        setDataCounts(prevCounts => ({
          ...prevCounts,
          [stateKey]: 0 // Set count to 0 if no data is returned
        }));
      }

    } catch (error) {
      console.error(`Error fetching data for ${dataType}:`, error);
    }
  };

  // Fetch data for all types on component mount
  useEffect(() => {
    const dataTypes = ['post', 'documents', 'media', 'announcements']; // Define all the endpoints
    dataTypes.forEach(type => {
      fetchDataFromApi(type); // Call the fetch function for each type
    });
  }, []);

  // Debugging log to verify the state before rendering
  console.log("Data counts:", dataCounts);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <div style={{fontSize: '20px', margin: '20px'}}> <b>Dashoard Utama DLH-Tanggamus</b></div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="dashboard">
                <Row>
                  <Col>
                    <Card className="mb-3" bg="primary" text="white">
                      <Card.Body>
                        <Card.Title>Posts</Card.Title>
                        <Card.Text>{dataCounts.posts}</Card.Text> {/* Display the post count */}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-3" bg="info" text="white">
                      <Card.Body>
                        <Card.Title>Documents</Card.Title>
                        <Card.Text>{dataCounts.documents}</Card.Text> {/* Display the document count */}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-3" bg="warning" text="white">
                      <Card.Body>
                        <Card.Title>Media</Card.Title>
                        <Card.Text>{dataCounts.media}</Card.Text> {/* Display the media count */}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-3" bg="danger" text="white">
                      <Card.Body>
                        <Card.Title>Announcements</Card.Title>
                        <Card.Text>{dataCounts.announcements}</Card.Text> {/* Display the announcements count */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
