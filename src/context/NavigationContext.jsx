import { createContext, useContext } from 'react';

// Criar o contexto
const NavigationContext = createContext();

// Hook para consumir o contexto
export const useNavigation = () => useContext(NavigationContext);

// Componente pai
export const NavigationProvider = ({ children }) => {
  const availableNavigation = [
    { name: 'Postagens', href: '/', show: true },
    { name: 'Login', href: '/login' },
    { name: 'Crie seu usuário', href: '/create-account' },
  ];

  const authenticatedNavigation = [
    { name: 'Criar Postagens', href: '/create', show: true },
    { name: 'Perfil', href: '/profile', user: true },
    { name: 'Configurações', href: '/settings', user: true },
    { name: 'Sair', href: '#', user: true },
  ];

  const value = { availableNavigation, authenticatedNavigation };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Componente para consumir o NavigationContext
export const NavigationConsumer = ({ children }) => {
  return (
    <NavigationContext.Consumer>
      {(context) => children(context)}
    </NavigationContext.Consumer>
  );
};

