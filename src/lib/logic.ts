import "./index.css";

export enum Suit {
  Hearts = "hearts",
  Diamonds = "diamonds",
  Clubs = "clubs",
  Spades = "spades",
}

function getSuitText(suit: Suit) {
  switch (suit) {
    case "hearts":
      return "\u2665";
    case "diamonds":
      return "\u2666";
    case "clubs":
      return "\u2667";
    case "spades":
      return "\u2660";
    default:
      return "?";
  }
}

function getRankText(rank: Rank) {
  switch (rank) {
    case Rank.Two:
      return "2";
    case Rank.Ace:
      return "A";
    case Rank.King:
      return "K";
    case Rank.Queen:
      return "Q";
    case Rank.Jack:
      return "J";
    case Rank.Ten:
      return "10";
    case Rank.Nine:
      return "9";
    case Rank.Eight:
      return "8";
    case Rank.Seven:
      return "7";
    case Rank.Six:
      return "6";
    case Rank.Five:
      return "5";
    case Rank.Four:
      return "4";
    case Rank.Three:
      return "3";
    default:
      return "?";
  }
}

export function cardToString(card: Card) {
  return getRankText(card.rank) + getSuitText(card.suit);
}

export enum Rank {
  Two = 13, //twos are high in this game
  Ace = 12,
  King = 11,
  Queen = 10,
  Jack = 9,
  Ten = 8,
  Nine = 7,
  Eight = 6,
  Seven = 5,
  Six = 4,
  Five = 3,
  Four = 2,
  Three = 1,
}

export enum CardSequenceKind {
  None = "none",

  OneOfAKind = "one of a kind",
  TwoOfAKind = "two of a kind",
  ThreeOfAKind = "three of a kind",
  FourOfAKind = "four of a kind",

  RunOfThree = "run of three",
  RunOfFour = "run of four",
  RunOfFive = "run of five",
  RunOfSix = "run of six",
  RunOfSeven = "run of seven",
  RunOfEight = "run of eight",
  RunOfNine = "run of nine",
  RunOfTen = "run of ten",
  RunOfEleven = "run of eleven",
  RunOfTwelve = "run of twelve",
  RunOfThirteen = "run of thirteen",

  RunOfThreePairs = "run of three pairs",
  RunOfFourPairs = "run of four pairs",
  RunOfFivePairs = "run of five pairs",
  RunOfSixPairs = "run of six pairs",

  RunOfThreeTriples = "run of three triples",
  RunOfFourTriples = "run of four triples",
}

export enum PlayerStatus {
  InRound = "in",
  PassedRound = "passed",
}

export class Play {
  /** @description falsy cards indicates player passes */
  constructor(public player: Player, public cards: CardSequence = undefined) {}
}
export class Card {
  constructor(public rank: Rank = Rank.Ace, public suit: Suit = Suit.Hearts) {}

  public toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

/**  */
export type CardSequence = Card[];

export type Deck = Card[];
export type DiscardPile = CardSequence[];
export class Player {
  constructor(
    public name = "player",
    public order: number = 0,
    public cards: Card[] = undefined,
    public status: PlayerStatus = PlayerStatus.InRound,
    public current = false
  ) {}

