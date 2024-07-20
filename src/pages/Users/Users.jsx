import { useEffect, useState } from "react";
import { UserCard } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { DeleteUser, GetUsers } from "../../services/apiCalls";
import "./Users.css";

export const Users = () => {
    const { userData, isLoggedIn } = useAuth(); // Usa el contexto para obtener la información del usuario
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (isLoggedIn && userData?.token) { // Verifica si el usuario está autenticado
            if (users.length === 0) {
                const fetchData = async () => {
                    try {
                        const fetched = await GetUsers(userData.token); // Usa el token del contexto
                        setUsers(fetched);
                    } catch (error) {
                        setErrorMsg("Error fetching users: " + error.message);
                    }
                };

                fetchData();
            }
        } else {
            setErrorMsg("User not logged in or token not available.");
        }
    }, [users, userData, isLoggedIn]); // Dependencias actualizadas

    const handleDelete = async (userId) => {
        try {
            if (userId === 1) {
                setErrorMsg("Super Admin cannot be deleted");
                return;
            }

            const response = await DeleteUser(userData.token, { id: userId }); // Usa el token del contexto

            if (!response.success) {
                throw new Error(response.message || "Error deleting user");
            }

            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            setErrorMsg("Error deleting user: " + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="userDesign">
                <div className="titleDesign">
                    User List
                </div>
                {users.length > 0 ? (
                    <div className="cardsRoster">
                        {users.map(user => (
                            <UserCard
                                key={user.id}
                                firstName={<span className="userFirstName">First Name: {user.firstName}</span>}
                                secondName={<span className="userSecondName">Last Name: {user.secondName}</span>}
                                email={<span className="userEmail">Email: {user.email}</span>}
                                onDelete={() => handleDelete(user.id)}
                                isDeletable={user.id !== 1}
                            />
                        ))}
                    </div>
                ) : (
                    <div>{errorMsg || "Users are coming."}</div>
                )}
            </div>
        </>
    );
};
