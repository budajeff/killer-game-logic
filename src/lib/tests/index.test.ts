import { transitionState, Deck, Rank, Suit, Player, createDeck } from '../index';

describe('createDeck()', () => {
  it('makes a deck of 52 cards', () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
    expect(deck).toContainEqual({ suit: Suit.Clubs, rank: Rank.Ace });
  });
});

describe('transition()', () => {
  it('initializes a game state', () => {
    const s = transitionState();
    expect(s.currentPlayer).toBeTruthy();
    expect(s.discardPile.length).toBe(0);
    expect(s.message).toBeTruthy();
    s.playersIn.forEach(p => expect(p.cards.length).toBe(13));
  });
});
