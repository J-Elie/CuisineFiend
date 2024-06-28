import { createContext, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    user_email: "",
    user_password: "",
    //confirmPassword: "",
    _id: "",
    user_followers: [],
    user_following: [],
    authenticated: false,
  });

  const updateUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext
