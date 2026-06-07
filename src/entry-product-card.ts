import { createApp } from 'vue';
import { ProductCard } from './components';

export function mount(el: HTMLElement): () => void {
  const app = createApp(ProductCard);
  app.mount(el);
  return () => app.unmount();
}

export default ProductCard;
