import type { App } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();

const piniaPersisted = createPersistedState({
  storage: sessionStorage,
  key: (id) => `__persisted__${id}`,
});



export function setupStore(app: App<Element>) {
  store.use(piniaPersisted);
  app.use(store);
}

export { store,piniaPersisted };
