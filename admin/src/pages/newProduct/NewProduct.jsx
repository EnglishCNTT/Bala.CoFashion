import React from "react";
import "./newProduct.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sizes, setSize] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSize = (e) => {
    if (sizes.includes(e)) {
      setSize(sizes.filter((item) => item !== e));
    } else {
      setSize([...sizes, e]);
    }
  };

  const handleColor = (e) => {
    if (sizes.includes(e)) {
      setColor(color.filter((item) => item !== e));
    } else {
      setColor([...color, e]);
    }
  };
  console.log(color);


  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            size: sizes,
            img: downloadURL,
            color: color,
          };
          addProduct(product, dispatch);
        });
        navigate("/products");
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter Product title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select name="categories" onChange={handleChange}>
            <option value="" disabled selected hidden>
              Category
            </option>
            <option value="TOPS">TOPS</option>
            <option value="BOTTOM">BOTTOM</option>
            <option value="ACCESSORIES">ACCESSORIES</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <div className="addProductSizes" style={{display: "flex"}}>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="black"
                name="black"
                value="black"
                onChange={() => handleColor("black")}
              />
              <label htmlFor="Black">Black</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="white"
                name="white"
                value="white"
                onChange={() => handleColor("white")}
              />
              <label htmlFor="White">White</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="green"
                name="green"
                value="green"
                onChange={() => handleColor("green")}
              />
              <label htmlFor="Green">Green</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="blue"
                name="blue"
                value="blue"
                onChange={() => handleColor("blue")}
              />
              <label htmlFor="Blue">Blue</label>
            </div>
          </div>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <div className="addProductSizes" style={{display: "flex"}}>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="XS"
                name="XS"
                value="XS"
                onChange={() => handleSize("XS")}
              />
              <label htmlFor="XS">XS</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="S"
                name="S"
                value="S"
                onChange={() => handleSize("S")}
              />
              <label htmlFor="S">S</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="M"
                name="M"
                value="M"
                onChange={() => handleSize("M")}
              />
              <label htmlFor="M">M</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="L"
                name="L"
                value="L"
                onChange={() => handleSize("L")}
              />
              <label htmlFor="L">L</label>
            </div>
            <div className="addProductSize">
              <input
                type="checkbox"
                id="XL"
                name="XL"
                value="XL"
                onChange={() => handleSize("XL")}
              />
              <label htmlFor="XL">XL</label>
            </div>
          </div>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
