export function storagePersist() {
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist();
  }
}
