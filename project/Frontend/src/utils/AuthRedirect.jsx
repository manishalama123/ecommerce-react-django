import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const AuthRedirect = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const location = useLocation()
  if (isAuthenticated) {
    const from = location.state?.from
    if (user?.role === "admin" && from && from.startsWith('/admin')) {
      return <Navigate to={from} replace />
    }
    return <Navigate to='/' replace />
  }
  return (
    <Outlet />
  )
}

export default AuthRedirect;
