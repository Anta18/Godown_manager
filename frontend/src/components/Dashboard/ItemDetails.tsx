import React from "react";
import { TreeItem } from "../../types";

interface ItemDetailsProps {
  item: TreeItem | null;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  if (!item || item.type !== "item" || !item.itemDetails) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an item to view details
      </div>
    );
  }

  const {
    name,
    attributes,
    category,
    quantity,
    image_url,
    price,
    status,
    brand,
  } = item.itemDetails;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <div className="bg-gradient-to-br from-[#030b30] to-black p-8 rounded-xl shadow-lg w-full h-full overflow-auto text-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">{name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="col-span-2 bg-opacity-20 bg-[#1f213f] w-full lg:w-3/5 rounded-lg p-6">
          <p className="text-lg mb-4">
            <span className="text-white font-bold mr-10">Category:</span>{" "}
            <span className="text-gray-300">{category}</span>
          </p>
          <p className="text-lg mb-4">
            <span className="text-white font-bold mr-10">Quantity:</span>{" "}
            <span className="text-gray-300">{quantity}</span>
          </p>
          <p className="text-lg mb-4">
            <span className="text-white font-bold mr-10">Price:</span>{" "}
            <span className="text-gray-300">{formattedPrice}</span>
          </p>
          <p className="text-lg mb-4">
            <span className="text-white font-bold mr-10">Status:</span>{" "}
            <span className="text-gray-300">{status}</span>
          </p>
          <p className="text-lg mb-4">
            <span className="text-white font-bold mr-10">Brand:</span>{" "}
            <span className="text-gray-300">{brand}</span>
          </p>
        </div>
        {image_url && (
          <div className="col-span-1 flex items-center justify-center">
            <img
              src={image_url}
              alt={name}
              className="w-5/6 h-52 bg-[#1f213f] rounded-lg flex items-center justify-center"
            ></img>
          </div>
        )}
      </div>
      <div className="w-full mt-8 bg-opacity-20 bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-6 text-white">Attributes</h3>
        {Object.entries(attributes).length > 0 ? (
          <ul className="space-y-4">
            {Object.entries(attributes).map(([key, value]) => (
              <li key={key} className="text-lg">
                <span className="text-white font-bold mr-2">{key}:</span>
                <span className="text-gray-300">
                  {value as React.ReactNode}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-300">No attributes available</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
