const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
    // console.log(this.word)
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if ( this.displayWord.includes(letter) ) return
    if ( this.word.includes(letter) ) {
      let tempDisplayWord = this.displayWord.split("")
      for (let i=0; i<this.word.length; i++) {
        if(letter === this.word[i]) {
          tempDisplayWord[i] = letter
        }
      }
      this.displayWord = tempDisplayWord.join("")
      this.correctLetters.push(letter)
    } else {
      if ( this.incorrectLetters.join("").includes(letter) ) return
      this.remainingGuesses--
      this.incorrectLetters.push(letter)
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const remainingGuessesElement = document.getElementById('remaining-guesses')
    remainingGuessesElement.textContent = this.remainingGuesses
    const incorrectLettersElement = document.getElementById('incorrect-letters')
    incorrectLettersElement.textContent = this.incorrectLetters
    const wordToGuessElement = document.getElementById('word-to-guess')
    wordToGuessElement.textContent = this.displayWord
  }

  // implement the isGameOver function:
  isGameOver() {
    return (this.remainingGuesses <= 0 || this.displayWord === this.word) 
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if ( this.remainingGuesses > 0 && this.displayWord === this.word ) return "win"
    if ( this.remainingGuesses <= 0 && this.displayWord != this.word ) return "loss"
    return null
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()