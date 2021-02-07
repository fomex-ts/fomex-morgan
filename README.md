# Morgan
A logger middleware based on [morgan](https://github.com/expressjs/morgan) from express.

# Installation
```bash
yarn add qoq-morgan
```

# Using
```typescript
import { Morgan } from 'qoq-morgan';

baseWebRouter.global(new Morgan('combined'));
```

# Options
@see [express/morgan](https://github.com/expressjs/morgan/blob/master/README.md)
