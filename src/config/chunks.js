const getChunks = (arr, size) => arr && Array
  .from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))


module.exports = {
  getChunks
}