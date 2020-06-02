import { IncomingMessage, ServerResponse } from 'http';
import { Plugin, Context_Web } from 'fomex';
import originalMorgan from 'morgan';

interface Options {
  /***
   * Buffer duration before writing logs to the stream, defaults to false.
   * When set to true, defaults to 1000 ms.
   * @deprecated
   */
  buffer?: boolean;

  /***
   * Write log line on request instead of response. This means that a
   * requests will be logged even if the server crashes, but data from the
   * response cannot be logged (like the response code).
   */
  immediate?: boolean;

  /***
   * Function to determine if logging is skipped, defaults to false. This
   * function will be called as skip(req, res).
   */
  skip?(req: IncomingMessage, res: ServerResponse): boolean;

  /***
   * Output stream for writing log lines, defaults to process.stdout.
   * @param str
   */
  stream?: {
    /**
     * Output stream for writing log lines.
     */
    write(str: string): void;
  };
}

type FormatFn = (
  tokens: Record<string, TokenCallbackFn>,
  req: IncomingMessage,
  res: ServerResponse,
) => string | undefined | null;

type TokenCallbackFn = (
  req: IncomingMessage,
  res: ServerResponse,
  arg?: string | number | boolean,
) => string | undefined;

export class PluginMorgan extends Plugin<Context_Web> {
  constructor(format: 'combined' | 'common' | 'dev' | 'short' | 'tiny', options?: Options);
  constructor(format: FormatFn, options?: Options);
  constructor(format: string, options?: Options);
  constructor(format: any, options: any = {}) {
    super();
    const fn = originalMorgan(format, options);

    this.handle(async (ctx, next) => {
      await new Promise((resolve, reject) => {
        // @ts-expect-error
        fn(ctx.request.req, ctx.response.res, (err) => {
          err ? reject(err) : resolve(ctx);
        });
      });

      return next();
    });
  }
}

export function morganFormat(name: string, fmt: FormatFn): void;
export function morganFormat(name: string, fmt: string): void;
export function morganFormat(name: string, fmt: string | FormatFn): void {
  // @ts-expect-error
  originalMorgan.format(name, fmt);
}

export function morganCompile(format: string): FormatFn {
  // @ts-expect-error
  return originalMorgan.compile(format);
}

export function morganToken(name: string, callback: TokenCallbackFn): void {
  originalMorgan.token(name, callback);
}
