import React from 'react'

function UserProfilePage() {
  return <>
    
    <section className="relative py-20 overflow-hidden bg-slate-50">
        
        <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500 rounded-full animate-float"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-slate-500 rounded-full animate-float" style="animation-delay: 2s;"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-slate-400 rounded-full animate-float" style="animation-delay: 4s;"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-fade-in-down">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    My Profile
                </h1>
                <p className="text-lg text-slate-600">
                    Manage your account, orders, and preferences
                </p>
            </div>

            
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
                
                <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                        
                        <div className="relative group">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <button className="absolute bottom-2 right-2 bg-white text-slate-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                        </div>

                       
                        <div className="text-center md:text-left text-white">
                            <h2 className="text-3xl font-bold mb-2">Alexandra Johnson</h2>
                            <p className="text-white/90 mb-1">alexandra.johnson@email.com</p>
                            <p className="text-white/80 text-sm">Member since March 2024</p>
                            <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-sm">VIP Member</span>
                                </div>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="p-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">24</h3>
                            <p className="text-slate-600 text-sm">Total Orders</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">$2,847</h3>
                            <p className="text-slate-600 text-sm">Total Spent</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">12</h3>
                            <p className="text-slate-600 text-sm">Wishlist Items</p>
                        </div>
                    </div>

                 
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* <!-- Personal Information --> */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>Personal Information</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                    <div>
                                        <p className="text-sm text-slate-600">Full Name</p>
                                        <p className="font-medium text-slate-900">Alexandra Johnson</p>
                                    </div>
                                    <button className="text-amber-500 hover:text-amber-600 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                    <div>
                                        <p className="text-sm text-slate-600">Email Address</p>
                                        <p className="font-medium text-slate-900">alexandra.johnson@email.com</p>
                                    </div>
                                    <button className="text-amber-500 hover:text-amber-600 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                    <div>
                                        <p className="text-sm text-slate-600">Phone Number</p>
                                        <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                                    </div>
                                    <button className="text-amber-500 hover:text-amber-600 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                       
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                <span>Quick Actions</span>
                            </h3>

                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 p-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                    <span className="font-medium">View Order History</span>
                                </button>

                                <button className="w-full flex items-center space-x-3 p-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <span className="font-medium">Manage Wishlist</span>
                                </button>

                                <button className="w-full flex items-center space-x-3 p-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span className="font-medium">Shipping Addresses</span>
                                </button>

                                <button className="w-full flex items-center space-x-3 p-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                    <span className="font-medium">Payment Methods</span>
                                </button>
                            </div>
                        </div>
                    </div>

                   
                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Recent Activity</span>
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">Order #LX-2024-0156 delivered</p>
                                    <p className="text-sm text-slate-600">2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">Added Wireless Headphones to wishlist</p>
                                    <p className="text-sm text-slate-600">1 day ago</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">Placed order #LX-2024-0155</p>
                                    <p className="text-sm text-slate-600">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition-all duration-300">
                            Account Settings
                        </button>
                        <button className="flex-1 bg-red-100 text-red-700 px-6 py-3 rounded-xl font-medium hover:bg-red-200 transition-all duration-300">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
  </>
}

export default UserProfilePage
