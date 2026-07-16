export type TemplateStatus = "ready" | "draft";

export interface TemplatePreviewImage {
  src: string;
  alt: string;
  label: string;
}

export interface TemplateMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: TemplateStatus;
  tags: string[];
  docsHref: string;
  reactHref: string;
  sourcePath: string;
  previewImages: TemplatePreviewImage[];
}

export const templates: TemplateMeta[] = [
  {
    slug: "jobhub-landing",
    title: "JobHub Landing",
    description:
      "A hiring marketplace landing page with bold Concrete UI styling, job search hero, partner marquee, trust stats, job cards, and category sections.",
    category: "Landing Page",
    status: "ready",
    tags: ["Recruitment", "Landing", "Responsive", "React"],
    docsHref: "/docs/templates/jobhub-landing",
    reactHref: "/templates/jobhub-landing",
    sourcePath: "src/app/templates/jobhub-landing/page.tsx",
    previewImages: [
      {
        src: "/templates/jobhub-landing/preview/hero.jpg",
        alt: "JobHub hero section preview",
        label: "Hero",
      },
      {
        src: "/templates/jobhub-landing/preview/cta.jpg",
        alt: "JobHub call to action section preview",
        label: "CTA",
      },
    ],
  },
];

export function getTemplate(slug: string): TemplateMeta | undefined {
  return templates.find((template) => template.slug === slug);
}
