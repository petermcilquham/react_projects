import type { Route } from './+types/home';
import Gym from '~/screens/Gym';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Gym' }, { name: 'description', content: 'Gym' }];
}

export default function TenziesPage() {
  return <Gym />;
}
