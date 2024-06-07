import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-primary">phrased.</h1>
        <h3 className="text-xl text-secondary-foreground">
          like if wheel of fortune and wordle had a baby
        </h3>
      </div>
    </main>
  )
}
