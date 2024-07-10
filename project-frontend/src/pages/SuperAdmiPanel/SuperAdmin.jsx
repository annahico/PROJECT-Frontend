import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import "./SuperAdmin.css";

export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (users.length === 0) {
                try {
                    const fetched = await GetUsers(tokenStorage);
                    setUsers(fetched.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [users, tokenStorage]);

    const deleteUser = async (userId) => {
        try {
            const fetched = await DeleteUsers(userId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
                return;
            }
            setMsgSuccess(fetched.message);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setMsgError(error);
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
                        {users.map(user => (
                            <div key={user.id}>
                                <ProfileCard
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    email={user.email}
                                />
                                <CustomButton
                                    className={"customButtonDesign"}
                                    title={"Borrar usuario"}
                                    functionEmit={() => deleteUser(user.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="superAdminPanelDesign">
                        <p>Los servicios estan viniendo</p>
                    </div>
                )}
            </div>
        </>
    );
};
