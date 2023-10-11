import React from "react";

const ProductListingModal = ({close}) => {
  return (
    <div className="p-7 relative">
      <div>ProductListModal</div>
      <button className="absolute -top-0  right-2" onClick={close}>x</button>
    </div>
  );
};

export default ProductListingModal;
