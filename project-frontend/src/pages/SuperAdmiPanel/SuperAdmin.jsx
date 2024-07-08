import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { GetUsers } from "../../services/apiCalls";
import "./SuperAdmin.css";

export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    // Carga inicial de usuarios cuando el componente se monta o el tokenStorage cambia
    useEffect(() => {
        if (users.length === 0) {
            const fetchData = async () => {
                try {
                    const fetched = await GetUsers(tokenStorage);
                    setUsers(fetched.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [users, tokenStorage]);

    // Función para eliminar un usuario (por ahora solo muestra el correo en consola)
    const deleteUser = (email) => {
        console.log(email);
    };

    return (
        <>
            <Header />
            <div className="superAdminPanelDesign">
                {users.length > 0 ? (
                    // Si hay usuarios, muestra la lista
                    <div className="superAdminPanelDesign">
                        {users.map((user) => (
                            <div key={user.email}>
                                <ProfileCard
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    email={user.email}
                                />
                                <CustomButton
                                    className={"customButtonDesign"}
                                    title={"Delete User"}
                                    functionEmit={() => deleteUser(user.email)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    // Si no hay usuarios, muestra un mensaje de carga
                    <div className="superAdminPanelDesign">
                        <p>Loading users...</p>
                    </div>
                )}
            </div>
        </>
    );
};
