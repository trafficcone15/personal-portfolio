import '../styles/Navbar.scss';
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const scrollTo = (scrollLocation: string) => {
        const goToSection = document.getElementById(`${scrollLocation}`);
        if (goToSection) {
            window.scrollTo({
                top: goToSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    const navigate = useNavigate();

    const handleNavClick = (scrollLocation: string) => {
        if (window.location.pathname !== "/") {
            navigate('/');
        } else {
            scrollTo(scrollLocation);
            setIsActive(false);
        }
    };

    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    return (
        <div className="navbar-container">
            <nav className={`navbar ${isActive ? "actve" : ""}`} ref={navbarRef}>
                <div className="logo-container">
                    <img className='logo' src="" />
                </div>

                <ul>
                    <li></li>
                    <li>
                        <a onClick={() => handleNavClick('top')}><FontAwesomeIcon className="icon" icon={faArrowCircleUp} /></a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('about-me')}>About me</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('experiences')}>Experiences</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('projects')}>Projects</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('mern-board')}>MERN board</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('contact-me')}>Contact me</a>
                    </li>
                    <li className="socials">
                        <a className="no-underline" data-tooltip="showellross@gmail.com"><FontAwesomeIcon className="icon" icon={faEnvelope} /></a>
                    </li>
                </ul>
                <div
                    id="hamburger"
                    onClick={toggleMenu}
                    className={`Hamb ${isActive ? "actve" : ""}`}
                >
                    <div className={`line1 line ${isActive ? "actve" : ""}`}></div>
                    <div className={`line2 line ${isActive ? "actve" : ""}`}></div>
                    <div className={`line3 line ${isActive ? "actve" : ""}`}></div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
