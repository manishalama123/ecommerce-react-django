import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/slice/cartSlice'
import { toast } from 'react-toastify'

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
  
    try {
      const item = {
        product: product.id,
        quantity: 1
      };
      await dispatch(addItemToCart(item)).unwrap();
      toast.success("added to cart~!!!")
    } catch (error) {
      toast.error("cannot add to cart")
      console.error("Failed to add to cart:", error);
    }

  }

  return (

    <button
      onClick={handleAddToCart}
      className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-xs font-medium flex items-center justify-center space-x-1">
      <ShoppingCart className="w-3 h-3" />
      <span>Add to Cart</span>
    </button>

  )
}

export default AddToCartButton;
