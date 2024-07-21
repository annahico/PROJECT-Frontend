import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { bringTattoo } from "../../services/apiCalls";
import "./Gallery.css";

export const Gallery = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    bringTattoo()
      .then((results) => {
        const data = results?.data?.data || [];
        setCharacters(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []); 

  return (
    <div className="galleryDesign">
      {characters.length > 0 ? (
        <Container>
          <Row>
            {characters.map((character) => (
              <Col sm={12} lg={6} xl={2} xxl={2} key={character.id}>
                <img className='tattooimage' src={character.image} alt={character.name} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div>IMAGES CANNOT BE RECOVERED</div>
      )}
    </div>
  );
};
