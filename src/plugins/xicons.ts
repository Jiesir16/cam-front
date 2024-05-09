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
  HeartOutline,
  BookmarkOutline,
  TicketOutline,
  SendOutline,
  NavigateOutline,
} from "@vicons/ionicons5";

import { DataVis1, UserRole ,Building,Rss,Password} from "@vicons/carbon";

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
  HeartOutline,
  BookmarkOutline,
  TicketOutline,
  SendOutline,
  NavigateOutline,
  //  carbon start ===========
  UserRole,
  DataVis1,
  Building,
  Rss,
  Password,
];

export function setupXIcons(app: App<Element>) {
  xicons.forEach((xicon) => app.component(`i-${xicon.name}`, xicon));
}
