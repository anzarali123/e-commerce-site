import styles from "./AddProduct.module.scss";
import { useState } from "react";
import { Card, Loader } from "../../index";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {};

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
          <label>Product name:</label>
          <input
            type="text"
            placeholder="Product Name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              placeholder="Product image"
              accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              required
              name="imageURL"
              placeholder="Image URL"
              disabled
              value={product.imageURL}
            />
          </Card>

          <label>Product price:</label>
          <input
            type="number"
            placeholder="Product price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              --Choose Product Category--
            </option>
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Product company/brand:</label>
          <input
            type="text"
            placeholder="Product company"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product description:</label>
          <textarea
            name="desc"
            value={product.desc}
            required
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit" className="--btn --btn-primary">
            Save Product
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
