import type { App } from "vue";
import {
  AccessibilityOutline,
  HomeOutline,
  LogOutOutline as LogoutIcon,
  MenuOutline,
  Pencil as EditIcon,
  PersonCircleOutline,
  PersonOutline,
  SettingsOutline,
} from "@vicons/ionicons5";

import { UserRole } from "@vicons/carbon";

const xicons = [
  AccessibilityOutline,
  HomeOutline,
  PersonCircleOutline,
  SettingsOutline,
  PersonOutline,
  EditIcon,
  LogoutIcon,
  MenuOutline,
  //  carbon start ===========
  UserRole,
];

export function setupXIcons(app: App<Element>) {
  xicons.forEach((xicon) => app.component(`i-${xicon.name}`, xicon));
}
