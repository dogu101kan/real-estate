import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../store/user/hooks"

export default function PrivateRoute() {

    const { currentUser } = useUser();
    
  return currentUser?.access_token ? (<div><Outlet/></div>) : <Navigate to="/login"/>
}
