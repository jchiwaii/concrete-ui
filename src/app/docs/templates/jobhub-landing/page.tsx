import { Badge, Button, Card, CardContent } from "@/components/ui";

const PAGE = "/templates/jobhub-landing/index.html";

export default function JobHubLandingTemplatePage() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="primary" className="mb-4 uppercase">
          Template
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight">
          JobHub Landing
        </h1>
        <p className="mt-3 max-w-3xl text-brutal-lg text-gray-700">
          Single-page recruitment template in the Concrete UI visual language,
          featuring a job-search hero, partner marquee, trust stats, and
          category cards.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">
            Page
          </h2>
          <a href={PAGE} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Open Full Page</Button>
          </a>
        </CardContent>
      </Card>

      <div className="overflow-hidden rounded-lg border-2 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <iframe
          src={PAGE}
          title="JobHub landing template preview"
          loading="lazy"
          className="h-[980px] w-full border-0 bg-white"
        />
      </div>
    </div>
  );
}
