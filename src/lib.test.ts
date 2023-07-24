import { DEFINED } from './defined';
import { create } from './lib';

describe('lib.ts', () => {
  it('should return produce fn', () => {
    const dumbData = {};
    expect(typeof create(dumbData)).toBe('function');
  });

  it('should create desired object with string values', () => {
    const dumbData = {
      firstName: ['John', 'Paul'],
    };
    const produce = create(dumbData);
    const user = produce(1)[0];

    expect(user).toHaveProperty('firstName');
    expect(user.firstName).toBeOneOf(dumbData.firstName);
  });

  it('should create desired object with number values', () => {
    const dumbData = {
      cost: [300, 500, 800],
    };
    const produce = create(dumbData);
    const price = produce(1)[0];

    expect(price).toHaveProperty('cost');
    expect(price.cost).toBeOneOf(dumbData.cost);
  });

  it('should create desired object with boolean values', () => {
    const dumbData = {
      isEnabled: [true, false],
    };
    const produce = create(dumbData);
    const status = produce(1)[0];

    expect(status).toHaveProperty('isEnabled');
    expect(status.isEnabled).toBeOneOf(dumbData.isEnabled);
  });

  it('should create object with mixed type field', () => {
    const dumbData = {
      field: [true, 'value', 10],
    };

    const produce = create(dumbData);

    const obj = produce(1)[0];

    expect(obj).toHaveProperty('field');
    expect(obj.field).toBeOneOf(dumbData.field);
  });

  it('it should create one object if "count" didnt pass as param', () => {
    const dumbData = {
      firstName: ['John', 'Paul'],
      lastname: ['Paul', 'John'],
    };

    const produce = create(dumbData);
    const users = produce();

    expect(users.length).toBe(1);
  });

  it('should create a rigth amount count of objects if "count" passed', () => {
    const dumbData = {
      firstName: ['John', 'Paul'],
      lastname: ['Paul', 'John'],
    };

    const produce = create(dumbData);
    const users = produce(100);

    expect(users.length).toBe(100);
  });

  it('should support nested objects', () => {
    const dumbData = {
      id: [1, 2, 3],
      name: {
        first: ['John', 'Andy'],
        last: ['Smith', 'King'],
      },
    };

    const produce = create(dumbData);

    const user = produce(1)[0];

    expect(user).toHaveProperty('name');
    expect(user.name.first).toBeOneOf(dumbData.name.first);
    expect(user.name.last).toBeOneOf(dumbData.name.last);
  });

  it('should support any level of nested objects', () => {
    const dumbData = {
      address: {
        street: {
          number: [1, 2, 34],
          name: ['Fifth', 'george'],
        },
      },
    };

    const produce = create(dumbData);

    const data = produce(1)[0];

    expect(data).toHaveProperty('address');
    expect(data.address.street.number).toBeOneOf(dumbData.address.street.number);
    expect(data.address.street.name).toBeOneOf(dumbData.address.street.name);
  });

  it('should create an incrimental ids', () => {
    const data = create({
      id: DEFINED.ID,
    })(5);

    const expectedIds = [1, 2, 3, 4, 5];

    expect(data.map((item) => item.id)).toStrictEqual(expectedIds);
  });
});
