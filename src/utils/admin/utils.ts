import { ws } from "./index";
import {
  faBookmark,
  faCog,
  faMoneyBillAlt,
  faPalette,
  faStar,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

export function runTask(task: string) {
  ws.send(
    JSON.stringify({
      type: "COMMAND",
      task,
    }),
  );
}

export const navLink = [
  {
    label: "Site configurations",
    icon: faCog,
    href: "admin/site-configurations",
  },
  {
    label: "Memberships and patrons",
    icon: faStar,
    href: "admin/memberships-and-patrons",
  },
  {
    label: "Revenue share",
    icon: faMoneyBillAlt,
    href: "admin/revenue-share",
  },
  {
    label: "Themes and layout",
    icon: faPalette,
    href: "admin/themes-and-layout",
  },
  {
    label: "Plugins",
    icon: faTools,
    href: "admin/plugins",
  },
];

export const novelNavLink = [
  {
    label: "Novel Configurations",
    icon: faBookmark,
    href: "admin/novel-configurations",
  },
];
