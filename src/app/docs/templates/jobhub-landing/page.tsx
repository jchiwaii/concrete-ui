import { Badge, Button, Card, CardContent } from "@/components/ui";

const PAGE = "/templates/jobhub-landing/index.html";
const PREVIEW_IMAGES = [
  { src: "/jobhub/hero.jpg", alt: "JobHub hero section", label: "Hero" },
  { src: "/jobhub/cta.jpg", alt: "JobHub call to action section", label: "CTA" },
];

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

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">
            Static Preview
          </h2>
          <p className="text-sm text-gray-700">
            Preview is image-only. Click any image to open the full live page in
            a new tab.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {PREVIEW_IMAGES.map((image) => (
              <a
                key={image.src}
                href={PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border-2 border-black bg-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-56 w-full object-cover object-top"
                />
                <div className="border-t-2 border-black bg-gray-100 px-3 py-2 text-xs font-bold uppercase tracking-wide">
                  {image.label}
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
