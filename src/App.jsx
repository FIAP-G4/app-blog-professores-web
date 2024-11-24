import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';
import CreateAccount from '@/pages/CreateAccount';
import Navbar from '@/components/Navbar';
import { AuthProvider, AuthConsumer } from '@/context/AuthContext';
import { NavigationProvider, NavigationConsumer } from '@/context/NavigationContext';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ADICIONE ROTAS E COMPONENTES DE PÁGINA AQUI
const routeComponents = {
  '/': PostList,
  '/login': Login,
  '/create-account': CreateAccount,
  //'/create': CreatePost,
  //'/profile': Profile,
  //'/settings': Settings,
};

const App = () => {
  return (
    <>
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={true} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        transition={Slide}
      />
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <Navbar>              
              <NavigationConsumer>
                {({ availableNavigation, authenticatedNavigation }) => (
                  <AuthConsumer>
                    {({ isAuthenticated }) => {
                      const navigation = isAuthenticated ? 
                    [...availableNavigation, ...authenticatedNavigation] : 
                    availableNavigation;
                      return (
                        <Routes>
                          {navigation.map((navItem) => {
                            const Component = routeComponents[navItem.href];
                            return (
                              <Route key={navItem.href} path={navItem.href} element={Component ? <Component /> : null} />
                            );
                          })}
                        </Routes>
                      );
                    }}
                  </AuthConsumer>
                )}
              </NavigationConsumer>
            </Navbar>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </>
  );
};

export default App;
