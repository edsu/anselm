const { window, commands } = require('vscode')

function activate(context) {
	let disposable = commands.registerCommand('extension.code', code)
	context.subscriptions.push(disposable)
}

function deactivate() {
}

async function code() {
	let editor = window.activeTextEditor
	if (editor) {
		let document = editor.document

		const allText = document.getText()
		const codes = allText.match(/<mark class="(.+)">/g) || ['foo', 'bar']

		const code = await getCode(codes)

		let selection = editor.selection
		let text = document.getText(selection)
		let newText = `<mark class="${code}">${text}</mark>`
		editor.edit(editBuilder => {
			editBuilder.replace(selection, newText)
		})
	}
	return true
}

async function getCode(codes) {
	codes = ['foo', 'bar']
	return new Promise((resolve, _) => {
		const quickPick = window.createQuickPick()
		quickPick.placeholder = 'Select (or create) a code.'
		quickPick.selectMany = false
		quickPick.items = codes.map(label => ({ label }))
		quickPick.onDidAccept(_ => {
			const selection = quickPick.activeItems[0]
			resolve(selection.label)
			quickPick.hide()
		})
		quickPick.onDidChangeValue(_ => {
			quickPick.items = ['x', 'y'] //[quickPick.value, ...codes]
		})
		quickPick.onDidHide(() => quickPick.dispose())
		quickPick.show()
	})
}

module.exports = {
	activate,
	deactivate
}
