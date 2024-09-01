import { useAppSelector } from '.';

export const useAuth = () => useAppSelector((state) => state.authorizationStatus);
