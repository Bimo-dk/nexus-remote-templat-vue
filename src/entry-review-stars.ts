import { createApp } from 'vue';
import { ReviewStars } from './components';

export function mount(el: HTMLElement): () => void {
  const app = createApp(ReviewStars);
  app.mount(el);
  return () => app.unmount();
}

export default ReviewStars;
