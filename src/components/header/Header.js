import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Loader from "../loader/Loader";

const logo = (
  <Link to="/">
    <h2>
      shop<span>Easy</span>
    </h2>
  </Link>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ``);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
        toast.success("Signout Successfull...");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>{logo}</div>
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo} <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to="/contact">
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                {!currentUser && (
                  <NavLink className={activeLink} to="/login">
                    Login
                  </NavLink>
                )}
                {currentUser && (
                  <a href="#">
                    <FaUserCircle size={16} />
                    {currentUser}
                  </a>
                )}

                {!currentUser && (
                  <NavLink className={activeLink} to="/register">
                    Register
                  </NavLink>
                )}
                <NavLink className={activeLink} to="/order-history">
                  My Orders
                </NavLink>
                {currentUser && <NavLink onClick={logoutUser}>Logout</NavLink>}
              </span>
              {cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
