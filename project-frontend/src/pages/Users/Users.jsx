import { useEffect, useState } from "react";
import { UserCard } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { DeleteUser, GetUsers } from "../../services/apiCalls";
import "./Users.css";

export const Users = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (users.length === 0) {
            const fetchData = async () => {
                try {
                    const fetched = await GetUsers(passport.token);
                    setUsers(fetched);
                } catch (error) {
                    setErrorMsg("Error fetching users: " + error.message);
                }
            };

            fetchData();
        }
    }, [users, passport.token]);

    const handleDelete = async (userId) => {
        try {
            if (userId === 1) {
                setErrorMsg("Super Admin cannot be deleted");
                return;
            }

            const response = await DeleteUser(passport.token, { id: userId });

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
                        {users.map(user => {
                            return (
                                <UserCard
                                    key={user.id}
                                    firstName={<span className="userFirstName">First Name: {user.firstName}</span>}
                                    secondName={<span className="userSecondName">Last Name: {user.secondName}</span>}
                                    email={<span className="userEmail">Email: {user.email}</span>}
                                    onDelete={() => handleDelete(user.id)}
                                    isDeletable={user.id !== 1}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>{errorMsg || "Users are coming."}</div>
                )}
            </div>
        </>
    );
};