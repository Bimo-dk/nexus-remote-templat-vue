<template>
  <section style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);">
    <h2 style="margin: 0 0 16px; color: #4338ca;">__REMOTE_NAME__ entry component</h2>
    <p>You can safely delete all boilerplate in this file — it is your remote's primary entry. It is exposed as <code>./RemoteEntry</code> and loaded dynamically by the host.</p>
    <p>Route: <code>/__REMOTE_ROUTE__</code></p>
    <p>
      Counter: <strong>{{ count }}</strong>
      <button type="button" style="margin-left: 8px;" @click="count++">+1</button>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
</script>
