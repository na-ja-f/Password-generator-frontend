import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
  const navigate = useNavigate();
  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])
  
  if (user) {
    return children;
  } else {
    navigate("/login");
  }
}

export default Protect;