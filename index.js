const init = async () => {
  let wrongAttempts = 1
  const maxAttempts = 11
  const wordsToGuess = await fetch('words.json').then(res => res.json())
  const wordToGuess = wordsToGuess[Math.floor(Math.random() * Math.floor(wordsToGuess.length))]
  const wordWrapper = document.querySelector('.word-wrapper')
  const wordLetters = wordToGuess.split('')
  const usedLetters = []

  wordLetters.forEach(() => {
    const letter = document.createElement('span')
    letter.classList.add('letter')
    wordWrapper.append(letter)
  })

  const endGame = (event, text) => {
    event.target.remove()
    const endGameText = document.createElement('h2')
    endGameText.innerText = text
    endGameText.classList.add('end-game-text')
    document.querySelector('.wrapper').prepend(endGameText)
  }

  document.querySelector('.letter-input').addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      const { value } = event.target
      if (!usedLetters.includes(value)) {
        const valueIndexes = []
        usedLetters.push(value)
        wordLetters.forEach((letter, i) => letter === value && valueIndexes.push(i))

        if (valueIndexes.length) {
          valueIndexes.forEach((valueIndex) => {
            const letter = document.querySelectorAll('.letter')[valueIndex]
            letter.innerText = value
            letter.classList.add('found')
          })
          if (document.querySelectorAll('.letter.found').length === wordLetters.length) {
            endGame(event, 'Yassssss you won')
          }
        } else {
          document.querySelector(`.piece-${wrongAttempts}`).classList.add('is-visible')
          wrongAttempts++
          if (wrongAttempts === maxAttempts) {
            endGame(event, 'Ops you lost')
          }
        }
      }
      event.target.value = ''
    }
  })
}

init()
