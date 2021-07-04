import { transitionState, Card, Deck, Rank, Suit, Player, createDeck, CardSequence, findRuns } from '../index';

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

  describe('findRuns()', () => {
    it('can find a run of three cards', () => {
      const cards: CardSequence = [
        new Card(Rank.Seven),
        new Card(Rank.Nine),
        new Card(Rank.Eight),
      ];

      const runs = findRuns(cards);
      console.log(runs);
      expect(runs.length).toBe(1);
      expect(runs[0].length).toBe(3);
      expect(runs[0].map(c => c.rank)).toContain(Rank.Seven);

    });
  });
});
