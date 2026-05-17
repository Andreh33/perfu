// Server component. Renders a JSON-LD <script> block.
//
// We rely on `dangerouslySetInnerHTML` because Satori-like escaping is not
// required for JSON-LD — but we still pass the payload through JSON.stringify
// so quotes and special characters are encoded safely. The `</script>`
// sequence is escaped explicitly to prevent any chance of script breakout.

interface JsonLdProps {
  readonly data: unknown;
  readonly id?: string;
}

function serialise(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger -- payload is JSON-encoded above.
      dangerouslySetInnerHTML={{ __html: serialise(data) }}
    />
  );
}
