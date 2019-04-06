import React from "react";
import { Link } from "react-router-dom";

function ProductActions() {
  return (
    <div>
      <div className="chartis row">
        <div className="col  text-center">
          <div className="ct-chart-area ct-golden-section">
            <Link
              to="/create-product"
              className="btn text-light btn-sub btn-block mt-6"
            >
              Add Product
            </Link>
          </div>
        </div>
        <div className="col text-center">
          <Link
            to="/edit-product"
            className="btn text-light btn-sub btn-block mt-6"
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProductActions;
