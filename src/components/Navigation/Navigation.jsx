import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsPasswordSet,
} from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
import imgLogo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/slice";

const MenuIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="cls-1"
      d="M356.66,244.66H155.33a11.34,11.34,0,0,0,0,22.68H356.66a11.34,11.34,0,0,0,0-22.68Z"
      fill="currentColor"
    />
    <path
      className="cls-1"
      d="M356.66,176H155.33a11.34,11.34,0,0,0,0,22.68H356.66a11.34,11.34,0,0,0,0-22.68Z"
      fill="currentColor"
    />
    <path
      className="cls-1"
      d="M356.66,313.29H155.33a11.34,11.34,0,0,0,0,22.68H356.66a11.34,11.34,0,0,0,0-22.68Z"
      fill="currentColor"
    />
    <path
      className="cls-1"
      d="M256,58.65c-108.38,0-196.56,88.18-196.56,196.56S147.62,451.77,256,451.77,452.56,363.6,452.56,255.21,364.38,58.65,256,58.65Zm0,370.45c-95.88,0-173.88-78-173.88-173.89S160.12,81.33,256,81.33s173.88,78,173.88,173.88S351.88,429.1,256,429.1Z"
      fill="currentColor"
    />
  </svg>
);

export const Navigation = () => {
  const password = useSelector(selectIsPasswordSet);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);



  return (
    <nav className={css.container}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.home} ${css.active}` : css.home
        }
        to="/"
      >
        {" "}
        <img className={css.logo} src={imgLogo} alt="Logo" /> PhoneBook
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${css.contacts} ${css.active}` : css.contacts
          }
          to="/contacts"
        >
          Contacts
        </NavLink>
      )}
      <button
        ref={buttonRef}
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        className={css.menuButton}
        type="button"
      >
        <MenuIcon
          className={clsx(css.menuIcon, menuOpen && css.activeMenuIcon)}
        />
      </button>
      <ul
        ref={menuRef}
        onClick={(e) => {
          const li = e.target.closest("li");
          if (!li) return;
          setMenuOpen((prev) => !prev);
        }}
        className={clsx(css.menuHidden, menuOpen && css.activeMenu)}
      >
        {isLoggedIn && (
          <li className={css.itemList}>
            <NavLink className={css.itemListNav} to="/contacts">
              Contacts
            </NavLink>{" "}
          </li>
        )}

        {!password && isLoggedIn && (
          <li className={css.itemList}>
            <button
              className={css.itemListNav}
              type="button"
              onClick={() => {
                dispatch(
                  openModal({
                    type: "SEND_EMAIL_RESET_PASSWORD",
                    props: { setPasswordReason: true },
                  }),
                );
              }}
            >
              Set Password
            </button>
          </li>
        )}
        {isLoggedIn && (
          <li className={css.itemList}> 
            <button
              className={css.itemListNav}
              type="button"
              onClick={() => {
                dispatch(openModal({ type: "CONFIRM_LOGOUT" }));
              }}
            >
              Log Out
            </button>
          </li>
        )}
        {!isLoggedIn && (
          <li className={css.itemList}>
            <NavLink className={css.itemListNav} to="/register">
              Register
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li className={css.itemList}>
            <NavLink className={css.itemListNav} to="/login">
              Log In
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
