import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';
import CreateAccount from '@/pages/CreateAccount';
import Navbar from '@/components/Navbar';
import { AuthProvider, AuthConsumer } from '@/context/AuthContext';
import { NavigationProvider, NavigationConsumer } from '@/context/NavigationContext';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                      const navigation = isAuthenticated ? authenticatedNavigation : availableNavigation;
                      return (
                        <Routes>
                          <Route path="/" element={<PostList />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/create-account" element={<CreateAccount />} />
                          {/* Aqui você pode mapear a navegação, por exemplo */}
                          {navigation.map((navItem) => (
                            <Route key={navItem.href} path={navItem.href} element={<PostList />} />
                          ))}
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
