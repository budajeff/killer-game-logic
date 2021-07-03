import KillerGameLogic from '../index';

describe('Runs without crashing', () => {
  const lib = new KillerGameLogic();

  test('statusCheck() function', () => {
    expect(lib.statusCheck()).toBe('ok');
  });
});
