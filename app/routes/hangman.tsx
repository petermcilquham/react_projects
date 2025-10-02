import type { Route } from './+types/home';
import { Hangman } from '../screens/Hangman';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Hangman Game' }, { name: 'description', content: 'Hangman Game' }];
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function HangmanPage() {
  return <Hangman />;
}
