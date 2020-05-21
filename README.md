# Fomex Morgan
Based on morgan

# Installation

```bash
yarn add fomex-morgan
```

# Using as a plugin
```typescript
import { Morgan } from 'fomex-morgan';

baseWebRouter.global(new Morgan('combined'));
```


---------

More usage detail see here: [express/morgan](https://github.com/expressjs/morgan)
