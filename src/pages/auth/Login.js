import styles from "./auth.module.scss";
import { Card } from "../../components";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login.png";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <section className={`${styles.auth} container`}>
      <Card>
        <div className={styles.img}>
          <img src={loginImg} alt="login image" width="400px" />
        </div>
        <div className={`${styles.form}`}>
          <h2>Login</h2>
          <form>
            <input type="text" required placeholder="Email" />
            <input type="password" required placeholder="password" />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or-- </p>
          </form>
          <button className="--btn --btn-primary --btn-danger --btn-block">
            <FaGoogle style={{ marginRight: "10px" }} /> Login With Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account? </p>
            <Link to="/register">Register</Link>{" "}
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
