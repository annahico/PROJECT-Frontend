import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { GetProfile } from "../../services/apiCalls";
import "./Profile.css";

export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setUser({
          first_name: fetched.data.first_name,
          last_name: fetched.data.last_name,
          email: fetched.data.email,
        });
        setLoadedData(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }
  }, [loadedData, tokenStorage]);

  return (
    <div className="profileDesign">
      {!loadedData ? (
        <div>CARGANDO</div>
      ) : (
        <ProfileCard
          first_name={user.first_name}
          last_name={user.last_name}
          email={user.email}
        />
      )}
    </div>
  );
};
