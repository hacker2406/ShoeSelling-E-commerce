import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center relative group">
    {/* New badge */}
    {product.isNew && (
      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
        New
      </span>
    )}

    <Link
      to={`/product/${product._id}`}
      className="w-full flex flex-col items-center"
    >
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300x200"
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3 group-hover:scale-105 transition-transform"
      />
      <h2 className="text-lg font-semibold text-center">{product.name}</h2>
    </Link>
    <div className="mt-2 text-gray-600 capitalize text-sm">
      Section: {product.section}
    </div>
    <div className="mt-1 font-bold text-blue-700 text-lg">
      ₹{product.price}
    </div>
  </div>
);

export default ProductCard;