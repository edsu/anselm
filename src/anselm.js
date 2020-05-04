const { window, commands, workspace } = require('vscode')
const CodeTreeProvider = require('./codetree')
const utils = require('./utils')

window.registerTreeDataProvider('anselm.codeTree', new CodeTreeProvider(window, workspace))

function activate(context) {
  console.log('Anselm activated.')
  let disposable = commands.registerCommand('anselm.code', code)
  context.subscriptions.push(disposable)
}

function deactivate() {
  console.log('Anselm deactivated.')
}

async function code() {
  const codes = await utils.getCurrentCodes(workspace)
  const editor = window.activeTextEditor

  if (editor) {

    // prompt the user for the code to apply
    const code = await getCode(codes)

    // update the document
    let document = editor.document
    let selection = editor.selection
    let text = document.getText(selection)
    let newText = `<mark class="${utils.normalize(code)}">${text}</mark>`
    editor.edit(editBuilder => {
      editBuilder.replace(selection, newText)
    })
  }

  return true
}

function getCode(codes) {
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
  deactivate,
}
