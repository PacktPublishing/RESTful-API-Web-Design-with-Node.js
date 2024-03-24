import fs from 'node:fs/promises'

async function listFileNames(dirPath) {
  const fileNames = []

  const items = await fs.readdir(dirPath, { withFileTypes: true })
  console.log(items)
  for (const item of items) {
    if (item.isFile()) {
      fileNames.push(item.name)
    }
  }
  console.log(`Files in ${dirPath}:`, fileNames)
}

listFileNames('./')
