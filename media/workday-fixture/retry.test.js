import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from './retry.js';
function receiver() {
 const rows = new Map(); let fail=false;
 return { rows, failNext(){fail=true;},
 async insert(event){if(fail){fail=false;throw Error('receiver unavailable');} const key=String(rows.size);rows.set(key,event);return {created:true};},
 async insertOnce(key,event){if(fail){fail=false;throw Error('receiver unavailable');}if(rows.has(key))return {created:false};rows.set(key,event);return {created:true};}
 };
}
const event={tenantId:'eu-retail',eventId:'evt-1042',amount:1200};
test('first delivery writes one payment',async()=>{const s=receiver();await createHandler(s)(event);assert.equal(s.rows.size,1);});
test('retry after a lost acknowledgement does not duplicate',async()=>{const s=receiver(),h=createHandler(s);await h(event);await h(event);assert.equal(s.rows.size,1);});
test('deduplication survives handler restart',async()=>{const s=receiver();await createHandler(s)(event);await createHandler(s)(event);assert.equal(s.rows.size,1);});
test('different tenants can use the same event ID',async()=>{const s=receiver(),h=createHandler(s);await h(event);await h({...event,tenantId:'uk-retail'});assert.equal(s.rows.size,2);});
test('concurrent redelivery creates one entry',async()=>{const s=receiver(),h=createHandler(s);await Promise.all([h(event),h(event)]);assert.equal(s.rows.size,1);});
test('receiver failure can be retried',async()=>{const s=receiver(),h=createHandler(s);s.failNext();await assert.rejects(h(event));await h(event);assert.equal(s.rows.size,1);});
test('missing identity is rejected before write',async()=>{const s=receiver();await assert.rejects(createHandler(s)({amount:1200}));assert.equal(s.rows.size,0);});
