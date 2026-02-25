import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    // backend sends a flat object {_id,name,email,role,token}
    // but we also support { user: {...}, token } shape for flexibility
    const token = data.token;
    const user = data.user ? data.user : { ...data };

    // if the object itself contains token as a prop, remove it from stored user
    if (user.token) delete user.token;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);