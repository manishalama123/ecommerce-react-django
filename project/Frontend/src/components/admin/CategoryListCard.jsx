import React from "react";
import { Edit, Trash2, Folder } from "lucide-react";

const CategoryListCard = ({ id, name, description, products, status, created }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Folder className="text-blue-500 w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">ID: #{id}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3">{description}</p>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span> Products: {products}</span>
        <span>Created: {created ? new Date(created).toLocaleDateString("en-US",{
          year: "numeric",
          month: "short",
          day: "numeric",
        }): " N/A"
        }</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-600 hover:underline">View Products</button>
        <div className="flex gap-3">
          <button className="text-green-600 hover:text-green-800">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryListCard;
