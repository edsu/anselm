const path = require('path')
const assert = require('assert')
const vscode = require('vscode')
const anselm = require('../../src/anselm')

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.')

	test('normalize', () => {
		assert.equal(anselm.normalize('Actor'), 'Actor')
		assert.equal(anselm.normalize("Right of passage"), "Right-of-passage")
	})

	test('denormalize', () => {
		assert.equal(anselm.denormalize('Actor'), 'Actor')
		assert.equal(anselm.denormalize('Right-of-passage'), 'Right of passage')
	})

	test('findMarkdownFiles', async () => {
		const paths = await anselm.getMarkdownFiles(path.join(__dirname, '../data'))
		assert.ok(paths[0].match(/test1.md$/))
		assert.ok(paths[1].match(/test2.md$/))
	})

	test('extractCodes', () => {
		const s = 'This is a <mark class="test">test</mark> of <mark class="code">extractCodes</mark>'
		assert.deepEqual(['test', 'code'], anselm.extractCodes(s))	
	})

})
