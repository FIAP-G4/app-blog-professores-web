import { Disclosure, DisclosurePanel } from '@headlessui/react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import NavigationMenu from './NavigationMenu';
import MobileMenuBtn from './MobileMenuBtn';
import Header from './Header';
import MainContent from './MainContent';
import ProfileMenu from './ProfileMenu';
import { getNavigation } from '@/utils/getNavigation';
import { Footer } from './Footer';

const Navbar = ({ children }) => {
  const location = useLocation();
  const { availableNavigation, authenticatedNavigation } = useNavigation();

  const { isAuthenticated, isTeacher } = useAuth();

  const navigation = getNavigation({
    isAuthenticated,
    isTeacher,
    availableNavigation,
    authenticatedNavigation,
  });

  let currentNavigationItem = navigation.find(item => item.href === location.pathname)

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img alt="Your Company" src="/assets/logo.png" className="h-8 w-8" />
              </div>
              {/* NAVIGATION MENU */}
              <NavigationMenu navigation={navigation} location={location} isMobile={false} />
            </div>
            {/* PROFILE MENU */}
            <ProfileMenu isMobile={false} />
            {/* <ProfileMenu isMobile={false} /> */}
            <MobileMenuBtn />            
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          {/* MOBILE NAVIGATION MENU */}
          <NavigationMenu navigation={navigation} location={location} isMobile={true} />
          {/* PROFILE MENU MOBILE */}
          <ProfileMenu isMobile={true} />          
        </DisclosurePanel>
      </Disclosure>
      <Header>{currentNavigationItem ? currentNavigationItem.name : ''}</Header>
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Navbar;
