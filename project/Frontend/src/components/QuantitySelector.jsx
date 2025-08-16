import React from 'react'

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
    return (
      <div className="inline-flex items-center border border-gray-400 rounded-md overflow-hidden text-gray-700">
        <button
          onClick={onDecrease}
          className="px-3 py-1 text-lg font-semibold hover:bg-gray-100"
        >
          −
        </button>
  
        <div className="w-px h-6 bg-gray-300" />
  
        <span className="px-4 text-center select-none">{quantity}</span>
  
        <div className="w-px h-6 bg-gray-300" />
  
        <button
          onClick={onIncrease}
          className="px-3 py-1 text-lg font-semibold hover:bg-gray-100"
        >
          +
        </button>
      </div>
    );
  }
  

export default QuantitySelector;
