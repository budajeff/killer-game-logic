import { KillerGameLogic, Deck, Rank, Suit, Player } from '../index';

describe('Runs without crashing', () => {
  const lib = new KillerGameLogic();

  describe('statusCheck()', () => {
    expect(lib.statusCheck()).toBe('ok');
  });

  describe('createDeck()', () => {
    it('makes a deck of 52 cards', () => {
      const deck = lib.createDeck();
      expect(deck.length).toBe(52);
      expect(deck).toContainEqual({ suit: Suit.Clubs, rank: Rank.Ace });
    });
  });

  describe('dealCards()', () => {
    it('deals 13 cards to each player', () => {
      const deck = lib.createDeck();
      const players = [new Player('a'), new Player('b'), new Player('c')]
      lib.dealCards(deck, players);
      expect(players[0].cards.length).toBe(13);
      expect(players[1].cards.length).toBe(13);
      expect(players[2].cards.length).toBe(13);
    });
  });

  describe('findFirstPlayer()', () => { 
    it('can find the first player', () => {
      lib.
    })
  });
});
