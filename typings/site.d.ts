import { RevShareProfile } from "./novel";

export interface SiteMetadata {
  site_title: string;
  contact: string;
  global_payment_pointers: RevShareProfile[];
  limit_global_payment_pointers_share_in_novel: string;
  backend_api: string;
  novels: string[];
  cors: string;
  novelsMetadata: any[];
  stale?: boolean;
  disqus_id?: string;
}
export interface Component {
  src: string;
  gridArea: string;
}
