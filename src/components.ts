// Three demo components the Vue remote exposes. In a real shop you'd
// replace these with cart widgets, product cards, review stars, etc.
// Each one is wired into the federation manifest from vite.config.ts
// and gets its own catalog.json entry so the portal can display it
// in the Component Catalog.

import { defineComponent, h, ref } from 'vue';

declare const __NEXUS_REMOTE_NAME__: string;
const remoteName =
  typeof __NEXUS_REMOTE_NAME__ !== 'undefined' ? __NEXUS_REMOTE_NAME__ : 'vue';

export const ProductCard = defineComponent({
  name: 'VueProductCard',
  setup() {
    const liked = ref(false);
    return () =>
      h('article', { style: 'border:1px solid #c7d2fe;border-radius:12px;padding:16px;background:#eef2ff;' }, [
        h('h3', { style: 'margin:0 0 8px;color:#3730a3;' }, `${remoteName}: ProductCard`),
        h('p', { style: 'margin:0 0 12px;color:#4338ca;font-size:13px;' }, 'A Vue product card component.'),
        h('div', { style: 'display:flex;justify-content:space-between;align-items:center;' }, [
          h('strong', { style: 'color:#3730a3;' }, '$ 42.00'),
          h(
            'button',
            {
              type: 'button',
              style: `padding:6px 12px;border-radius:6px;border:0;cursor:pointer;background:${liked.value ? '#dc2626' : '#6366f1'};color:#fff;`,
              onClick: () => (liked.value = !liked.value),
            },
            liked.value ? '❤ Liked' : 'Like',
          ),
        ]),
      ]);
  },
});

export const CartWidget = defineComponent({
  name: 'VueCartWidget',
  setup() {
    const count = ref(0);
    return () =>
      h('div', { style: 'border:1px solid #bbf7d0;border-radius:12px;padding:16px;background:#f0fdf4;' }, [
        h('h3', { style: 'margin:0 0 8px;color:#166534;' }, `${remoteName}: CartWidget`),
        h('p', { style: 'margin:0 0 12px;color:#14532d;font-size:13px;' }, 'A Vue cart widget tracking item count.'),
        h('div', { style: 'display:flex;align-items:center;gap:12px;' }, [
          h(
            'button',
            {
              type: 'button',
              style: 'padding:6px 12px;border-radius:6px;border:0;cursor:pointer;background:#16a34a;color:#fff;',
              onClick: () => (count.value += 1),
            },
            'Add to cart',
          ),
          h('strong', { style: 'color:#166534;' }, `${count.value} item${count.value === 1 ? '' : 's'}`),
        ]),
      ]);
  },
});

export const ReviewStars = defineComponent({
  name: 'VueReviewStars',
  setup() {
    const stars = ref(0);
    return () =>
      h('div', { style: 'border:1px solid #fde68a;border-radius:12px;padding:16px;background:#fef9c3;' }, [
        h('h3', { style: 'margin:0 0 8px;color:#854d0e;' }, `${remoteName}: ReviewStars`),
        h('p', { style: 'margin:0 0 12px;color:#713f12;font-size:13px;' }, 'A Vue rating component.'),
        h(
          'div',
          { style: 'display:flex;gap:6px;font-size:24px;cursor:pointer;' },
          [1, 2, 3, 4, 5].map((n) =>
            h(
              'span',
              {
                style: `color:${stars.value >= n ? '#f59e0b' : '#e5e7eb'};`,
                onClick: () => (stars.value = n),
              },
              '★',
            ),
          ),
        ),
      ]);
  },
});
