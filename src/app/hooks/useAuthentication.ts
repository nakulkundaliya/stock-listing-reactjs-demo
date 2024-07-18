import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
} from '@/app/constants/routes';
import { AuthContext } from '@/app/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GUEST_ROUTES = [LOGIN_ROUTE, REGISTER_ROUTE];

const useAuthentication = () => {
  const { user }: any = AuthContext();
  const userInfo = user?.user || null;
  const router = useRouter();
  const currentRoute = window.location.pathname;

  useEffect(() => {
    if (!userInfo && !GUEST_ROUTES.includes(currentRoute)) {
      router.push(LOGIN_ROUTE);
    }

    if (userInfo && GUEST_ROUTES.includes(currentRoute)) {
      router.push(HOME_ROUTE);
    }
  }, []);
};

export default useAuthentication;
