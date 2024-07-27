import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../common/UserCard/UserCard";
import { userDataCheck } from "../../pages/userSlice";
import { bringUsers } from "../../services/apiCalls";
import "./Admin.css";

export const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const reduxUserData = useSelector(userDataCheck);

  useEffect(() => {
    // Redirige si el usuario no tiene el rol adecuado
    if (reduxUserData.credentials?.userData?.roleId !== 1) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  useEffect(() => {
    // Obtiene la lista de usuarios al montar el componente o cuando reduxUserData cambia
    if (reduxUserData.credentials?.userData?.roleId === 1) {
      bringUsers(reduxUserData.credentials)
        .then((resultado) => {
          setUsers(resultado.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [reduxUserData]);

  const updateMe = () => {
    bringUsers(reduxUserData.credentials)
      .then((resultado) => {
        setUsers(resultado.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="subHeader">
        <div className="subheaderButton" onClick={() => navigate("/adminadd")}>
          Add admin
        </div>
      </div>

      {users.length > 0 ? (
        <div className="infinite-scroll-container">
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              role_id={user.role_id}
              name={user.name}
              surnames={user.surnames}
              phone={user.phone}
              email={user.email}
              user={user}
              update={updateMe}
            />
          ))}
        </div>
      ) : (
        <div className="home">
          <div className="title">No users found</div>
        </div>
      )}
    </>
  );
};
