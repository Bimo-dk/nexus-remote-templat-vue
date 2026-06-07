// Federation entry. Built as a plain Vue component (not an SFC) so it
// compiles into a single chunk with a usable default export. SFCs with
// `<script setup>` get split by Vite into a side-effect-only facade
// chunk plus a separate <script> chunk, which leaves the federated
// entry chunk effectively empty. See B-26.
//
// Customise the template here; you can also `import OtherSFC from
// './other.vue'` and embed it via `h(OtherSFC)` — that flows through
// the same chunk and renders normally.

import { defineComponent, h, ref } from 'vue';

declare const __NEXUS_REMOTE_NAME__: string;

const remoteName =
  typeof __NEXUS_REMOTE_NAME__ !== 'undefined' ? __NEXUS_REMOTE_NAME__ : 'remote';

export default defineComponent({
  name: 'NexusRemoteEntry',
  setup() {
    const count = ref(0);
    return () =>
      h(
        'section',
        {
          style:
            'background:white;border:2px solid #6366f1;border-radius:12px;padding:24px;box-shadow:0 4px 12px rgba(99,102,241,.08);',
        },
        [
          h('h2', { style: 'margin:0 0 16px;color:#4338ca;' }, `${remoteName} entry component`),
          h(
            'p',
            null,
            `This is the federated entry of the "${remoteName}" Vue remote — replace it with your own component.`,
          ),
          h('p', null, [
            'Counter: ',
            h('strong', null, String(count.value)),
            ' ',
            h(
              'button',
              {
                type: 'button',
                style: 'margin-left:8px;',
                onClick: () => (count.value += 1),
              },
              '+1',
            ),
          ]),
        ],
      );
  },
});
