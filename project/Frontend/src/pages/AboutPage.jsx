import React from 'react'
import { NavLink } from 'react-router-dom'

function AboutPage() {
  return <>
    
    <section className="relative py-20 bg-slate-900">
        <div className="absolute inset-0">
            <img src="https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1920" 
                 alt="About Us Background" 
                 className="w-full h-full object-cover opacity-20"/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About Luxe
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
                We're passionate about bringing you the finest lifestyle products that combine exceptional quality, innovative design, and timeless elegance.
            </p>
        </div>
    </section>


    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                    <p className="text-lg text-slate-600 mb-6">
                        Founded in 2020, Luxe began as a vision to create a curated marketplace for discerning individuals who appreciate quality, craftsmanship, and innovative design. We believe that the products we use daily should not only serve their purpose but also bring joy and inspiration to our lives.
                    </p>
                    <p className="text-lg text-slate-600 mb-6">
                        Every product in our collection is carefully selected based on our commitment to excellence. We partner with renowned designers and manufacturers who share our values of sustainability, quality, and ethical production practices.
                    </p>
                    <p className="text-lg text-slate-600">
                        Today, Luxe serves customers worldwide, offering a seamless shopping experience and exceptional customer service that reflects our dedication to your satisfaction.
                    </p>
                </div>
                <div className="relative">
                    <img src="https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg?auto=compress&cs=tinysrgb&w=800" 
                         alt="Our Story" 
                         className="w-full h-96 object-cover rounded-2xl shadow-xl"/>
                </div>
            </div>
        </div>
    </section>


    <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    These core principles guide everything we do and define who we are as a company.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Quality First</h3>
                    <p className="text-slate-600">
                        We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards before reaching your hands.
                    </p>
                </div>

                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Sustainability</h3>
                    <p className="text-slate-600">
                        We're committed to environmental responsibility, partnering with brands that prioritize sustainable materials and ethical manufacturing processes.
                    </p>
                </div>

                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Customer Focus</h3>
                    <p className="text-slate-600">
                        Your satisfaction is our priority. We provide exceptional customer service and support to ensure your shopping experience exceeds expectations.
                    </p>
                </div>
            </div>
        </div>
    </section>

  
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    The passionate individuals behind Luxe who work tirelessly to bring you the best products and experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Sarah Johnson" 
                         className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Sarah Johnson</h3>
                    <p className="text-amber-600 font-medium mb-3">Founder & CEO</p>
                    <p className="text-slate-600 text-sm">
                        With over 15 years in luxury retail, Sarah founded Luxe to democratize access to premium lifestyle products.
                    </p>
                </div>

                <div className="text-center">
                    <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Michael Chen" 
                         className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Michael Chen</h3>
                    <p className="text-amber-600 font-medium mb-3">Head of Product</p>
                    <p className="text-slate-600 text-sm">
                        Michael leads our product curation team, ensuring every item meets our exacting standards for quality and design.
                    </p>
                </div>

                <div className="text-center">
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Emily Rodriguez" 
                         className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Emily Rodriguez</h3>
                    <p className="text-amber-600 font-medium mb-3">Customer Experience Director</p>
                    <p className="text-slate-600 text-sm">
                        Emily ensures every customer interaction reflects our commitment to exceptional service and satisfaction.
                    </p>
                </div>
            </div>
        </div>
    </section>

  
    <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-white mb-2">50K+</div>
                    <div className="text-slate-300">Happy Customers</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">500+</div>
                    <div className="text-slate-300">Premium Products</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">25+</div>
                    <div className="text-slate-300">Countries Served</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">4.9</div>
                    <div className="text-slate-300">Average Rating</div>
                </div>
            </div>
        </div>
    </section>

   
    <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Experience Luxe?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
                Join thousands of satisfied customers who trust Luxe for their premium lifestyle needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="products.html" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                    Shop Now
                </a>
                <NavLink to="/contact" className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    Contact Us
                </NavLink>
            </div>
        </div>
    </section>
  </>
}

export default AboutPage
