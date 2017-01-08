// TODO write actual tests

// Sample Code:
class Arithmetic {
  static add(a, b) {
    return a + b;
  }
}

// Sample Test:
describe('Arithmetic', () => {
  describe('add', () => {
    it('should return the sum of its arguments', () => {
      let actual = Arithmetic.add(1, 3);
      let expected = 4;

      expect(actual).toEqual(expected);
    });
  });
});
