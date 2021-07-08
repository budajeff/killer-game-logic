import "./index.css";
export declare enum Suit {
    Hearts = "hearts",
    Diamonds = "diamonds",
    Clubs = "clubs",
    Spades = "spades"
}
export declare function cardToString(card: Card): string;
export declare enum Rank {
    Two = 13,
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
export declare enum CardSequenceKind {
    Unknown = "unknown",
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
    RunOfFourTriples = "run of four triples"
}
export declare function cardSequenceToKind(cards: CardSequence): CardSequenceKind;
export declare function cardSequenceToString(cards: CardSequence): string;
export declare enum PlayerStatus {
    InRound = "in",
    PassedRound = "passed"
}
export declare class Play {
    player: Player;
    cards: CardSequence;
    /** @description falsy cards indicates player passes */
    constructor(player: Player, cards?: CardSequence);
}
export declare class Card {
    rank: Rank;
    suit: Suit;
    constructor(rank?: Rank, suit?: Suit);
}
/**  */
export declare type CardSequence = Card[];
export declare type Deck = Card[];
export declare type DiscardPile = CardSequence[];
export declare enum PlayerKind {
    Human = "human",
    AI = "ai"
}
export declare class Player {
    name: string;
    kind: PlayerKind;
    order: number;
    cards: Card[];
    status: PlayerStatus;
    current: boolean;
    constructor(name?: string, kind?: PlayerKind, order?: number, cards?: Card[], status?: PlayerStatus, current?: boolean);
    toString(): string;
}
export declare function getActivePlayers(state: GameState): Player[];
export declare function getPassedPlayers(state: GameState): Player[];
export declare function setCurrentPlayer(state: GameState, player: Player): void;
export declare function getCurrentPlayer(state: GameState): Player | undefined;
export declare function isGameOver(state: GameState): boolean;
export declare class Discard {
    playerName: string;
    cards: CardSequence;
    constructor(playerName: string, cards: CardSequence);
}
export declare class GameState {
    players: Player[];
    discardPile: Discard[];
    message: string;
    error: string;
    constructor(players: Player[], discardPile: Discard[], message: string, error: string);
}
export declare function orderByPlayerOrder(a: Player, b: Player): 1 | 0 | -1;
export declare function orderBy(orderByProp: string, asc?: boolean): (a: any, b: any) => 1 | 0 | -1;
export declare function createDeck(): Deck;
export declare function getPlayersCards(players: Player[]): Card[];
/** Get the next player who is still in the current round (who has not Passed) */
export declare function getNextPlayer(current: Player, players: Player[]): Player;
export declare function findOfAKinds(cards: CardSequence): CardSequence[];
export declare function findRuns(cards: CardSequence): CardSequence[];
export declare function findRunsOLD(cards: CardSequence): CardSequence[];
export declare function findSequences(cards: CardSequence): CardSequence[];
export declare function findSequencesByKind(cards: CardSequence, kind: CardSequenceKind): CardSequence[];
/** Advances the game state until a human player's command is required (or the game's over or there's an error)  */
export declare function transitionStateToHumanPlayer(state: GameState, onStateChanged?: (state: GameState) => void): GameState;
export declare function transitionState(state?: GameState, command?: Play): GameState;
