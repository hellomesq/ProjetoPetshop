import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <p className="logo"><Link href="/">Purrfect Pets</Link></p>
      <ul className="nav-links">
        <li><Link href="/">Início</Link></li>
        <li><Link href="/cadastro">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
