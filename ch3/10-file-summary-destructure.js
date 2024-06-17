import { readFile } from 'node:fs/promises'

async function readFileContent(filePath) {
  const text = await readFile(filePath,'utf-8')
  console.log(text)
}

readFileContent('./10-file-summary-destructure.js')
