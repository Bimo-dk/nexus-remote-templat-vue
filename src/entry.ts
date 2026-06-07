// Federation entry — "Bring Your Own Framework" pattern.
//
// Instead of exposing a Vue component (which makes the host responsible
// for picking the right framework runtime), we expose a plain
//   mount(el: HTMLElement): () => void
// function. The remote owns its full lifecycle: it brings its own Vue
// runtime, creates its own app instance, mounts onto the element the
// host hands it, and returns a teardown function the host calls when
// the user navigates away.
//
// This sidesteps every cross-framework runtime mismatch (B-27): the
// host can be Angular, React or vanilla and never has to know what
// framework the remote uses.
//
// To customise: edit the EntryComponent below or import your own SFC
// and pass it to createApp().

import { createApp, defineComponent, h, ref, type App } from 'vue';

declare const __NEXUS_REMOTE_NAME__: string;

const remoteName =
  typeof __NEXUS_REMOTE_NAME__ !== 'undefined' ? __NEXUS_REMOTE_NAME__ : 'remote';

const EntryComponent = defineComponent({
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

export function mount(el: HTMLElement): () => void {
  const app: App = createApp(EntryComponent);
  app.mount(el);
  return () => app.unmount();
}

// Keep a default export so older host runtimes that still call
// `module.default()` get a usable component definition instead of
// nothing. New host runtimes should prefer `mount()` for cross-
// framework safety.
export default EntryComponent;
