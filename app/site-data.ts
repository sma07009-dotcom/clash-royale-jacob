export type NavKey = "learn" | "decks" | "strategies" | "synergies" | "glossary" | "progress" | "coaching";

export type NavigationItem = {
  key: NavKey;
  label: string;
  href: string;
  required?: number;
};

export type ResearchSource = {
  kind: "Website" | "Video";
  label: string;
  href: string;
};

export type DeckItem = {
  name: string;
  style: string;
  averageElixir: string;
  cards: string[];
  summary: string;
  bestInto: string;
  cons: string[];
};

export type StrategyItem = {
  name: string;
  cards: string[];
  summary: string;
  howToPlay: string;
  pros: string[];
  cons: string[];
};

export type SynergyItem = {
  cards: string[];
  summary: string;
  bestUseCases: string;
  pros: string[];
  cons: string[];
};

export type GlossaryItem = {
  term: string;
  meaning: string;
  example: string;
};

export const navigation: NavigationItem[] = [
  { key: "learn", label: "Learn", href: "/" },
  { key: "decks", label: "Decks", href: "/decks", required: 2 },
  { key: "strategies", label: "Strategies", href: "/strategies" },
  { key: "synergies", label: "Synergies", href: "/synergies", required: 4 },
  { key: "glossary", label: "Glossary", href: "/glossary" },
  { key: "progress", label: "Progress", href: "/progress", required: 6 },
  { key: "coaching", label: "Coaching", href: "/coaching", required: 8 },
];

export const researchSources: ResearchSource[] = [
  {
    kind: "Website",
    label: "Supercell: Final August Balance Changes (Aug 4, 2026)",
    href: "https://supercell.com/en/games/clashroyale/blog/news/final-august-balance-changes-826/",
  },
  {
    kind: "Website",
    label: "DeckShop: New Meta! decks (August 2026)",
    href: "https://www.deckshop.pro/best-decks/for/new-meta",
  },
  {
    kind: "Website",
    label: "RoyaleAPI: current decks and card stats",
    href: "https://royaleapi.com/decks/popular",
  },
  {
    kind: "Video",
    label: "SirTagCR: TOP 5 DECKS from the BEST PLAYERS IN THE WORLD! (July 2026)",
    href: "https://www.youtube.com/watch?v=p_TloWASvgo",
  },
  {
    kind: "Video",
    label: "Vlakx: TOP 20 Best Decks in Clash Royale (July 2026)",
    href: "https://www.youtube.com/watch?v=B-u6yv9qAPY",
  },
];

