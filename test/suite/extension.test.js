const path = require('path')
const assert = require('assert')
const vscode = require('vscode')
const utils = require('../../src/utils')

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.')

	test('normalize', () => {
		assert.equal(utils.normalize('Actor'), 'Actor')
		assert.equal(utils.normalize("Right of passage"), "Right-of-passage")
	})

	test('denormalize', () => {
		assert.equal(utils.denormalize('Actor'), 'Actor')
		assert.equal(utils.denormalize('Right-of-passage'), 'Right of passage')
	})

	test('getMarkdownFiles', async () => {
		const paths = await utils.getMarkdownFiles(path.join(__dirname, '../data'))
		assert.ok(paths[0].match(/test1.md$/))
		assert.ok(paths[1].match(/test2.md$/))
	})

	test('extractCodes', () => {
		const s = 'This is a <mark class="test">test</mark> of <mark class="code">extractCodes</mark>'
		assert.deepEqual(['test', 'code'], utils.extractCodes(s))	
	})

})
