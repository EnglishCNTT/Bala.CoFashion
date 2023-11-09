import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateProduct(productId, product, dispatch);
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Active:</span>
              <span className="productInfoValue">Yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              placeholder={product.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              placeholder={product.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <PublishIcon />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
