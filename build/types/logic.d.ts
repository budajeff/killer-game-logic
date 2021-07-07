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
    RunOfFourTriples = "run of four triples"
}
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
    toString(): string;
}
/**  */
export declare type CardSequence = Card[];
export declare type Deck = Card[];
export declare type DiscardPile = CardSequence[];
export declare class Player {
    name: string;
    order: number;
    cards: Card[];
    status: PlayerStatus;
    current: boolean;
    constructor(name?: string, order?: number, cards?: Card[], status?: PlayerStatus, current?: boolean);
    toString(): string;
}
export declare function getActivePlayers(state: GameState): Player[];
export declare function getPassedPlayers(state: GameState): Player[];
export declare function setCurrentPlayer(state: GameState, player: Player): void;
export declare function getCurrentPlayer(state: GameState): Player;
export declare class GameState {
    players: Player[];
    discardPile: CardSequence[];
    message: string;
    error: string;
    constructor(players: Player[], discardPile: CardSequence[], message: string, error: string);
}
export declare function orderBy(orderByProp: string, asc?: boolean): (a: any, b: any) => 1 | 0 | -1;
export declare function createDeck(): Deck;
export declare function getPlayersCards(players: Player[]): Card[];
export declare function getNextPlayer(current: Player, players: Player[]): Player;
export declare function findOfAKinds(cards: CardSequence): CardSequence[];
export declare function findRuns(cards: CardSequence): CardSequence[];
export declare function transitionState(state?: GameState, command?: Play): GameState;
