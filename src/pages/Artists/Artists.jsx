import React from 'react';
import { Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Artist.css'; // Asegúrate de que el nombre del archivo CSS coincida

const Artists = () => {
 
  const artists = [
    {
      name: '',
      image: '',
      review: 'Specialist in realistic tattoos with over 10 years of experience.',
    },
    {
      name: '',
      image: '',
      review: 'Passionate about watercolor tattoos and vibrant colors.',
    },
    {
      name: '',
      image: '',
      review: 'Expert in geometric and minimalist tattoos.',
    },
    {
      name: '',
      image: '',
      review: 'Expert in black and white tattoos.',
    },
    {
      name: '',
      image: '',
      review: 'Expert in piercing and stretching placement.',
    },
   
  ];

  return (
    <div className="artists-body">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Tattoo Studio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="artists-content">
        <h1>Our Artists</h1>
        <Container>
          <Row>
            {artists.map((artist, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="artist-card">
                  <Card.Img variant="top" src={artist.image} />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <Card.Text>{artist.review}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Artists;
