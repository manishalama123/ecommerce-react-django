import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import QuantitySelector from '../components/QuantitySelector';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () =>{
    if(quantity<10){
      setQuantity(prev => prev +1);
    }
    else{
      toast.warn('Reached max stock')
    }
  };

  const handleDecrease = ()=>{
    if(quantity>1){
      setQuantity(prev => prev-1);

    }else{
      toast.info('Minimum quantity is 1');
    }
  };


  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    };

    fetchSingleProduct();
  }, [id]);

  const increasQty = () =>setQuantity(prev => prev +1)
  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 py-9">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-shrink-0 flex justify-center md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 md:w-80 object-contain"
          />
        </div>
  
        {/* Info Section */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl text-amber-600 font-bold">${product.price}</p>
          <p className="text-gray-600 text-sm">{product.description}</p>
          
          {/* <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm font-medium">Quantity:</span>
            
            <div className="flex items-center border border-amber-50 rounded px-2 py-1 space-x-2">
              <button className="text-xl font-bold px-2 hover:text-amber-600">-</button>
              <span className="w-6 text-center">1</span>
              <button className="text-xl font-bold px-2 hover:text-amber-600">+</button>
            </div>
          </div> */}
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

            
          <div className='grid grid-cols-2 gap-1.5'>

            <button className="bg-amber-500 hover:bg-amber-600 h-10 text-white px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium mt-4">
              Add to Cart
            </button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium mt-4">
              Buy Now
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
  
  
}

export default ProductDetail;
