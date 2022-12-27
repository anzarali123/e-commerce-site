import styles from "./AddProduct.module.scss";
import { useState } from "react";
import { Card, Loader } from "../../index";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(files);

    const storageRef = ref(storage, `shopEasy/${Date.now()}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully...");
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    // console.log(product);
    setLoading(true);
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      setUploadProgress(0);
      setProduct(initialState);
      toast.success("Product added successfully...");
      navigate("/admin/all-products");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loader />}
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
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                placeholder="Product image"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  name="imageURL"
                  placeholder="Image URL"
                  disabled
                  value={product.imageURL}
                />
              )}
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
    </>
  );
};

export default AddProduct;
