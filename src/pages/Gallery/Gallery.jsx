import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { bringTattoo } from "../../services/apiCalls";
import "./Gallery.css";

export const Gallery = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTattooData = async () => {
      try {
        const results = await bringTattoo();
        const data = results?.data?.data || [];
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching tattoo images:", error);
        setError("Images cannot be recovered. Please try again later.");
      }
    };

    fetchTattooData();
  }, []);

  return (
    <div className="galleryDesign">
      {error ? (
        <div>{error}</div>
      ) : characters.length > 0 ? (
        <Container>
          <Row>
            {characters.map((character) => (
              <Col sm={12} lg={6} xl={3} xxl={3} key={character.id}>
                <img
                  className="tattooimage"
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div>Loading images...</div>
      )}
    </div>
  );
};
