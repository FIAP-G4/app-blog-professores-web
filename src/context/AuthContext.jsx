import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Criar o contexto
const AuthContext = createContext();

// Hook para consumir o contexto
export const useAuth = () => useContext(AuthContext);

// Componentes filhos (para uso do AuthContext)
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para login
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  // Verificar autenticação ao iniciar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = { isAuthenticated, user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Componentes para consumir o AuthContext
export const AuthConsumer = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {(context) => children(context)}
    </AuthContext.Consumer>
  );
};