export const decks: DeckItem[] = [
  {
    name: "Royal Hogs Recruits Fireball Cage",
    style: "Control",
    averageElixir: "4.1",
    cards: [
      "Evo Royal Recruits",
      "Royal Hogs",
      "Evo Goblin Cage",
      "Zappies",
      "Flying Machine",
      "Fireball",
      "Arrows",
      "Barbarian Barrel",
    ],
    summary:
      "Split the lane, force awkward answers, and let Recruits plus Cage soak the counterpush while Royal Hogs keep pressure on the tower.",
    bestInto:
      "Best when the opponent relies on one-lane defense or needs a slow setup before their push becomes dangerous.",
    cons: [
      "If you miss the split pressure, the deck can feel slow.",
      "Bad Fireball timing makes it harder to close games.",
      "Fast cycle decks can out-rotate your main punish cards.",
    ],
  },
  {
    name: "Evo Royal Giant Evo Ghost Hero Goblins",
    style: "Bridge Spam",
    averageElixir: "3.1",
    cards: [
      "Evo Royal Giant",
      "Hero Goblins",
      "Evo Royal Ghost",
      "Fisherman",
      "Hunter",
      "Electro Spirit",
      "Fireball",
      "Barbarian Barrel",
    ],
    summary:
      "Defend cleanly, pull defenders out of position with Fisherman, then place Royal Giant where the opponent cannot answer efficiently.",
    bestInto:
      "Great into medium-tank decks and lineups that cannot cleanly handle Fisherman pulls or Hunter at close range.",
    cons: [
      "Needs careful Fisherman placement to stay efficient.",
      "Bad RG drops give away your biggest elixir swing.",
      "Heavy spell decks can blunt the push if you overcommit.",
    ],
  },
  {
    name: "Evo Goblin Cage Splash Yard",
    style: "Control",
    averageElixir: "3.5",
    cards: [
      "Evo Knight",
      "Graveyard",
      "Evo Goblin Cage",
      "Ice Wizard",
      "Baby Dragon",
      "Poison",
      "Tornado",
      "Barbarian Barrel",
    ],
    summary:
      "Defend with Cage, Ice Wizard, and Tornado, then turn every surviving troop into Graveyard value with Poison on top.",
    bestInto:
      "Very strong into swarm-heavy decks, bridge spam, and games where you can lock down the lane before dropping Graveyard.",
    cons: [
      "Damage comes slowly if you rush Graveyard.",
      "Poison and Tornado both need precise timing.",
      "Strong pressure decks can keep you from setting up.",
    ],
  },
  {
    name: "Evo Mortar Skeleton Barrel Cannon Cart Royal Chef",
    style: "Siege",
    averageElixir: "3.3",
    cards: [
      "Evo Skeleton Barrel",
      "Cannon Cart",
      "Evo Mortar",
      "Berserker",
      "Ice Wizard",
      "Goblin Gang",
      "Fireball",
      "Barbarian Barrel",
    ],
    summary:
      "Threaten the tower from multiple angles and keep the opponent guessing which card is the real answer every cycle.",
    bestInto:
      "Good into players who only keep one reliable answer to siege or who overreact when Mortar gets placed.",
    cons: [
      "Requires precise Mortar placement.",
      "If you mismanage elixir, the counterpush can snowball.",
      "Fast bridge spam can punish both siege cards at once.",
    ],
  },
  {
    name: "Miner Balloon Musketeer cycle",
    style: "Cycle",
    averageElixir: "2.9",
    cards: [
      "Evo Musketeer",
      "Miner",
      "Evo Skeletons",
      "Balloon",
      "Ice Golem",
      "Bomb Tower",
      "Barbarian Barrel",
      "Giant Snowball",
    ],
    summary:
      "Chip with Miner, threaten Balloon when anti-air is out of cycle, and let Musketeer hold the defense while you keep the pace high.",
    bestInto:
      "Excellent versus decks with one expensive air answer or any lineup that gives you a small elixir lead to work with.",
    cons: [
      "One bad Balloon attempt can waste your whole lead.",
      "You must track air counters very carefully.",
      "The deck can feel fragile if you fall behind early.",
    ],
  },
];

export const strategies: StrategyItem[] = [
  {
    name: "Bait",
    cards: ["Goblin Barrel", "Skeleton Barrel", "Goblin Gang"],
    summary:
      "Bait decks force the opponent to use an important spell or counter, then punish once that answer is out of rotation.",
    howToPlay:
      "Vary your placements and timing so the opponent cannot predict the same barrel, swarm, or pressure card every cycle. Once their small spell is gone, stack the next bait threat quickly.",
    pros: [
      "Very fast cycle speed",
      "Forces predictable defensive responses",
      "Strong cheap defense with swarm cards",
    ],
    cons: [
      "Needs spell tracking",
      "Bad swarm placement gives easy spell value",
      "Takes practice to play unpredictably",
    ],
  },
  {
    name: "Cycle",
    cards: ["Hog Rider", "Ice Spirit", "Skeletons"],
    summary:
      "Cycle decks use cheap cards to rotate back to one or two main win conditions faster than the opponent can reach their counters.",
    howToPlay:
      "Defend with the lowest-cost answer that works, keep the pressure constant, and use repeated chip damage to win instead of waiting for one giant push.",
    pros: [
      "Extremely fast pace",
      "Great at out-rotating buildings and counters",
      "Can cycle evolutions quickly",
    ],
    cons: [
      "Needs precise placements",
      "Underleveled cards lose value quickly",
      "Small mistakes can snowball",
    ],
  },
  {
    name: "Beatdown",
    cards: ["Golem", "Night Witch", "Lightning"],
    summary:
      "Beatdown decks build a huge push behind a tank, then use support troops and spells to clear the way to the tower.",
    howToPlay:
      "Stay patient in single elixir, collect information, and build your biggest pushes when you have enough elixir to place support behind the tank.",
    pros: [
      "Beginner friendly structure",
      "Very strong in double and triple elixir",
      "Can overwhelm imperfect defenses",
    ],
    cons: [
      "Slow early game",
      "Can struggle against fast cycle pressure",
      "Matchup dependent against hard counters",
    ],
  },
  {
    name: "Bridge Spam",
    cards: ["Bandit", "Royal Ghost", "P.E.K.K.A"],
    summary:
      "Bridge Spam decks pressure fast from the bridge with cards that demand quick, accurate answers from the opponent.",
    howToPlay:
      "Punish when the opponent spends too much elixir, then pressure with fast troops at the bridge before they can reset their defense.",
    pros: [
      "Easy to create pressure",
      "Punishes defensive mistakes hard",
      "Individual attacks deal meaningful chip damage",
    ],
    cons: [
      "Can become predictable",
      "Defense can feel weaker than offense",
      "Large tank matchups can be difficult",
    ],
  },
  {
    name: "Control",
    cards: ["Miner", "Poison", "Fireball"],
    summary:
      "Control decks slow the game down, defend efficiently, and win through repeated chip damage instead of one massive attack.",
    howToPlay:
      "Stay calm, avoid overcommitting, and make the opponent's plays feel forced. Use spells and small pressure to control the pace of the match.",
    pros: [
      "Strong defensive versatility",
      "Excellent for patient players",
      "Rewards good elixir management",
    ],
    cons: [
      "Very high skill barrier",
      "One big mistake is hard to recover from",
      "Requires a lot of matchup knowledge",
    ],
  },
  {
    name: "Siege",
    cards: ["X-Bow", "Mortar", "Tesla"],
    summary:
      "Siege decks use a building as the win condition, then defend that building long enough for it to lock onto the tower.",
    howToPlay:
      "Place the siege building when you can protect it, use defensive support to stop counterpushes, and rely on spells when the opponent keeps defending cleanly.",
    pros: [
      "Forces immediate counterplay",
      "Can pressure without crossing the bridge",
      "Very strong when mastered",
    ],
    cons: [
      "Patterns can become predictable",
      "Needs high-level win-condition buildings",
      "Often requires defending at an elixir disadvantage",
    ],
  },
];

