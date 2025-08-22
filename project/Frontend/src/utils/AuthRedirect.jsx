import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AuthRedirect = () => {
    const {isAuthenticated} = useSelector(state => state.auth)
    if(isAuthenticated) return <Navigate to='/' replace/>
  return (
    <Outlet/>
  )
}

export default AuthRedirect;
