import type { Route } from './+types/home';
import { Apod } from '../screens/Apod';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Daily Astronomy Picture' }, { name: 'description', content: 'Astronomy Picture of the Day' }];
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function ApodPage() {
  return <Apod />;
}
