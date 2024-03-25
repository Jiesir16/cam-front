import { createApp } from "vue";
import App from "@/App.vue";
import { setupStore } from "@/stores";
import { setupNaive } from "@/plugins";
import router from "@/router";
import { setupXIcons } from "@/plugins/xicons.ts";

async function bootstrap() {
  const app = createApp(App);

  setupNaive(app);
  setupXIcons(app);
  // 两种集成方法
  // setUp
  setupStore(app);
  // app.use
  app.use(router);
  app.mount("#app");
}

void bootstrap();
