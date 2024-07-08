import { useNavigate } from "react-router-dom";
import { CustomLink } from "../../components/CustomLink/CustomLink";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const passport = JSON.parse(localStorage.getItem("passport"));

  const logOut = () => {
    localStorage.removeItem("passport");
    navigate("/login");
  };

  return (
    <div className="headerDesign">
      <CustomLink title={"home"} destination={"/"} />
      <CustomLink title={"services"} destination={"/services"} />

      {passport?.token ? (
        <div className="menu">
          <CustomLink
            title={passport?.decodificado?.first_name}
            destination={"/profile"}
          />
          <div onClick={logOut}>
            <CustomLink title={"log out"} destination={"/"} />
          </div>
        </div>
      ) : (
        <div className="menu">
          <CustomLink title={"register"} destination={"/register"} />
          <CustomLink title={"login"} destination={"/login"} />
        </div>
      )}

      {passport?.token && passport?.decodificado?.roleName === "super_admin" && (
        <div className="menu">
          <CustomLink
            title={"Super Admin Panel"}
            destination={"/superadminpanel"}
          />
        </div>
      )}
    </div>
  );
};
