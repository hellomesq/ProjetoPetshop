import Navbar from "@/components/Navbar";
import Services from "./services";
const Home = () => {
    return (
        <div>
        <Navbar />
            <h1>Bem-vindo ao Petshop!</h1>
            <p>Gerencie serviços e pets com facilidade.</p>
        <Services />
        </div>
    );
};

export default Home;
