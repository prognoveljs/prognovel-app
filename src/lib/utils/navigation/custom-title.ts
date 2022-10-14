import { writable, Writable } from "svelte/store";

export const customBreadcrumbTitle: Writable<string> = writable("");

type BreadcrubChildren = {
  [child: string]: {
    label: string;
    href: string;
  };
};
export const customBreadcrubChildren: Writable<BreadcrubChildren> = writable({});