export const synergies: SynergyItem[] = [
  {
    cards: ["Evo Royal Giant", "Fisherman"],
    summary:
      "The pull support drags buildings, tanks, or mini-tanks out of the win condition's path so it gets extra tower shots instead of walking into a clean stop.",
    bestUseCases:
      "Use it when the opponent depends on a central building, ground tank, or melee defender to keep your tower-targeting card away.",
    pros: [
      "Simple two-card pressure",
      "Great at breaking building defenses",
      "The support card can defend before the counterpush",
    ],
    cons: [
      "Needs careful pull support placement",
      "Air-heavy decks care less about the pull",
      "Fast cycle can out-rotate the combo",
    ],
  },
  {
    cards: ["Hog Rider", "Firecracker Evolution"],
    summary:
      "The bridge pressure forces a quick defensive answer while the ranged splash support chips from far away and punishes swarms or troops stacked behind a building.",
    bestUseCases:
      "Best when the opponent's spell is out of cycle or when their building placement gives the ranged support a tower-splash line.",
    pros: [
      "Very easy pressure pattern",
      "Forces awkward spell choices",
      "Can get damage even when Hog is stopped",
    ],
    cons: [
      "The support card can be spelled early",
      "A pull spell can ruin the lane setup",
      "Needs support if the opponent has a sturdy building ready",
    ],
  },
  {
    cards: ["Miner", "Balloon"],
    summary:
      "The chip card tanks the tower and distracts key defenders while the air win condition threatens a huge hit if the opponent's answer is late or out of cycle.",
    bestUseCases:
      "Use it when the opponent only has one reliable anti-air card, or after they spend a building or ranged troop on defense.",
    pros: [
      "Huge punish potential",
      "Works well as a surprise pressure play",
      "The tanking card can force awkward targeting",
    ],
    cons: [
      "Bad air-push timing wastes the push",
      "Can be expensive if you need a spell too",
      "Fast anti-air cycle can shut it down",
    ],
  },
  {
    cards: ["Evo Mortar", "Skeleton Barrel", "Cannon Cart"],
    summary:
      "The siege card makes the opponent answer the middle of the arena, the aerial bait pressures the tower, and the ranged pressure card punishes defenders that step into the lane.",
    bestUseCases:
      "Use it when the opponent overcommits to stopping the siege card or spends their small spell before the aerial bait reaches the tower.",
    pros: [
      "Creates pressure in two spots",
      "Baits small spells well",
      "The ranged pressure card makes the defense harder to ignore",
    ],
    cons: [
      "Can be tricky to pilot",
      "Weak if the opponent saves splash and spell",
      "Can give up a counterpush if you stack it too early",
    ],
  },
  {
    cards: ["Graveyard", "Poison", "Tornado", "Ice Wizard"],
    summary:
      "The pull groups defenders, the slow effect weakens the counterpush, the area spell controls the lane, and the win condition turns that control into tower damage.",
    bestUseCases:
      "Best after a defensive stop, or when you can force the opponent to defend inside an area spell that already controls the lane.",
    pros: [
      "Excellent control package",
      "Very strong into swarms",
      "Reliable chip damage over time",
    ],
    cons: [
      "More expensive than it looks",
      "Needs calm placement",
      "Can be held in check by constant pressure",
    ],
  },
];

