import { get, set } from "idb-keyval";
import { credentialMode } from "store/states";

export const IDB_PREFIX_CREDENTIAL_MODE: string = "login-credential-mode";

export type CredentialMode = "prompt" | "silent" | "none";

export async function signInCredentialModeInit(): Promise<void> {
  const mode: CredentialMode = await get(IDB_PREFIX_CREDENTIAL_MODE);

  if (!mode) return;

  credentialMode.set(mode);
}

export async function setCredentialMode(mode: CredentialMode): Promise<void> {
  credentialMode.set(mode);
  await set(IDB_PREFIX_CREDENTIAL_MODE, mode);
}
