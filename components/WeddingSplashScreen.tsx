"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Noto_Nastaliq_Urdu } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500"],
  display: "swap",
});

type WeddingSplashScreenProps = {
  bride: string;
  groom: string;
  onOpen: () => void;
  /** Called synchronously from the tap, e.g. to start music. */
  onStart?: () => void;
  /** Optional overrides */
  urduNames?: string;
  dateEn?: string;
  dateUr?: string;
  location?: string;
};

const DRAW_MS = 600;
const GATE_MS = 1200;
const REDUCED_MS = 350;

function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M0 8h56M104 8h56" strokeLinecap="round" opacity="0.7" />
      <path
        d="M80 1.5 86.5 8 80 14.5 73.5 8Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <circle cx="64" cy="8" r="1.6" fill="currentColor" />
      <circle cx="96" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function WeddingSplashScreen({
  bride,
  groom,
  onOpen,
  onStart,
  urduNames = "مشاء شہزادی ♥ حسن جمال",
  dateEn = "",
  dateUr = "",
  location = "",
}: WeddingSplashScreenProps) {
  const [opening, setOpening] = useState(false);
  const [gatesOpen, setGatesOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const onOpenRef = useRef(onOpen);

  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  // Respect reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduced(mq.matches);

    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);

    mq.addEventListener("change", listener);

    return () => mq.removeEventListener("change", listener);
  }, []);

  // Draw the center line, then open the gates.
  useEffect(() => {
    if (!opening) return;

    const timer = window.setTimeout(
      () => setGatesOpen(true),
      reduced ? 0 : DRAW_MS
    );

    return () => window.clearTimeout(timer);
  }, [opening, reduced]);

  // Reveal the invitation page after the gates open.
  useEffect(() => {
    if (!gatesOpen) return;

    const timer = window.setTimeout(
      () => onOpenRef.current(),
      reduced ? REDUCED_MS : GATE_MS + 50
    );

    return () => window.clearTimeout(timer);
  }, [gatesOpen, reduced]);

  // Lock page scrolling while the splash screen is visible.
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, []);

  // Focus the button for keyboard accessibility.
  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const handleTap = useCallback(() => {
    if (opening) return;

    // Run synchronously from the user's tap, e.g. to start music.
    onStart?.();

    setOpening(true);
  }, [opening, onStart]);

  const gateMotion = reduced
    ? "transition-opacity duration-300"
    : "transition-transform ease-[cubic-bezier(0.77,0,0.175,1)]";

  const coverFade = reduced ? "duration-200" : "duration-150";

  return (
    <div
      className={`${serif.className} fixed inset-0 z-[100] overflow-hidden bg-[#260817] text-[#F7E9ED] ${
        gatesOpen ? "pointer-events-none" : ""
      }`}
      style={{ height: "100dvh" }}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of${bride}  and ${groom}`}
    >
      <style>{`
        @keyframes ws-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ws-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(199,138,157,0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(199,138,157,0);
          }
        }

        @keyframes ws-draw {
          from {
            transform: translateX(-50%) scaleY(0);
          }
          to {
            transform: translateX(-50%) scaleY(1);
          }
        }

        .ws-rise {
          opacity: 0;
          animation: ws-rise 900ms cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .ws-pulse {
          animation: ws-pulse 2.6s ease-in-out infinite;
        }

        .ws-draw {
          transform-origin: top;
          animation: ws-draw ${DRAW_MS}ms cubic-bezier(0.77,0,0.175,1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .ws-rise {
            opacity: 1;
            animation: none;
          }

          .ws-pulse {
            animation: none;
          }

          .ws-draw {
            animation: none;
          }
        }
      `}</style>

      {/* Dark cover with wedding photography and a royal burgundy overlay */}
      <div
        className={`absolute inset-0 transition-opacity ${coverFade} ${
          gatesOpen ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#260817]" />

        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#260817]/90 via-[#50132F]/80 to-[#16040D]/[0.98]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, rgba(199,138,157,0.14), transparent 60%)",
          }}
        />

        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(15,2,9,0.45)_100%)]" />
      </div>

      {/* Scrollable, safely centered content */}
      <div
        className="absolute inset-0 z-20 flex overflow-y-auto overscroll-contain"
        style={{
          paddingTop: "max(2.25rem, env(safe-area-inset-top))",
          paddingBottom: "max(2.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <div
          className={`m-auto flex w-full max-w-md flex-col items-center px-6 text-center transition-all sm:px-8 ${
            reduced ? "duration-300" : "duration-700"
          } ${
            opening
              ? reduced
                ? "opacity-0"
                : "scale-95 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Bismillah */}
          <p
            lang="ur"
            dir="rtl"
            className={`${nastaliq.className} ws-rise text-lg leading-[2.2] text-[#DDB5C1] sm:text-xl`}
            style={{ animationDelay: "100ms" }}
          >
            بسم اللہ الرحمٰن الرحیم
          </p>

          <Ornament className="ws-rise mt-3 h-4 w-40 text-[#C78A9D]" />

          {/* Invitation message */}
          <p
            className="ws-rise mt-6 text-xs italic leading-7 tracking-[0.16em] text-[#DDB5C1] sm:text-sm sm:tracking-[0.18em]"
            style={{ animationDelay: "250ms" }}
          >
            Together with our families,
            <br />
            we invite you to the wedding of
          </p>

          {/* Couple names */}
          <h1
            className="ws-rise mt-6 break-words text-[2.45rem] font-medium leading-[1.12] text-[#FFF5F7] sm:text-6xl"
            style={{ animationDelay: "400ms" }}
          >
           {bride}

            <span className="my-2 block text-3xl font-normal italic text-[#C78A9D] sm:text-4xl">
              &amp;
            </span>
            {groom}
            
          </h1>

          {/* Urdu names */}
          <p
            lang="ur"
            dir="rtl"
            className={`${nastaliq.className} ws-rise mt-5 text-lg leading-[2.2] text-[#DDB5C1] sm:text-xl`}
            style={{ animationDelay: "550ms" }}
          >
            {urduNames}
          </p>

          {/* Decorative divider */}
          <Ornament
            className="ws-rise mt-4 h-4 w-32 text-[#805064]"
          />

          {/* Date */}
          {(dateEn || dateUr) && (
            <div
              className="ws-rise mt-4 flex flex-col items-center gap-1"
              style={{ animationDelay: "650ms" }}
            >
              {dateEn && (
                <p className="text-sm tracking-[0.16em] text-[#F0DDE3]">
                  {dateEn}
                </p>
              )}

              {dateUr && (
                <p
                  lang="ur"
                  dir="rtl"
                  className={`${nastaliq.className} text-base leading-[2.2] text-[#DDB5C1]`}
                >
                  {dateUr}
                </p>
              )}
            </div>
          )}

          {/* Location */}
          {location && (
            <div
              className="ws-rise mt-4 flex max-w-full flex-col items-center"
              style={{ animationDelay: "700ms" }}
            >
              <span
                aria-hidden="true"
                className="mb-2 text-lg text-[#C78A9D]"
              >
                ✧
              </span>

              <p className="max-w-full break-words text-xs tracking-[0.16em] text-[#DDB5C1] sm:text-sm sm:tracking-[0.2em]">
                {location}
              </p>
            </div>
          )}

          {/* Open invitation button */}
          <div
            className="ws-rise mt-8 flex flex-col items-center"
            style={{ animationDelay: "900ms" }}
          >
            <button
              ref={buttonRef}
              type="button"
              onClick={handleTap}
              disabled={opening}
              className="ws-pulse inline-flex min-h-12 items-center justify-center gap-3 border border-[#C78A9D]/60 bg-[#260817]/75 px-7 py-3.5 text-sm tracking-[0.12em] text-[#FFF5F7] shadow-[0_0_24px_rgba(199,138,157,0.08)] transition duration-300 hover:border-[#C78A9D] hover:bg-[#50132F] focus-visible:bg-[#50132F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DDB5C1] disabled:cursor-wait disabled:animate-none sm:px-8 sm:text-base"
            >
              <span aria-hidden="true" className="text-[#C78A9D]">
                ✧
              </span>

              <span>{opening ? "Opening…" : "Open invitation"}</span>

              <span aria-hidden="true" className="text-[#C78A9D]">
                ✧
              </span>
            </button>

            {/* Urdu button instruction */}
            <p
              lang="ur"
              dir="rtl"
              className={`${nastaliq.className} mt-4 text-sm leading-[2.2] text-[#DDB5C1]`}
            >
              دعوت نامہ کھولنے کے لیے ٹیپ کریں
            </p>
          </div>

          {/* Bottom ornament */}
          <Ornament className="ws-rise mt-7 h-4 w-28 text-[#805064]" />
        </div>
      </div>

      {/* Left royal gate */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-br from-[#50132F] via-[#260817] to-[#16040D] will-change-transform ${gateMotion} ${
          gatesOpen
            ? reduced
              ? "opacity-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
        style={{
          transitionDuration: reduced ? undefined : `${GATE_MS}ms`,
        }}
      />

      {/* Right royal gate */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-gradient-to-bl from-[#50132F] via-[#260817] to-[#16040D] will-change-transform ${gateMotion} ${
          gatesOpen
            ? reduced
              ? "opacity-0"
              : "translate-x-full"
            : "translate-x-0"
        }`}
        style={{
          transitionDuration: reduced ? undefined : `${GATE_MS}ms`,
        }}
      />

      {/* Rose-gold center line */}
      {opening && !gatesOpen && !reduced && (
        <div
          aria-hidden="true"
          className="ws-draw pointer-events-none absolute inset-y-0 left-1/2 z-[15] w-px bg-gradient-to-b from-transparent via-[#C78A9D] to-transparent shadow-[0_0_12px_rgba(199,138,157,0.45)]"
        />
      )}
    </div>
  );
}
