# dataset-generator

### Motivation

This simple data mock generator which use provided lists of data to generate random combination of values
according provided object shape.

1) Has strong TypeScript support (created objects have inferred type from provided data).
2) Bundle has zero dependencies.
3) Can be used with you own data or other solutions.
4) Supports computed values and reference to already created fields.

### How to install
```js
npm i dataset-generator
```

### How to use

1) Simple example:
```js
import { create } from 'mock-data-generator';

// It will create produce function with pre-defined shape
// Base shape format - key = string, value = array of posible values
const produce  = create({
  name: ['John', 'Mary', 'Amy'],
  jobTitle: ['developer', 'QA']
});

// It will create 10 users with provided shape
// e.g. {name: string; jobTitle: string}[]
const dataset = produce(10);

```

2) With defined types.
```js
import { create, DEFINED } from 'mock-data-generator';

const produce  = create({
  // it will create incremental id
  id: DEFINED.ID,
  // it will create date timestamp 
  now: DEFINED.DATE_NOW,
  // random integer
  quantity: DEFINED.INTEGER,
  // random float 
  price: DEFINED.FLOAT
});

// {id: number, now: number; quantity: number, price: number}[]
const dataset = produce(10);
```

3) With function as a value.
```js
import { create, DEFINED } from 'mock-data-generator';

const produce  = create({
  id: DEFINED.ID,
  now: () => Date.now(),
  greeting: () => 'Hello'
});

// {id: number, now: number; greeting: string}[]
const dataset = produce(10);
```

4) With nested objects.
```js
import { create, DEFINED } from 'mock-data-generator';

const produce  = create({
  id: DEFINED.ID,
  name: {
    first: ['John', 'Mary', 'Andy'],
    last: ['Smith', 'King']
  }
});

// {id: number, name: {first: string, last: string}}[]
const dataset = produce(10);
```
5) With reference.
```js
import { create, DEFINED } from 'mock-data-generator';

const dataset  = create({
  id: DEFINED.ID,
  name: ['John', 'Paul', 'Joe'],
  // it will create string like 'Hello John' 
  greeting: ['Hello {name}'],
  address: {
    street: ['Don', 'Ave'],
    number: [12, 20],
    // Nested object supported
    line: ['{address.street} {address.number}']
  }
})(10);


const users = create({
  id: DEFINED.ID,
  // props order doesn't matter - all refrences will be resolved after main processing
  greeting: ['Hello {name}'],
  name: ['John', 'Paul', 'Joe'],
})(10);



