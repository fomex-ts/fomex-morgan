import { IncomingMessage, ServerResponse } from 'http';
import { Slot } from 'qoq';
import originalMorgan, { FormatFn, Options, TokenCallbackFn } from 'morgan';

type MorganOptions = Options<IncomingMessage, ServerResponse>;

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
}

function token(name: string, callback: TokenCallbackFn<IncomingMessage, ServerResponse>) {
  return originalMorgan.token(name, callback), morgan;
}

function format(name: string, fmt: string | FormatFn<IncomingMessage, ServerResponse>) {
  return originalMorgan.format(name, fmt as string), morgan;
}

function compile(format: string): FormatFn<IncomingMessage, ServerResponse> {
  return originalMorgan.compile(format);
}

export const morgan = {
  token,
  format,
  compile,
};
