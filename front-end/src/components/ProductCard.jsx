import { Link } from "react-router-dom";

function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productId}
      className="flex flex-col w-[90%] sm:w-[280px] md:w-[300px] 
                 h-[380px] shadow-lg rounded-2xl overflow-hidden 
                 transform transition-transform duration-300 
                 hover:scale-105 hover:shadow-2xl cursor-pointer bg-white"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-[220px] object-cover"
      />

      <div className="w-full flex flex-col p-3 flex-grow">
        <h1 className="text-lg text-gray-700 font-semibold">
          {product.name}
          <br />
          <span className="text-gray-400 text-sm">{product.category}</span>
        </h1>

        <div className="mt-auto">
          {product.labelledPrice > product.price ? (
            <p>
              <span className="line-through mr-2 text-gray-400">
                {product.labelledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-green-600 font-semibold">
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          ) : (
            <span>
              {product.labelledPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
