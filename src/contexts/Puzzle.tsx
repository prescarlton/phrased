import { createContext, ReactElement, useState } from "react"
import GameOverDialog from "../components/Dialogs/GameOver"
import GameWonDialog from "../components/Dialogs/GameWon"
import WelcomeDialog from "../components/Dialogs/Welcome"
import puzzles from "../puzzles"
import { Puzzle } from "../types/Puzzle"
import confetti from "canvas-confetti"
import _ from "lodash"

type GameStatus = "start" | "playing" | "lost" | "won"

interface PuzzleContextInterface {
  puzzle: Puzzle
  getNewPuzzle: () => void
  getPuzzleWords: () => string[]
  guessedLetters: string[]
  guessLetter: (letter: string) => void
  misses: number
  gameStatus: GameStatus
  updateGameStatus: (status: GameStatus) => void
  resetGame: () => void
  showWelcomeDialog: () => void
  showGameOverDialog: () => void
  calcMaxGuesses: () => number
  attemptSolvePuzzle: (value: string) => void
  maxGuesses: number
}
interface DefaultPuzzleState {
  puzzle: Puzzle
  guessedLetters: string[]
  misses: number
  gameStatus: GameStatus
}

// letters to exclude from guessing, and always render
export const invalidLetters = [" ", "'", "!", "?", ",", "&", "."]

const PuzzleContext = createContext({} as PuzzleContextInterface)
export default PuzzleContext

export const PuzzleProvider = ({ children }: { children: ReactElement }) => {
  // select a random puzzle to start with
  const randomPuzzle = () => puzzles[Math.floor(Math.random() * puzzles.length)]
  const testPuzzle: Puzzle = {
    id: "lkdflkwqjebrqlkwebrjq",
    value: "ORGANICALLY GROWN CHILDREN",
    category: "Phrase",
  }

  const defaultStates: DefaultPuzzleState = {
    puzzle: randomPuzzle(),
    guessedLetters: [],
    misses: 0,
    gameStatus: "playing",
  }

  const [puzzle, setPuzzle] = useState<Puzzle>(defaultStates.puzzle)
  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    defaultStates.guessedLetters
  )
  const [guesses, setGuesses] = useState(defaultStates.misses)
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    defaultStates.gameStatus
  )
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)
  const [showGameOverDialog, setShowGameOverDialog] = useState(false)
  const [showGameWonDialog, setShowGameWonDialog] = useState(false)

  const openWelcomeDialog = () => setShowWelcomeDialog(true)
  const closeWelcomeDialog = () => setShowWelcomeDialog(false)
  const openGameOverDialog = () => setShowGameOverDialog(true)
  const closeGameOverDialog = () => setShowGameOverDialog(false)
  const openGameWonDialog = () => setShowGameWonDialog(true)
  const closeGameWonDialog = () => setShowGameWonDialog(false)

  // number of missed letters a player can have
  const calcMaxGuesses = () => {
    return Math.ceil(_.uniq(getPuzzleLetters()).length / 1.2)
  }
  const maxGuesses = 5

  // returns random puzzle from list of puzzles
  const getNewPuzzle = () => {
    const index = Math.floor(Math.random() * puzzles.length)
    setPuzzle(puzzles[index])
  }

  // returns list of all words in the puzzle
  const getPuzzleWords = () => {
    return puzzle.value.split(" ")
  }
  // returns list of all letters in the puzzle
  const getPuzzleLetters = () => {
    return [...new Set(puzzle.value.split(""))].filter(
      (letter) => !invalidLetters.includes(letter)
    )
  }

  // checks if all letters have been guessed
  // takes in a list of guessed letters rather than
  // reading from state to account for state not being
  // updated in the same render cycle this is being called in.
  const guessedAllLetters = (letters: string[]) => {
    for (const letter of getPuzzleLetters())
      if (!letters.includes(letter)) return false
    return true
  }

  // handle user guessing a letter
  const guessLetter = (letter: string) => {
    // if the letter has already been guessed, do nothing
    if (guessedLetters.includes(letter)) {
      return
    } else {
      // else, add it to the list
      setGuessedLetters([...guessedLetters, letter])
      if (guessedAllLetters([...guessedLetters, letter])) handleGameWon()
    }
    if (!getPuzzleLetters().includes(letter)) {
      setGuesses(guesses + 1)
      if (guesses + 1 >= maxGuesses) handleGameOver()
    }
  }

  // solve the puzzle
  const attemptSolvePuzzle = (value: string) => {
    if (value == puzzle.value) {
      revealAllLetters()
      handleGameWon()
    }
  }

  // if the user is really that bad, reveal all the letters
  const revealAllLetters = () => {
    setGuessedLetters([...guessedLetters, ...getPuzzleLetters()])
  }

  // handle what happens when user is dumb enough to hit the max # of misses
  const handleGameOver = () => {
    setGameStatus("lost")
    revealAllLetters()
    setTimeout(() => openGameOverDialog(), 1000)
  }

  // handle what happens when the user wins the game
  const handleGameWon = () => {
    setGameStatus("won")
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setTimeout(() => openGameWonDialog(), 750)
  }

  // handle updating gameStatus
  const updateGameStatus = (status: GameStatus) => {
    setGameStatus(status)
  }

  // handle resetting everything
  const resetGame = () => {
    setGameStatus(defaultStates.gameStatus)
    setGuessedLetters(defaultStates.guessedLetters)
    setGuesses(defaultStates.misses)
    setPuzzle(defaultStates.puzzle)
  }

  return (
    <PuzzleContext.Provider
      value={{
        puzzle,
        getNewPuzzle,
        getPuzzleWords,
        guessedLetters,
        guessLetter,
        misses: guesses,
        gameStatus,
        updateGameStatus,
        resetGame,
        showWelcomeDialog: openWelcomeDialog,
        showGameOverDialog: openGameOverDialog,
        calcMaxGuesses,
        attemptSolvePuzzle,
        maxGuesses,
      }}>
      {children}
      <WelcomeDialog open={showWelcomeDialog} onClose={closeWelcomeDialog} />
      <GameOverDialog open={showGameOverDialog} onClose={closeGameOverDialog} />
      <GameWonDialog open={showGameWonDialog} onClose={closeGameWonDialog} />
    </PuzzleContext.Provider>
  )
}
