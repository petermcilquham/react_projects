import type { Route } from './+types/home';
import { GameHub } from '~/screens/GameHub';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'GameHub' }, { name: 'description', content: 'GameHub' }];
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function GameHubPage() {
  return <GameHub />;
}
