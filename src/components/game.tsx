"use client"
import { useState } from "react"
import Keyboard from "./keyboard"
import { invalidCharacters } from "@/lib/letters"

interface GameProps {
  phrase: string
}

const Game = ({ phrase }: GameProps) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-8">
      <div className="gameboard flex flex-wrap gap-x-14 gap-y-2  rounded-lg bg-primary/5 p-12 max-w-3xl">
        {phrase.split(" ").map((word, wordIdx) => (
          <div key={wordIdx} className="flex gap-2">
            {word.split("").map((char, charIdx) =>
              char === " " ? (
                <div className="w-8" key={charIdx} />
              ) : (
                <div
                  key={charIdx}
                  className="border-2 border-neutral-500 rounded-sm flex items-center justify-center p-2 w-10 h-16"
                >
                  <p className="text-2xl text-foreground font-bold font-mono">
                    {guessedLetters.includes(char) ||
                    invalidCharacters.includes(char)
                      ? char
                      : ""}
                  </p>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <Keyboard
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        phrase={phrase}
      />
    </div>
  )
}
export default Game
