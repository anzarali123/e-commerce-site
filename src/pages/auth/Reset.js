import styles from "./auth.module.scss";
import { Card } from "../../components";
import { Link } from "react-router-dom";
import forgotImg from "../../assets/forgot.png";

const Reset = () => {
  return (
    <section className={`${styles.auth} container`}>
      <div className={styles.img}>
        <img src={forgotImg} alt="forgot image" width="400px" />
      </div>
      <Card>
        <div className={`${styles.form}`}>
          <h2>Reset Password</h2>
          <form>
            <input type="email" required placeholder="Email" />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
