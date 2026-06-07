import { createApp } from 'vue';
import { CartWidget } from './components';

export function mount(el: HTMLElement): () => void {
  const app = createApp(CartWidget);
  app.mount(el);
  return () => app.unmount();
}

export default CartWidget;
