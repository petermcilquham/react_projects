import type { Route } from './+types/home';
import { MemeGen } from '../screens/MemeGen';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Meme Generator' }, { name: 'description', content: 'Meme Generator' }];
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function MemeGenPage() {
  return <MemeGen />;
}
