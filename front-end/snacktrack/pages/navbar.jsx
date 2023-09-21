import Link from "next/link";
import {useState} from "react";

export default function NavBar() {
    const [isActive, setIsActive] = useState(false);

    return <nav className={"navbar is-spaced"} role={"navigation"} aria-label={"main navigation"}>
            <div className={"navbar-brand"}>
                <figure className={"image mr-6 mb-auto is-128x128"}>
                    <img id={"nav-logo"} src={"https://i.ibb.co/pL24QMX/snacktrack-logo.png"} alt={"SnackTrack logo"}/>
                </figure>
                <a role="button"
                   className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                   aria-label="menu"
                   aria-expanded="false"
                   data-target="main-nav-bar"
                   onClick={() => {
                       setIsActive(!isActive);
                   }}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id={"main-nav-bar"} className={`navbar-menu is-size-5 ${isActive ? "is-active" : ""}`}>
                <div className={"navbar-start mb-6"}>
                    <Link href={"/"} className={"navbar-item"}><p>Home</p></Link>
                    <Link href={"/articles"} className={"navbar-item"}><p>Map</p></Link>
                    <Link href={"/users"} className={"navbar-item"}><p>Businesses</p></Link>
                </div>
                <div className="navbar-end mb-6">
                    <div className="navbar-item has-dropdown is-hoverable is-right">
                        <a className={"navbar-link mr-3 mb-auto"}>user</a>
                        <div className="navbar-dropdown is-danger">
                            <a className="navbar-item">
                                Switch User
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    </nav>
}
