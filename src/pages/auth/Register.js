import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { Card } from "../../components";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className={`${styles.auth} container`}>
      <Card>
        <div className={`${styles.form}`}>
          <h2>Register</h2>
          <form>
            <input type="text" required placeholder="Email" />
            <input type="password" required placeholder="password" />
            <input type="password" required placeholder="Confirm password" />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>Already have an account? </p>
            <Link to="/login"> Login</Link>{" "}
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="register" width="400px" />
      </div>
    </section>
  );
};

export default Register;
