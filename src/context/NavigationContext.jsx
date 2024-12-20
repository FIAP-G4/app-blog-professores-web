import { createContext, useContext } from 'react'

const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {
  const availableNavigation = [
    { name: 'Postagens', href: '/', show: true },
    { name: 'Login', href: '/login' },
    { name: 'Crie seu usuário', href: '/criar-conta' },
    { name: 'Recupere sua senha', href: '/recuperar-senha' },
    { name: 'Redefina sua senha', href: '/redefinir-senha/:token' },
    { name: 'Detalhes da Postagem', href: '/posts/:id' },
  ]

  //precisa de login para acessar
  const authenticatedNavigation = [
    //menus para o professor autenticado, teacher: true
    {
      name: 'Criar Postagens',
      href: '/criar-postagem',
      show: true,
      teacher: true,
    },
    {
      name: 'Administrar Postagens',
      href: '/administrador',
      show: true,
      teacher: true,
    },
    { name: 'Categorias', href: '/categorias', show: true, teacher: true },

    //menus para usuário logado
    { name: 'Perfil', href: '/perfil', user: true },
    { name: 'Sair', href: '#', user: true },
  ]

  return (
    <NavigationContext.Provider
      value={{ availableNavigation, authenticatedNavigation }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error(
      'useNavigation deve ser usado dentro de um NavigationProvider',
    )
  }
  return context
}

export const NavigationConsumer = ({ children }) => {
  return (
    <NavigationContext.Consumer>
      {(context) => children(context)}
    </NavigationContext.Consumer>
  )
}
