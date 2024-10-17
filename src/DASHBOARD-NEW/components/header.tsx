import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">DLH-Tanggamus Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"> {/* Changed from ml-auto to ms-auto for Bootstrap 5 */}
            <Nav.Link href="#user">Welcome, Admin DLH-Tanggamus</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>LLLLLLLLogout</Button>
            <Button variant="outline-light" onClick={handleLogout}>LLLLLLLLogout</Button>
            <Button variant="outline-light" onClick={handleLogout}>LLLLLLLLogout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