export const glossary: GlossaryItem[] = [
  {
    term: "Elixir",
    meaning:
      "Elixir is the purple resource you spend to play cards. It fills slowly during the match, and every card has an elixir cost.",
    example:
      "If you have 10 elixir and play P.E.K.K.A. for 7, you only have 3 elixir left to defend or support it.",
  },
  {
    term: "Win condition",
    meaning:
      "A win condition is the main card your deck uses to damage the enemy tower. Most decks are built around getting value from this card.",
    example:
      "Hog Rider, Royal Giant, Balloon, Graveyard, X-Bow, Mortar, and Miner are common win conditions.",
  },
  {
    term: "Cycle",
    meaning:
      "Cycle means moving through your cards quickly so you can get back to an important card before your opponent gets back to their answer.",
    example:
      "A Hog Rider deck might use Skeletons and Ice Spirit to cycle back to Hog Rider before the opponent has their building again.",
  },
  {
    term: "Rotation",
    meaning:
      "Rotation is the current order of cards in a player's hand and deck. Tracking rotation helps you know what answers your opponent has ready.",
    example:
      "If the opponent just used Cannon, their building may be out of rotation, so your next Hog Rider has a better chance to connect.",
  },
  {
    term: "Positive elixir trade",
    meaning:
      "A positive elixir trade happens when you spend less elixir defending than your opponent spent attacking.",
    example:
      "Using 1-elixir Skeletons plus tower damage to stop a 4-elixir Mini P.E.K.K.A. is a strong positive trade.",
  },
  {
    term: "Overcommit",
    meaning:
      "Overcommitting means spending too much elixir on one play, usually leaving yourself weak to the opponent's next attack.",
    example:
      "Playing Balloon, Freeze, and Rage all at once can be an overcommit if the opponent defends and you have no elixir left.",
  },
  {
    term: "Punish",
    meaning:
      "Punishing means attacking quickly because the opponent just spent a lot of elixir or used an important defensive card.",
    example:
      "If the opponent plays Golem in the back, you can punish by attacking the opposite lane before their push is ready.",
  },
  {
    term: "Counterpush",
    meaning:
      "A counterpush starts when your defensive cards survive and then become part of your attack.",
    example:
      "If Knight survives after defending, you can place Graveyard while the Knight tanks for the skeletons.",
  },
  {
    term: "Chip damage",
    meaning:
      "Chip damage is small tower damage repeated over time instead of one huge push.",
    example:
      "Miner hits, Poison damage, Fireball damage, and small Goblin Barrel hits are all ways to chip a tower down.",
  },
  {
    term: "Splash damage",
    meaning:
      "Splash damage hits multiple troops at once, making it useful against swarms and grouped-up support cards.",
    example:
      "Valkyrie, Baby Dragon, Wizard, Executioner, and Bomber can clear groups instead of hitting only one troop.",
  },
  {
    term: "Kiting or pulling",
    meaning:
      "Kiting or pulling means placing a card so an enemy troop walks away from your tower or into the middle of the arena.",
    example:
      "Ice Golem can pull P.E.K.K.A. toward the middle, giving both towers more time to help defend.",
  },
  {
    term: "Spell bait",
    meaning:
      "Spell bait means using multiple cards that tempt the same spell, then attacking once that spell is gone.",
    example:
      "Goblin Barrel and Goblin Gang both bait The Log. If the opponent Logs the gang, Barrel becomes harder to stop.",
  },
];
