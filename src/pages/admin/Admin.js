import { Route, Routes } from "react-router-dom";
import {
  AddProduct,
  Home,
  Navbar,
  Orders,
  ViewProducts,
} from "../../components";
import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
