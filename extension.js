const { window, commands } = require('vscode')

function activate(context) {
	let disposable = commands.registerCommand('extension.code', code)
	context.subscriptions.push(disposable)
}

// exports.activate = activate;

function deactivate() {
}

async function code() {
	let editor = window.activeTextEditor
	if (editor) {
		const code = await getCode()
		let document = editor.document
		let selection = editor.selection

		let text = document.getText(selection)
		let newText = `<mark class="${code}">${text}</mark>`
		editor.edit(editBuilder => {
			editBuilder.replace(selection, newText)
		})
	}
	return true
}

async function getCode() {
	const result = await window.showInputBox({
		placeHolder: 'Enter your code'
	})
	return result
}

module.exports = {
	activate,
	deactivate
}
