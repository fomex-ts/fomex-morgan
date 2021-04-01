# Morgan
A logger middleware based on [morgan](https://github.com/expressjs/morgan) from express.

# Installation
```bash
yarn add qoq-morgan
```

# Usage
```typescript
import { WebSlotManager } from 'qoq';
import { Morgan, morgan } from 'qoq-morgan';

// morgan.token(...)
// morgan.format(...)
// morgan.compile(...)

const webSlots = WebSlotManager.use(new Morgan('combined'));
```

# Options
@see [express/morgan](https://github.com/expressjs/morgan/blob/master/README.md)
