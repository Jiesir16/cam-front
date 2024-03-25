import { Component, h, resolveComponent } from "vue";
import { NIcon } from "naive-ui";

export const renderIcon = (icon: string | Component) => {
  return () => {
    return h(NIcon, null, {
      default: () =>
        typeof icon === "string"
          ? h(resolveComponent(icon) as Component)
          : h(icon),
    });
  };
};
