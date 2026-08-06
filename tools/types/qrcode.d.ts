/**
 * `qrcode` ships no type declarations, and `astro check` covers tools/.
 *
 * Only the two entry points this repository calls are declared, deliberately:
 * a fuller stub would be guesswork about a library whose behaviour we do not
 * otherwise depend on. `toFile` is used by tools/print/print-onesheet.mjs to
 * write a sheet's artwork, and `toString` by tools/test/test-source-attribution.ts
 * to re-encode the same URL and check the committed artwork still matches it.
 */
declare module "qrcode" {
  interface QrOptions {
    type?: string;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    color?: { dark?: string; light?: string };
  }
  export function toFile(path: string, text: string, options?: QrOptions): Promise<void>;
  export function toString(text: string, options?: QrOptions): Promise<string>;
  const QRCode: { toFile: typeof toFile; toString: typeof toString };
  export default QRCode;
}
