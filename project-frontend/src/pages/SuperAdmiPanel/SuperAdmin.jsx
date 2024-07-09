import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import "./SuperAdmin.css";

export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(userData?.token);

    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

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
    const deleteUser = async (userId) => {
        try {
            const fetched = await DeleteUsers(userId, tokenStorage);
            if (!fetched.success) {
                return setMsgError(fetched.message);
            }
            setMsgSuccess(fetched.message);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="superAdminPanelDesign">
                {users.length > 0 ? (
                    <div className="superAdminPanelDesign">
                        <div className="error">{msgError}</div>
                        <div className="success">{msgSuccess}</div>
                        {users.map((user) => (
                            <div key={user.id}>
                                <ProfileCard
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    email={user.email}
                                />
                                <CustomButton
                                    className={"customButtonDesign"}
                                    title={"Delete User"}
                                    functionEmit={() => deleteUser(user.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    // Si no hay usuarios, muestra un mensaje de carga
                    <div className="superAdminPanelDesign">
                    <p>Services are coming</p>
                </div>
            )}
        </div>
    </>
);
};