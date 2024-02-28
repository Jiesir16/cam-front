import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { setupNaive } from "./plugins";

async function bootstrap() {
  const app = createApp(App);

  setupNaive(app);

  app.use(router);
  app.use(createPinia());
  app.mount("#app");
}

void bootstrap();
