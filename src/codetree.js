const vscode = require('vscode')
const utils = require('./utils')

const _onDidChangeTreeData = new vscode.EventEmitter()

class CodeTreeProvider {

  constructor(workspace, window) {
    this.workspace = workspace
    this.window = window
    this.codeMap = null
    this.onDidChangeTreeData = _onDidChangeTreeData.event
  }

  refresh() {
    this.codeMap = null
    console.log('refreshing!')
    _onDidChangeTreeData.fire()
  }

  getTreeItem(element) {
    return element
  }

  getChildren(element) {
    if (element) {
      return this.getFiles(element.label)
    } else {
      return this.getCodes()
    }
  }

  async getCodes() {
    const codes = []
    const codeMap = await this.getCodeMap()
    for (const [code, files] of codeMap) {
      const totalCount = Array.from(files.values()).reduce((sum, n) => sum + n)
      codes.push(new Code(code, totalCount, vscode.TreeItemCollapsibleState.Collapsed))
    }
    return codes.sort((a, b) => a.code.localeCompare(b.code))
  }

  async getFiles(label) {
    // remove file count portion of label so we can look up the code
    const code = label.replace(/ \(\d+\)$/, '')
    const files = []
    const codeMap = await this.getCodeMap()
    for (const [path, count] of codeMap.get(code)) {
      files.push(new CodedFile(code, this.workspace, path, count))
    }
    return files
  }

  async getCodeMap() {
    if (this.codeMap === null) {
      this.codeMap = await utils.getCodeMap(this.workspace, this.window)
    }
    return this.codeMap
  }

}


class Code extends vscode.TreeItem {

  constructor(code, numFiles, collapsibleState) {
    super(`${code} (${numFiles})`, collapsibleState)
    this.numFiles = numFiles
    this.code = code
  }

  toolTip() {
    return `${this.label} (${this.numFiles})`
  }

  description() {
    return `${this.label} desc`
  }

}


class CodedFile extends vscode.TreeItem {

  constructor(code, workspace, path, count) {
    if (! path.replace) console.log(code, count)
    const relPath = path.replace(workspace.rootPath + '/', '')
    const label = `${relPath} (${count})`
    super(label, vscode.TreeItemCollapsibleState.None)
    this.code = code
    this.workspace = workspace
    this.path = path
    this.relPath = relPath
    this.count = count
    this.command = {
      command: "vscode.open",
      title: "Open",
      arguments: [vscode.Uri.file(path)]
    }
  }

}

module.exports = CodeTreeProvider