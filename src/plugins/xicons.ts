import type { App } from "vue";
import {
  AccessibilityOutline,
  HomeOutline,
  LogOutOutline,
  MenuOutline,
  Pencil,
  PersonCircleOutline,
  PersonOutline,
  SettingsOutline,
  ListSharp,
} from "@vicons/ionicons5";

import { UserRole } from "@vicons/carbon";

const xicons = [
  AccessibilityOutline,
  HomeOutline,
  PersonCircleOutline,
  SettingsOutline,
  PersonOutline,
  Pencil,
  LogOutOutline,
  MenuOutline,
  ListSharp,
  //  carbon start ===========
  UserRole,
];

export function setupXIcons(app: App<Element>) {
  xicons.forEach((xicon) => app.component(`i-${xicon.name}`, xicon));
}
