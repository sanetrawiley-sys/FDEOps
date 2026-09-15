const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const catalog = require('../bin/skill-catalog')
const { expectedFiles, referencesFor, generate } = require('../bin/generate-skills')
const source = path.resolve(__dirname, '../skills/fde/references')

test('selective skill installations contain canonical dependency closures and local links', t => {
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'fde-skills-isolated-'))
  t.after(() => fs.rmSync(isolated, { recursive: true, force: true }))
  for (const item of catalog) {
    const dir = path.join(isolated, item.name)
    fs.cpSync(path.resolve(__dirname, '../skills', item.name), dir, { recursive: true })
    for (const [relative, body] of expectedFiles(item)) {
      assert.equal(fs.readFileSync(path.join(dir, relative), 'utf8'), body)
      for (const match of body.matchAll(/\]\(([^)]+\.md)(?:#[^)]*)?\)/g)) {
        if (/^https?:/.test(match[1])) continue
        const target = path.resolve(path.dirname(path.join(dir, relative)), match[1])
        assert.ok(target.startsWith(dir + path.sep), `${relative} escapes skill: ${match[1]}`)
        assert.ok(fs.existsSync(target), `${relative} missing ${match[1]}`)
      }
    }
    assert.ok(fs.existsSync(path.join(dir, 'references', item.method + '.md')))
    assert.ok(fs.existsSync(path.join(dir, 'references/task-context.md')))
  }
  generate(true)
})

test('reference discovery follows transitive links and terminates cycles', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fde-closure-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  fs.writeFileSync(path.join(dir, 'task-context.md'), 'context')
  fs.writeFileSync(path.join(dir, 'start.md'), '[next](next.md#section)')
  fs.writeFileSync(path.join(dir, 'next.md'), '[start](start.md)')
  assert.deepEqual(referencesFor('start', dir), ['next.md', 'start.md', 'task-context.md'])
  fs.writeFileSync(path.join(dir, 'next.md'), '[missing](missing.md)')
  assert.throws(() => referencesFor('start', dir), /Nonportable instruction link/)
  fs.writeFileSync(path.join(dir, 'next.md'), '[escape](../outside.md)')
  assert.throws(() => referencesFor('start', dir), /Nonportable instruction link/)
})

test('catalog names are unique and standalone methods are routed by the coordinator', () => {
  assert.equal(new Set(catalog.map(s => s.name)).size, catalog.length)
  const router = fs.readFileSync(path.resolve(source, '../SKILL.md'), 'utf8')
  for (const item of catalog) {
    assert.match(item.name, /^fde-[a-z-]+$/)
    assert.ok(router.includes(`references/${item.method}.md`), item.name)
  }
})
