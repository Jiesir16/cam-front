import { Component, h, resolveComponent } from "vue";
import { NIcon } from "naive-ui";

export const renderIcon = (icon: string | Component) => {
  return () => {
    return h(NIcon, null, {
      // default slot
      default: () =>
        typeof icon === "string"
          ? h(resolveComponent(icon) as Component)
          : h(icon),
    });
  };
};

export const renderTab = (icon: string | Component, label: string) => {
  // 返回一个 VNodeChild
  return () => {
    return h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: '3px',
        },
      },
      [
        h(
          NIcon,
          { size: 15 },
          {
            default: () =>
              typeof icon === "string"
                ? h(resolveComponent(icon) as Component)
                : h(icon),
          },
        ),
        label,
      ],
    );
  };
};
