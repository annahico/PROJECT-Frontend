import { useEffect, useRef, useState } from "react";
// import tatuador from "../assets/tatuador2.png";
import Cards from "../../common/Card/Card";
import { messageBasic } from "../../utils/HelperMessages";
import { apiUsers } from "../Services/Services";
import "./Artist.css";

export default function Artistas() {
    const [artistsAll, setArtistsAll] = useState([]);
    const loadServicesExecuted = useRef(false);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const resp = await apiUsers.user.getArtists();
                console.log(resp);
                setArtistsAll(resp.data);
            } catch (error) {
                messageBasic("error", "Error loading artists: " + error);
            }
        };

        if (!loadServicesExecuted.current) {
            loadArtists();
            loadServicesExecuted.current = true;
        }
    }, []);

    return (
        <div className="artists-container">
            <div className="artists-header">
                <h1 className="artists-title">Artistas</h1>
            </div>
            <div className="artists-grid">
                {artistsAll.map(artist => (
                    <div key={artist.id} className="artist-card">
                        <Cards
                            image={artist}
                            title={`${artist.first_name} ${artist.last_name}`}
                            description="Descripción del artista."
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
