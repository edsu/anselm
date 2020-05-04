const fs = require('fs')
const path = require('path')
const walk = require('walk')

/**
 * Returns a list of the current codes in the workspace.
 * @param {*} workspace 
 */
async function getCurrentCodes(workspace, window) {
  const codeMap = await getCodeMap(workspace, window)
  const codes = Array.from(codeMap.keys())
  return codes.sort((a, b) => a.localeCompare(b))
}

/**
 * Returns a mapping of codes to a mapping of files 
 * and the number of times the code appears in that file.
 * @param {*} workspace 
 */
async function getCodeMap(workspace, window) {
  const codes = new Map()

  const activeFile = window.activeTextEditor ? window.activeTextEditor.document.uri.path
 : null

  if (workspace.workspaceFolders) {
    for (const path of await getMarkdownFiles(workspace.rootPath)) {
      const text = fs.readFileSync(path, 'utf8')
      for (const code of extractCodes(text)) {
        const files = codes.get(code) || new Map()
        if (path !== activeFile) {
          files.set(path, (files.get(path) || 0) + 1)
          codes.set(code, files)
        }
      }
    }
  }

  if (activeFile) {
    for (let code of extractCodes(window.activeTextEditor.document.getText())) {
      const files = codes.get(code) || new Map()
      files.set(activeFile, (files.get(activeFile) || 0) + 1)
      codes.set(code, files)
    }
  }

  return codes
}

function extractCodes(text) {
  const codes = []
  const matches = [...text.matchAll(/<mark class="(.+?)">/g)]
  if (matches.length > 0) {
    for (const match of matches) {
      for (let code of match[1].split(/ +/)) {
        code = denormalize(code)
        if (code) {
          codes.push(denormalize(code))
        }
      }
    }
  }
  
  return codes
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
  getCodeMap,
  getCurrentCodes,
  getMarkdownFiles,
  extractCodes,
  normalize,
  denormalize
}
