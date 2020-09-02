import { useQuery } from 'react-query';
import { User } from 'types';
import getCurrentUser from '../resources/user/getCurrentUser';
import digestUser from '../utils/digestUser';

export default function useCurrentUser(): User | null {
  const response = useQuery('currentUser', () => getCurrentUser());
  const { data } = response;
  return digestUser(data);
}