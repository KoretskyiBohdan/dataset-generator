import createObjectFromShape from './createObjectFromShape';
import { DEFINED } from './constants';

describe('createObjectFromShape.ts', () => {
  it('should supports defined ID type', () => {
    const shape = {
      id: DEFINED.ID,
    };

    const obj = createObjectFromShape(shape);

    expect(obj.id).toBeInteger();
  });

  it('id should be greater than index by 1', () => {
    const shape = {
      id: DEFINED.ID,
    };

    const index = 1;

    const obj = createObjectFromShape(shape, index);

    expect(obj.id).toBe(index + 1);
  });

  it('should supports defined DATE_NOW type', () => {
    const shape = {
      id: DEFINED.DATE_NOW,
    };

    const obj = createObjectFromShape(shape);

    expect(obj.id).toBeInteger();
  });

  it('DATE_NOW should be equal exact date', () => {
    const shape = {
      date: DEFINED.DATE_NOW,
    };

    const timestamp = Date.now();

    const obj = createObjectFromShape(shape);
    // performing of js code can take some time
    const allowedDiff = 1000;

    expect(Math.abs(obj.date - timestamp)).toBeLessThan(allowedDiff);
  });

  it('should supports defined INTEGER type', () => {
    const shape = {
      number: DEFINED.INTEGER,
    };

    const obj = createObjectFromShape(shape);

    expect(obj.number).toBeInteger();
  });

  it('should supports defined FLOAT type', () => {
    const shape = {
      number: DEFINED.FLOAT,
    };

    const obj = createObjectFromShape(shape);

    expect(obj.number).toBeNumber();
    expect(obj.number).not.toBeInteger();
  });

  it('should support function as value', () => {
    const shape = {
      val: () => {
        return 12;
      },
    };

    const obj = createObjectFromShape(shape);

    expect(obj.val).toBe(12);
  });

  it('should supports reference to the other value', () => {
    const shape = {
      id: DEFINED.ID,
      name: ['John', 'Paul', 'Joe'],
      greeting: ['Hello {name}'],
    };

    const obj = createObjectFromShape(shape);

    expect(obj.greeting).toBeString();
    expect(obj.greeting).toBeOneOf(['Hello John', 'Hello Paul', 'Hello Joe']);
  });

  it('should support reference dispite props creation order', () => {
    const shape = {
      id: DEFINED.ID,
      greeting: ['Hello {name}'],
      name: ['John', 'Paul', 'Joe'],
    };

    const obj = createObjectFromShape(shape);

    expect(obj.greeting).toBeString();
    expect(obj.greeting).toBeOneOf(['Hello John', 'Hello Paul', 'Hello Joe']);
  });

  it('should support any level reference dispite props creation order', () => {
    const shape = {
      id: DEFINED.ID,
      messages: {
        greeting: ['Hello {name.first}'],
      },
      name: {
        first: ['John', 'Paul', 'Joe'],
      },
    };

    const obj = createObjectFromShape(shape);

    expect(obj.messages.greeting).toBeOneOf(['Hello John', 'Hello Paul', 'Hello Joe']);
  });
});
