import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
    const rdxToken = useSelector(selectToken);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    const { first_name, last_name, email } = response.data.data;
                    setUser({ first_name, last_name, email });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }
    }, [rdxToken, navigate]);

    return (
        <div className="profileDesign">
            {
                user
                    ? (
                        <div className="profileContainer">
                            <div className="profileRow">
                                <div className="profileColumnLeft">
                                    <div className="profileImageContainer">
                                        {/* Placeholder for profile image if needed */}
                                    </div>
                                </div>
                                <div className="profileColumnRight">
                                    <div className="profileCard">
                                        <div className="profileName">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="profileEmailLabel">Email</div>
                                        <div className="profileEmail">{user.email}</div>
                                        <div className="profileButtonContainer">
                                            <LinkButton
                                                className="profileButton"
                                                path={"/update"}
                                                title={"Update my profile"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div>Loading ...</div>
                    )
            }
        </div>
    );
};