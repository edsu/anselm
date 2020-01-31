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

		const codes = getCurrentCodes(document.getText())
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

function getCurrentCodes(text) {
	const codes = []
	const matches = [...text.matchAll(/<mark class="(.+)">/g)]
	if (matches.length > 0) {
		for (const match of matches) {
			for (code of match[1].split(/ +/)) {
				codes.push(code)
			}
		}
	}
	return codes.sort()
}

async function getCode(codes) {
  return new Promise((resolve) => {
    const quickPick = window.createQuickPick()
    quickPick.placeholder = 'Select (or create) a code.'
		quickPick.selectMany = false
    quickPick.items = codes.map(label => ({ label }))
    quickPick.onDidAccept(() => {
      const selection = quickPick.activeItems[0]
      resolve(selection.label)
      quickPick.hide()
    })
    quickPick.onDidChangeValue(() => {
			// add a new code to the pick list as the first item
			if (! codes.includes(quickPick.value)) {
				const newItems = [quickPick.value, ...codes].map(label => ({ label }))
				quickPick.items = newItems
			}
    })
    quickPick.onDidHide(() => quickPick.dispose())
    quickPick.show()
  })
}

module.exports = {
  activate,
  deactivate
}
