import React from 'react'
import {FaHeadset, FaShippingFast, FaMoneyBillWave} from 'react-icons/fa'
const InfoSection = () => {
    const infoItems = [
        {
           icon:<FaShippingFast className="text-3xl w-8 h-8 text-amber-600" />,
           title:'Free Shipping',
           description: 'Get your orders delivered with no extra cost' 
        },
        {
            icon:<FaHeadset className="text-3xl w-8 h-8 text-amber-600" />,
            title:'Free Shipping',
            description: 'Quick and reliable shipping to get your products to you as fast as possible.' 
        },
        {
            icon:<FaMoneyBillWave className="text-3xl w-8 h-8 text-amber-600" />,
            title:'Free Shipping',
            description: '30-day return policy and dedicated customer support for your peace of mind.' 
        }
    ]
  return (
    <div className="py-16 bg-slate-50">
    <div className="container mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {infoItems.map((item, index) => (
        <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 shadow-sm bg-white transform transition duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="text-4xl text-amber-500">{item.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">
            {item.title}
            </h3>
            <p className="mt-2 text-slate-600 text-sm">{item.description}</p>
        </div>
        ))}
    </div>
</div>

  )
}

export default InfoSection;
