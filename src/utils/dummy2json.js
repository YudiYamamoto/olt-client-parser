const dummy2json = (chunk, columns, skipLine = 3) => {
  const header = []
  const data = []

  const lines = chunk.split(/\n/)
  for (const [numOfLine, line] of lines.entries()) {
    if (line.trim().split('').every(char => char === '-')) continue
    const element = {}
    for (const [col, position] of columns.entries()) {
      const [start, end] = position
      const value = line.substring(start, end).trim()
      if (!header[col]) header[col] = ''
      const name = header[col]
      if (numOfLine > skipLine) {
        element[name] = value
        continue
      }
      header[col] += `${value}`
    }
    if (JSON.stringify(element) !== '{}') data.push(element)
  }
  return data
}

module.exports = dummy2json