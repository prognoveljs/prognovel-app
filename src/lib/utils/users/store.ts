import { get as getIDB, set as setIDB } from "idb-keyval";
import { credentialMode } from "$lib/store/states";

export const IDB_PREFIX_CREDENTIAL_MODE: string = "login-credential-mode";

export type CredentialMode = "prompt" | "silent" | "none";

export async function signInCredentialModeInit(): Promise<void> {
  const mode: CredentialMode = await getIDB(IDB_PREFIX_CREDENTIAL_MODE);

  if (!mode) return;

  credentialMode.set(mode);
}

export async function setCredentialMode(mode: CredentialMode): Promise<void> {
  credentialMode.set(mode);
  await setIDB(IDB_PREFIX_CREDENTIAL_MODE, mode);
}
