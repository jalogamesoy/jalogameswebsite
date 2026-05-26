import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GameCard } from "@/components/games/GameCard";
import { getGamesInOrder } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Three worlds in active development at JaloGames — Ramba Bull, Grace Run, and Stealin Apples. The proof that our brand campaigns ship at studio quality.",
  alternates: { canonical: "/games" },
};

export default function GamesIndexPage() {
  const games = getGamesInOrder();

  return (
    <>
      <PageHeader
        eyebrow="— Our universes —"
        title="Three worlds in development."
        description="The studio's own slate. Every title here is the proof you'll see in our brand work."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <li key={game.slug}>
              <GameCard game={game} priority={i === 0} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
