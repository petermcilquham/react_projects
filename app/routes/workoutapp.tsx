import type { Route } from './+types/home';
import WorkoutApp from '~/screens/WorkoutApp';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Workout App' }, { name: 'description', content: 'Workout App' }];
}

export default function WorkoutPage() {
  return <WorkoutApp />;
}
