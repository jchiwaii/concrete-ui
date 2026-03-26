"use client";

import { useState } from "react";

// ─── colour / shadow tokens ────────────────────────────────────────────────
const INK = "#001429";
const PAPER = "#fff9ef";
const YELLOW_DEEP = "#ffb433";
const BLUE = "#99cdff";
const PEACH = "#ffd4b7";
const MINT = "#3df5b8";
const SHADOW = `2px 4px 0 ${INK}`;
const SHADOW_LG = `4px 6px 0 ${INK}`;

// ─── reusable small pieces ─────────────────────────────────────────────────
const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M17.25 3H6.75C6.35218 3 5.97064 3.15804 5.68934 3.43934C5.40804 3.72064 5.25 4.10218 5.25 4.5V21C5.25007 21.1338 5.28595 21.2652 5.35393 21.3805C5.42191 21.4958 5.5195 21.5908 5.63659 21.6557C5.75367 21.7206 5.88598 21.7529 6.01978 21.7494C6.15358 21.7458 6.284 21.7066 6.3975 21.6356L12 18.1341L17.6034 21.6356C17.7169 21.7063 17.8472 21.7454 17.9809 21.7488C18.1146 21.7522 18.2467 21.7198 18.3636 21.655C18.4806 21.5902 18.5781 21.4953 18.646 21.3801C18.7139 21.2649 18.7498 21.1337 18.75 21V4.5C18.75 4.10218 18.592 3.72064 18.3107 3.43934C18.0294 3.15804 17.6478 3 17.25 3ZM17.25 19.6472L12.3966 16.6144C12.2774 16.5399 12.1396 16.5004 11.9991 16.5004C11.8585 16.5004 11.7208 16.5399 11.6016 16.6144L6.75 19.6472V4.5H17.25V19.6472Z"
      fill="black"
    />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full block">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9 block" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.5612 25.0612L28.0613 38.5612C27.7798 38.8427 27.398 39.0008 27 39.0008C26.602 39.0008 26.2202 38.8427 25.9387 38.5612C25.6573 38.2798 25.4992 37.898 25.4992 37.5C25.4992 37.1019 25.6573 36.7202 25.9387 36.4387L36.8794 25.5H7.5C7.10218 25.5 6.72064 25.3419 6.43934 25.0606C6.15804 24.7793 6 24.3978 6 24C6 23.6022 6.15804 23.2206 6.43934 22.9393C6.72064 22.658 7.10218 22.5 7.5 22.5H36.8794L25.9387 11.5612C25.6573 11.2798 25.4992 10.898 25.4992 10.5C25.4992 10.1019 25.6573 9.72019 25.9387 9.43873C26.2202 9.15727 26.602 8.99915 27 8.99915C27.398 8.99915 27.7798 9.15727 28.0613 9.43873L41.5612 22.9387C41.7007 23.078 41.8114 23.2435 41.8868 23.4256C41.9623 23.6077 42.0012 23.8029 42.0012 24C42.0012 24.1971 41.9623 24.3923 41.8868 24.5744C41.8114 24.7565 41.7007 24.9219 41.5612 25.0612Z" fill="black" />
  </svg>
);

const LinkArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.3538 8.35372L6.35375 13.3537C6.3073 13.4002 6.25215 13.437 6.19145 13.4622C6.13076 13.4873 6.0657 13.5003 6 13.5003C5.93431 13.5003 5.86925 13.4873 5.80856 13.4622C5.74786 13.437 5.69271 13.4002 5.64625 13.3537C5.5998 13.3073 5.56295 13.2521 5.53781 13.1914C5.51267 13.1307 5.49973 13.0657 5.49973 13C5.49973 12.9343 5.51267 12.8692 5.53781 12.8085C5.56295 12.7478 5.5998 12.6927 5.64625 12.6462L10.2931 7.99997L5.64625 3.35372C5.55243 3.2599 5.49973 3.13265 5.49973 2.99997C5.49973 2.86729 5.55243 2.74004 5.64625 2.64622C5.74007 2.5524 5.86732 2.49969 6 2.49969C6.13269 2.49969 6.25993 2.5524 6.35375 2.64622L11.3538 7.64622C11.4002 7.69266 11.4371 7.7478 11.4623 7.8085C11.4874 7.8692 11.5004 7.93427 11.5004 7.99997C11.5004 8.06568 11.4874 8.13074 11.4623 8.19144C11.4371 8.25214 11.4002 8.30729 11.3538 8.35372Z" fill="black" />
  </svg>
);

// ─── company logos ─────────────────────────────────────────────────────────
const SpotifyLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block">
    <circle cx="18" cy="18" r="13.5" fill="#1ED760" />
    <path d="M25.214 16.5483C21.1386 14.1129 14.4163 13.889 10.5259 15.0773C9.90114 15.2679 9.24048 14.9131 9.05116 14.2844C8.86184 13.6555 9.21421 12.9912 9.83939 12.8001C14.3053 11.4359 21.7294 11.6994 26.421 14.5018C26.9829 14.8374 27.1673 15.5677 26.8342 16.1322C26.5009 16.6976 25.7745 16.884 25.214 16.5483ZM25.0805 20.1554C24.7946 20.6222 24.188 20.7687 23.7246 20.482C20.327 18.3805 15.1461 17.7718 11.1264 18.9995C10.6051 19.1581 10.0545 18.8623 9.89631 18.3388C9.73914 17.8142 10.0332 17.2612 10.5535 17.1017C15.1455 15.6997 20.8539 16.3787 24.7562 18.7918C25.2196 19.0789 25.3654 19.6898 25.0805 20.1554ZM23.5335 23.6195C23.3063 23.9945 22.8212 24.1119 22.45 23.8834C19.4809 22.0575 15.7441 21.6452 11.3432 22.6567C10.9191 22.7545 10.4966 22.4871 10.3998 22.0604C10.3027 21.6338 10.5674 21.2085 10.9925 21.1111C15.8084 20.0033 19.9396 20.48 23.272 22.5291C23.6436 22.7574 23.7606 23.2458 23.5335 23.6195Z" fill="white" />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block">
    <path d="M18.4276 12.6988C15.9152 9.4998 13.8142 8.28076 11.2997 8.28076C6.17335 8.28076 2.24561 14.9522 2.24561 22.0135C2.24561 26.4323 4.38332 29.2192 7.96401 29.2192C10.5411 29.2192 12.3946 28.0044 15.6895 22.2446C15.6895 22.2446 17.063 19.8191 18.008 18.1482C18.339 18.6828 18.687 19.258 19.0541 19.8763L20.5993 22.4756C23.609 27.5123 25.2862 29.2192 28.3248 29.2192C31.8131 29.2192 33.7543 26.3942 33.7543 21.8836C33.7543 14.4901 29.7381 8.28076 24.859 8.28076C22.2754 8.28076 20.2559 10.2268 18.4276 12.6988Z" fill="#1080F8" />
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M30.24 18.2898C30.24 17.3858 30.1589 16.5164 30.0082 15.6819H18V20.6138H24.8618C24.5662 22.2076 23.6679 23.5579 22.3176 24.462V27.6611H26.4382C28.8491 25.4414 30.24 22.1728 30.24 18.2898Z" fill="#4285F4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M18 30.7501C21.4425 30.7501 24.3286 29.6084 26.4382 27.6611L22.3176 24.462C21.1759 25.227 19.7154 25.679 18 25.679C14.6792 25.679 11.8684 23.4362 10.8658 20.4225H6.60609V23.726C8.70405 27.8929 13.0159 30.7501 18 30.7501Z" fill="#34A853" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.8658 20.4226C10.6108 19.6576 10.4659 18.8404 10.4659 18.0001C10.4659 17.1597 10.6108 16.3426 10.8658 15.5776V12.2742H6.60611C5.74258 13.9954 5.24997 15.9427 5.24997 18.0001C5.24997 20.0575 5.74258 22.0048 6.60611 23.726L10.8658 20.4226Z" fill="#FBBC05" />
    <path fillRule="evenodd" clipRule="evenodd" d="M18 10.321C19.8719 10.321 21.5526 10.9643 22.874 12.2277L26.5309 8.5708C24.3228 6.51341 21.4367 5.25 18 5.25C13.0159 5.25 8.70405 8.10716 6.60609 12.2741L10.8658 15.5775C11.8684 12.5639 14.6792 10.321 18 10.321Z" fill="#EA4335" />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block" fill="none">
    <path d="M5.99994 6H17.4285V17.4286H5.99994V6Z" fill="#F35325" />
    <path d="M18.5714 6H29.9999V17.4286H18.5714V6Z" fill="#81BC06" />
    <path d="M5.99994 18.5714H17.4285V30H5.99994V18.5714Z" fill="#05A6F0" />
    <path d="M18.5714 18.5714H29.9999V30H18.5714V18.5714Z" fill="#FFBA08" />
  </svg>
);

const NetflixLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block">
    <path d="M11 6H16L24 21V6H29V30H24L16 15V30H11V6Z" fill="#E50914" />
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 36 36" className="w-7 h-7 block" fill="none">
    <path d="M18 18C18 15.5148 20.0147 13.5 22.5 13.5C24.9852 13.5 27 15.5148 27 18C27 20.4853 24.9852 22.5 22.5 22.5C20.0147 22.5 18 20.4853 18 18Z" fill="#1ABCFE" />
    <path d="M9.00006 27C9.00006 24.5148 11.0148 22.5 13.5001 22.5H18.0001V27C18.0001 29.4853 15.9854 31.5 13.5001 31.5C11.0148 31.5 9.00006 29.4853 9.00006 27Z" fill="#0ACF83" />
    <path d="M18 4.5V13.5H22.5C24.9853 13.5 27 11.4853 27 9C27 6.51472 24.9853 4.5 22.5 4.5H18Z" fill="#FF7262" />
    <path d="M9.00006 9C9.00006 11.4853 11.0148 13.5 13.5001 13.5H18.0001V4.5H13.5001C11.0148 4.5 9.00006 6.51472 9.00006 9Z" fill="#F24E1E" />
    <path d="M9.00006 18C9.00006 20.4853 11.0148 22.5 13.5001 22.5H18.0001V13.5H13.5001C11.0148 13.5 9.00006 15.5148 9.00006 18Z" fill="#A259FF" />
  </svg>
);

// ─── category card icon helper ─────────────────────────────────────────────
const CategoryIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 inline-flex items-center justify-center" style={{ color: "#000" }}>
    {children}
  </div>
);

// ─── job card ─────────────────────────────────────────────────────────────
interface JobCardProps {
  logo: React.ReactNode;
  logoBg: string;
  company: string;
  location: string;
  title: string;
  tags: string[];
  applicantLabel?: string;
  bookmarkLabel: string;
}

const JobCard = ({ logo, logoBg, company, location, title, tags, bookmarkLabel, applicantLabel = "+20 Applicant" }: JobCardProps) => (
  <article
    className="flex flex-col gap-4 min-h-[296px] p-5"
    style={{ border: "2.5px solid " + INK, boxShadow: SHADOW_LG, background: "#fff" }}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 border-2 inline-flex items-center justify-center flex-shrink-0"
          style={{ borderColor: INK, boxShadow: SHADOW, background: logoBg }}
          aria-hidden="true"
        >
          {logo}
        </div>
        <div>
          <p className="font-bold leading-[1.1]">{company}</p>
          <p className="mt-[0.2rem] text-[0.88rem]" style={{ color: "#334155" }}>{location}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label={bookmarkLabel}
        className="w-8 h-8 border-2 inline-flex items-center justify-center flex-shrink-0 cursor-pointer"
        style={{ borderColor: INK, borderRadius: "999px", background: "#fff", boxShadow: SHADOW }}
      >
        <BookmarkIcon />
      </button>
    </div>

    <h3 className="mt-[0.2rem]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.55rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
      {title}
    </h3>

    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="min-h-6 py-[0.2rem] px-[0.55rem] text-[0.78rem] font-semibold"
          style={{ borderRadius: "999px", border: "1px solid #cad5e2", background: "#e2e8f0", color: "#0f172a" }}
        >
          {t}
        </span>
      ))}
    </div>

    <div className="mt-auto flex items-center gap-[0.65rem]">
      <div className="flex items-center" aria-hidden="true">
        {["bg-[#fca5a5]", "bg-[#a5b4fc]", "bg-[#86efac]"].map((bg, i) => (
          <span
            key={i}
            className={`w-6 h-6 ${bg} ${i > 0 ? "-ml-[7px]" : ""}`}
            style={{ border: "1.5px solid #fff", borderRadius: "999px", boxShadow: "0 0 0 1px #64748b" }}
          />
        ))}
      </div>
      <span className="text-[0.88rem]" style={{ color: "#334155" }}>{applicantLabel}</span>
    </div>

    <div className="flex items-center gap-[0.7rem]">
      <a
        href="#"
        className="flex-1 inline-flex items-center justify-center min-h-[40px] py-2 px-[0.95rem] border-2 text-[0.89rem] font-bold tracking-[0.01em] transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px"
        style={{ borderColor: INK, background: YELLOW_DEEP, boxShadow: SHADOW }}
      >
        Apply
      </a>
      <a
        href="#"
        className="inline-flex items-center justify-center min-h-[40px] py-2 px-[0.95rem] border-2 text-[0.89rem] font-bold tracking-[0.01em] transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px"
        style={{ borderColor: INK, background: "#fff", boxShadow: SHADOW }}
      >
        Detail
      </a>
    </div>
  </article>
);

