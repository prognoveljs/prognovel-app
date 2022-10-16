import { errorMessages } from "$lib/store/states";
import uuid from "short-uuid";

interface ErrorMessageNotification {
  id?: string;
  title?: string;
  message?: string;
}

export function showErrorMessage(err: ErrorMessageNotification = {}): void {
  if (!err?.id) err.id = uuid().generate();
  errorMessages.update((e) => [...(e || []), err]);
}
