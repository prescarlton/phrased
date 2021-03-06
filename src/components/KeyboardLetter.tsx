import { Button } from "@mui/material"
import { useContext } from "react"
import PuzzleContext from "../contexts/Puzzle"

const KeyboardLetter = ({ letter }: { letter: string }) => {
  const { guessLetter, guessedLetters, gameStatus } = useContext(PuzzleContext)
  return (
    <Button
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D5D5D5",
        p: 1,
        borderRadius: 1,
        width: {
          xs: 30,
          lg: 48,
        },
        height: {
          xs: 48,
          lg: 64,
        },
        minWidth: 0,
        userSelect: "none",
        cursor: "pointer",
        color: "black",
        "&:hover": {
          color: "primary.main",
          backgroundColor: "#D5D5D5",
        },
        "&:disabled": {
          backgroundColor: "#9D9D9D",
        },
        transition: ".2s ease-in all",
      }}
      onClick={() => guessLetter(letter.toUpperCase())}
      disabled={
        guessedLetters.includes(letter.toUpperCase()) || gameStatus != "playing"
      }>
      {letter}
    </Button>
  )
}

export default KeyboardLetter
