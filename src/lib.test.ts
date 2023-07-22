import { create } from './lib';

describe('Lib', () => {
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
});
