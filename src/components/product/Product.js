import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import styles from "./Product.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { useEffect } from "react";
import Spinner from "../../assets/spinner.jpg";

const Product = () => {
  const { data, loading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data, dispatch]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {loading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {loading && (
            <img
              src={Spinner}
              style={{ width: "50px" }}
              className="--center-all"
            />
          )}
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};

export default Product;
