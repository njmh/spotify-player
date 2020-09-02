import { User } from 'types';
import digestImages from './digestImages';

export default function digestUser(userData: any) : User | null {
  if (!userData) return null;

  const {
    uri,
    href,
    display_name: displayName,
  } = userData;

  const images = digestImages(userData.images);
  const initials: string = displayName ? displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '';

  const user: User = {
    uri,
    href,
    displayName,
    initials,
    image: images[0],
  };

  return user;
}
