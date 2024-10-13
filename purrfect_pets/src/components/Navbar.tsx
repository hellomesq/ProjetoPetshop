import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Início</Link></li>
                <li><Link href="/services">Serviços</Link></li>
                <li><Link href="/pets">Pets</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
