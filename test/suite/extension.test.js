const assert = require('assert')
const vscode = require('vscode')
const anselm = require('../../anselm')

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

})
