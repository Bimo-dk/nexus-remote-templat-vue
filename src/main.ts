import { createApp } from 'vue';
import { VueNexusRemotePlugin } from '@bimo-dk/nexus-runtime-vue';
import App from './app.vue';

declare const __NEXUS_REMOTE_NAME__: string;
declare const __NEXUS_TOKEN__: string;
declare const __NEXUS_REGISTRY_URL__: string;

const app = createApp(App);

app.use(VueNexusRemotePlugin, {
  name: __NEXUS_REMOTE_NAME__,
  url: `${window.location.origin}/remoteEntry.json`,
  exposedModule: './RemoteEntry',
  routePath: '__REMOTE_ROUTE__',
  registryUrl: __NEXUS_REGISTRY_URL__,
  token: __NEXUS_TOKEN__,
});

app.mount('#app');
