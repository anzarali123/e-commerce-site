import styles from "./ProductDetails.module.scss";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";
const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setProduct(obj);
      }
    } catch (error) {
      toast.error("Product Not Found");
    }
  };
  return (
    <section>
      <div className={`${styles.product} container`}>
        <h2>Product Details</h2>
        <div>
          <Link to="#/products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="spinner" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b>
                  {product.id}
                </p>
                <p>
                  <b>Brand</b>
                  {product.brand}
                </p>
                <div className={styles.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">Add To Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
