"use client"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Button } from "./ui/button"

interface KeyboardProps {
  guessedLetters: string[]
  setGuessedLetters: Dispatch<SetStateAction<string[]>>
  phrase: string
}

const Keyboard = ({
  guessedLetters,
  setGuessedLetters,
  phrase,
}: KeyboardProps) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  const guessLetter = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter])
    }
  }

  const isValidLetter = (letter: string) =>
    guessedLetters.includes(letter) && phrase.includes(letter)

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      // if the key is a letter, log it
      if (e.key.match(/^[a-z]$/)) {
        guessLetter(e.key.toUpperCase())
      }
    })
    return () => {
      document.removeEventListener("keyup", (e) => {
        // if the key is a letter, log it
        if (e.key.match(/^[a-z]$/)) {
          guessLetter(e.key.toUpperCase())
        }
      })
    }
  }, [])

  return (
    <div className="flex flex-col gap-1 items-center">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => (
            <Button
              key={key}
              disabled={guessedLetters.includes(key)}
              className={`h-14 font-mono text-lg ${isValidLetter(key) ? "bg-lime-500 text-black" : ""}`}
              onClick={() => guessLetter(key)}
            >
              {key.toUpperCase()}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}
export default Keyboard
