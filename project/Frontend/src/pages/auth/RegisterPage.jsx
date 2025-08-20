import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { baseRequest } from '../../utils/baseRequest';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { registerFormValidationSchema } from '../../utils/validate';
const RegisterPage=()=> {

    const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm({
        resolver:yupResolver(registerFormValidationSchema)
    })
    const navigate = useNavigate()
    const onSubmit = async (data)=>{
        try {
            await baseRequest.post('/auth/register/', data)
            toast.success("User registered successfully!!!")
            navigate('/login/')
        } catch (error) {
            if(error.response && error.response.data){
                console.log(error.response.data);
                const firstKey = Object.keys(error.response.data)[0]
                const message = error.response.data[firstKey][0]
                toast.error(message)
            }
            
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{' '} <br></br>
            <NavLink
              to="/login"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              sign in to your account
            </NavLink>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">
                First Name
              </label>
              <input
                {...register('first_name')}
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.first_name && <p className='text-red-600 text-sm'>{errors.first_name.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                {...register('last_name')}
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Enter your last name"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.last_name && <p className='text-red-600 text-sm'>{errors.last_name.message}</p>}
            
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                {...register('username')}
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.username && <p className='text-red-600 text-sm'>{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.email && <p className='text-red-600 text-sm'>{errors.email.message} </p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.password && <p className='text-red-600 text-sm'>{errors.password.message} </p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                {...register('password2')}
                id="password2"
                name="password2"
                type="password"
                placeholder="Re-enter your password"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
              {errors.password2 && <p className='text-red-600 text-sm'>{errors.password2.message} </p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 disabled:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
              
            >
              {isSubmitting? "Submitting...": "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
