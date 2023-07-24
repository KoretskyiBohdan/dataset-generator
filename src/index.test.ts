import { create, DEFINED } from '.';

describe('Full lib api test', () => {
  describe('with empty params', () => {
    it('should work with null as shape and return array with empty object', () => {
      const dataset = create(null)();

      expect(dataset).toHaveLength(1);
      expect(dataset[0]).toStrictEqual({});
    });

    it('should work with empty object as shape and return array with empty object', () => {
      const dataset = create({})();

      expect(dataset).toHaveLength(1);
      expect(dataset[0]).toStrictEqual({});
    });

    it('should return right array size with empty shape', () => {
      expect(create({})(10)).toHaveLength(10);
      expect(create(null)(10)).toHaveLength(10);
    });
  });

  describe('with params', () => {
    it('should be all shape result with mixed params', () => {
      const shape = {
        id: DEFINED.ID,
        createdAt: () => {
          const oneHour = 1000 * 60 * 60;
          return Date.now() - oneHour;
        },
        updatedAt: DEFINED.DATE_NOW,
        price: DEFINED.FLOAT,
        newPrice: DEFINED.FLOAT,
        message: ['Old price is {price}, new price is {newPrice}'],
        delivery: {
          byCar: DEFINED.BOOLEAN,
          byPlane: DEFINED.BOOLEAN,
        },
      };

      const dataset = create(shape)(200);
      const item = dataset[0];

      expect(dataset).toHaveLength(200);
      expect(item.id).toBe(1);
      expect(item.createdAt).toBeInteger();
      expect(item.updatedAt).toBeInteger();
      expect(item.price).not.toBeInteger();
      expect(item.newPrice).not.toBeInteger();
      expect(item.message).toBe(`Old price is ${item.price}, new price is ${item.newPrice}`);
      expect(item.delivery.byCar).toBeBoolean();
      expect(item.delivery.byPlane).toBeBoolean();
    });
  });
});
