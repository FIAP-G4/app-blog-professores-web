import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PostList from '@/pages/PostList'
import Login from '@/pages/Login'
import CreateAccount from '@/pages/CreateAccount'
import Administrator from '@/pages/Administrator'
import Profile from '@/pages/Profile'
import CreatePost from '@/pages/CreatePost'
import NotFound from '@/pages/NotFound'
import Tag from '@/pages/Tag'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Navbar from '@/components/Navbar'
import { AuthProvider, AuthConsumer } from '@/context/AuthContext'
import {
  NavigationProvider,
  NavigationConsumer,
} from '@/context/NavigationContext'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostDetails from '@/pages/PostDetails'

// ADICIONE ROTAS E COMPONENTES DE PÁGINA AQUI
const routeComponents = {
  '/': PostList,
  '/login': Login,
  '/criar-conta': CreateAccount,
  '/criar-postagem': CreatePost,
  '/administrador': Administrator,
  '/posts/:id': PostDetails,
  '/categorias': Tag,
  '/perfil': Profile,
  '/recuperar-senha': ForgotPassword,
  '/redefinir-senha/:token': ResetPassword,
}

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <ToastContainer
        position='bottom-right'
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
                      const navigation = isAuthenticated
                        ? [...availableNavigation, ...authenticatedNavigation]
                        : availableNavigation
                      return (
                        <Routes>
                          {navigation.map((navItem) => {
                            const Component = routeComponents[navItem.href]
                            return (
                              <Route
                                key={navItem.href}
                                path={navItem.href}
                                element={Component ? <Component /> : null}
                              />
                            )
                          })}
                          {/* Rota "catch-all" */}
                          <Route path='*' element={<NotFound />} />
                        </Routes>
                      )
                    }}
                  </AuthConsumer>
                )}
              </NavigationConsumer>
            </Navbar>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </div>
  )
}

export default App
