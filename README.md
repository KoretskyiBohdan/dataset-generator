# mock-data-generator

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
  quantity: DEFINED.RANDOM_INTEGER,
  price: DEFINED.RANDOM_FLOAT
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