  public toString() {
    return `Player ${this.name} with ${this?.cards?.length} cards remaining`;
  }
}

export function getActivePlayers(state: GameState) {
  return state.players.filter((p) => p.status === PlayerStatus.InRound);
}
export function getPassedPlayers(state: GameState) {
  return state.players.filter((p) => p.status === PlayerStatus.PassedRound);
}
export function setCurrentPlayer(state: GameState, player: Player) {
  state.players.forEach((p) => (p.current = false));
  player.current = true;
}
export function getCurrentPlayer(state: GameState) {
  return state.players.filter((p) => p.current)[0];
}
export class GameState {
  constructor(
    public players: Player[],
    public discardPile: CardSequence[],
    public message: string,
    public error: string
  ) {}
}

function orderByCardRank(a: Card, b: Card) {
  if (a.rank > b.rank) return 1;
  else if (a.rank < b.rank) return -1;
  return 0;
}

function orderByPlayerOrder(a: Player, b: Player) {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  return 0;
}

export function orderBy(orderByProp: string, asc = true) {
  return (a: any, b: any) => {
    if (a[orderByProp] > b[orderByProp]) return asc ? 1 : -1;
    else if (a[orderByProp] < b[orderByProp]) return asc ? -1 : 1;
    return 0;
  };
}

function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function dealCards(deck: Deck, players: Player[]) {
  if (players.length > 4 || players.length < 2) {
    throw new Error("invalid Player length");
  }
  shuffle(deck);
  players.forEach((player) => (player.cards = deck.splice(0, 13)));
}

function enumKeys<
  O extends Record<string, unknown>,
  K extends keyof O = keyof O
>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function createDeck(): Deck {
  const deck = [];
  for (const suit of enumKeys(Suit)) {
    for (const rank of enumKeys(Rank)) {
      deck.push({ suit: Suit[suit], rank: Rank[rank] });
    }
  }
  return deck;
}

export function getPlayersCards(players: Player[]) {
  return players
    .map((p) => p.cards)
    .reduce((all, current) => [...all, ...current]);
}

export function getNextPlayer(current: Player, players: Player[]) {
  const sorted = [...players].sort(orderByPlayerOrder);
  const index = sorted.indexOf(current);
  if (index === -1) throw new Error("Player not found");
  return index === players.length - 1 ? players[0] : players[index + 1];
}

export function findOfAKinds(cards: CardSequence): CardSequence[] {
  const sorted = [...cards].sort(orderByCardRank);
  let currentSeq: CardSequence = [];
  const sequences: CardSequence[] = [currentSeq];
  while (sorted.length > 0) {
    const card = sorted.shift();
    if (
      currentSeq.length === 0 ||
      currentSeq[currentSeq.length - 1].rank === card.rank
    ) {
      currentSeq.push(card);
    } else {
      currentSeq = [card];
      sequences.push(currentSeq);
    }
  }
  return sequences;
}

export function findRuns(cards: CardSequence): CardSequence[] {
  const sorted = [...cards].sort(orderByCardRank);
  let currentSeq: CardSequence = [];
  const sequences: CardSequence[] = [currentSeq];
  sorted.forEach((card) => {
    if (
      currentSeq.length === 0 ||
      currentSeq[currentSeq.length - 1].rank + 1 === card.rank
    ) {
      //theres no current sequence
      //or the card does sequentially follows the curr seq
      currentSeq.push(card);
    } else {
      // current sequence is broken, add it to the return list
      sequences.push(currentSeq);

      // current card is start of new sequence
      currentSeq = [card];
    }
  });
  return sequences;
}

function removeCardsFromPlayer(
  player: Player,
  cards: CardSequence
): CardSequence {
  cards.forEach((c) => {
    const index = player.cards.indexOf(c);
    if (index > -1) player.cards.splice(index, 1);
    else throw new Error(`Player does not have card ${c}`);
  });
  return cards;
}

export function transitionState(
  state: GameState = undefined,
  command: Play = undefined
): GameState {
  if (!state) {
    // no previous state so generate a new game
    const players = [
      new Player("A", 0),
      new Player("B", 1),
      new Player("C", 2),
      new Player("D", 3),
    ];
    const nextState: GameState = {
      players,
      error: "",
      discardPile: [],
      message: `New Game! Waiting on ${players[0]}`,
    };
    setCurrentPlayer(nextState, nextState.players[0]);
    dealCards(createDeck(), nextState.players);
    nextState.players[0].current = true;
    return nextState;
  }

  if (getCurrentPlayer(state) !== command.player) {
    return {
      ...state,
      error: `It is not ${command.player.name}'s turn. It is ${
        getCurrentPlayer(state).name
      }'s turn.`,
    };
  }

  if (!command.cards) {
    // no cards indicates Player passes and is out for remainder of the Round
    command.player.status = PlayerStatus.PassedRound;
    const nextState = {
      ...state,
      error: "",
    };

    // current player is the next player of the remaining players in the round
    setCurrentPlayer(
      nextState,
      getNextPlayer(command.player, nextState.players)
    );

    nextState.message = `${command.player.name} passes. Waiting on ${
      getCurrentPlayer(nextState).name
    }`;
    return nextState;
  }

  if (
    getActivePlayers(state).length === 1 &&
    getPlayersCards(state.players).length === 0
  ) {
    // only one player in the round and all cards played: game over
    const nextState = {
      ...state,
      error: "",
      discardPile: [
        ...state.discardPile,
        removeCardsFromPlayer(command.player, command.cards),
      ],
      message: `${command.player.name} won!`,
    };
    return nextState;
  }

  if (getActivePlayers(state).length === 1) {
    // only one player in the round -> that player won round and can start next round w/ any sequence kind
    //winner of round remains current player to lead round
    const nextState: GameState = {
      ...state,
      error: "",
      discardPile: [
        ...state.discardPile,
        removeCardsFromPlayer(command.player, command.cards),
      ],
    };
    nextState.message = `${command.player.name} won round. Waiting on ${
      getCurrentPlayer(nextState).name
    } to start new round.`;
    return nextState;
  }

  // current player played a sequence, advance to next player
  const nextState = {
    ...state,
    error: "",
    discardPile: [
      ...state.discardPile,
      removeCardsFromPlayer(command.player, command.cards),
    ],
  };
  setCurrentPlayer(nextState, getNextPlayer(command.player, state.players));
  nextState.message = `${getCurrentPlayer(
    state
  )} played. Waiting on ${getCurrentPlayer(nextState)}`;

  return nextState;
}
