import { Link } from "react-router-dom";
import './navbar.scss'

export default function navbar() {
    return (
        <div className='navbar'>
            navbar
            <div className="links-container">
                <Link to='/' className="link">home</Link>
                <Link to='/login' className="link">login</Link>
                <Link to='/signup' className="link">signup</Link>
                <Link to='/goal' className="link">goal</Link>
                <Link to='/task' className="link">tasks</Link>
            </div>
        </div>
    )
}
