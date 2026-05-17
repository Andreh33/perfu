import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";

export default function Home() {
  return (
    <Section spacing="cinematic">
      <Container>
        <div className="flex flex-col gap-[var(--space-7)]">
          <Text variant="small-caps" tone="gold">
            EST. DUBAI · MMXXVI · MAISON DE PARFUM
          </Text>
          <Text
            as="h1"
            variant="display-l"
            className="max-w-[18ch] display-tight"
            italic
          >
            The art of fragrance, distilled from desert and time.
          </Text>
          <div>
            <Link href="/styleguide">View design system →</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
