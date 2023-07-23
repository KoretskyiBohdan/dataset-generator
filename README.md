# mock-data-generator

### How to use

Simple example:
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
const users = produce(10);

```

