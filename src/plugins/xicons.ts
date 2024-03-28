import type { App } from "vue";
import {
  AccessibilityOutline,
  HomeOutline,
  ListSharp,
  LogOutOutline,
  MenuOutline,
  Pencil,
  PersonCircleOutline,
  PersonOutline,
  SettingsOutline,
  Aperture,
} from "@vicons/ionicons5";

import { DataVis1, UserRole } from "@vicons/carbon";

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
  Aperture,
  //  carbon start ===========
  UserRole,
  DataVis1,
];

export function setupXIcons(app: App<Element>) {
  xicons.forEach((xicon) => app.component(`i-${xicon.name}`, xicon));
}
