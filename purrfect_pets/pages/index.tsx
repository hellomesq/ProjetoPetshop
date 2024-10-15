import Navbar from "@/components/Navbar";
import Services from "./services";
import Rodape from "@/components/Rodape";

const Home = () => {
    return (
        <div className="homeContainer">
            <Navbar />
            <div className="banner">
                <div className="textContainer">
                    <h1>
                        Purrfect <span className="petsText">Pets</span>
                    </h1>
                    <p>Cuidando do seu pet com carinho e excelência!</p>
                </div>
                <img className="img_banner" src="/pets_banner.jpg" alt="Banner do Petshop" />
            </div><br></br>
            <Services />
            <Rodape />
        </div>
    );
};

export default Home;
