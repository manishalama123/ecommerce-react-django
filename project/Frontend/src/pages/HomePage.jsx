import React from 'react'
import { NavLink } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import CategorySection from '../components/CategorySection';
import FeaturedSection from '../components/FeaturedSection';
import HeroSection from '../components/HeroSection';
import { Helmet } from "react-helmet";

function HomePage() {
    
  return <>
    <Helmet>
            <title>Home | Luxe</title>
        </Helmet>
    {/* <section className="relative h-[700px] lg:h-[800px] overflow-hidden">
        
        <div className="absolute inset-0">
            <img src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
                 alt="Modern lifestyle background" 
                 className="w-full h-full object-cover transform scale-105 animate-pulse-slow"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        

        <div className="absolute top-20 right-20 w-20 h-20 bg-amber-400/20 rounded-full animate-float hidden lg:block"></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-amber-500/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
                <div className="animate-fade-in-down">
                    <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
                        ✨ New Collection Available
                    </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                    Elevate Your
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 animate-slide-in-right">
                        Lifestyle
                    </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    Discover premium products crafted for those who appreciate quality, design, and innovation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <NavLink to="products.html" className="group bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <span>Shop Collection</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12,5 19,12 12,19"></polyline>
                        </svg>
                    </NavLink>
                    
                    <button className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21"></polygon>
                        </svg>
                        <NavLink to="/about"><span>Our Story</span></NavLink>
                        
                    </button>
                </div>
            </div>
        </div>
        

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
        </div>
    </section> */}

    <HeroSection/>
    
    <InfoSection />
    <FeaturedSection/>
    <CategorySection/>

    <section className="py-20 bg-slate-900 relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-amber-500 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-500 rounded-full translate-x-30 translate-y-30"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay in the Loop
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive offers, and insider updates from Luxe.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input type="email" 
                       placeholder="Enter your email address"
                       className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 placeholder-slate-500"/>
                <button className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 whitespace-nowrap">
                    Subscribe Now
                </button>
            </div>
            <p className="text-slate-400 text-sm mt-4">
                No spam, unsubscribe at any time.
            </p>
        </div>
    </section>
  </>
}

export default HomePage;
