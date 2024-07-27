import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { registerDesign, searchPortfolio } from "../../services/apiCalls";
import { userDataCheck } from "../userSlice";
import './DesignAdd.css';

export const DesignAdd = () => {
  const reduxUserData = useSelector(userDataCheck);
  const userId = reduxUserData?.credentials?.userData?.userId;
  const navigate = useNavigate();
  
  const [artist, setArtist] = useState(null);
  const [addDesignBody, setAddDesignBody] = useState({
    artist_id: "",
    style: "",
    picture: "",
  });

  // Verifica el rol del usuario y redirige si no es un artista
  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 3) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  // Obtiene el portfolio del artista
  useEffect(() => {
    if (userId) {
      searchPortfolio(userId, reduxUserData.credentials)
        .then((results) => {
          const artistId = results.data.data[0]?.id || "";
          setArtist(artistId);
          setAddDesignBody((prevState) => ({
            ...prevState,
            artist_id: artistId,
          }));
        })
        .catch((error) => console.error("Error fetching portfolio:", error));
    }
  }, [userId, reduxUserData.credentials]);

  // Actualiza el estado del diseño
  const inputHandler = (e) => {
    setAddDesignBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Maneja la adición del diseño
  const addDesign = () => {
    registerDesign(addDesignBody, reduxUserData.credentials)
      .then(() => {
        navigate("/portfolio");
      })
      .catch((error) => console.error("Error adding design:", error));
  };

  return (
    <div className="container-fluid register">
      <div className="space"></div>
      <div className="row upRowRegister">
        <div className="col-1"></div>
        <div className="col-5">
          <div className="row inputRow">
            <div className="scripting">Style</div>
            <Input
              type="text"
              placeholder="Introduce the design style"
              value={addDesignBody.style}
              name="style"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Hosting link</div>
            <Input
              type="text"
              placeholder="Introduce the design's hosting link"
              value={addDesignBody.picture}
              name="picture"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={addDesign}>
          Add Design
        </div>
      </div>
    </div>
  );
};
