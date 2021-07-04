import "./index.css";

export enum Suit { Hearts, Diamonds, Clubs, Spades }
export enum Rank { Two, Ace, King, Queen, Jack, Ten, Nine, Eight, Seven, Six, Five, Four, Three }

export enum CardSequenceKind {
  None = 'none',

  OneOfAKind = 'one of a kind',
  TwoOfAKind = 'two of a kind',
  ThreeOfAKind = 'three of a kind',
  FourOfAKind = 'four of a kind',

  RunOfThree = 'run of three',
  RunOfFour = 'run of four',
  RunOfFive = 'run of five',
  RunOfSix = 'run of six',
  RunOfSeven = 'run of seven',
  RunOfEight = 'run of eight',
  RunOfNine = 'run of nine',
  RunOfTen = 'run of ten',
  RunOfEleven = 'run of eleven',
  RunOfTwelve = 'run of twelve',
  RunOfThirteen = 'run of thirteen',

  RunOfThreePairs = 'run of three pairs',
  RunOfFourPairs = 'run of four pairs',
  RunOfFivePairs = 'run of five pairs',
  RunOfSixPairs = 'run of six pairs',
 
  RunOfThreeTriples = 'run of three triples',
  RunOfFourTriples = 'run of four triples',
}

export class Play {
  /** @description falsy cards indicates player passes */
  constructor(public player: Player, public cards: CardSequence) {

  }
}
export class Card {
  constructor(public suit: Suit, public rank: Rank) { }
}

/**  */
export type CardSequence = Card[];

export type Deck = Card[];
export type DiscardPile = Card[];
export class Player {
  constructor(
    public name = 'player',
    public order: number = 0,
    public cards: Card[] = undefined) { }
}
export class Round {
  constructor(
    public currentPlayer: Player,
    public activePlayers: Player[],
    public outPlayers: Player[],
    public cards: Card[]) { }
}

export class GameState {
  constructor(
    public currentPlayer: Player,
    public discardPile: CardSequence[],
    public playersIn: Player[],
    public playersOut: Player[],
    public message: string,
    public error: string) {
  }
}

function orderByCardRank(a: Card, b: Card) {
  if (a.rank > b.rank)
    return 1;
  else if (a.rank < b.rank)
    return -1;
  return 0;
}

function orderByPlayerOrder(a: Player, b: Player) {
  if (a.order > b.order)
    return 1;
  else if (a.order < b.order)
    return -1;
  return 0;
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
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function dealCards(deck: Deck, players: Player[]) {
  if (players.length > 4 || players.length < 2) {
    throw new Error('invalid Player length');
  }
  shuffle(deck);
  players.forEach(player => player.cards = deck.splice(0, 13));
}

function enumKeys<O extends Record<string, unknown>, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
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

// export function groupBy(groupBy:string, cards: Card[]): 
// Record<CardSequenceKind, Card[]>[] {
//   const grouped:{key:string, cards:Card[]} = undefined;
//   cards.forEach(card => {
//     const groupId = card[groupBy];
//     if(!grouped[groupId]) {
//       grouped[groupId] = [];
//     }
//     grouped[groupId].push(card);
//   });
//   return grouped;
// }

export function getPlayersCards(players: Player[]) {
  return players.map(p => p.cards).reduce((all, current) => [...all, ...current]);
}

export function getNextPlayer(current: Player, players: Player[]) {
  const sorted = [...players].sort(orderByPlayerOrder);
  const index = sorted.indexOf(current);
  if (index === -1) throw new Error('Player not found');
  return index === players.length - 1 ? players[0] : players[index + 1];
}

export function findOfAKindSequence(cards: CardSequence, count: number): 
Record<CardSequenceKind, CardSequence[]> {
  const sorted = [...cards];
  const groupByRank = groupBy('rank', sorted);
  return groupByRank.map(g => {});
}

// export function findRuns(cards: CardSequence) : CardSequence[] {

// }

export function getSequenceKind(cards: CardSequence): CardSequenceKind {

  // TODO: implement this
  return CardSequenceKind.None;
}

function removeCardsFromPlayer(player: Player, cards: CardSequence): CardSequence {
  cards.forEach(c => {
    const index = player.cards.indexOf(c);
    if (index > -1)
      player.cards.splice(index, 1);
    else
      throw new Error(`Player does not have card ${c}`);
  });
  return cards;
}

export function transitionState(current: GameState = undefined, command: Play = undefined): GameState {
  if (!current) {
    // no previous state so generate a new game
    const players = [new Player('a', 0), new Player('a', 1), new Player('a', 2), new Player('a', 3)];
    const nextState: GameState = {
      error: '',
      discardPile: [],
      currentPlayer: players[0],
      playersIn: players,
      playersOut: [],
      message: `New Game! Waiting on ${players[0]}`
    };
    dealCards(createDeck(), nextState.playersIn);
    return nextState;
  }

  if (current.currentPlayer !== command.player) {
    return { ...current, error: `It is not ${command.player.name}'s turn. It is ${current.currentPlayer.name}'s turn.` }
  }

  if (!command.cards) {
    // no cards indicates Player passes and is out for remainder of the Round
    const nextState = {
      ...current,
      error: '',
      playersIn: current.playersIn.filter(p => p !== command.player), //remove current player from round
      playersOut: [...current.playersOut, command.player], //add player to list of passed players
    }

    // current player is the next player of the remaining players in the round
    nextState.currentPlayer = getNextPlayer(command.player, nextState.playersIn);

    nextState.message = `${command.player.name} passes. Waiting on ${nextState.currentPlayer.name}`;
    return nextState;
  }

  if (current.playersIn.length === 1 &&
    getPlayersCards([...current.playersIn, ...current.playersOut]).length === 0) {
    // only one player in the round and all cards played: game over
    const nextState = {
      ...current,
      error: '',
      discardPile: [...current.discardPile, removeCardsFromPlayer(command.player, command.cards)],
      playersIn: current.playersIn.filter(p => p !== command.player),
      playersOut: [...current.playersOut, command.player],
      message: `${command.player.name} won!`
    };
    return nextState;
  }

  if (current.playersIn.length === 1) {
    // only one player in the round -> that player won round and can start next round w/ any sequence kind
    const nextState = {
      ...current,
      error: '',
      discardPile: [...current.discardPile, removeCardsFromPlayer(command.player, command.cards)],
      currentPlayer: command.player, //winner of round remains current player to lead round
      playersIn: [current.currentPlayer, ...current.playersOut], //all players in at start of round
      playersOut: [] as Player[], // no players are out at start of round
    };
    nextState.message = `${command.player.name} won round. Waiting on ${nextState.currentPlayer.name} to start new round.`;
    return nextState;
  }

  // current player played a sequence, advance to next player
  const nextState = {
    ...current,
    error: '',
    discardPile: [...current.discardPile, removeCardsFromPlayer(command.player, command.cards)],
    currentPlayer: getNextPlayer(command.player, current.playersIn)
  };
  return nextState;
}

