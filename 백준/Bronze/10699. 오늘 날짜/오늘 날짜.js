const solution = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = twoDigits(today.getMonth() + 1)
  const date = twoDigits(today.getDate())

  console.log(`${year}-${month}-${date}`)
}

function twoDigits(num) {
  return num < 10 ? '0'+num : num
}

solution()