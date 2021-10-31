import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({ token });
      axios
        .get("http://localhost:5000/api/v1/user/me", {
          headers: {
            "Content-Type": "multipart/form-data;",
            "x-auth-token": localStorage.getItem("token"),
          },
        })

        .then((res) => {
          console.log("context", res.data);
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    } else setLoading(false);
  };
  useEffect(fetchToken, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
