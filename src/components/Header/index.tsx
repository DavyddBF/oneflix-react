import { Link } from "react-router-dom";
import './header.css';

function Header(): JSX.Element {
    return (
        <div className="header">
            <h2><Link className="header__logo" to='/'>OneFlix</Link></h2>
            <Link className="header__favoritos" to='/favoritos'>Meus Filmes</Link>
        </div>
    );
}

export default Header;