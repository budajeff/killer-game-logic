import {
  transitionState, Card, Deck, Rank, Suit, Player, createDeck,
  CardSequence, findRuns, Play, orderBy, findOfAKinds, getu
} from '../index';
import { CardSequenceKind, cardSequenceToKind, cardSequenceToString, compareCardSequences,
   getCurrentPlayer, getPassedPlayers, isGameOver, transitionStateAuto, 
   PlayerKind, findSequencesByKind, findSequences } from '../logic';

describe('createDeck()', () => {
  it('makes a deck of 52 cards', () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
    expect(deck).toContainEqual({ suit: Suit.Clubs, rank: Rank.Ace });
  });
});

describe('transitionState()', () => {
  it('initializes a game state', () => {
    const s = transitionState();
    expect(getCurrentPlayer(s)).toBeTruthy();
    expect(s.discardPile.length).toBe(0);
    expect(s.message).toBeTruthy();
    s.players.forEach(p => expect(p.cards.length).toBe(13));
  });
  it('accepts the first players play', () => {
    const state = transitionState();
    const play = findRuns(getCurrentPlayer(state).cards)
      .sort(orderBy('length', false))[0];
    const newState = transitionState(
      state,
      new Play(getCurrentPlayer(state), play));
    expect(newState.error).toBeFalsy();
  });
  it('allows a player to pass', () => {
    let state = transitionState();
    state = transitionState(state, new Play(getCurrentPlayer(state)));
    expect(getPassedPlayers(state).length).toBe(1);
    state = transitionState(state, new Play(getCurrentPlayer(state)));
    expect(getPassedPlayers(state).length).toBe(2);
    state = transitionState(state, new Play(getCurrentPlayer(state)));
    expect(getPassedPlayers(state).length).toBe(3);
  })
});

describe('transitionStateAuto()', () => {
  it('can advance a game to end state', () => {
    let state = transitionState();
    state.players.forEach(p => p.kind = PlayerKind.AI);
    state = transitionStateAuto(
      state, 
      newState => console.log(newState), 
      newState => {
        expect(newState.error).toBeFalsy();
        return !newState.error;
      });
    
      expect(isGameOver(state)).toBe(true);

    //output
    state.discardPile.forEach(d => console.debug(`${d.playerName}: ${cardSequenceToString(d.cards)}`));
  });
});

describe('findRuns()', () => {
  it('can find a run of three cards', () => {
    const cards: CardSequence = [
      new Card(Rank.Seven),
      new Card(Rank.Nine),
      new Card(Rank.Eight),
    ];

    const runs = findRuns(cards);
    //console.log(runs);
    expect(runs.length).toBe(1);
    expect(runs[0].length).toBe(3);
    expect(runs[0].map(c => c.rank)).toContain(Rank.Seven);
  });
});

describe('findOfAKinds()', () => {
  it('can find Of a Kinds', () => {
    const cards: CardSequence = [
      new Card(Rank.Queen),
      new Card(Rank.Seven),
      new Card(Rank.Queen),
      new Card(Rank.Eight),
      new Card(Rank.Seven),
      new Card(Rank.Queen),
      new Card(Rank.Seven),
      new Card(Rank.Eight),
      new Card(Rank.Queen),
      new Card(Rank.Ace),
    ];
    const ofAKinds = findOfAKinds(cards).sort(orderBy('length'));
    expect(ofAKinds.length).toBe(4);
    const queens = ofAKinds.filter(s => s[0].rank === Rank.Queen)[0];
    expect(queens.length).toBe(4);
    const sevens = ofAKinds.filter(s => s[0].rank === Rank.Seven)[0];
    expect(sevens.length).toBe(3);
    const ace = ofAKinds.filter(s => s[0].rank === Rank.Ace)[0];
    expect(ace.length).toBe(1);
  });
});

describe('findSequences()', () => {
  it('finds two one of a kinds given A♦ 6♧', () => {
    const cards = [new Card(Rank.Ace), new Card(Rank.Six)];
    const result = findSequences(cards);
    expect(result.length).toBe(2);
  });
});

describe('compareCardSequences()', ()=>{
  it('knows A♥ is greater than A♠', ()=>{
    expect(compareCardSequences([new Card(Rank.Ace,Suit.Hearts)], [new Card(Rank.Ace, Suit.Spades)])).toBe(1);
  });
});

describe('findSequenceByKind()', () => {
  it('can find a run of three', () => {
    const cards = [
      new Card(8),
      new Card(7),
      new Card(4),
      new Card(9)
    ];
    const runs = findRuns(cards);
    const runsOfThree = findSequencesByKind(cards, CardSequenceKind.RunOfThree);
    expect(runsOfThree.length).toBe(1);
  });
});

describe('cardSequenceToKind()', () => {
  it('can detect of a kinds', () => {
    expect(cardSequenceToKind([new Card(Rank.Ace, Suit.Hearts)])).toBe(CardSequenceKind.OneOfAKind);
    expect(cardSequenceToKind([new Card(Rank.Ace, Suit.Hearts), new Card(Rank.Ace, Suit.Clubs)])).toBe(CardSequenceKind.TwoOfAKind);
    expect(cardSequenceToKind([
      new Card(Rank.Ace, Suit.Hearts),
      new Card(Rank.Ace, Suit.Clubs),
      new Card(Rank.Ace, Suit.Spades)])).toBe(CardSequenceKind.ThreeOfAKind);
    expect(cardSequenceToKind([
      new Card(Rank.Ace, Suit.Hearts),
      new Card(Rank.Ace, Suit.Clubs),
      new Card(Rank.Ace, Suit.Spades),
      new Card(Rank.Ace, Suit.Diamonds),
    ])).toBe(CardSequenceKind.FourOfAKind);
  });
  it('knows that this is not a run of seven', () => {
    //2♧ 9♦ 10♦ 2♥ A♥ J♠ J♧
    const invalid = [
      new Card(Rank.Two),
      new Card(Rank.Nine),
      new Card(Rank.Ten),
      new Card(Rank.Two),
      new Card(Rank.Ace),
      new Card(Rank.Jack),
      new Card(Rank.Jack)
    ];
    expect(cardSequenceToKind(invalid)).toBe(CardSequenceKind.Unknown);
  });
  it('knows that A♦ 6♧ is not a run of two', () => {
    //2♧ 9♦ 10♦ 2♥ A♥ J♠ J♧
    const invalid = [
      new Card(Rank.Ace),
      new Card(Rank.Six),
    ];
    expect(cardSequenceToKind(invalid)).toBe(CardSequenceKind.Unknown);
  });

  it('can detect non-sequences', () => {
    expect(cardSequenceToKind([
      new Card(Rank.Ace, Suit.Hearts),
      new Card(Rank.Eight, Suit.Hearts)])).toBe(CardSequenceKind.Unknown);
  });
});

