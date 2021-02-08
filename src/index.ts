import { IncomingMessage, ServerResponse } from 'http';
import { Slot } from 'qoq';
import originalMorgan from 'morgan';

export type MorganOptions = originalMorgan.Options<IncomingMessage, ServerResponse>;
export type FormatFn = originalMorgan.FormatFn<IncomingMessage, ServerResponse>;
export type TokenCallbackFn = originalMorgan.TokenCallbackFn<IncomingMessage, ServerResponse>;

export class Morgan extends Slot<Slot.Web> {
  constructor(format: 'combined' | 'common' | 'dev' | 'short' | 'tiny', options?: MorganOptions);
  constructor(format: FormatFn, options?: MorganOptions);
  constructor(format: string, options?: MorganOptions);
  constructor(format: any, options?: MorganOptions) {
    super();
    const fn = originalMorgan(format, options);

    this.use(async (ctx, next) => {
      await new Promise((resolve, reject) => {
        fn(ctx.request.req, ctx.response.res, (err) => {
          err ? reject(err) : resolve(ctx);
        });
      });

      return next();
    });
  }

  static format(name: string, fmt: FormatFn): typeof Morgan;
  static format(name: string, fmt: string): typeof Morgan;
  static format(name: string, fmt: string | FormatFn): typeof Morgan {
    // @ts-expect-error
    originalMorgan.format(name, fmt);
    return Morgan;
  }

  static compile(format: string): FormatFn {
    return originalMorgan.compile(format);
  }

  static token(name: string, callback: TokenCallbackFn): typeof Morgan {
    originalMorgan.token(name, callback);
    return Morgan;
  }
}
