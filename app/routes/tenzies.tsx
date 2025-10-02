import type { Route } from './+types/home';
import { Tenzies } from '~/screens/Tenzies';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Tenzies Game' }, { name: 'description', content: 'Tenzies Game' }];
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function TenziesPage() {
  return <Tenzies />;
}
