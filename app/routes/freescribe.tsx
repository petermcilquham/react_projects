import type { Route } from './+types/home';
import Freescribe from '~/screens/Freescribe';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Freescribe App' }, { name: 'description', content: 'Freescribe App' }];
}

export default function FreescribePage() {
  return <Freescribe />;
}
