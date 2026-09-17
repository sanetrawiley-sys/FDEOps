import test from 'node:test';
import assert from 'node:assert/strict';
import { createRouter } from './triage.js';

const route = createRouter(request => request.type, {
  billing: 'Billing', access: 'IT', incident: 'Support'
});

test('routes billing requests', () => assert.deepEqual(route({ type: 'billing' }), {
  status: 'routed', queue: 'Billing', reason: 'classified as billing'
}));
test('routes access requests', () => assert.equal(route({ type: 'access' }).queue, 'IT'));
test('routes incident requests', () => assert.equal(route({ type: 'incident' }).queue, 'Support'));
test('keeps unknown requests with a human reviewer', () => assert.equal(route({ type: 'other' }).status, 'review'));
test('records why a request was routed', () => assert.match(route({ type: 'billing' }).reason, /billing/));
test('does not route a request without a type', () => assert.equal(route({}).status, 'review'));