// ─── main page component ───────────────────────────────────────────────────
export default function JobHubLandingReact() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ backgroundColor: PAPER, color: INK }} className="font-display overflow-x-clip">
      {/* skip link */}
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-[100] px-4 py-[0.6rem] font-bold text-sm border-2 -translate-y-full focus:translate-y-0 transition-transform duration-[120ms]"
        style={{ background: YELLOW_DEEP, borderColor: INK }}
      >
        Skip to main content
      </a>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b-2"
        style={{ borderColor: INK, background: "rgba(255,249,239,0.85)", backdropFilter: "blur(6px)" }}
      >
        <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto min-h-[72px] flex items-center justify-between gap-4 flex-wrap py-2 md:py-0">
          <a href="#" className="font-heading text-[2rem] tracking-[0.04em]" style={{ color: INK }}>
            JOBHUB
          </a>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={() => setNavOpen((o) => !o)}
            className="md:hidden flex items-center justify-center flex-col gap-1 w-11 h-10 border-2 bg-white cursor-pointer"
            style={{ borderColor: INK, boxShadow: SHADOW }}
          >
            <span className="block w-[18px] h-[2px]" style={{ background: INK }} />
            <span className="block w-[18px] h-[2px]" style={{ background: INK }} />
            <span className="block w-[18px] h-[2px]" style={{ background: INK }} />
          </button>

          {/* nav links */}
          <nav
            id="primary-nav"
            aria-label="Primary"
            className={`${navOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-stretch md:items-center gap-1 w-full md:w-auto order-last md:order-none`}
          >
            {[
              ["Find Jobs", "#find-jobs"],
              ["Job Alerts", "#job-alerts"],
              ["Find Candidates", "#latest-jobs"],
              ["Career Advice", "#career-advice"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="py-[0.55rem] px-[0.85rem] border-2 border-transparent text-[0.88rem] font-bold tracking-[0.01em] bg-white md:bg-transparent hover:border-[#001429] hover:bg-white hover:shadow-[2px_4px_0_#001429]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* nav actions */}
          <div className={`${navOpen ? "flex" : "hidden"} md:flex items-center flex-wrap gap-[0.65rem] w-full md:w-auto`}>
            <a
              href="#"
              className="py-2 px-3 border-2 border-transparent text-[0.95rem] font-bold text-center hover:border-[#001429] hover:bg-white"
            >
              Login
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[40px] py-2 px-[0.95rem] border-2 text-[0.89rem] font-bold tracking-[0.01em] transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px w-full md:w-auto justify-center"
              style={{ borderColor: INK, background: YELLOW_DEEP, boxShadow: SHADOW }}
            >
              Register Now
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pt-14 md:pt-20 overflow-x-clip" id="find-jobs">
          <div
            className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-4 lg:gap-4 items-end"
            style={{ gridTemplateColumns: "minmax(0,1fr)", minHeight: "auto" }}
          >
            {/* on lg+ switch to two-col */}
            <style>{`
              @media (min-width: 1024px) {
                .hero-grid { grid-template-columns: minmax(0,713px) minmax(0,525px); justify-content: space-between; min-height: 532px; }
                .hero-copy-wrap { min-height: 492px; justify-content: space-between; padding-top: 20px; }
                .hero-visual { height: 532px; }
                .hero-visual-card { left: 24px; top: 180px; width: 485px; height: 352px; }
                .hero-visual-photo { left: 75px; top: 10px; width: 384px; height: 520px; }
                .badge-meta-pos { top: 142.8px; left: 478.7px; }
                .badge-ms-pos { top: 426px; left: 475px; }
                .badge-google-pos { top: 370.6px; left: 0; }
                .search-shell { flex-direction: row; align-items: center; }
                .hero-register { width: 135px; min-width: 135px; }
              }
              @media (max-width: 1023px) {
                .hero-visual { height: 532px; margin: 0 auto; }
                .hero-visual-card { left: 24px; right: 16px; width: auto; top: 180px; height: 352px; }
                .hero-visual-photo { left: 72px; right: 66px; width: auto; top: 10px; height: 520px; }
                .badge-meta-pos { top: 142.8px; right: 0; left: auto; }
                .badge-ms-pos { top: 426px; right: 3px; left: auto; }
              }
              @media (max-width: 640px) {
                .hero-visual { height: 420px; }
                .hero-visual-card { left: 8px; right: 8px; width: auto; top: 150px; height: 260px; }
                .hero-visual-photo { left: 42px; right: 42px; width: auto; top: 6px; height: 400px; }
                .badge-spotify-pos { top: 0; left: 64px; }
                .badge-meta-pos { top: 118px; right: -6px; left: auto; }
                .badge-google-pos { top: 280px; left: -8px; }
                .badge-ms-pos { top: 330px; right: -8px; left: auto; }
                .search-shell { flex-direction: column; align-items: stretch; }
                .hero-register { width: 100%; min-width: 0; }
              }
              @keyframes scroll-partners {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .partner-scroll {
                animation: scroll-partners 26s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .partner-scroll { animation: none; }
              }
              @media (min-width: 1024px) {
                .workflow-grid { grid-template-columns: minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); }
              }
              .footer-main {
                display: grid;
                grid-template-columns: 2.3fr repeat(3, minmax(0,1fr));
                gap: 3rem;
              }
              @media (max-width: 1020px) {
                .footer-main { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 2.4rem; }
                .footer-brand-col { grid-column: 1 / -1; }
              }
              @media (max-width: 640px) {
                .footer-main { grid-template-columns: 1fr; gap: 2rem; }
                .footer-bottom-bar { flex-direction: column !important; align-items: flex-start !important; }
              }
              @media (max-width: 560px) {
                .footer-bottom-bar { margin-top: 2.5rem; padding-top: 1.3rem; }
              }
            `}</style>

            <div className="hero-grid grid gap-4 items-end w-full">
              {/* copy */}
              <div className="hero-copy-wrap flex flex-col gap-8 lg:gap-0">
                <div className="flex flex-col gap-8 lg:gap-12">
                  <h1 className="flex flex-col gap-0 m-0">
                    <span
                      className="block font-extrabold uppercase"
                      style={{ fontSize: "clamp(3.3rem,6.2vw,5.45rem)", lineHeight: 0.96, letterSpacing: "-0.02em", color: "#000" }}
                    >
                      Discover Your
                    </span>
                    <span
                      className="block font-extrabold uppercase"
                      style={{
                        fontSize: "clamp(3.3rem,6.2vw,5.45rem)",
                        lineHeight: 0.96,
                        letterSpacing: "-0.02em",
                        color: BLUE,
                        WebkitTextStroke: "2px #000",
                        paintOrder: "stroke fill",
                      } as React.CSSProperties}
                    >
                      Dream Career
                    </span>
                    <span
                      className="block font-extrabold uppercase"
                      style={{ fontSize: "clamp(3.3rem,6.2vw,5.45rem)", lineHeight: 0.96, letterSpacing: "-0.02em", color: "#000" }}
                    >
                      Today
                    </span>
                  </h1>
                  <p className="m-0 text-base leading-[1.5]" style={{ maxWidth: "711px", color: "#000" }}>
                    Let&apos;s try our way to get your dream job, with offers from different countries and job positions, create for a better life.
                  </p>
                </div>

                {/* search */}
                <div className="search-shell flex gap-4 w-full" style={{ maxWidth: "713px" }}>
                  <div
                    className="flex-1 flex items-center border-2 bg-white"
                    style={{ height: "40px", borderColor: "#000", boxShadow: SHADOW }}
                  >
                    <button
                      type="button"
                      aria-label="Select job title"
                      className="flex-1 flex items-center gap-2 px-2 h-full border-0 bg-transparent cursor-pointer text-left"
                      style={{ color: "rgb(0 20 41 / 60%)", fontFamily: "inherit", fontSize: "1rem" }}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0" style={{ color: "#000" }}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full block">
                          <path d="M2.25 8.25H21.75V20.25H2.25V8.25Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8.25 8.25V5.25H15.75V8.25" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2.25 12.75H21.75" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M10.5 14.25H13.5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                      <span className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">Job title</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0" style={{ color: "#000" }}>
                        <ChevronDown />
                      </span>
                    </button>
                    <div className="w-px h-5 flex-shrink-0" style={{ background: "#99a1a9" }} />
                    <button
                      type="button"
                      aria-label="Select location"
                      className="flex-1 flex items-center gap-2 px-2 h-full border-0 bg-transparent cursor-pointer text-left"
                      style={{ color: "rgb(0 20 41 / 60%)", fontFamily: "inherit", fontSize: "1rem" }}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0" style={{ color: "#000" }}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full block">
                          <path d="M12 20.25C12 20.25 18 14.25 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.25 12 20.25 12 20.25Z" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                      <span className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">Location</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0" style={{ color: "#000" }}>
                        <ChevronDown />
                      </span>
                    </button>
                  </div>
                  <a
                    href="#"
                    className="hero-register inline-flex items-center justify-center min-h-[40px] border-2 font-bold text-[0.89rem] tracking-[0.01em] transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px px-[0.9rem]"
                    style={{ borderColor: "#000", background: YELLOW_DEEP, boxShadow: SHADOW }}
                  >
                    Register Now
                  </a>
                </div>
              </div>

              {/* hero visual */}
              <div className="hero-visual relative w-full" style={{ maxWidth: "100%" }}>
                <div
                  className="hero-visual-card absolute"
                  style={{ border: "3px solid #000", background: BLUE, boxShadow: SHADOW }}
                />
                <div className="hero-visual-photo absolute overflow-hidden" style={{ background: "#bab6b6" }}>
                  <img src="/jobhub/hero.jpg" alt="" loading="eager" decoding="async" className="w-full h-full block object-cover object-top" />
                </div>

                {/* badge – Spotify */}
                <div
                  className="badge-spotify-pos absolute inline-flex items-center justify-center bg-white"
                  style={{ width: "46.3px", height: "46.3px", border: "1px solid #000", borderRadius: "33px", boxShadow: SHADOW, top: "0", left: "114px" }}
                >
                  <SpotifyLogo />
                </div>
                {/* badge – Meta */}
                <div
                  className="badge-meta-pos absolute inline-flex items-center justify-center bg-white"
                  style={{ width: "46.3px", height: "46.3px", border: "1px solid #000", borderRadius: "33px", boxShadow: SHADOW }}
                >
                  <MetaLogo />
                </div>
                {/* badge – Google */}
                <div
                  className="badge-google-pos absolute inline-flex items-center justify-center bg-white"
                  style={{ width: "46.3px", height: "46.3px", border: "1px solid #000", borderRadius: "33px", boxShadow: SHADOW, top: "370.6px", left: "0" }}
                >
                  <GoogleLogo />
                </div>
                {/* badge – Microsoft */}
                <div
                  className="badge-ms-pos absolute inline-flex items-center justify-center bg-white"
                  style={{ width: "46.3px", height: "46.3px", border: "1px solid #000", borderRadius: "33px", boxShadow: SHADOW }}
                >
                  <MicrosoftLogo />
                </div>
              </div>
            </div>
          </div>

          {/* partner marquee */}
          <div
            className="mt-20 h-[100px] overflow-hidden border-t-2 border-b-2"
            style={{ borderColor: "#000", background: "#000" }}
            id="job-alerts"
          >
            <div className="partner-scroll min-w-max h-full inline-flex items-center gap-4 pr-4" aria-hidden="true">
              {["Spotify","Meta","Google","Microsoft","Amazon","Airbnb","Shopify","Notion","Stripe",
                "Spotify","Meta","Google","Microsoft","Amazon","Airbnb","Shopify","Notion","Stripe"].map((name, i) => (
                <span
                  key={i}
                  className="font-heading text-[2rem] tracking-[0.06em] uppercase inline-flex items-center justify-center"
                  style={{ minWidth: "210px", minHeight: "70px", border: "1px solid #475569", color: "#f8fafc", background: "#111827" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" id="why-best">
          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto text-center">
            <h2 className="m-0" style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.9, textTransform: "uppercase", fontSize: "clamp(2.8rem,5.2vw,4.8rem)" }}>
              <span className="block" style={{ color: "#000" }}>WHY WE&apos;RE</span>
              <span
                className="block"
                style={{ color: "#ffde00", WebkitTextStroke: "2px #000", paintOrder: "stroke fill" } as React.CSSProperties}
              >
                THE BEST
              </span>
            </h2>
            <p className="mt-8 mx-auto text-base leading-[1.5]" style={{ maxWidth: "711px", color: "#000" }}>
              We have been helping workers to find their dream job for more than 10 years, and it continues to grow
            </p>
          </div>

          <div
            className="w-full max-w-[1030px] mx-auto px-4 mt-16 grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            {/* KPI 1 */}
            <article className="flex items-start gap-8 min-h-[88px]">
              <div className="w-[88px] h-[88px] flex-shrink-0 border-2 inline-flex items-center justify-center" style={{ borderColor: "#000", boxShadow: SHADOW_LG, background: "#ffef99" }}>
                <svg viewBox="0 0 56 48" className="w-[57%] h-[57%] block" fill="none">
                  <path d="M22 18C22 17.4696 22.2107 16.9609 22.5858 16.5858C22.9609 16.2107 23.4696 16 24 16H40C40.5304 16 41.0391 16.2107 41.4142 16.5858C41.7893 16.9609 42 17.4696 42 18C42 18.5304 41.7893 19.0391 41.4142 19.4142C41.0391 19.7893 40.5304 20 40 20H24C23.4696 20 22.9609 19.7893 22.5858 19.4142C22.2107 19.0391 22 18.5304 22 18ZM24 28H40C40.5304 28 41.0391 27.7893 41.4142 27.4142C41.7893 27.0391 42 26.5304 42 26C42 25.4696 41.7893 24.9609 41.4142 24.5858C41.0391 24.2107 40.5304 24 40 24H24C23.4696 24 22.9609 24.2107 22.5858 24.5858C22.2107 24.9609 22 25.4696 22 26C22 26.5304 22.2107 27.0391 22.5858 27.4142C22.9609 27.7893 23.4696 28 24 28ZM56 40C56 42.1217 55.1571 44.1566 53.6569 45.6569C52.1566 47.1571 50.1217 48 48 48H20C17.8783 48 15.8434 47.1571 14.3431 45.6569C12.8429 44.1566 12 42.1217 12 40V8C12 6.93913 11.5786 5.92172 10.8284 5.17157C10.0783 4.42143 9.06087 4 8 4C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8C4 9.435 5.2075 10.405 5.22 10.415C5.551 10.6697 5.79395 11.0217 5.91476 11.4215C6.03557 11.8213 6.02818 12.2489 5.89362 12.6443C5.75907 13.0397 5.5041 13.3831 5.16449 13.6262C4.82488 13.8693 4.41767 14.0001 4 14C3.5675 14.0007 3.14674 13.8593 2.8025 13.5975C2.5125 13.385 0 11.4025 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842854 5.87827 0 8 0H42C44.1217 0 46.1566 0.842854 47.6569 2.34315C49.1571 3.84344 50 5.87827 50 8V34H52C52.4327 34 52.8538 34.1404 53.2 34.4C53.5 34.615 56 36.5975 56 40ZM22.065 35.37C22.2017 34.9666 22.4624 34.6169 22.81 34.3708C23.1576 34.1247 23.5742 33.9949 24 34H46V8C46 6.93913 45.5786 5.92172 44.8284 5.17157C44.0783 4.42143 43.0609 4 42 4H14.9225C15.6298 5.21426 16.0017 6.59473 16 8V40C16 41.0609 16.4214 42.0783 17.1716 42.8284C17.9217 43.5786 18.9391 44 20 44C21.0609 44 22.0783 43.5786 22.8284 42.8284C23.5786 42.0783 24 41.0609 24 40C24 38.565 22.7925 37.595 22.78 37.585C22.4392 37.3412 22.1857 36.9943 22.057 36.5955C21.9282 36.1967 21.931 35.7671 22.065 35.37ZM52 40C51.975 39.259 51.689 38.5506 51.1925 38H27.6925C27.8935 38.6476 27.9955 39.3219 27.995 40C27.9969 41.4046 27.6269 42.7847 26.9225 44H48C49.0609 44 50.0783 43.5786 50.8284 42.8284C51.5786 42.0783 52 41.0609 52 40Z" fill="black" />
                </svg>
              </div>
              <div className="pt-3">
                <p style={{ fontSize: "clamp(1.9rem,2.4vw,2.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>1,500+</p>
                <p className="mt-2 text-base leading-[1]" style={{ color: "rgb(0 20 41 / 60%)" }}>Job title</p>
              </div>
            </article>

            {/* KPI 2 */}
            <article className="flex items-start gap-8 min-h-[88px]">
              <div className="w-[88px] h-[88px] flex-shrink-0 border-2 inline-flex items-center justify-center" style={{ borderColor: "#000", boxShadow: SHADOW_LG, background: MINT }}>
                <svg viewBox="0 0 44 56" className="w-[57%] h-[57%] block" fill="none">
                  <path d="M22 12C20.0222 12 18.0888 12.5865 16.4443 13.6853C14.7998 14.7841 13.5181 16.3459 12.7612 18.1732C12.0043 20.0004 11.8063 22.0111 12.1921 23.9509C12.578 25.8907 13.5304 27.6725 14.9289 29.0711C16.3275 30.4696 18.1093 31.422 20.0491 31.8079C21.9889 32.1937 23.9996 31.9957 25.8268 31.2388C27.6541 30.4819 29.2159 29.2002 30.3147 27.5557C31.4135 25.9112 32 23.9778 32 22C32 19.3478 30.9464 16.8043 29.0711 14.9289C27.1957 13.0536 24.6522 12 22 12ZM22 28C20.8133 28 19.6533 27.6481 18.6666 26.9888C17.6799 26.3295 16.9108 25.3925 16.4567 24.2961C16.0026 23.1997 15.8838 21.9933 16.1153 20.8295C16.3468 19.6656 16.9182 18.5965 17.7574 17.7574C18.5965 16.9182 19.6656 16.3468 20.8295 16.1153C21.9933 15.8838 23.1997 16.0026 24.2961 16.4567C25.3925 16.9108 26.3295 17.6799 26.9888 18.6666C27.6481 19.6533 28 20.8133 28 22C28 23.5913 27.3679 25.1174 26.2426 26.2426C25.1174 27.3679 23.5913 28 22 28ZM22 0C16.1673 0.00661683 10.5753 2.32659 6.45096 6.45096C2.32659 10.5753 0.00661683 16.1673 0 22C0 29.85 3.6275 38.17 10.5 46.0625C13.5881 49.6289 17.0636 52.8404 20.8625 55.6375C21.1988 55.8731 21.5994 55.9994 22.01 55.9994C22.4206 55.9994 22.8212 55.8731 23.1575 55.6375C26.9494 52.8392 30.4182 49.6278 33.5 46.0625C40.3625 38.17 44 29.85 44 22C43.9934 16.1673 41.6734 10.5753 37.549 6.45096C33.4247 2.32659 27.8327 0.00661683 22 0ZM22 51.5C17.8675 48.25 4 36.3125 4 22C4 17.2261 5.89642 12.6477 9.27208 9.27208C12.6477 5.89642 17.2261 4 22 4C26.7739 4 31.3523 5.89642 34.7279 9.27208C38.1036 12.6477 40 17.2261 40 22C40 36.3075 26.1325 48.25 22 51.5Z" fill="black" />
                </svg>
              </div>
              <div className="pt-3">
                <p style={{ fontSize: "clamp(1.9rem,2.4vw,2.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>100+</p>
                <p className="mt-2 text-base leading-[1]" style={{ color: "rgb(0 20 41 / 60%)" }}>Country</p>
              </div>
            </article>

            {/* KPI 3 */}
            <article className="flex items-start gap-8 min-h-[88px]">
              <div className="w-[88px] h-[88px] flex-shrink-0 border-2 inline-flex items-center justify-center" style={{ borderColor: "#000", boxShadow: SHADOW_LG, background: "#cce6ff" }}>
                <svg viewBox="0 0 63 41" className="w-[57%] h-[57%] block" fill="none">
                  <path d="M28.7706 27.4861C31.4511 25.7016 33.4862 23.1018 34.5749 20.0712C35.6636 17.0406 35.7481 13.7402 34.8159 10.6578C33.8837 7.57552 31.9844 4.87501 29.3987 2.95566C26.813 1.0363 23.6783 0 20.4581 0C17.2379 0 14.1032 1.0363 11.5176 2.95566C8.93189 4.87501 7.03253 7.57552 6.10036 10.6578C5.16819 13.7402 5.25269 17.0406 6.34138 20.0712C7.43006 23.1018 9.46513 25.7016 12.1456 27.4861C7.29686 29.2732 3.1559 32.5802 0.340632 36.9136C0.192671 37.1335 0.0898976 37.3806 0.038285 37.6406C-0.0133277 37.9006 -0.0127498 38.1682 0.0399849 38.428C0.0927197 38.6877 0.196559 38.9344 0.345468 39.1537C0.494377 39.3729 0.685385 39.5604 0.907388 39.7052C1.12939 39.85 1.37796 39.9492 1.63865 39.9971C1.89934 40.045 2.16695 40.0406 2.42592 39.9842C2.68489 39.9277 2.93006 39.8204 3.14718 39.6683C3.36429 39.5163 3.54902 39.3226 3.69063 39.0986C5.50661 36.3055 7.99152 34.0104 10.9197 32.4215C13.8479 30.8327 17.1266 30.0005 20.4581 30.0005C23.7896 30.0005 27.0683 30.8327 29.9965 32.4215C32.9247 34.0104 35.4097 36.3055 37.2256 39.0986C37.519 39.5346 37.9721 39.8376 38.4871 39.9421C39.0021 40.0467 39.5375 39.9444 39.9776 39.6573C40.4177 39.3702 40.7272 38.9215 40.8391 38.408C40.951 37.8946 40.8564 37.3578 40.5756 36.9136C37.7604 32.5802 33.6194 29.2732 28.7706 27.4861ZM9.45813 15.0061C9.45813 12.8305 10.1033 10.7038 11.312 8.89481C12.5207 7.08587 14.2386 5.67598 16.2486 4.84341C18.2586 4.01085 20.4703 3.79301 22.6041 4.21745C24.7379 4.64189 26.6979 5.68953 28.2363 7.22791C29.7747 8.76629 30.8223 10.7263 31.2468 12.8601C31.6712 14.9939 31.4534 17.2056 30.6208 19.2156C29.7882 21.2256 28.3783 22.9436 26.5694 24.1523C24.7605 25.3609 22.6337 26.0061 20.4581 26.0061C17.5418 26.0028 14.7458 24.8428 12.6836 22.7806C10.6214 20.7184 9.46144 17.9225 9.45813 15.0061ZM61.9931 39.6811C61.5489 39.9708 61.0078 40.0722 60.4888 39.9629C59.9698 39.8537 59.5154 39.5428 59.2256 39.0986C57.4118 36.3039 54.9272 34.0077 51.9984 32.4195C49.0696 30.8313 45.7898 30.0016 42.4581 30.0061C41.9277 30.0061 41.419 29.7954 41.0439 29.4203C40.6688 29.0452 40.4581 28.5365 40.4581 28.0061C40.4581 27.4757 40.6688 26.9669 41.0439 26.5919C41.419 26.2168 41.9277 26.0061 42.4581 26.0061C44.0781 26.0046 45.6776 25.6453 47.1426 24.9539C48.6076 24.2625 49.9018 23.2561 50.9327 22.0065C51.9636 20.757 52.7058 19.2952 53.1063 17.7255C53.5068 16.1559 53.5556 14.5172 53.2494 12.9265C52.9431 11.3357 52.2893 9.83231 51.3347 8.52358C50.38 7.21484 49.1481 6.13311 47.7269 5.35567C46.3057 4.57823 44.7304 4.12428 43.1134 4.02625C41.4965 3.92822 39.8778 4.18853 38.3731 4.78859C38.1278 4.89464 37.8637 4.95045 37.5964 4.95271C37.3292 4.95497 37.0642 4.90363 36.8171 4.80174C36.57 4.69984 36.3458 4.54946 36.1578 4.35946C35.9698 4.16947 35.8218 3.94372 35.7226 3.69556C35.6233 3.4474 35.5748 3.18186 35.5799 2.91463C35.585 2.6474 35.6436 2.38391 35.7523 2.13972C35.8609 1.89552 36.0174 1.67558 36.2125 1.4929C36.4076 1.31021 36.6373 1.16848 36.8881 1.07609C40.3318 -0.297286 44.162 -0.346708 47.64 0.937353C51.1179 2.22141 53.9971 4.74798 55.7221 8.02963C57.4471 11.3113 57.8957 15.1155 56.9814 18.7084C56.067 22.3013 53.8545 25.4282 50.7706 27.4861C55.6194 29.2732 59.7604 32.5802 62.5756 36.9136C62.8653 37.3578 62.9667 37.899 62.8575 38.418C62.7482 38.937 62.4373 39.3913 61.9931 39.6811Z" fill="black" />
                </svg>
              </div>
              <div className="pt-3">
                <p style={{ fontSize: "clamp(1.9rem,2.4vw,2.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>50,000+</p>
                <p className="mt-2 text-base leading-[1]" style={{ color: "rgb(0 20 41 / 60%)" }}>Community member</p>
              </div>
            </article>
          </div>
        </section>

        {/* ── CATEGORIES ────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" id="career-advice">
          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto text-center">
            <h2 className="m-0" style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.9, textTransform: "uppercase", fontSize: "clamp(2.8rem,5.2vw,4.8rem)" }}>
              <span className="block" style={{ color: "#000" }}>
                THERE ARE{" "}
                <span style={{ color: BLUE, WebkitTextStroke: "2px #000", paintOrder: "stroke fill" } as React.CSSProperties}>
                  20+ JOB
                </span>
              </span>
              <span className="block mt-2" style={{ color: "#000" }}>
                <span style={{ color: "#ffde00", WebkitTextStroke: "2px #000", paintOrder: "stroke fill" } as React.CSSProperties}>
                  CATEGORIES
                </span>{" "}
                AVAILABLE
              </span>
            </h2>
          </div>

          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Design", count: "New 128 job posted", bg: PEACH, flip: false, iconPath: "M31.0845 17.1554C29.6628 15.7568 27.8595 14.8097 25.9011 14.433C23.9427 14.0563 21.9167 14.2669 20.0776 15.0383C18.2386 15.8097 16.6686 17.1075 15.565 18.7686C14.4613 20.4297 13.8733 22.3799 13.8748 24.3742C13.8748 28.5667 16.4623 32.0851 20.6248 33.5561C21.1339 33.736 21.6787 33.7913 22.2135 33.7171C22.7483 33.6429 23.2575 33.4415 23.6983 33.1298C24.1392 32.8181 24.4988 32.4051 24.747 31.9256C24.9952 31.4462 25.1248 30.9141 25.1248 30.3742C25.1248 30.0758 25.2433 29.7897 25.4543 29.5787C25.6653 29.3677 25.9515 29.2492 26.2498 29.2492H30.582C31.3477 29.2528 32.0916 28.9944 32.6902 28.5169C33.2887 28.0394 33.706 27.3715 33.8726 26.6242C34.0465 25.8581 34.1311 25.0744 34.1248 24.2889C34.1156 22.9578 33.8421 21.6418 33.3201 20.4172C32.7982 19.1927 32.0383 18.084 31.0845 17.1554ZM31.6789 26.1245C31.623 26.3732 31.4838 26.5953 31.2842 26.7539C31.0847 26.9125 30.8369 26.9981 30.582 26.9964H26.2498C25.3547 26.9964 24.4963 27.352 23.8633 27.9849C23.2304 28.6178 22.8748 29.4763 22.8748 30.3714C22.8746 30.5512 22.8313 30.7284 22.7485 30.8881C22.6656 31.0478 22.5457 31.1853 22.3988 31.289C22.2519 31.3928 22.0822 31.4598 21.9041 31.4845C21.7259 31.5091 21.5444 31.4907 21.3748 31.4307C19.8139 30.8795 18.5014 29.9532 17.5798 28.7532C16.6225 27.4954 16.1106 25.9549 16.1248 24.3742C16.1247 22.2997 16.9432 20.3089 18.4024 18.8344C19.8617 17.3598 21.8438 16.5207 23.9183 16.4992H23.9998C26.0743 16.5076 28.0624 17.3309 29.5355 18.7916C31.0086 20.2522 31.8488 22.2333 31.8748 24.3076C31.8799 24.92 31.8142 25.531 31.6789 26.1282V26.1245ZM25.4998 19.4992C25.4998 19.7959 25.4118 20.0859 25.247 20.3325C25.0822 20.5792 24.8479 20.7715 24.5738 20.885C24.2998 20.9985 23.9982 21.0282 23.7072 20.9704C23.4162 20.9125 23.1489 20.7696 22.9392 20.5598C22.7294 20.3501 22.5865 20.0828 22.5286 19.7918C22.4708 19.5008 22.5005 19.1992 22.614 18.9252C22.7275 18.6511 22.9198 18.4168 23.1665 18.252C23.4131 18.0872 23.7031 17.9992 23.9998 17.9992C24.3976 17.9992 24.7792 18.1572 25.0605 18.4385C25.3418 18.7198 25.4998 19.1014 25.4998 19.4992ZM21.3748 21.7492C21.3748 22.0459 21.2868 22.3359 21.122 22.5825C20.9572 22.8292 20.7229 23.0215 20.4488 23.135C20.1748 23.2485 19.8732 23.2782 19.5822 23.2204C19.2912 23.1625 19.0239 23.0196 18.8142 22.8098C18.6044 22.6001 18.4615 22.3328 18.4036 22.0418C18.3458 21.7508 18.3755 21.4492 18.489 21.1752C18.6025 20.9011 18.7948 20.6668 19.0415 20.502C19.2881 20.3372 19.5781 20.2492 19.8748 20.2492C20.2726 20.2492 20.6542 20.4072 20.9355 20.6885C21.2168 20.9698 21.3748 21.3514 21.3748 21.7492ZM21.3748 26.9992C21.3748 27.2959 21.2868 27.5859 21.122 27.8325C20.9572 28.0792 20.7229 28.2715 20.4488 28.385C20.1748 28.4985 19.8732 28.5282 19.5822 28.4704C19.2912 28.4125 19.0239 28.2696 18.8142 28.0598C18.6044 27.8501 18.4615 27.5828 18.4036 27.2918C18.3458 27.0008 18.3755 26.6992 18.489 26.4252C18.6025 26.1511 18.7948 25.9168 19.0415 25.752C19.2881 25.5872 19.5781 25.4992 19.8748 25.4992C20.2726 25.4992 20.6542 25.6572 20.9355 25.9385C21.2168 26.2198 21.3748 26.6014 21.3748 26.9992ZM29.6248 21.7492C29.6248 22.0459 29.5368 22.3359 29.372 22.5825C29.2072 22.8292 28.9729 23.0215 28.6988 23.135C28.4248 23.2485 28.1232 23.2782 27.8322 23.2204C27.5412 23.1625 27.2739 23.0196 27.0642 22.8098C26.8544 22.6001 26.7115 22.3328 26.6536 22.0418C26.5958 21.7508 26.6255 21.4492 26.739 21.1752C26.8525 20.9011 27.0448 20.6668 27.2915 20.502C27.5381 20.3372 27.8281 20.2492 28.1248 20.2492C28.5226 20.2492 28.9042 20.4072 29.1855 20.6885C29.4668 20.9698 29.6248 21.3514 29.6248 21.7492Z" },
              { title: "Marketing", count: "New 90 job posted", bg: "#fff", flip: false, iconPath: "M33.75 21C33.7504 20.9303 33.7409 20.8608 33.7219 20.7938L32.3766 16.0875C32.2861 15.7752 32.0971 15.5006 31.8378 15.3046C31.5784 15.1086 31.2626 15.0017 30.9375 15H17.0625C16.7374 15.0017 16.4216 15.1086 16.1622 15.3046C15.9029 15.5006 15.7139 15.7752 15.6234 16.0875L14.2791 20.7938C14.2597 20.8608 14.2499 20.9302 14.25 21V22.5C14.25 23.0822 14.3855 23.6563 14.6459 24.1771C14.9063 24.6978 15.2843 25.1507 15.75 25.5V32.25C15.75 32.4489 15.829 32.6397 15.9697 32.7803C16.1103 32.921 16.3011 33 16.5 33H31.5C31.6989 33 31.8897 32.921 32.0303 32.7803C32.171 32.6397 32.25 32.4489 32.25 32.25V25.5C32.7157 25.1507 33.0937 24.6978 33.3541 24.1771C33.6145 23.6563 33.75 23.0822 33.75 22.5V21ZM17.0625 16.5H30.9375L32.0081 20.25H15.9947L17.0625 16.5ZM21.75 21.75H26.25V22.5C26.25 23.0967 26.0129 23.669 25.591 24.091C25.169 24.5129 24.5967 24.75 24 24.75C23.4033 24.75 22.831 24.5129 22.409 24.091C21.9871 23.669 21.75 23.0967 21.75 22.5V21.75ZM20.25 21.75V22.5C20.2499 22.8869 20.15 23.2673 19.9599 23.6043C19.7699 23.9413 19.4962 24.2236 19.1652 24.424C18.8342 24.6244 18.4571 24.736 18.0704 24.7481C17.6837 24.7602 17.3004 24.6724 16.9575 24.4931C16.9053 24.4525 16.8479 24.4191 16.7869 24.3937C16.4691 24.1903 16.2076 23.9103 16.0265 23.5794C15.8453 23.2484 15.7502 22.8773 15.75 22.5V21.75H20.25ZM30.75 31.5H17.25V26.175C17.4969 26.2248 17.7481 26.2499 18 26.25C18.5822 26.25 19.1563 26.1145 19.6771 25.8541C20.1978 25.5937 20.6507 25.2157 21 24.75C21.3493 25.2157 21.8022 25.5937 22.323 25.8541C22.8437 26.1145 23.4178 26.25 24 26.25C24.5822 26.25 25.1563 26.1145 25.6771 25.8541C26.1978 25.5937 26.6507 25.2157 27 24.75C27.3493 25.2157 27.8022 25.5937 28.3229 25.8541C28.8437 26.1145 29.4178 26.25 30 26.25C30.2519 26.2499 30.5031 26.2248 30.75 26.175V31.5ZM31.2122 24.3937C31.1519 24.4191 31.0952 24.4522 31.0434 24.4922C30.7006 24.6716 30.3173 24.7596 29.9305 24.7477C29.5437 24.7357 29.1666 24.6242 28.8355 24.424C28.5044 24.2237 28.2305 23.9414 28.0404 23.6044C27.8502 23.2673 27.7502 22.887 27.75 22.5V21.75H32.25V22.5C32.2497 22.8774 32.1545 23.2486 31.9731 23.5795C31.7918 23.9104 31.5301 24.1904 31.2122 24.3937Z" },
              { title: "Education", count: "New 232 job posted", bg: "#fff", flip: false, iconPath: "M32.9674 30.6137L29.8559 15.8199C29.8156 15.6265 29.7376 15.4428 29.6261 15.2797C29.5147 15.1165 29.3722 14.9769 29.2066 14.8689C29.0411 14.761 28.8559 14.6868 28.6616 14.6507C28.4674 14.6146 28.2679 14.6172 28.0746 14.6583L23.6862 15.6015C23.298 15.6865 22.9591 15.9213 22.7432 16.2549C22.5272 16.5884 22.4517 16.9938 22.5331 17.3827L25.6446 32.1765C25.714 32.514 25.8974 32.8174 26.1641 33.0355C26.4308 33.2537 26.7644 33.3735 27.109 33.3746C27.2155 33.3745 27.3217 33.3631 27.4259 33.3409L31.8143 32.3977C32.2029 32.3125 32.5422 32.0772 32.7582 31.7431C32.9741 31.4089 33.0494 31.003 32.9674 30.6137ZM24.0002 17.0762C24.0002 17.0705 24.0002 17.0677 24.0002 17.0677L28.3877 16.1302L28.6999 17.618L24.3124 18.5621L24.0002 17.0762ZM24.6209 20.0265L29.0102 19.0843L29.3234 20.5749L24.9377 21.518L24.6209 20.0265ZM25.2434 22.9862L29.6327 22.043L30.8796 27.9718L26.4902 28.9149L25.2434 22.9862ZM31.5002 30.9315L27.1127 31.869L26.8006 30.3812L31.1881 29.4371L31.5002 30.923C31.5002 30.9287 31.5002 30.9315 31.5002 30.9315ZM21.0002 15.3746H16.5002C16.1024 15.3746 15.7209 15.5326 15.4396 15.8139C15.1583 16.0952 15.0002 16.4768 15.0002 16.8746V31.8746C15.0002 32.2724 15.1583 32.654 15.4396 32.9353C15.7209 33.2166 16.1024 33.3746 16.5002 33.3746H21.0002C21.3981 33.3746 21.7796 33.2166 22.0609 32.9353C22.3422 32.654 22.5002 32.2724 22.5002 31.8746V16.8746C22.5002 16.4768 22.3422 16.0952 22.0609 15.8139C21.7796 15.5326 21.3981 15.3746 21.0002 15.3746ZM16.5002 16.8746H21.0002V18.3746H16.5002V16.8746ZM16.5002 19.8746H21.0002V28.8746H16.5002V19.8746ZM21.0002 31.8746H16.5002V30.3746H21.0002V31.8746Z" },
              { title: "Finance", count: "New 458 job posted", bg: "#fff", flip: false, iconPath: "M24 14.25C22.0716 14.25 20.1866 14.8218 18.5832 15.8932C16.9798 16.9645 15.7301 18.4873 14.9922 20.2688C14.2542 22.0504 14.0611 24.0108 14.4373 25.9021C14.8136 27.7934 15.7422 29.5307 17.1057 30.8943C18.4693 32.2579 20.2066 33.1865 22.0979 33.5627C23.9892 33.9389 25.9496 33.7458 27.7312 33.0078C29.5127 32.2699 31.0355 31.0202 32.1068 29.4168C33.1782 27.8134 33.75 25.9284 33.75 24C33.7473 21.415 32.7192 18.9366 30.8913 17.1087C29.0634 15.2808 26.585 14.2527 24 14.25ZM24 32.25C22.3683 32.25 20.7733 31.7661 19.4165 30.8596C18.0598 29.9531 17.0024 28.6646 16.378 27.1571C15.7536 25.6496 15.5902 23.9908 15.9085 22.3905C16.2269 20.7902 17.0126 19.3202 18.1664 18.1664C19.3202 17.0126 20.7902 16.2268 22.3905 15.9085C23.9909 15.5902 25.6497 15.7536 27.1571 16.378C28.6646 17.0024 29.9531 18.0598 30.8596 19.4165C31.7661 20.7733 32.25 22.3683 32.25 24C32.2475 26.1873 31.3775 28.2843 29.8309 29.8309C28.2843 31.3775 26.1873 32.2475 24 32.25ZM27.75 25.875C27.75 26.5712 27.4734 27.2389 26.9812 27.7312C26.4889 28.2234 25.8212 28.5 25.125 28.5H24.75V29.25C24.75 29.4489 24.671 29.6397 24.5303 29.7803C24.3897 29.921 24.1989 30 24 30C23.8011 30 23.6103 29.921 23.4697 29.7803C23.329 29.6397 23.25 29.4489 23.25 29.25V28.5H21.75C21.5511 28.5 21.3603 28.421 21.2197 28.2803C21.079 28.1397 21 27.9489 21 27.75C21 27.5511 21.079 27.3603 21.2197 27.2197C21.3603 27.079 21.5511 27 21.75 27H25.125C25.4234 27 25.7095 26.8815 25.9205 26.6705C26.1315 26.4595 26.25 26.1734 26.25 25.875C26.25 25.5766 26.1315 25.2905 25.9205 25.0795C25.7095 24.8685 25.4234 24.75 25.125 24.75H22.875C22.1788 24.75 21.5111 24.4734 21.0188 23.9812C20.5266 23.4889 20.25 22.8212 20.25 22.125C20.25 21.4288 20.5266 20.7611 21.0188 20.2688C21.5111 19.7766 22.1788 19.5 22.875 19.5H23.25V18.75C23.25 18.5511 23.329 18.3603 23.4697 18.2197C23.6103 18.079 23.8011 18 24 18C24.1989 18 24.3897 18.079 24.5303 18.2197C24.671 18.3603 24.75 18.5511 24.75 18.75V19.5H26.25C26.4489 19.5 26.6397 19.579 26.7803 19.7197C26.921 19.8603 27 20.0511 27 20.25C27 20.4489 26.921 20.6397 26.7803 20.7803C26.6397 20.921 26.4489 21 26.25 21H22.875C22.5766 21 22.2905 21.1185 22.0795 21.3295C21.8685 21.5405 21.75 21.8266 21.75 22.125C21.75 22.4234 21.8685 22.7095 22.0795 22.9205C22.2905 23.1315 22.5766 23.25 22.875 23.25H25.125C25.8212 23.25 26.4889 23.5266 26.9812 24.0188C27.4734 24.5111 27.75 25.1788 27.75 25.875Z" },
              { title: "Technology", count: "New 320 job posted", bg: "#fff", flip: true, iconPath: "M28.5 13.5H19.5C18.9033 13.5 18.331 13.7371 17.909 14.159C17.4871 14.581 17.25 15.1533 17.25 15.75V32.25C17.25 32.8467 17.4871 33.419 17.909 33.841C18.331 34.2629 18.9033 34.5 19.5 34.5H28.5C29.0967 34.5 29.669 34.2629 30.091 33.841C30.5129 33.419 30.75 32.8467 30.75 32.25V15.75C30.75 15.1533 30.5129 14.581 30.091 14.159C29.669 13.7371 29.0967 13.5 28.5 13.5ZM18.75 18H29.25V30H18.75V18ZM19.5 15H28.5C28.6989 15 28.8897 15.079 29.0303 15.2197C29.171 15.3603 29.25 15.5511 29.25 15.75V16.5H18.75V15.75C18.75 15.5511 18.829 15.3603 18.9697 15.2197C19.1103 15.079 19.3011 15 19.5 15ZM28.5 33H19.5C19.3011 33 19.1103 32.921 18.9697 32.7803C18.829 32.6397 18.75 32.4489 18.75 32.25V31.5H29.25V32.25C29.25 32.4489 29.171 32.6397 29.0303 32.7803C28.8897 32.921 28.6989 33 28.5 33Z" },
              { title: "Health", count: "New 112 job posted", bg: "#fff", flip: false, iconPath: "M31.1256 26.25C31.1256 26.4725 31.0596 26.69 30.936 26.875C30.8124 27.06 30.6367 27.2042 30.4311 27.2894C30.2256 27.3745 29.9994 27.3968 29.7811 27.3534C29.5629 27.31 29.3625 27.2028 29.2051 27.0455C29.0478 26.8882 28.9406 26.6877 28.8972 26.4695C28.8538 26.2512 28.8761 26.025 28.9613 25.8195C29.0464 25.6139 29.1906 25.4382 29.3756 25.3146C29.5606 25.191 29.7781 25.125 30.0006 25.125C30.299 25.125 30.5851 25.2435 30.7961 25.4545C31.0071 25.6655 31.1256 25.9516 31.1256 26.25ZM30.6991 29.9334C30.5343 30.9955 29.9955 31.9637 29.1799 32.6635C28.3642 33.3633 27.3253 33.7486 26.2506 33.75H24.0006C22.8075 33.7488 21.6637 33.2743 20.82 32.4306C19.9764 31.587 19.5019 30.4431 19.5006 29.25V25.4522C18.0508 25.2695 16.7175 24.5641 15.7509 23.4682C14.7843 22.3723 14.2508 20.9613 14.2506 19.5V15C14.2506 14.8011 14.3296 14.6103 14.4703 14.4697C14.6109 14.329 14.8017 14.25 15.0006 14.25H17.2506C17.4495 14.25 17.6403 14.329 17.781 14.4697C17.9216 14.6103 18.0006 14.8011 18.0006 15C18.0006 15.1989 17.9216 15.3897 17.781 15.5303C17.6403 15.671 17.4495 15.75 17.2506 15.75H15.7506V19.5C15.7506 20.096 15.8689 20.6861 16.0988 21.236C16.3287 21.786 16.6655 22.2847 16.9898 22.7034C17.514 23.122 18.0172 23.4522 18.5701 23.6748C19.123 23.8974 19.7146 24.0079 20.3106 24C22.7584 23.9681 24.7506 21.9141 24.7506 19.4222V15.75H23.2506C23.0517 15.75 22.8609 15.671 22.7203 15.5303C22.5796 15.3897 22.5006 15.1989 22.5006 15C22.5006 14.8011 22.5796 14.6103 22.7203 14.4697C22.8609 14.329 23.0517 14.25 23.2506 14.25H25.5006C25.6995 14.25 25.8903 14.329 26.031 14.4697C26.1716 14.6103 26.2506 14.8011 26.2506 15V19.4222C26.2506 22.5009 23.9509 25.0744 21.0006 25.4513V29.25C21.0006 30.0456 21.3167 30.8087 21.8793 31.3713C22.4419 31.9339 23.205 32.25 24.0006 32.25H26.2506C26.9319 32.2489 27.5926 32.0163 28.1244 31.5905C28.6561 31.1647 29.0275 30.5708 29.1775 29.9062C28.2717 29.7028 27.4736 29.1706 26.9376 28.4126C26.4016 27.6546 26.1658 26.7248 26.2758 25.803C26.3858 24.8812 26.8338 24.0329 27.5332 23.4224C28.2326 22.8119 29.1335 22.4825 30.0617 22.4979C30.99 22.5134 31.8795 22.8726 32.5581 23.506C33.2368 24.1395 33.6564 25.0021 33.7357 25.9271C33.815 26.852 33.5483 27.7735 32.9874 28.5133C32.4265 29.253 31.6111 29.7583 30.6991 29.9316V29.9334ZM32.2506 26.25C32.2506 25.805 32.1187 25.37 31.8714 25C31.6242 24.63 31.2728 24.3416 30.8617 24.1713C30.4505 24.001 29.9981 23.9564 29.5617 24.0432C29.1252 24.13 28.7243 24.3443 28.4096 24.659C28.095 24.9737 27.8807 25.3746 27.7939 25.811C27.707 26.2475 27.7516 26.6999 27.9219 27.111C28.0922 27.5222 28.3806 27.8736 28.7506 28.1208C29.1206 28.368 29.5556 28.5 30.0006 28.5C30.5974 28.5 31.1697 28.2629 31.5916 27.841C32.0136 27.419 32.2506 26.8467 32.2506 26.25Z" },
              { title: "Writer", count: "New 86 job posted", bg: "#fff", flip: false, iconPath: "M34.125 21.8141C34.1256 21.617 34.0871 21.4218 34.0116 21.2398C33.9361 21.0578 33.8252 20.8926 33.6853 20.7538L27.2465 14.3141C27.1073 14.1748 26.9419 14.0643 26.7599 13.9888C26.5779 13.9134 26.3828 13.8746 26.1858 13.8746C25.9888 13.8746 25.7937 13.9134 25.6117 13.9888C25.4296 14.0643 25.2643 14.1748 25.125 14.3141L22.4597 16.9794L17.0222 19.0203C16.775 19.1125 16.5565 19.268 16.3883 19.4712C16.2202 19.6744 16.1083 19.9182 16.064 20.1782L13.8853 33.2516C13.8673 33.3591 13.873 33.4692 13.9019 33.5742C13.9308 33.6793 13.9822 33.7768 14.0526 33.8599C14.123 33.9431 14.2107 34.0099 14.3095 34.0558C14.4084 34.1016 14.516 34.1253 14.625 34.1253C14.6664 34.1252 14.7078 34.1217 14.7487 34.115L27.8212 31.9363C28.0809 31.8929 28.3246 31.782 28.5279 31.6147C28.7311 31.4473 28.8867 31.2294 28.979 30.9828L31.02 25.5453L33.6853 22.8753C33.8253 22.7364 33.9362 22.5711 34.0117 22.3889C34.0872 22.2067 34.1257 22.0113 34.125 21.8141ZM27.5747 30.4569L16.8112 32.2503L21.2522 27.8094C21.8068 28.1092 22.4509 28.1993 23.0665 28.0633C23.6822 27.9273 24.2283 27.5742 24.6051 27.0687C24.9818 26.5631 25.164 25.9388 25.1183 25.31C25.0727 24.6812 24.8022 24.0898 24.3564 23.6439C23.9106 23.1981 23.3192 22.9276 22.6903 22.882C22.0615 22.8363 21.4372 23.0185 20.9317 23.3953C20.4261 23.772 20.0731 24.3182 19.937 24.9338C19.801 25.5494 19.8911 26.1935 20.1909 26.7482L15.75 31.191L17.5434 20.4247L22.6875 18.4963L29.5031 25.3128L27.5747 30.4569ZM21.375 25.5003C21.375 25.2778 21.441 25.0603 21.5646 24.8753C21.6882 24.6903 21.8639 24.5461 22.0695 24.461C22.275 24.3758 22.5012 24.3536 22.7195 24.397C22.9377 24.4404 23.1381 24.5475 23.2955 24.7048C23.4528 24.8622 23.56 25.0626 23.6034 25.2809C23.6468 25.4991 23.6245 25.7253 23.5393 25.9309C23.4542 26.1364 23.31 26.3121 23.125 26.4357C22.94 26.5594 22.7225 26.6253 22.5 26.6253C22.2016 26.6253 21.9155 26.5068 21.7045 26.2958C21.4935 26.0849 21.375 25.7987 21.375 25.5003ZM30.375 24.0641L23.9353 17.6253L26.1853 15.3753L32.625 21.8141L30.375 24.0641Z" },
              { title: "Researcher", count: "New 213 job posted", bg: "#fff", flip: false, iconPath: "M34.2375 26.2383C34.1749 26.0636 34.1013 25.8929 34.0172 25.7274L30.1181 16.8568C30.0812 16.7713 30.0284 16.6937 29.9625 16.628C29.6839 16.3494 29.3532 16.1283 28.9891 15.9775C28.6251 15.8267 28.235 15.7491 27.8409 15.7491C27.4469 15.7491 27.0568 15.8267 26.6927 15.9775C26.3287 16.1283 25.998 16.3494 25.7194 16.628C25.5792 16.7683 25.5003 16.9584 25.5 17.1568V19.5005H22.5V17.1568C22.5001 17.0582 22.4807 16.9607 22.4431 16.8696C22.4055 16.7786 22.3503 16.6958 22.2806 16.6261C22.002 16.3475 21.6713 16.1265 21.3073 15.9756C20.9433 15.8248 20.5531 15.7472 20.1591 15.7472C19.765 15.7472 19.3749 15.8248 19.0109 15.9756C18.6468 16.1265 18.3161 16.3475 18.0375 16.6261C17.9716 16.6918 17.9188 16.7695 17.8819 16.8549L13.9828 25.7255C13.8987 25.891 13.8251 26.0617 13.7625 26.2365C13.5417 26.8542 13.4587 27.5128 13.5192 28.166C13.5797 28.8192 13.7823 29.4513 14.1128 30.018C14.4433 30.5847 14.8937 31.0722 15.4325 31.4465C15.9712 31.8209 16.5853 32.0728 17.2317 32.1848C17.8781 32.2969 18.5411 32.2662 19.1744 32.095C19.8077 31.9238 20.3959 31.6162 20.8978 31.1937C21.3997 30.7713 21.8031 30.2442 22.0799 29.6494C22.3567 29.0546 22.5001 28.4065 22.5 27.7505V21.0005H25.5V27.7505C25.4997 28.4066 25.6428 29.0549 25.9194 29.6498C26.196 30.2448 26.5993 30.772 27.1011 31.1947C27.603 31.6173 28.1911 31.9251 28.8245 32.0965C29.4578 32.2679 30.1209 32.2988 30.7674 32.1869C31.4139 32.075 32.0281 31.8231 32.567 31.4488C33.1059 31.0746 33.5564 30.587 33.887 30.0203C34.2176 29.4535 34.4202 28.8214 34.4808 28.1681C34.5413 27.5148 34.4583 26.8562 34.2375 26.2383ZM19.1916 17.6021C19.4416 17.3915 19.7536 17.2684 20.08 17.2515C20.4065 17.2346 20.7295 17.3248 21 17.5083V24.3999C20.4144 23.8741 19.701 23.5114 18.9311 23.3482C18.1612 23.185 17.362 23.2269 16.6134 23.4699L19.1916 17.6021ZM18 30.7505C17.4067 30.7505 16.8266 30.5746 16.3333 30.2449C15.8399 29.9153 15.4554 29.4467 15.2284 28.8986C15.0013 28.3504 14.9419 27.7472 15.0576 27.1652C15.1734 26.5833 15.4591 26.0488 15.8787 25.6292C16.2982 25.2096 16.8328 24.9239 17.4147 24.8082C17.9967 24.6924 18.5999 24.7518 19.1481 24.9789C19.6962 25.2059 20.1648 25.5905 20.4944 26.0838C20.8241 26.5772 21 27.1572 21 27.7505C21 28.5462 20.6839 29.3092 20.1213 29.8718C19.5587 30.4344 18.7957 30.7505 18 30.7505ZM27 17.5074C27.2705 17.3238 27.5935 17.2337 27.92 17.2506C28.2464 17.2675 28.5584 17.3906 28.8084 17.6011L31.3866 23.468C30.6379 23.2252 29.8386 23.1834 29.0688 23.3468C28.2989 23.5101 27.5855 23.873 27 24.399V17.5074ZM30 30.7505C29.4067 30.7505 28.8266 30.5746 28.3333 30.2449C27.8399 29.9153 27.4554 29.4467 27.2284 28.8986C27.0013 28.3504 26.9419 27.7472 27.0576 27.1652C27.1734 26.5833 27.4591 26.0488 27.8787 25.6292C28.2982 25.2096 28.8328 24.9239 29.4147 24.8082C29.9967 24.6924 30.5999 24.7518 31.1481 24.9789C31.6962 25.2059 32.1648 25.5905 32.4944 26.0838C32.8241 26.5772 33 27.1572 33 27.7505C33 28.5462 32.6839 29.3092 32.1213 29.8718C31.5587 30.4344 30.7956 30.7505 30 30.7505Z" },
            ].map(({ title, count, bg, flip, iconPath }) => (
              <article
                key={title}
                className="flex flex-col justify-between gap-6 min-h-[172px] p-4"
                style={{ border: "2.5px solid " + INK, boxShadow: SHADOW_LG, background: bg }}
              >
                <div className={`flex ${flip ? "flex-row items-center justify-between" : "flex-col items-start"} gap-3`}>
                  {flip && <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.75rem", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>{title}</h3>}
                  <CategoryIcon>
                    <svg viewBox="0 0 48 48" className="w-12 h-12 block" fill="none">
                      <rect x="1" y="1" width="46" height="46" rx="23" fill="white" />
                      <rect x="1" y="1" width="46" height="46" rx="23" stroke="black" strokeWidth="2" />
                      <path d={iconPath} fill="black" />
                    </svg>
                  </CategoryIcon>
                  {!flip && <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.75rem", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>{title}</h3>}
                </div>
                <a href="#" className="flex items-center justify-between gap-3 min-h-6" style={{ color: "rgb(0 20 41 / 60%)" }}>
                  <span className="text-base leading-[1]">{count}</span>
                  <span className="w-4 h-4 inline-flex items-center justify-center flex-shrink-0" style={{ color: "#000" }}>
                    <LinkArrow />
                  </span>
                </a>
              </article>
            ))}
          </div>

          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-20 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[40px] min-w-[182px] py-[0.45rem] px-4 border-2 text-[0.89rem] font-bold transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px"
              style={{ borderColor: INK, background: "#fef8f1", boxShadow: SHADOW }}
            >
              View All Categories
            </a>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" id="register">
          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto text-center">
            <h2 className="font-heading m-0" style={{ fontSize: "clamp(3rem,7vw,5.8rem)", letterSpacing: "0.04em", lineHeight: 0.9 }}>
              HOW IT WORKS
            </h2>
          </div>

          <div className="workflow-grid w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-20 grid grid-cols-1 gap-4 items-center">
            {/* step 1 */}
            <article
              className="min-h-[216px] border-2 p-5 flex flex-col items-center text-center gap-4"
              style={{ borderColor: INK, boxShadow: SHADOW, background: "#fff" }}
            >
              <div
                className="w-[88px] h-[88px] border-2 rounded-full inline-flex items-center justify-center"
                style={{ borderColor: INK, boxShadow: SHADOW, background: "#ffe9a3" }}
                aria-hidden="true"
              >
                <svg className="w-[42px] block" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.5 10.5C31.5 10.1022 31.658 9.72067 31.9393 9.43936C32.2206 9.15806 32.6022 9.00002 33 9.00002H36V6.00002C36 5.6022 36.158 5.22067 36.4393 4.93936C36.7206 4.65806 37.1022 4.50002 37.5 4.50002C37.8978 4.50002 38.2793 4.65806 38.5606 4.93936C38.842 5.22067 39 5.6022 39 6.00002V9.00002H42C42.3978 9.00002 42.7793 9.15806 43.0606 9.43936C43.342 9.72067 43.5 10.1022 43.5 10.5C43.5 10.8978 43.342 11.2794 43.0606 11.5607C42.7793 11.842 42.3978 12 42 12H39V15C39 15.3978 38.842 15.7794 38.5606 16.0607C38.2793 16.342 37.8978 16.5 37.5 16.5C37.1022 16.5 36.7206 16.342 36.4393 16.0607C36.158 15.7794 36 15.3978 36 15V12H33C32.6022 12 32.2206 11.842 31.9393 11.5607C31.658 11.2794 31.5 10.8978 31.5 10.5ZM43.23 20.7525C43.9153 24.8261 43.2882 29.012 41.4394 32.706C39.5906 36.3999 36.6156 39.4107 32.9441 41.3037C29.2726 43.1966 25.0945 43.8738 21.013 43.2374C16.9315 42.601 13.1579 40.6839 10.237 37.763C7.31611 34.8421 5.39905 31.0685 4.76263 26.987C4.12621 22.9055 4.80337 18.7274 6.69633 15.0559C8.58929 11.3844 11.6001 8.40942 15.2941 6.5606C18.988 4.71177 23.1739 4.08474 27.2475 4.77002C27.6369 4.83888 27.9833 5.0587 28.2114 5.38167C28.4396 5.70463 28.531 6.10462 28.4657 6.49461C28.4005 6.88461 28.1839 7.23307 27.863 7.46419C27.5422 7.69531 27.1431 7.7904 26.7525 7.72877C24.3865 7.33076 21.9622 7.4531 19.6483 8.08728C17.3343 8.72147 15.1864 9.85226 13.354 11.401C11.5215 12.9497 10.0485 14.8791 9.03756 17.0549C8.02658 19.2308 7.50189 21.6008 7.49999 24C7.49643 28.0391 8.98095 31.938 11.67 34.9519C13.3429 32.5277 15.6953 30.6522 18.4312 29.5613C16.9616 28.4037 15.8892 26.817 15.3631 25.0217C14.8371 23.2264 14.8836 21.3118 15.4961 19.5442C16.1086 17.7765 17.2568 16.2437 18.7809 15.1588C20.3049 14.0739 22.1292 13.491 24 13.491C25.8708 13.491 27.695 14.0739 29.2191 15.1588C30.7432 16.2437 31.8914 17.7765 32.5039 19.5442C33.1164 21.3118 33.1629 23.2264 32.6369 25.0217C32.1108 26.817 31.0384 28.4037 29.5687 29.5613C32.3047 30.6522 34.6571 32.5277 36.33 34.9519C39.019 31.938 40.5035 28.0391 40.5 24C40.5001 23.0778 40.4235 22.1571 40.2712 21.2475C40.2367 21.0524 40.2412 20.8524 40.2845 20.659C40.3277 20.4656 40.4088 20.2827 40.5232 20.1209C40.6375 19.959 40.7827 19.8214 40.9505 19.716C41.1183 19.6107 41.3054 19.5396 41.5008 19.5069C41.6962 19.4742 41.8962 19.4805 42.0892 19.5256C42.2822 19.5706 42.4643 19.6534 42.6251 19.7692C42.7859 19.885 42.9221 20.0316 43.0259 20.2003C43.1297 20.3691 43.1991 20.5568 43.23 20.7525ZM24 28.5C25.1867 28.5 26.3467 28.1481 27.3334 27.4888C28.3201 26.8295 29.0891 25.8925 29.5433 24.7961C29.9974 23.6998 30.1162 22.4934 29.8847 21.3295C29.6532 20.1656 29.0817 19.0965 28.2426 18.2574C27.4035 17.4183 26.3344 16.8468 25.1705 16.6153C24.0066 16.3838 22.8002 16.5026 21.7039 16.9567C20.6075 17.4109 19.6705 18.1799 19.0112 19.1666C18.3519 20.1533 18 21.3133 18 22.5C18 24.0913 18.6321 25.6174 19.7573 26.7427C20.8826 27.8679 22.4087 28.5 24 28.5ZM24 40.5C27.6625 40.5037 31.2212 39.2827 34.11 37.0313C33.0249 35.3342 31.53 33.9375 29.7631 32.9701C27.9963 32.0027 26.0143 31.4956 24 31.4956C21.9856 31.4956 20.0037 32.0027 18.2368 32.9701C16.47 33.9375 14.9751 35.3342 13.89 37.0313C16.7788 39.2827 20.3374 40.5037 24 40.5Z" fill="black" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.65rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Create Account</h3>
              <p className="m-0 text-[0.95rem]" style={{ color: "#334155", lineHeight: 1.45 }}>Register yourself to join our service.</p>
            </article>

            {/* arrow */}
            <div className="hidden lg:flex items-center justify-center" aria-hidden="true"><ArrowRight /></div>

            {/* step 2 */}
            <article
              className="min-h-[216px] border-2 p-5 flex flex-col items-center text-center gap-4"
              style={{ borderColor: INK, boxShadow: SHADOW, background: "#fff" }}
            >
              <div
                className="w-[88px] h-[88px] border-2 rounded-full inline-flex items-center justify-center"
                style={{ borderColor: INK, boxShadow: SHADOW, background: MINT }}
                aria-hidden="true"
              >
                <svg className="w-10 block" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40.0612 15.4388L29.5613 4.93875C29.4218 4.7995 29.2564 4.68908 29.0743 4.6138C28.8922 4.53851 28.697 4.49985 28.5 4.5H10.5C9.70435 4.5 8.94129 4.81607 8.37868 5.37868C7.81607 5.94129 7.5 6.70435 7.5 7.5V40.5C7.5 41.2957 7.81607 42.0587 8.37868 42.6213C8.94129 43.1839 9.70435 43.5 10.5 43.5H37.5C38.2956 43.5 39.0587 43.1839 39.6213 42.6213C40.1839 42.0587 40.5 41.2957 40.5 40.5V16.5C40.5002 16.303 40.4615 16.1078 40.3862 15.9257C40.3109 15.7436 40.2005 15.5782 40.0612 15.4388ZM30 9.62063L35.3794 15H30V9.62063ZM37.5 40.5H10.5V7.5H27V16.5C27 16.8978 27.158 17.2794 27.4393 17.5607C27.7206 17.842 28.1022 18 28.5 18H37.5V40.5ZM28.9613 31.3406C29.8465 29.9339 30.1824 28.2504 29.9049 26.6117C29.6273 24.973 28.7558 23.4939 27.4567 22.4572C26.1576 21.4205 24.5221 20.8987 22.8626 20.9916C21.2031 21.0845 19.6361 21.7856 18.4608 22.9608C17.2856 24.1361 16.5845 25.7031 16.4916 27.3626C16.3987 29.0221 16.9205 30.6576 17.9572 31.9567C18.9939 33.2558 20.473 34.1273 22.1117 34.4049C23.7504 34.6824 25.4339 34.3465 26.8406 33.4613L28.9387 35.5613C29.2202 35.8427 29.602 36.0008 30 36.0008C30.398 36.0008 30.7798 35.8427 31.0613 35.5613C31.3427 35.2798 31.5008 34.898 31.5008 34.5C31.5008 34.1019 31.3427 33.7202 31.0613 33.4387L28.9613 31.3406ZM19.5 27.75C19.5 27.0083 19.7199 26.2833 20.132 25.6666C20.544 25.0499 21.1297 24.5693 21.8149 24.2855C22.5002 24.0016 23.2542 23.9274 23.9816 24.0721C24.709 24.2167 25.3772 24.5739 25.9016 25.0984C26.4261 25.6228 26.7833 26.291 26.9279 27.0184C27.0726 27.7458 26.9984 28.4998 26.7145 29.1851C26.4307 29.8703 25.9501 30.456 25.3334 30.868C24.7167 31.2801 23.9917 31.5 23.25 31.5C22.2554 31.5 21.3016 31.1049 20.5983 30.4016C19.8951 29.6984 19.5 28.7446 19.5 27.75Z" fill="black" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.65rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Find A Job</h3>
              <p className="m-0 text-[0.95rem]" style={{ color: "#334155", lineHeight: 1.45 }}>Start looking for your dream job.</p>
            </article>

            {/* arrow */}
            <div className="hidden lg:flex items-center justify-center" aria-hidden="true"><ArrowRight /></div>

            {/* step 3 */}
            <article
              className="min-h-[216px] border-2 p-5 flex flex-col items-center text-center gap-4"
              style={{ borderColor: INK, boxShadow: SHADOW, background: "#fff" }}
            >
              <div
                className="w-[88px] h-[88px] border-2 rounded-full inline-flex items-center justify-center"
                style={{ borderColor: INK, boxShadow: SHADOW, background: "#b28bf8" }}
                aria-hidden="true"
              >
                <svg className="w-[42px] block" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.9719 8.83502C41.9274 8.10363 41.6168 7.4138 41.0987 6.89567C40.5806 6.37755 39.8908 6.06697 39.1594 6.02252C36.8006 5.88189 30.7725 6.09752 25.77 11.0981L24.8794 12H13.9425C13.547 11.9978 13.155 12.0742 12.7894 12.2249C12.4237 12.3755 12.0916 12.5974 11.8125 12.8775L5.38123 19.3125C4.98682 19.7067 4.71006 20.2029 4.58201 20.7456C4.45396 21.2883 4.47969 21.8559 4.65631 22.3848C4.83292 22.9137 5.15344 23.3829 5.58189 23.7397C6.01034 24.0966 6.52976 24.327 7.08186 24.405L14.295 25.4119L22.5844 33.7013L23.5912 40.9181C23.6687 41.4703 23.899 41.9897 24.2562 42.4178C24.6133 42.8459 25.0832 43.1656 25.6125 43.3406C25.9208 43.4436 26.2437 43.4962 26.5687 43.4963C26.9623 43.497 27.3522 43.4199 27.7158 43.2693C28.0794 43.1186 28.4097 42.8976 28.6875 42.6188L35.1225 36.1875C35.4026 35.9084 35.6245 35.5763 35.7751 35.2106C35.9258 34.845 36.0022 34.453 36 34.0575V23.1206L36.8944 22.2263C41.8969 17.2238 42.1125 11.1956 41.9719 8.83502ZM13.9425 15H21.8794L14.4675 22.41L7.49998 21.4388L13.9425 15ZM27.8944 13.2281C29.3357 11.7779 31.0699 10.6519 32.9812 9.92537C34.8924 9.19883 36.9367 8.88847 38.9775 9.01502C39.1089 11.0569 38.8018 13.1032 38.0767 15.0165C37.3516 16.9297 36.2254 18.6656 34.7737 20.1075L24 30.8775L17.1225 24L27.8944 13.2281ZM33 34.0575L26.5631 40.5L25.59 33.5306L33 26.1206V34.0575ZM19.095 35.8388C18.2512 37.6875 15.4294 42 7.49998 42C7.10216 42 6.72063 41.842 6.43932 41.5607C6.15802 41.2794 5.99998 40.8978 5.99998 40.5C5.99998 32.5706 10.3125 29.7488 12.1612 28.9031C12.5336 28.7372 12.9519 28.716 13.3388 28.8628C13.7257 29.0095 14.0519 29.3027 14.2465 29.6852C14.4411 30.0677 14.4893 30.5128 14.3815 30.9293C14.2736 31.3458 14.018 31.7024 13.6625 31.9331C12.4569 32.4825 9.79623 34.2506 9.32748 39.2288C14.3056 38.76 16.0775 36.0994 16.6231 34.8938C16.7956 34.5237 17.1029 34.2373 17.4795 34.0984C17.8561 33.9595 18.2729 33.9791 18.6355 34.1531C18.9981 34.3271 19.2774 34.6424 19.4127 35.0293C19.548 35.4162 19.5283 35.8414 19.3575 36.2138L19.095 35.8388Z" fill="black" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.65rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Apply A Job</h3>
              <p className="m-0 text-[0.95rem]" style={{ color: "#334155", lineHeight: 1.45 }}>Apply to the role that suits your skills.</p>
            </article>

            {/* arrow */}
            <div className="hidden lg:flex items-center justify-center" aria-hidden="true"><ArrowRight /></div>

            {/* step 4 */}
            <article
              className="min-h-[216px] border-2 p-5 flex flex-col items-center text-center gap-4"
              style={{ borderColor: INK, boxShadow: SHADOW, background: "#fff" }}
            >
              <div
                className="w-[88px] h-[88px] border-2 rounded-full inline-flex items-center justify-center"
                style={{ borderColor: INK, boxShadow: SHADOW, background: "#ffb970" }}
                aria-hidden="true"
              >
                <svg className="w-[34px] block" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.47 2.84015C37.4256 2.10876 37.115 1.41893 36.5969 0.900802C36.0788 0.382678 35.3889 0.0720926 34.6575 0.0276458C32.2988 -0.112979 26.2707 0.102646 21.2682 5.10327L20.3775 6.00515H9.44065C9.04517 6.00292 8.6532 6.07935 8.28753 6.22999C7.92186 6.38064 7.5898 6.60249 7.31065 6.88265L0.879402 13.3176C0.484991 13.7118 0.208231 14.2081 0.0801803 14.7507C-0.0478703 15.2934 -0.0221431 15.8611 0.154475 16.3899C0.331092 16.9188 0.651611 17.388 1.08006 17.7449C1.50851 18.1017 2.02793 18.3321 2.58003 18.4101L9.79315 19.417L18.0825 27.7064L19.0894 34.9233C19.1668 35.4754 19.3972 35.9949 19.7543 36.423C20.1115 36.8511 20.5813 37.1707 21.1107 37.3458C21.419 37.4488 21.7419 37.5013 22.0669 37.5014C22.4605 37.5021 22.8503 37.425 23.214 37.2744C23.5776 37.1238 23.9078 36.9027 24.1857 36.6239L30.6207 30.1926C30.9008 29.9135 31.1227 29.5814 31.2733 29.2158C31.424 28.8501 31.5004 28.4581 31.4982 28.0626V17.1258L32.3925 16.2314C37.395 11.2289 37.6107 5.20077 37.47 2.84015Z" fill="black" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.65rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Start Work</h3>
              <p className="m-0 text-[0.95rem]" style={{ color: "#334155", lineHeight: 1.45 }}>Start doing the job you applied for.</p>
            </article>
          </div>
        </section>

        {/* ── LATEST JOBS ───────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" id="latest-jobs">
          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto text-center">
            <h2 className="font-heading m-0" style={{ fontSize: "clamp(3rem,7vw,5.8rem)", letterSpacing: "0.04em", lineHeight: 0.9 }}>
              LATEST JOBS
            </h2>
            <p className="mt-5 mx-auto text-base leading-[1.5]" style={{ maxWidth: "720px", color: "#334155" }}>
              Find hand-picked openings from trusted companies hiring right now.
            </p>
          </div>

          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JobCard logo={<MetaLogo />} logoBg="#99cdff" company="Meta" location="Chicago, IL" title="Finance Manager" tags={["Full time","Finance"]} bookmarkLabel="Save Finance Manager at Meta" />
            <JobCard logo={<SpotifyLogo />} logoBg="#c6f8e5" company="Spotify" location="San Diego, CA" title="Marketing Campaign" tags={["Full time","Marketing"]} bookmarkLabel="Save Marketing Campaign at Spotify" />
            <JobCard logo={<MicrosoftLogo />} logoBg="#ffd9a6" company="Microsoft" location="El Paso, TX" title="Finance Manager" tags={["Full time","Finance"]} bookmarkLabel="Save Finance Manager at Microsoft" />
            <JobCard logo={<NetflixLogo />} logoBg="#ffb6b6" company="Netflix" location="Houston, TX" title="Electrical Engineer" tags={["Full time","Technology"]} bookmarkLabel="Save Electrical Engineer at Netflix" />
            <JobCard logo={<GoogleLogo />} logoBg="#ffe599" company="Google" location="Detroit, MI" title="Finance Manager" tags={["Full time","Finance"]} bookmarkLabel="Save Finance Manager at Google" />
            <JobCard logo={<FigmaLogo />} logoBg="#e5d4ff" company="Figma" location="Chicago, IL" title="Visual Designer" tags={["Full time","Design"]} bookmarkLabel="Save Visual Designer at Figma" />
          </div>

          <div className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-16 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[40px] py-2 px-[0.95rem] border-2 text-[0.89rem] font-bold transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px"
              style={{ borderColor: INK, background: "#fef8f1", boxShadow: SHADOW }}
            >
              See all jobs
            </a>
          </div>
        </section>

        {/* ── REGISTER CTA ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div
            className="w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto grid gap-8 md:gap-10 items-end"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
          >
            {/* visual */}
            <div className="relative min-h-[520px] max-w-[560px] w-full" aria-hidden="true">
              <div
                className="absolute bottom-0 left-0 right-0 h-[352px]"
                style={{ border: "3px solid #000", background: BLUE, boxShadow: SHADOW }}
              />
              <div
                className="absolute inset-x-3 top-0 bottom-[2px] overflow-hidden"
                style={{ border: "3px solid #000", background: "#98a5b2" }}
              >
                <img src="/jobhub/cta.jpg" alt="" loading="lazy" decoding="async" className="w-full h-full block object-cover" />
              </div>
            </div>

            {/* copy */}
            <div className="flex flex-col gap-6 pb-6">
              <h2 className="font-heading m-0" style={{ fontSize: "clamp(3rem,7vw,5.8rem)", letterSpacing: "0.04em", lineHeight: 0.9 }}>
                READY TO START?
              </h2>
              <p className="text-base leading-[1.5]" style={{ maxWidth: "520px", color: "#1f2d3c" }}>
                We present an easy and fast way for job seekers to find suitable jobs, so register yourself and get started.
              </p>
              <a
                href="#"
                className="self-start inline-flex items-center justify-center min-h-[40px] py-2 px-[0.95rem] border-2 text-[0.89rem] font-bold tracking-[0.01em] transition-transform duration-[120ms] hover:-translate-x-px hover:-translate-y-px"
                style={{ borderColor: INK, background: YELLOW_DEEP, boxShadow: SHADOW }}
              >
                Register
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="mt-10 pb-8" style={{ paddingTop: "80px", background: "#000", color: "#fff" }} id="footer-login">
        {/* main grid: 2.3fr + 3×1fr on desktop, 2-col at tablet, 1-col at mobile */}
        <div className="footer-main w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto">

          {/* brand column */}
          <div className="footer-brand-col">
            <a href="#" className="font-heading text-[2rem] tracking-[0.04em] text-white block">JOBHUB</a>
            <p className="mt-6 text-base leading-[1.5]" style={{ maxWidth: "320px", color: "#d4d4d8" }}>
              JobHub helps job seekers discover better opportunities and helps teams hire faster across markets.
            </p>
            <div className="mt-6">
              <svg viewBox="0 0 168 24" className="block" style={{ width: "168px", height: "24px", maxWidth: "100%" }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Social media icons">
                <path d="M22 12.3038C22 6.74719 17.5229 2.24268 12 2.24268C6.47715 2.24268 2 6.74719 2 12.3038C2 17.3255 5.65684 21.4879 10.4375 22.2427V15.2121H7.89844V12.3038H10.4375V10.0872C10.4375 7.56564 11.9305 6.1728 14.2146 6.1728C15.3088 6.1728 16.4531 6.36931 16.4531 6.36931V8.84529H15.1922C13.95 8.84529 13.5625 9.6209 13.5625 10.4166V12.3038H16.3359L15.8926 15.2121H13.5625V22.2427C18.3432 21.4879 22 17.3257 22 12.3038Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M52 3.24268H44C41.2386 3.24268 39 5.48126 39 8.24268V16.2427C39 19.0041 41.2386 21.2427 44 21.2427H52C54.7614 21.2427 57 19.0041 57 16.2427V8.24268C57 5.48126 54.7614 3.24268 52 3.24268ZM55.25 16.2427C55.2445 18.0353 53.7926 19.4872 52 19.4927H44C42.2074 19.4872 40.7555 18.0353 40.75 16.2427V8.24268C40.7555 6.45003 42.2074 4.99817 44 4.99268H52C53.7926 4.99817 55.2445 6.45003 55.25 8.24268V16.2427ZM52.75 8.49268C53.3023 8.49268 53.75 8.04496 53.75 7.49268C53.75 6.9404 53.3023 6.49268 52.75 6.49268C52.1977 6.49268 51.75 6.9404 51.75 7.49268C51.75 8.04496 52.1977 8.49268 52.75 8.49268ZM48 7.74268C45.5147 7.74268 43.5 9.7574 43.5 12.2427C43.5 14.728 45.5147 16.7427 48 16.7427C50.4853 16.7427 52.5 14.728 52.5 12.2427C52.5027 11.0484 52.0294 9.90225 51.1849 9.05776C50.3404 8.21327 49.1943 7.74002 48 7.74268ZM45.25 12.2427C45.25 13.7615 46.4812 14.9927 48 14.9927C49.5188 14.9927 50.75 13.7615 50.75 12.2427C50.75 10.7239 49.5188 9.49268 48 9.49268C46.4812 9.49268 45.25 10.7239 45.25 12.2427Z" fill="white" />
                <path d="M89.1761 4.24268H91.9362L85.9061 11.0201L93 20.2427H87.4456L83.0951 14.6493L78.1172 20.2427H75.3554L81.8052 12.9935L75 4.24268H80.6954L84.6279 9.3553L89.1761 4.24268ZM88.2073 18.6181H89.7368L79.8644 5.78196H78.2232L88.2073 18.6181Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M112.5 3.24268C111.672 3.24268 111 3.91425 111 4.74268V19.7427C111 20.5711 111.672 21.2427 112.5 21.2427H127.5C128.328 21.2427 129 20.5711 129 19.7427V4.74268C129 3.91425 128.328 3.24268 127.5 3.24268H112.5ZM116.521 7.2454C116.526 8.20165 115.811 8.79087 114.961 8.78665C114.161 8.78243 113.464 8.1454 113.468 7.24681C113.472 6.40165 114.14 5.72243 115.008 5.74212C115.888 5.76181 116.526 6.40728 116.521 7.2454ZM120.28 10.0044H117.76H117.758V18.5643H120.422V18.3646C120.422 17.9847 120.421 17.6047 120.421 17.2246C120.42 16.2108 120.419 15.1959 120.425 14.1824C120.426 13.9363 120.437 13.6804 120.5 13.4455C120.738 12.568 121.527 12.0013 122.407 12.1406C122.973 12.2291 123.347 12.5568 123.504 13.0898C123.601 13.423 123.645 13.7816 123.649 14.129C123.661 15.1766 123.659 16.2242 123.657 17.2719C123.657 17.6417 123.656 18.0117 123.656 18.3815V18.5629H126.328V18.3576C126.328 17.9056 126.328 17.4537 126.327 17.0018C126.327 15.8723 126.326 14.7428 126.329 13.6129C126.331 13.1024 126.276 12.599 126.151 12.1054C125.964 11.3713 125.577 10.7638 124.948 10.3251C124.503 10.0129 124.013 9.81178 123.466 9.78928C123.404 9.78669 123.341 9.7833 123.278 9.77989C122.998 9.76477 122.714 9.74941 122.447 9.80334C121.682 9.95662 121.01 10.3068 120.502 10.9241C120.443 10.9949 120.385 11.0668 120.299 11.1741L120.28 11.1984V10.0044ZM113.682 18.5671H116.332V10.01H113.682V18.5671Z" fill="white" />
                <path d="M165.593 7.20301C165.479 6.78041 165.256 6.39501 164.947 6.08518C164.638 5.77534 164.253 5.55187 163.831 5.43701C162.265 5.00701 156 5.00001 156 5.00001C156 5.00001 149.736 4.99301 148.169 5.40401C147.747 5.52415 147.363 5.75078 147.054 6.06214C146.744 6.3735 146.52 6.75913 146.403 7.18201C145.99 8.74801 145.986 11.996 145.986 11.996C145.986 11.996 145.982 15.26 146.392 16.81C146.622 17.667 147.297 18.344 148.155 18.575C149.737 19.005 155.985 19.012 155.985 19.012C155.985 19.012 162.25 19.019 163.816 18.609C164.238 18.4943 164.624 18.2714 164.934 17.9622C165.244 17.653 165.467 17.2682 165.583 16.846C165.997 15.281 166 12.034 166 12.034C166 12.034 166.02 8.76901 165.593 7.20301ZM153.996 15.005L154.001 9.00501L159.208 12.01L153.996 15.005Z" fill="white" />
              </svg>
            </div>
          </div>

          {/* link columns */}
          {[
            { heading: "Product",   links: ["Find Jobs", "Job Alerts", "Career Advice"] },
            { heading: "Company",   links: ["About", "Press", "Partners"] },
            { heading: "Resources", links: ["Support", "Contact", "Terms", "Privacy"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-[1.05rem] font-bold mb-4">{heading}</h3>
              {links.map((l) => (
                <a key={l} href="#" className="block text-[0.95rem] mb-3 hover:text-white" style={{ color: "#d4d4d8" }}>{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div
          className="footer-bottom-bar w-full max-w-[min(1240px,calc(100%-2rem))] mx-auto mt-16 pt-8 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.4)" }}
        >
          <p className="text-[0.88rem]" style={{ color: "#e4e4e7" }}>2026 JobHub. All rights reserved.</p>
          <div className="inline-flex flex-wrap items-center gap-6">
            <a href="#" className="text-[0.88rem] hover:text-white" style={{ color: "#e4e4e7" }}>Privacy Policy</a>
            <a href="#" className="text-[0.88rem] hover:text-white" style={{ color: "#e4e4e7" }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
