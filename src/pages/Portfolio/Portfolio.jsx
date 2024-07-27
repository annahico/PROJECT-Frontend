import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PortfolioCard } from "../../common/PortfolioCard/PortfolioCard";
import { searchPortfolio } from "../../services/apiCalls";
import { userDataCheck } from "../userSlice";
import "./Portfolio.css";

export const Portfolio = () => {
  const reduxUserData = useSelector(userDataCheck);
  const [designs, setDesigns] = useState([]);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 3) {
      navigate("/");
      return;
    }

    const fetchPortfolioData = async () => {
      try {
        const results = await searchPortfolio(
          reduxUserData.credentials.userData.userId,
          reduxUserData.credentials
        );
        setArtist(results.data.data[0]);
        setDesigns(results.data.data[0].Designs);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError("Failed to load portfolio. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [reduxUserData, navigate]);

  const updatePortfolio = async () => {
    setLoading(true);
    try {
      const results = await searchPortfolio(
        reduxUserData.credentials.userData.userId,
        reduxUserData.credentials
      );
      setArtist(results.data.data[0]);
      setDesigns(results.data.data[0].Designs);
    } catch (error) {
      console.error("Error updating portfolio:", error);
      setError("Failed to update portfolio. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="subHeader">
        <div className="portfolioName">
          {reduxUserData.credentials.userData.userName.toUpperCase()} PORTFOLIO
        </div>
        <div className="subheaderButton" onClick={() => navigate("/designadd")}>
          ADD TATTOO DESIGN
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {designs.length > 0 ? (
        <div className="infinite-scroll-container">
          <div className="row spaceRow"></div>
          {designs.map((design) => (
            <PortfolioCard
              key={design.id}
              id={design.id}
              picture={design.picture}
              design={design}
              update={updatePortfolio}
            />
          ))}
        </div>
      ) : (
        <div className="home">
          <div className="title">
            No designs found, load designs to your portfolio
          </div>
        </div>
      )}
    </>
  );
};
