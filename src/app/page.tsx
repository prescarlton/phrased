import Game from "@/components/game"

export default function Home() {
  const phrase =
    "Lorem Ipsum o-r sit amet lore ipum dolor sit amet".toUpperCase()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-12">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-primary">phrased.</h1>
        <h3 className="text-xl text-secondary-foreground">
          like if wheel of fortune and wordle had a baby
        </h3>
        <Game phrase={phrase} />
      </div>
    </main>
  )
}
