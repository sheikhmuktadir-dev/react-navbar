import { Link } from "react-router-dom";
import Style from "./navbar.module.css";
import { navLinks } from "./NavData";
import { PiListThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [navScroll, setNavScroll] = useState(false);
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    const navScrollHandler = () => {
      setNavScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", navScrollHandler);
    return () => window.removeEventListener("scroll", navScrollHandler);
  }, []);

  useEffect(() => {
    if (navToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navToggle]);

  return (
    <nav
      className={`${Style.navbarMain} ${navScroll ? Style.navbarScroll : ""}`}
    >
      <div className={Style.container}>
        <div className={Style.navbarMainInner}>
          <div className={Style.navLogoArea}>
            <Link to="/" className={Style.navLogo}>
              Almac
            </Link>
            <button
              className={Style.navToggle}
              onClick={() => setNavToggle(true)}
            >
              <PiListThin />
            </button>
          </div>

          <div
            className={`${Style.navbarMenu} ${
              navToggle ? Style.navbarMenuShow : ""
            }`}
          >
            <button
              className={Style.navbarclose}
              onClick={() => setNavToggle(false)}
            >
              <IoClose />
            </button>
            <ul className={Style.navbarList}>
              {navLinks?.length > 0 &&
                navLinks.map((list) => {
                  return (
                    <li key={list.id} className={Style.navbarItem}>
                      <Link to={list.path} className={Style.navbarLink}>
                        {list.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
