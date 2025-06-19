import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col">
    <Link to={`/product/${product._id}`}>
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300x200"
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
    </Link>
    <div className="mt-2 text-gray-600 capitalize">Section: {product.section}</div>
    <div className="mt-1 font-bold text-blue-700">₹{product.price}</div>
  </div>
);

export default ProductCard;