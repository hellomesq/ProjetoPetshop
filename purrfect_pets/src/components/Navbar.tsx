import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="logo"><Link href="/">Purrfect Pets</Link></a>
      <ul className="nav-links">
        <li><Link href="/">Início</Link></li>
        <li><Link href="/cadastro">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
