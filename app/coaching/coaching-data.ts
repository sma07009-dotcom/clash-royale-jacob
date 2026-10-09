export type Strategy = "Cycle" | "Bait" | "Beat Down" | "Bridge Spam" | "Control" | "Siege";

export const STRATEGIES: { name: Strategy; note: string }[] = [
  { name: "Cycle", note: "fast pressure" },
  { name: "Bait", note: "force spells" },
  { name: "Beat Down", note: "big pushes" },
  { name: "Bridge Spam", note: "instant punish" },
  { name: "Control", note: "defend first" },
  { name: "Siege", note: "protect setup" },
];

// The prototype has no AI analysis, so each result uses three general coaching
// pointers selected from this pool of twenty.
export const POINTER_POOL = [
  "You are leaking elixir too much. When both players are close to full elixir, the opponent plays first and you wait a few seconds, which can put you about 3-4 elixir behind.",
  "You overcommit on offense. The first push is already dying, then you add more cards, so the defender gets extra value from the same troops.",
  "Your win condition goes in while the opponent still has their main counter ready. Try baiting that counter first, then attack when it is out of cycle.",
  "You defend in the same lane every time. When the opponent builds a big push, pressure the opposite lane so they cannot spend everything on offense.",
  "Your small spell is used too early. Hold Log, Zap, or Arrows until you know whether they are saving swarms for your win condition.",
  "You are stacking support troops too close together. Spread them out so one Fireball, Poison, or splash card cannot hit everything.",
  "Your cycle cards are being played with no purpose. Cheap cards should either defend, chip, pull troops, or help you get back to a key card.",
  "You ignore card rotation after defending. Count how many cards the opponent plays after their building or spell, then attack before that answer returns.",
  "Your tank is placed too early in single elixir. Wait until you have enough elixir to support it or until the opponent commits first.",
  "You miss chances to counterpush. A surviving defender should often become the front of your next attack instead of letting it walk alone.",
  "You play reactive cards proactively. Cards like Skeleton Army, Inferno Tower, or swarm counters are stronger when saved for the threat they answer.",
  "Your bridge pressure is predictable. Mix same-lane and opposite-lane attacks so the opponent cannot pre-place the perfect defense.",
  "You let the opponent activate King Tower too easily. Be careful with Tornado-able win conditions and splash placements near the center.",
  "You spend down to zero elixir without knowing their hand. Keep a little elixir available unless you are sure their punish cards are out of cycle.",
  "Your defensive building is too high. Pull win conditions toward the center so both towers can help and their support troops split up.",
  "You are late with damage spells. If the opponent keeps giving Fireball or Poison value, take it before the support troops cross the bridge.",
  "You use the same first play every match. Rotate between safe cycle cards, waiting, or a light pressure card so opponents cannot read you instantly.",
  "You stop pressuring in double elixir. Faster decks should keep forcing responses so the opponent cannot build one huge push for free.",
  "Your bait cards are not layered well. Force the small spell with Princess, Goblin Gang, or Skeleton Barrel before sending the bigger barrel push.",
  "You defend the tower instead of the matchup. Sometimes taking small damage is fine if it saves the exact card you need for their next real push.",
];

export function pickPointers() {
  const pointers = POINTER_POOL.slice();

  for (let index = pointers.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pointers[index], pointers[swapIndex]] = [pointers[swapIndex], pointers[index]];
  }

  return pointers.slice(0, 3);
}
