import "./index.css";

export enum Suit {
  Hearts = 'hearts',
  Diamonds = 'diamonds',
  Clubs = 'clubs',
  Spades = 'spades'
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
  Three = 1
}

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
  constructor(
    public rank: Rank = Rank.Ace,
    public suit: Suit = Suit.Hearts) { }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
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

    public toString() {
      return `Player ${this.name} with ${this?.cards?.length} cards remaining`;
    } 
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

export function orderBy(orderByProp: string, asc = true) {
  return (a: any, b: any) => {
    if (a[orderByProp] > b[orderByProp])
      return asc ? 1 : -1;
    else if (a[orderByProp] < b[orderByProp])
      return asc ? -1 : 1;
    return 0;
  }
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

export function getPlayersCards(players: Player[]) {
  return players.map(p => p.cards).reduce((all, current) => [...all, ...current]);
}

export function getNextPlayer(current: Player, players: Player[]) {
  const sorted = [...players].sort(orderByPlayerOrder);
  const index = sorted.indexOf(current);
  if (index === -1) throw new Error('Player not found');
  return index === players.length - 1 ? players[0] : players[index + 1];
}

export function findRuns(cards: CardSequence): CardSequence[] {
  const sorted = [...cards].sort(orderByCardRank);
  let currentSeq: CardSequence = [];
  const sequences: CardSequence[] = [currentSeq];
  sorted.forEach(card => {
    if (currentSeq.length === 0 ||
      currentSeq[currentSeq.length - 1].rank + 1 === card.rank) {
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
    const players = [new Player('A', 0), new Player('B', 1), new Player('C', 2), new Player('D', 3)];
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
    currentPlayer: getNextPlayer(command.player, current.playersIn),
  };
  nextState.message = `${current.currentPlayer} played. Waiting on ${nextState.currentPlayer}`

  return nextState;
}

