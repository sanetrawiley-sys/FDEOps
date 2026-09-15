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

function generationFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fde-generation-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const referenceRoot = path.join(root, 'skills/fde/references')
  fs.mkdirSync(referenceRoot, { recursive: true })
  fs.writeFileSync(path.join(root, 'skills/fde/SKILL.md'), 'canonical coordinator')
  for (const [name, body] of Object.entries({ 'task-context.md': 'context', 'start.md': '[extra](extra.md)', 'extra.md': 'extra' })) fs.writeFileSync(path.join(referenceRoot, name), body)
  const catalog = [{ name: 'fde-example', method: 'start', description: 'Example task' }]
  const options = { root, referenceRoot, catalog }
  return { root, referenceRoot, options, dest: path.join(root, 'skills/fde-example') }
}

function snapshot(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const target = path.join(dir, e.name)
    return e.isDirectory() ? snapshot(target) : [[target, e.isSymbolicLink() ? fs.readlinkSync(target) : fs.readFileSync(target, 'utf8')]]
  })
}

test('generation prunes obsolete dependencies and removed skills; checks never mutate', t => {
  const f = generationFixture(t)
  generate(false, f.options)
  fs.writeFileSync(path.join(f.referenceRoot, 'start.md'), 'no extra dependency')
  fs.unlinkSync(path.join(f.referenceRoot, 'extra.md'))
  const before = snapshot(f.root)
  assert.throws(() => generate(true, f.options), /Obsolete generated file/)
  assert.deepEqual(snapshot(f.root), before)
  generate(false, f.options)
  assert.equal(fs.existsSync(path.join(f.dest, 'references/extra.md')), false)
  generate(true, f.options)
  const removed = { ...f.options, catalog: [] }
  const beforeRemoval = snapshot(f.root)
  assert.throws(() => generate(true, removed), /Obsolete generated file/)
  assert.deepEqual(snapshot(f.root), beforeRemoval)
  generate(false, removed)
  assert.equal(fs.existsSync(f.dest), false)
  assert.equal(fs.readFileSync(path.join(f.root, 'skills/fde/SKILL.md'), 'utf8'), 'canonical coordinator')
})

test('legacy generated packages migrate safely and can be removed', t => {
  const f = generationFixture(t)
  for (const [rel, body] of expectedFiles(f.options.catalog[0], f.referenceRoot)) {
    fs.mkdirSync(path.dirname(path.join(f.dest, rel)), { recursive: true })
    fs.writeFileSync(path.join(f.dest, rel), body)
  }
  const before = snapshot(f.root)
  assert.throws(() => generate(true, f.options), /Stale generated skill.*fde-generated/)
  assert.deepEqual(snapshot(f.root), before)
  generate(false, f.options)
  generate(true, f.options)
  fs.unlinkSync(path.join(f.dest, '.fde-generated.json'))
  generate(false, { ...f.options, catalog: [] })
  assert.equal(fs.existsSync(f.dest), false)
})

test('unknown additions and unrelated skills are preserved, including on removal', t => {
  const f = generationFixture(t)
  generate(false, f.options)
  const other = path.join(f.root, 'skills/fde-personal')
  fs.mkdirSync(other)
  fs.writeFileSync(path.join(other, 'SKILL.md'), 'personal instructions')
  generate(false, f.options)
  assert.equal(fs.readFileSync(path.join(other, 'SKILL.md'), 'utf8'), 'personal instructions')
  fs.writeFileSync(path.join(f.dest, 'notes.md'), 'user notes')
  const before = snapshot(f.root)
  for (const check of [true, false]) {
    assert.throws(() => generate(check, f.options), /Unowned generated file/)
    assert.throws(() => generate(check, { ...f.options, catalog: [] }), /Unowned generated file/)
    assert.deepEqual(snapshot(f.root), before)
  }
  fs.unlinkSync(path.join(f.dest, 'notes.md'))
  fs.mkdirSync(path.join(f.dest, 'personal'))
  assert.throws(() => generate(false, f.options), /Unowned generated directory/)
  assert.ok(fs.existsSync(path.join(f.dest, 'personal')))
  assert.throws(() => generate(false, { ...f.options, catalog: [{ ...f.options.catalog[0], name: 'fde-personal' }] }), /Unowned skill/)
})

test('modified obsolete files and unrecognized legacy references are preserved', t => {
  const f = generationFixture(t)
  generate(false, f.options)
  fs.writeFileSync(path.join(f.dest, 'references/extra.md'), 'user modification')
  fs.writeFileSync(path.join(f.referenceRoot, 'start.md'), 'no extra dependency')
  assert.throws(() => generate(false, f.options), /Modified obsolete generated file/)
  assert.equal(fs.readFileSync(path.join(f.dest, 'references/extra.md'), 'utf8'), 'user modification')
  fs.unlinkSync(path.join(f.dest, '.fde-generated.json'))
  assert.throws(() => generate(false, f.options), /Unowned generated file/)
})

test('generation refuses target symlinks and never follows them', t => {
  for (const rel of ['', 'SKILL.md', 'references', 'references/extra.md', '.fde-generated.json']) {
    const f = generationFixture(t)
    generate(false, f.options)
    const target = path.join(f.dest, rel)
    const outside = path.join(f.root, 'outside')
    fs.renameSync(target, outside)
    fs.symlinkSync(outside, target)
    const before = snapshot(f.root)
    for (const check of [true, false]) {
      assert.throws(() => generate(check, f.options), /Unsafe generated path|Unowned skill/)
      assert.deepEqual(snapshot(f.root), before)
    }
  }
})

test('generation protects canonical and skills root paths', t => {
  const f = generationFixture(t)
  assert.throws(() => generate(false, { ...f.options, catalog: [{ ...f.options.catalog[0], name: 'fde' }] }), /Invalid generated skill name/)
  const actual = path.join(f.root, 'actual-skills')
  fs.renameSync(path.join(f.root, 'skills'), actual)
  fs.symlinkSync(actual, path.join(f.root, 'skills'))
  assert.throws(() => generate(false, { ...f.options, referenceRoot: path.join(actual, 'fde/references') }), /Unsafe skills root/)
})


test('generation refuses hard links without changing either path', t => {
  for (const rel of ['SKILL.md', 'references/start.md', '.fde-generated.json']) {
    const f = generationFixture(t)
    generate(false, f.options)
    const target = path.join(f.dest, rel)
    const outside = path.join(f.root, 'personal-note.md')
    fs.linkSync(target, outside)
    fs.writeFileSync(path.join(f.referenceRoot, 'start.md'), 'updated canonical')
    const before = snapshot(f.root)
    for (const check of [true, false]) {
      assert.throws(() => generate(check, f.options), /Unsafe generated path/)
      assert.deepEqual(snapshot(f.root), before)
    }
  }
})
