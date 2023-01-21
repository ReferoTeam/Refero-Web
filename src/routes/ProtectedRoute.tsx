import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
const Protected = ({isAuthenticated, children}: {isAuthenticated: Boolean, children: any}) => {
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Dashboard />;
};
export default Protected;