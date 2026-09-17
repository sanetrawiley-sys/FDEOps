export function createRouter(classify, queues) {
  return request => {
    const type = classify(request);
    const queue = queues[type];
    if (!queue) return { status: 'review', reason: 'unrecognised request' };
    return { status: 'routed', queue, reason: `classified as ${type}` };
  };
}
