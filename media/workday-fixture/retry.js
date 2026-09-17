export function createHandler(store) {
  return async event => {
    const { tenantId, eventId } = event ?? {};
    if (typeof tenantId !== 'string' || !tenantId.trim() ||
        typeof eventId !== 'string' || !eventId.trim()) {
      throw new Error('tenantId and eventId are required');
    }
    // The receiver owns atomic deduplication across retries and handler restarts.
    const key = JSON.stringify([tenantId, eventId]);
    return store.insertOnce(key, event);
  };
}
