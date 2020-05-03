const vscode = require('vscode')

class CodeTreeProvider {

  constructor() {
  }
  
  getTreeItem(element) {
    return element
  }

  getChildren(element) {
    if (element) {
      return Promise.resolve(
        this.getFiles(element.label)
      )
    } else {
      return Promise.resolve(
        this.getCodes()
      )
    }
  }

  getCodes() {
    return [
      new Code('Power', vscode.TreeItemCollapsibleState.Collapsed),
      new Code('Material', vscode.TreeItemCollapsibleState.Collapsed),
      new Code('Agency', vscode.TreeItemCollapsibleState.Collapsed)
    ]
  }

  getFiles(code) {
    return [
      new CodedFile('foo.md'),
      new CodedFile('bar.md'),
      new CodedFile('baz.md')
    ]
  }

}


class Code extends vscode.TreeItem {

  constructor(label, collapsibleState) {
    super(label, collapsibleState)
  }

  toolTip() {
    return `${this.label} tip`
  }

  description() {
    return `${this.label} desc`
  }

}


class CodedFile extends vscode.TreeItem {

  constructor(label, collapsibleState) {
    super(label, collapsibleState)
  }

  toolTip() {
    return `${this.label} ftip`
  }

  description() {
    return `${this.label} fdesc`
  }

}

module.exports = CodeTreeProvider