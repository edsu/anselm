const fs = require('fs')
const path = require('path')
const walk = require('walk')
const { window, commands, workspace } = require('vscode')

function activate(context) {
  let disposable = commands.registerCommand('anselm.code', code)
  context.subscriptions.push(disposable)
}

function deactivate() {
}

async function code() {
  const codes = await getCurrentCodes()
  const editor = window.activeTextEditor

  if (editor) {

    // prompt the user for the code to apply
    const code = await getCode(codes)

    // update the document
    let document = editor.document
    let selection = editor.selection
    let text = document.getText(selection)
    let newText = `<mark class="${normalize(code)}">${text}</mark>`
    editor.edit(editBuilder => {
      editBuilder.replace(selection, newText)
    })
  }

  return true
}

async function getCurrentCodes() {
  let codes = []

  // first look across the whole workspace for markdown files
  if (workspace.workspaceFolders) {
    for (const path of await getMarkdownFiles(workspace.workspaceFolders[0].uri.path)) {
      const text = fs.readFileSync(path, 'utf8')
      for (const code of extractCodes(text)) {
        if (! codes.includes(code)) {
          codes.push(code)
        }
      }
    }
  }

  // also look in the current window
  if (window.activeTextEditor) {
    for (let code of extractCodes(window.activeTextEditor.document.getText())) {
      if (! codes.includes(code)) {
        codes.push(code)
      }
    }
  }

  // return the codes sorted alphabetically
  return codes.sort((a, b) => a.localeCompare(b))
}

function extractCodes(text) {
  const codes = []
  const matches = [...text.matchAll(/<mark class="(.+?)">/g)]
  if (matches.length > 0) {
    for (const match of matches) {
      for (code of match[1].split(/ +/)) {
        code = denormalize(code)
        if (! codes.includes(code)) {
          codes.push(denormalize(code))
        }
      }
    }
  }
  return codes
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

function normalize(s) {
  let newS = s.replace(/ /g, '-')
  return newS
}

function denormalize(s) {
  let newS = s.replace(/-/g, ' ')
  return newS
}

function getMarkdownFiles(dirPath) {
  const files = []
  return new Promise((resolve) => {
    const walker = walk.walk(dirPath)

    walker.on("file", (root, fileStats, next) => {
      if (fileStats.name.match(/.(md|markdown)$/)) {
        files.push(path.join(root, fileStats.name))
      }
      next()
    })

    walker.on("end", () => {
      resolve(files)
    })

  })
}

module.exports = {
  activate,
  deactivate,
  normalize,
  denormalize,
  getMarkdownFiles,
  extractCodes
}
