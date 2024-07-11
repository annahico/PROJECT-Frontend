import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [headerScroll, setHeaderScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                setHeaderScroll(true);
            } else {
                setHeaderScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    };
    return (
        <div className={headerScroll ? "headerDesign scrolled" : "headerDesign"}>
            <CustomLink
                title={"Tattoo"}
                destination={"/"}
            />
            <CustomLink
                title={"Services"}
                destination={"/services"}
            />

            {passport?.token
                ? (
                    <div className="authMenu">
                        <CustomLink
                            title={passport?.decoded?.firstName}
                            destination={"/profile"}
                        />
                        <div>
                            <CustomLink title={"My Appointments"} destination={"/appointments"} />
                        </div>
                        <div>
                            <CustomLink title={"Request Appointment"} destination={"/newappointments"} />
                        </div>
                        {passport?.decoded?.name === 'super_admin' && (
                            <div>
                                <CustomLink title={"Users"} destination={"/users"} />
                            </div>
                        )}
                        <div onClick={logOut}>
                            <CustomLink title={"Log Out"} destination={"/"} />
                        </div>
                    </div>
                )
                : (
                    <div className="authMenu">
                        <CustomLink title={"Account"} destination={"/login"} />
                        <CustomLink title={"Register"} destination={"/register"} />
                    </div>
                )
            }
        </div>
    );
};
