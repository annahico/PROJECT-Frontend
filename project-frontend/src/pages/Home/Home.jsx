import { Header } from "../../common/Header/Header";
import "./Home.css";

export const Home = () => {
    return (
        <>
            <Header />
            <div className="homeDesign">
                <div className="titleDesign">
                    InkSoul Studio
                </div>
                <div className="contentDesign">
                    <div className="section">
                        <div className="descriptionDesign">
                            Located in the heart of the city, Tattoo is more than just a tattoo and piercing studio; It is a sanctuary of body art where creativity meets technical skill to transform ideas into lasting masterpieces.
                            At Tattoo, we are dedicated to providing a unique and personalized experience for each client. We believe that every tattoo and piercing tells a story, and our goal is to help you tell yours in the most authentic and artistic way possible.
                        </div>
                        <img src="" alt="Tattoo Studio" className="descriptionImage" />
                    </div>
                    <div className="section">
                        <img src="" alt="Tattoo Studio" className="descriptionImage" />
                        <div className="descriptionDesign">
                            We offer a wide range of services, from custom tattoos and artistic piercings to touch-ups and cover-ups. Additionally, we provide free consultations to discuss your ideas, answer your questions, and ensure you are completely satisfied with the design before starting the tattoo or piercing process.
                        </div>
                    </div>
                    <div className="section">
                        <div className="descriptionDesign">
                            We use only the best inks, needles, and materials available on the market to ensure high-quality, long-lasting results. Moreover, we keep up with the latest trends and techniques in the world of tattooing and piercing to offer you the best services possible.
                        </div>
                        <img src="" alt="Tattoo Studio" className="descriptionImage" />
                    </div>
                </div>
            </div>
        </>
    );
};
