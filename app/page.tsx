"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const couple = {
  bride: "Misha Shehzadi",
  brideUrdu: "میشہ شہزادی",
  groom: "Hassan Jamal",
  groomUrdu: "حسن جمال",
  date: "January 07–09, 2027",
  dateUrdu: "۷ تا ۹ جنوری ۲۰۲۷",
  venue: "Gujranwala, Pakistan",
};

const whatsappNumber = "923340470768";

const events = [
  {
    title: "Mehndi",
    titleUrdu: "مہندی",
    date: "2027-01-07",
    start: "2027-01-07T18:00:00+05:00",
    end: "2027-01-07T22:00:00+05:00",
    time: "06:00 PM – 10:00 PM",
    timeUrdu: "شام ۶ بجے تا رات ۱۰ بجے",
    venue: "At Home of the Bride, Near Jamia Masjid Sultania, Gujranwala",
    venueUrdu: "دلہن کی رہائش گاہ، نزد جامع مسجد سلطانیہ، گوجرانوالہ",
    dress: "Traditional & Colorful",
    dressUrdu: "روایتی اور رنگ برنگے لباس",
    description: "An evening of music, laughter, colors and celebration.",
    descriptionUrdu: "موسیقی، خوشیوں، رنگوں اور محبت بھری شام۔",
    symbol: "✿",
    image: "/rasam-e-hina.jpg",
  },
  {
    title: "Nikah & Baraat",
    titleUrdu: "نکاح و بارات",
    date: "2027-01-08",
    start: "2027-01-08T13:00:00+05:00",
    end: "2027-01-08T16:00:00+05:00",
    time: "01:00 PM – 04:00 PM",
    timeUrdu: "دوپہر ۱ بجے تا شام ۴ بجے",
    venue: "Crown Palace, Crown Cinema Chowk, Gujranwala",
    venueUrdu: "کراؤن پیلس، کراؤن سنیما چوک، گوجرانوالہ",
    dress: "Formal & Elegant",
    dressUrdu: "باوقار اور خوبصورت لباس",
    description:
      "The beautiful beginning of our forever, surrounded by loved ones.",
    descriptionUrdu: "اپنوں کی محبت اور دعاؤں کے سائے میں ایک خوبصورت آغاز۔",
    symbol: "♡",
    image: "/barat.jpg",
  },
  {
    title: "Walima",
    titleUrdu: "ولیمہ",
    date: "2027-01-09",
    start: "2027-01-09T13:00:00+05:00",
    end: "2027-01-09T16:00:00+05:00",
    time: "01:00 PM – 04:00 PM",
    timeUrdu: "دوپہر ۱ بجے تا شام ۴ بجے",
    venue: "M.B Palace, Hafiz Abad Road, Near Ghory Shah Chowk, Gujranwala",
    venueUrdu: "ایم بی پیلس، حافظ آباد روڈ، نزد گھوڑے شاہ چوک، گوجرانوالہ",
    dress: "Semi-Formal",
    dressUrdu: "نیم رسمی لباس",
    description: "Join us for a joyful celebration of our new beginning.",
    descriptionUrdu: "ہماری نئی زندگی کی خوشیوں میں ہمارے ساتھ شریک ہوں۔",
    symbol: "❀",
    image: "/waleema.jpg",
  },
];

const venueCards = [
  {
    eventTitle: "Mehndi",
    venueName: "At Home of the Bride",
    venueUrdu: "دلہن کی رہائش گاہ",
    address: "Dr Maqsood Road, Gujranwala",
    addressUrdu: "ڈاکٹر مقصود روڈ، گوجرانوالہ",
    mapQuery: "32.1622898,74.165049",
    accent: "Mehndi Celebration",
    number: "01",
  },
  {
    eventTitle: "Nikah & Baraat",
    venueName: "Crown Palace Marriage Hall",
    venueUrdu: "کراؤن پیلس میرج ہال",
    address: "Crown Cinema Chowk, Gujranwala",
    addressUrdu: "کراؤن سنیما چوک، گوجرانوالہ",
    mapQuery: "32.166796,74.1713837",
    accent: "Nikah & Baraat",
    number: "02",
  },
  {
    eventTitle: "Walima",
    venueName: "M.B Palace Marriage Hall",
    venueUrdu: "ایم بی پیلس میرج ہال",
    address: "Hafiz Abad Road, Gujranwala",
    addressUrdu: "حافظ آباد روڈ، گوجرانوالہ",
    mapQuery: "32.1553689,74.1630388",
    accent: "Wedding Reception",
    number: "03",
  },
];

const photos = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
  flowers:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=85",
  table:
    "https://images.unsplash.com/photo-1519225421980-88d3e6e6b8a5?auto=format&fit=crop&w=1800&q=85",
};

/* ------------------------------------------------------------------ */
/*  SMALL UI HELPERS                                                   */
/* ------------------------------------------------------------------ */

function Bi({
  en,
  ur,
  className = "",
}: {
  en: string;
  ur: string;
  className?: string;
}) {
  return (
    <span className={`block min-w-0 ${className}`}>
      <span className="block">{en}</span>
      <span
        lang="ur"
        dir="rtl"
        className="mt-1 block font-urdu leading-relaxed"
      >
        {ur}
      </span>
    </span>
  );
}

function SectionHeading({
  eyebrow,
  eyebrowUrdu,
  title,
  titleUrdu,
  description,
  descriptionUrdu,
}: {
  eyebrow: string;
  eyebrowUrdu: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
}) {
  return (
    <div className="mx-auto mb-12 w-full max-w-2xl text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d6558a] sm:text-xs sm:tracking-[0.36em]">
        {eyebrow}
      </p>

      <p lang="ur" dir="rtl" className="mt-2 font-urdu text-sm text-[#d6558a]">
        {eyebrowUrdu}
      </p>

      <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-[#e86fa3]">
        <span className="h-px w-10 bg-[#f0b4d0]" />
        <span>✿</span>
        <span className="h-px w-10 bg-[#f0b4d0]" />
      </div>

      <h2 className="mt-4 font-serif text-4xl font-medium text-[#6b2d4f] sm:text-6xl">
        {title}
      </h2>

      <h3
        lang="ur"
        dir="rtl"
        className="mt-3 font-urdu text-2xl text-[#6b2d4f] sm:text-3xl"
      >
        {titleUrdu}
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8a5a74]">
        {description}
      </p>

      <p
        lang="ur"
        dir="rtl"
        className="mx-auto mt-2 max-w-xl font-urdu text-sm leading-8 text-[#8a5a74]"
      >
        {descriptionUrdu}
      </p>
    </div>
  );
}

function FloralDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 py-5 text-[#e86fa3]"
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-[#f5c6dc]" />
      <span className="text-lg">❀</span>
      <span className="h-px w-12 bg-[#f5c6dc]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CALENDAR HELPERS                                                   */
/* ------------------------------------------------------------------ */

function formatCalendarDate(value: string) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function googleCalendarUrl(event: (typeof events)[number]) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — ${couple.bride} & ${couple.groom}`,
    dates: `${formatCalendarDate(event.start)}/${formatCalendarDate(event.end)}`,
    details: [
      event.description,
      event.descriptionUrdu,
      `Dress code: ${event.dress}`,
      `Wedding of ${couple.bride} & ${couple.groom}`,
    ].join("\n"),
    location: event.venue,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadCalendar(event: (typeof events)[number]) {
  const escapeICS = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.title.toLowerCase().replace(/\s+/g, "-")}-${event.date}@wedding-invitation.local`,
    `DTSTAMP:${formatCalendarDate(new Date().toISOString())}`,
    `DTSTART:${formatCalendarDate(event.start)}`,
    `DTEND:${formatCalendarDate(event.end)}`,
    `SUMMARY:${escapeICS(`${event.title} — ${couple.bride} & ${couple.groom}`)}`,
    `DESCRIPTION:${escapeICS(`${event.description}\n${event.descriptionUrdu}\nDress code: ${event.dress}`)}`,
    `LOCATION:${escapeICS(event.venue)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ */
/*  SPLASH SCREEN (gates)                                              */
/* ------------------------------------------------------------------ */

const GATE_OPEN_MS = 1500;

function WeddingSplashScreen({
  onStart,
  onOpen,
}: {
  /** Runs synchronously inside the tap (needed so the browser allows music). */
  onStart: () => void;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the cover is visible
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  function handleOpen() {
    if (opening) return;
    onStart(); // user gesture -> music can start
    setOpening(true);
    window.setTimeout(onOpen, GATE_OPEN_MS);
  }

  return (
    <div
      className={`wedding-gate fixed inset-0 z-[100] isolate flex items-center justify-center overflow-hidden text-center ${
        opening ? "gate-opening" : ""
      }`}
      style={{ "--gate-photo": `url("${photos.hero}")` } as CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${couple.groom} and ${couple.bride}`}
    >
      <div className="gate-glow gate-glow-one" />
      <div className="gate-glow gate-glow-two" />
      <div className="gate-frame" />
      <div className="gate-frame-inner" />

      <div className="gate-petals" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 8) % 96}%`,
              animationDelay: `${(i % 7) * 0.65}s`,
              animationDuration: `${7 + (i % 5) * 1.4}s`,
            }}
          >
            {["✦", "❀", "♡", "✧"][i % 4]}
          </span>
        ))}
      </div>

      <div className="gate-content relative z-20 mx-auto flex w-full max-w-xl flex-col items-center px-7 py-8 sm:px-10">
        <p className="gate-enter gate-eyebrow">TOGETHER WITH OUR FAMILIES</p>

        <p
          lang="ur"
          dir="rtl"
          className="gate-enter mt-2 font-urdu text-sm text-[#ffd9e8] sm:text-base"
        >
          اپنے خاندانوں کی دعاؤں کے ساتھ
        </p>

        <div className="gate-enter gate-emblem" aria-hidden="true">
          <span>❧</span>
          <span className="gate-emblem-heart">♡</span>
          <span>❧</span>
        </div>

        <p className="gate-enter font-serif text-base italic tracking-widest text-[#ffe3ee] sm:text-lg">
          The Wedding Invitation
        </p>

        <h1 className="gate-enter mt-4 w-full font-serif text-[clamp(2.2rem,9vw,4.6rem)] font-medium leading-tight text-white">
          <span className="block break-words">{couple.bride}</span>
          <span className="wedding-script my-1 block text-[clamp(2.8rem,11vw,5.2rem)] leading-none text-[#ffc2da]">
            &amp;
          </span>
          <span className="block break-words">{couple.groom}</span>
        </h1>

        <p
          lang="ur"
          dir="rtl"
          className="gate-enter mt-4 font-urdu text-xl leading-relaxed text-[#ffe3ee] sm:text-2xl"
        >
          {couple.brideUrdu} و {couple.groomUrdu}
        </p>

        <div className="gate-enter gate-date-divider" aria-hidden="true">
          <span />
          <span>✦</span>
          <span />
        </div>

        <p className="gate-enter mt-2 font-serif text-xl italic text-[#ffe3ee] sm:text-2xl">
          {couple.date}
        </p>

        <p
          lang="ur"
          dir="rtl"
          className="gate-enter mt-1 font-urdu text-base text-white/90 sm:text-lg"
        >
          {couple.dateUrdu}
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="gate-enter gate-open-button mt-7 w-full max-w-[300px] sm:mt-9"
        >
          <span aria-hidden="true">♡</span>
          <span className="flex flex-col leading-snug">
            <span>{opening ? "Opening..." : "Open Your Invitation"}</span>
            <span
              lang="ur"
              dir="rtl"
              className="font-urdu text-sm font-normal normal-case tracking-normal"
            >
              {opening ? "کھل رہا ہے..." : "دعوت نامہ کھولیں"}
            </span>
          </span>
          <span aria-hidden="true">♡</span>
        </button>

        <p className="gate-enter mt-4 text-[10px] tracking-[0.12em] text-white/75 sm:text-xs">
          A LITTLE INVITATION, A LIFETIME OF MEMORIES
        </p>
      </div>

      <div className="gate-door gate-door-left" aria-hidden="true">
        <div className="gate-door-border">
          <div className="gate-door-ornament">
            <span>❦</span>
            <span>✧</span>
            <span>❦</span>
          </div>
        </div>
      </div>

      <div className="gate-door gate-door-right" aria-hidden="true">
        <div className="gate-door-border">
          <div className="gate-door-ornament">
            <span>❦</span>
            <span>✧</span>
            <span>❦</span>
          </div>
        </div>
      </div>

      <div className="gate-bottom-note" aria-hidden="true">
        WITH LOVE &amp; BLESSINGS · 2027
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REAL FIREWORKS (canvas)                                            */
/* ------------------------------------------------------------------ */

type Rocket = { x: number; y: number; vy: number; targetY: number; hue: number };
type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  hue: number;
  size: number;
};

// Pink, rose, magenta, lavender and gold
const FIREWORK_HUES = [330, 340, 320, 350, 285, 45];

function FireworkEffect({
  duration = 7000,
  onDone,
}: {
  duration?: number;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDoneRef.current();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const start = performance.now();
    let lastLaunch = 0;
    let raf = 0;

    const launch = () => {
      rockets.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: h,
        vy: -(h * 0.011 + Math.random() * 3),
        targetY: h * (0.15 + Math.random() * 0.3),
        hue: FIREWORK_HUES[Math.floor(Math.random() * FIREWORK_HUES.length)],
      });
    };

    const explode = (x: number, y: number, hue: number) => {
      const count = w < 500 ? 55 : 85;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 1.5 + Math.random() * 3.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.012 + Math.random() * 0.012,
          hue: hue + (Math.random() * 16 - 8),
          size: 1.2 + Math.random() * 1.5,
        });
      }
    };

    const frame = (now: number) => {
      const elapsed = now - start;

      // fade previous frame => glowing trails
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (elapsed < duration && now - lastLaunch > 650 + Math.random() * 500) {
        launch();
        if (Math.random() > 0.6) launch();
        lastLaunch = now;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${r.hue} 90% 78%)`;
        ctx.fill();
        if (r.y <= r.targetY || Math.abs(r.vy) < 1.2) {
          explode(r.x, r.y, r.hue);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= 0.985;
        s.vy = s.vy * 0.985 + 0.035;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${s.hue} 95% ${58 + s.life * 20}% / ${s.life})`;
        ctx.fill();
      }

      if (elapsed >= duration && rockets.length === 0 && sparks.length === 0) {
        onDoneRef.current();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function WeddingInvitation() {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [invitationOpened, setInvitationOpened] = useState(false);
  const [showFx, setShowFx] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const musicRef = useRef<HTMLAudioElement>(null);

  const [attendance, setAttendance] = useState("yes");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const target = new Date("2027-01-07T18:00:00+05:00").getTime();

    const updateCountdown = () => {
      const difference = Math.max(0, target - Date.now());

      setRemaining({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  async function toggleMusic() {
    const audio = musicRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.65;
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Music could not be played:", error);
      setMusicPlaying(false);
    }
  }

  // Called straight from the tap, so browsers allow audio playback.
  function startMusic() {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.65;
    audio.play().catch(() => setMusicPlaying(false));
  }

  // Called after the gates have finished opening.
  function openInvitation() {
    setInvitationOpened(true);
    setShowFx(true);
  }

  function submitRSVP(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const rsvpText = [
      `Wedding RSVP — ${couple.bride} & ${couple.groom}`,
      `${couple.brideUrdu} و ${couple.groomUrdu}`,
      "",
      `Name: ${guestName.trim()}`,
      `Attendance: ${attendance === "yes" ? "Joyfully accepts" : "Regretfully declines"}`,
      `Guests: ${attendance === "yes" ? guestCount : "0"}`,
      `Message: ${message.trim() || "No additional message"}`,
      "",
      `Wedding dates: ${couple.date}`,
      `Dates in Urdu: ${couple.dateUrdu}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rsvpText)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#fff5f9] text-[#6b2d4f] selection:bg-[#ffd0e3] selection:text-[#6b2d4f]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap");

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 20px;
        }

        body {
          margin: 0;
          background: #fff5f9;
        }

        .font-serif {
          font-family: "Cormorant Garamond", Georgia, serif;
        }

        .font-urdu {
          font-family: "Noto Naskh Arabic", serif;
          line-height: 1.9;
        }

        .wedding-script {
          font-family: "Great Vibes", "Brush Script MT", "Segoe Script", cursive;
        }

        .wedding-glass {
          background: rgba(255, 250, 252, 0.92);
          backdrop-filter: blur(10px);
        }

        .floral-frame {
          border: 1px solid rgba(240, 160, 195, 0.75);
          box-shadow: 0 18px 60px rgba(214, 85, 138, 0.12);
        }

        /* ---------- Splash gate ---------- */
        .wedding-gate::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: linear-gradient(
              145deg,
              rgba(86, 18, 64, 0.78),
              rgba(200, 70, 135, 0.72)
            ),
            var(--gate-photo);
          background-size: cover;
          background-position: center;
          transition: opacity 0.2s ease 0.35s;
        }
        .gate-opening::before {
          opacity: 0;
        }

        .gate-glow {
          position: absolute;
          z-index: 1;
          border-radius: 9999px;
          filter: blur(60px);
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .gate-glow-one {
          width: 18rem;
          height: 18rem;
          top: -4rem;
          left: -4rem;
          background: rgba(255, 150, 200, 0.4);
        }
        .gate-glow-two {
          width: 20rem;
          height: 20rem;
          bottom: -5rem;
          right: -5rem;
          background: rgba(200, 160, 255, 0.3);
        }

        .gate-frame,
        .gate-frame-inner {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .gate-frame {
          inset: 14px;
          border: 1px solid rgba(255, 220, 235, 0.55);
        }
        .gate-frame-inner {
          inset: 22px;
          border: 1px solid rgba(255, 220, 235, 0.22);
        }

        .gate-petals {
          position: absolute;
          inset: 0;
          z-index: 3;
          overflow: hidden;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .gate-petals span {
          position: absolute;
          bottom: -8%;
          font-size: 14px;
          color: rgba(255, 205, 225, 0.9);
          opacity: 0;
          animation: gate-float linear infinite;
        }
        @keyframes gate-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-110vh) rotate(180deg);
            opacity: 0;
          }
        }

        .gate-content {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .gate-opening .gate-content {
          opacity: 0;
          transform: scale(0.96);
        }
        .gate-opening .gate-glow,
        .gate-opening .gate-frame,
        .gate-opening .gate-frame-inner,
        .gate-opening .gate-petals,
        .gate-opening .gate-bottom-note {
          opacity: 0;
        }

        .gate-enter {
          opacity: 0;
          animation: gate-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .gate-enter:nth-child(1) { animation-delay: 0.1s; }
        .gate-enter:nth-child(2) { animation-delay: 0.2s; }
        .gate-enter:nth-child(3) { animation-delay: 0.3s; }
        .gate-enter:nth-child(4) { animation-delay: 0.4s; }
        .gate-enter:nth-child(5) { animation-delay: 0.55s; }
        .gate-enter:nth-child(6) { animation-delay: 0.7s; }
        .gate-enter:nth-child(7) { animation-delay: 0.8s; }
        .gate-enter:nth-child(8) { animation-delay: 0.9s; }
        .gate-enter:nth-child(9) { animation-delay: 1s; }
        .gate-enter:nth-child(10) { animation-delay: 1.15s; }
        .gate-enter:nth-child(11) { animation-delay: 1.3s; }
        @keyframes gate-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gate-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #ffd6e7;
        }
        .gate-emblem {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1rem 0 0.5rem;
          font-size: 1.4rem;
          color: #ffc2da;
        }
        .gate-emblem-heart {
          font-size: 1.8rem;
          color: #fff;
        }
        .gate-date-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.25rem;
          color: #ffc2da;
        }
        .gate-date-divider span:nth-child(odd) {
          width: 3rem;
          height: 1px;
          background: rgba(255, 200, 225, 0.65);
        }

        .gate-open-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.9rem 1.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          background: linear-gradient(135deg, #ff80b3, #e0508f);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(224, 80, 143, 0.5);
          cursor: pointer;
          transition: filter 0.25s ease;
        }
        .gate-open-button:hover:not(:disabled),
        .gate-open-button:focus-visible {
          filter: brightness(1.1);
        }
        .gate-open-button:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }
        .gate-open-button:disabled {
          cursor: wait;
        }

        .gate-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          z-index: 10;
          will-change: transform;
          transition: transform 1.1s cubic-bezier(0.77, 0, 0.175, 1) 0.35s;
        }
        .gate-door-left {
          left: 0;
          background: linear-gradient(135deg, #f98fba, #cf4a86 60%, #92295f);
        }
        .gate-door-right {
          right: 0;
          background: linear-gradient(225deg, #f98fba, #cf4a86 60%, #92295f);
        }
        .gate-opening .gate-door-left {
          transform: translateX(-100%);
        }
        .gate-opening .gate-door-right {
          transform: translateX(100%);
        }
        .gate-door-border {
          position: absolute;
          inset: 16px;
          display: flex;
          align-items: center;
          border: 1px solid rgba(255, 232, 242, 0.5);
        }
        .gate-door-left .gate-door-border {
          justify-content: flex-start;
          padding-left: 1.5rem;
        }
        .gate-door-right .gate-door-border {
          justify-content: flex-end;
          padding-right: 1.5rem;
        }
        .gate-door-ornament {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 1.5rem;
          color: rgba(255, 238, 246, 0.85);
        }
        @media (max-width: 900px) {
          .gate-door-ornament {
            display: none;
          }
        }

        .gate-bottom-note {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 1.6rem;
          z-index: 20;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(255, 228, 240, 0.7);
          transition: opacity 0.4s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0s !important;
          }
          .gate-enter {
            opacity: 1;
          }
        }
      `}</style>

      {!invitationOpened && (
        <WeddingSplashScreen onStart={startMusic} onOpen={openInvitation} />
      )}

      {showFx && (
        <FireworkEffect duration={7000} onDone={() => setShowFx(false)} />
      )}

      <audio
        ref={musicRef}
        src="/music/wedding-romantic.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Assalam-o-Alaikum! I would like to contact you regarding the wedding of ${couple.groom} & ${couple.bride}.`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp"
        className="fixed bottom-[5.1rem] right-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#25D366] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[#1ebe5d] sm:bottom-[5.5rem] sm:right-5 sm:h-14 sm:w-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.6 5.94L.1 24l6.33-1.66a11.9 11.9 0 0 0 5.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 0 0-3.45-8.42ZM12.09 21.76a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.76.99 1-3.67-.24-.38a9.84 9.84 0 0 1-1.51-5.23c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.46-4.45 9.91-9.92 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>

      {/* Music control */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-3 z-50 rounded-full border border-white/70 bg-[#d03f7a]/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-xl backdrop-blur transition hover:bg-[#b52f66] sm:right-5 sm:px-5"
      >
        {musicPlaying ? "Ⅱ" : "♫"}
        <span className="ml-2">{musicPlaying ? "Pause" : "Music"}</span>
      </button>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(100,22,72,.62), rgba(214,85,138,.5)), url('${photos.hero}')`,
        }}
      >
        <div className="pointer-events-none absolute inset-4 border border-white/45 sm:inset-8" />
        <div className="pointer-events-none absolute inset-6 border border-white/20 sm:inset-11" />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ffe3ee] sm:text-xs sm:tracking-[0.42em]">
            A Love Story in Bloom
          </p>

          <p lang="ur" dir="rtl" className="mt-3 font-urdu text-lg text-[#ffe3ee]">
            محبت کی ایک خوبصورت داستان
          </p>

          <div className="mx-auto mt-7 text-3xl text-[#ffc2da]">❀</div>

          <p className="mt-4 font-serif text-2xl italic text-white/95 sm:text-4xl">
            Together with our families
          </p>

          <p lang="ur" dir="rtl" className="mt-2 font-urdu text-lg text-white/90">
            اپنے خاندانوں کی دعاؤں کے ساتھ
          </p>

          <h1 className="mt-7 font-serif text-5xl font-medium leading-tight sm:text-7xl md:text-8xl">
            <span className="block break-words">{couple.bride}</span>
            <span className="wedding-script my-2 block text-6xl text-[#ffc2da] sm:text-8xl">
              &amp;
            </span>
            <span className="block break-words">{couple.groom}</span>
          </h1>

          <p lang="ur" dir="rtl" className="mt-5 font-urdu text-2xl text-[#ffe3ee] sm:text-3xl">
            {couple.brideUrdu} و {couple.groomUrdu}
          </p>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3 text-[#ffc2da]">
            <span className="h-px w-12 bg-white/50" />
            ♡
            <span className="h-px w-12 bg-white/50" />
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]">
            Invite you to share our special days
          </p>

          <p lang="ur" dir="rtl" className="mt-3 font-urdu text-base text-white/90 sm:text-lg">
            آپ کو ہماری خوشیوں میں شرکت کی دعوت دیتے ہیں
          </p>

          <p className="mt-5 font-serif text-3xl italic text-[#ffe3ee] sm:text-4xl">
            {couple.date}
          </p>

          <p lang="ur" dir="rtl" className="mt-2 font-urdu text-xl text-[#ffe3ee]">
            {couple.dateUrdu}
          </p>

          <a
            href="#events"
            className="mt-9 inline-flex max-w-full items-center justify-center gap-3 rounded-full border border-white/75 bg-white/10 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:bg-white hover:text-[#b52f66] sm:px-9 sm:py-4 sm:text-xs"
          >
            <Bi en="Explore the celebrations ↓" ur="تقریبات کی تفصیل دیکھیں ↓" />
          </a>
        </div>

        <a
          href="#story"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[9px] uppercase tracking-[0.25em] text-white/80"
        >
          <Bi en="Scroll to discover" ur="مزید تفصیل کے لیے نیچے جائیں" />
        </a>

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#ff9ec6]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#d6b4ff]/25 blur-3xl" />
      </section>

      {/* Invitation */}
      <section
        id="story"
        className="relative w-full px-5 py-20 sm:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(255,245,249,.88), rgba(255,245,249,.95)), url('${photos.flowers}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-3xl rounded-t-[35%] rounded-b-[2rem] p-2 sm:rounded-t-[48%]">
          <div className="floral-frame wedding-glass rounded-t-[35%] rounded-b-[1.5rem] px-5 pb-10 pt-12 text-center sm:rounded-t-[48%] sm:px-16 sm:pb-16 sm:pt-20">
            <p className="wedding-script text-5xl text-[#d6558a] sm:text-7xl">
              With Love &amp; Blessings
            </p>

            <p lang="ur" dir="rtl" className="mt-3 font-urdu text-xl text-[#d6558a]">
              محبت اور دعاؤں کے ساتھ
            </p>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6558a]">
              The Pleasure of Your Company
            </p>

            <p lang="ur" dir="rtl" className="mt-2 font-urdu text-sm text-[#d6558a]">
              آپ کی شرکت ہمارے لیے باعثِ مسرت ہوگی
            </p>

            <h2 className="mt-5 font-serif text-3xl italic text-[#6b2d4f] sm:text-5xl">
              A Beautiful New Beginning
            </h2>

            <h3 lang="ur" dir="rtl" className="mt-3 font-urdu text-2xl text-[#6b2d4f]">
              ایک خوبصورت نئے سفر کا آغاز
            </h3>

            <FloralDivider />

            <p className="mx-auto max-w-xl text-sm leading-8 text-[#8a5a74] sm:text-base">
              With immense joy, we invite you to the wedding celebration of our beloved son, Hassan Jamal. Your presence and blessings will make these precious moments even more memorable.
            </p>

            <p lang="ur" dir="rtl" className="mx-auto mt-4 max-w-xl font-urdu text-base leading-9 text-[#8a5a74]">
              نہایت خوشی کے ساتھ ہم آپ کو اپنے پیارے بیٹے حسن جمال کی شادی کی تقریبات میں شرکت کی دعوت دیتے ہیں۔ آپ کی موجودگی اور دعائیں ہماری خوشیوں کو دوبالا کر دیں گی۔
            </p>

            <p className="wedding-script mt-8 text-4xl text-[#c4407c] sm:text-5xl">
              {couple.bride} &amp; {couple.groom}
            </p>

            <p lang="ur" dir="rtl" className="mt-3 font-urdu text-2xl text-[#c4407c]">
              {couple.brideUrdu} و {couple.groomUrdu}
            </p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section
        className="relative w-full overflow-hidden px-5 py-20 text-center sm:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(176,52,112,.9), rgba(120,32,84,.93)), url('${photos.table}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full border border-white/15" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full border border-white/15" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ffc2da] sm:text-xs">
          Save the Date
        </p>

        <p lang="ur" dir="rtl" className="mt-2 font-urdu text-lg text-[#ffc2da]">
          تاریخ یاد رکھیے
        </p>

        <h2 className="mt-5 font-serif text-4xl font-medium text-white sm:text-6xl">
          Until We Say I Do
        </h2>

        <h3 lang="ur" dir="rtl" className="mt-3 font-urdu text-2xl text-white">
          ہماری شادی میں باقی وقت
        </h3>

        <p className="mt-3 font-serif text-xl italic text-white/80">
          The Countdown to Our Forever
        </p>

        <div className="mx-auto mt-10 grid w-full max-w-2xl grid-cols-4 gap-2 sm:mt-14 sm:gap-5">
          {(
            [
              ["Days", "دن", remaining.days],
              ["Hours", "گھنٹے", remaining.hours],
              ["Minutes", "منٹ", remaining.minutes],
              ["Seconds", "سیکنڈ", remaining.seconds],
            ] as const
          ).map(([label, labelUrdu, value]) => (
            <div
              key={label}
              className="min-w-0 rounded-xl border border-white/25 bg-white/12 px-1 py-5 backdrop-blur-sm sm:rounded-3xl sm:py-8"
            >
              <p className="font-serif text-2xl font-medium text-white sm:text-5xl">
                {String(value).padStart(2, "0")}
              </p>

              <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#ffc2da] sm:mt-4 sm:text-[10px] sm:tracking-[0.2em]">
                {label}
              </p>

              <p lang="ur" dir="rtl" className="mt-1 font-urdu text-xs text-white/90 sm:text-sm">
                {labelUrdu}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-serif text-xl italic text-white/85">
          We cannot wait to celebrate with you.
        </p>

        <p lang="ur" dir="rtl" className="mt-3 font-urdu text-lg text-white/80">
          ہمیں آپ کے ساتھ خوشیاں منانے کا بے صبری سے انتظار ہے۔
        </p>
      </section>

      {/* Events */}
      <section id="events" className="w-full px-4 py-20 sm:px-5 sm:py-28">
        <SectionHeading
          eyebrow="Please Join Us"
          eyebrowUrdu="تقریبات میں شرکت فرمائیں"
          title="Our Wedding Events"
          titleUrdu="ہماری شادی کی تقریبات"
          description="Three special celebrations, each with its own magic. Save your favorite moments to your calendar."
          descriptionUrdu="تین خوبصورت تقریبات، ہر تقریب اپنی جگہ خاص۔ تاریخیں اپنے کیلنڈر میں محفوظ کر لیں۔"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="group flex min-w-0 flex-col overflow-hidden rounded-t-[7rem] rounded-b-3xl border border-[#f8d4e4] bg-white shadow-[0_12px_40px_rgba(214,85,138,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(214,85,138,.22)]"
            >
              <div className="relative h-64 overflow-hidden bg-[#fde9f2]">
                <img
                  src={event.image}
                  alt={`${event.title} wedding celebration`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = photos.table;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#5a1946]/70 via-transparent to-[#5a1946]/10" />

                <span className="absolute bottom-5 left-0 right-0 text-center font-serif text-4xl text-white">
                  {event.symbol}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-7 pt-6 sm:px-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d6558a]">
                  {new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "Asia/Karachi",
                  })}
                </p>

                <h3 className="mt-2 font-serif text-3xl font-medium text-[#6b2d4f]">
                  {event.title}
                </h3>

                <h4 lang="ur" dir="rtl" className="mt-2 font-urdu text-2xl text-[#6b2d4f]">
                  {event.titleUrdu}
                </h4>

                <p className="mt-3 text-sm leading-6 text-[#8a5a74]">
                  {event.description}
                </p>

                <p lang="ur" dir="rtl" className="mt-2 font-urdu text-sm leading-8 text-[#8a5a74]">
                  {event.descriptionUrdu}
                </p>

                <div className="mt-5 space-y-4 border-t border-[#f9dce9] pt-5 text-sm leading-6 text-[#7a4a66]">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="shrink-0 text-lg text-[#d6558a]">◷</span>
                    <div className="min-w-0">
                      <Bi en={event.time} ur={event.timeUrdu} />
                    </div>
                  </div>

                  <div className="flex min-w-0 items-start gap-3">
                    <span className="shrink-0 text-lg text-[#d6558a]">⌖</span>
                    <div className="min-w-0 break-words">
                      <Bi en={event.venue} ur={event.venueUrdu} />
                    </div>
                  </div>

                  <div className="flex min-w-0 items-start gap-3">
                    <span className="shrink-0 text-lg text-[#d6558a]">✧</span>
                    <div className="min-w-0">
                      <Bi en={event.dress} ur={event.dressUrdu} />
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <a
                    href={googleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#d03f7a] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#b52f66]"
                  >
                    <Bi en="+ Google Calendar" ur="+ گوگل کیلنڈر میں شامل کریں" />
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadCalendar(event)}
                    className="rounded-full border border-[#f0b4d0] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#c4407c] transition hover:bg-[#ffeaf3]"
                  >
                    <Bi en="Download .ics" ur="کیلنڈر فائل ڈاؤن لوڈ کریں" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-xl text-center text-xs leading-6 text-[#9a6e86]">
          Google Calendar opens a pre-filled event. The .ics file works with Apple Calendar, Outlook and other compatible calendar apps.
        </p>

        <p lang="ur" dir="rtl" className="mx-auto mt-3 max-w-xl text-center font-urdu text-sm leading-8 text-[#9a6e86]">
          گوگل کیلنڈر میں تقریب کی تفصیلات پہلے سے درج ہوں گی۔ آئی سی ایس فائل ایپل کیلنڈر، آؤٹ لک اور دیگر مطابقت رکھنے والی ایپس میں استعمال کی جا سکتی ہے۔
        </p>
      </section>

      {/* Families */}
      <section
        id="families"
        className="w-full px-4 py-20 sm:px-5 sm:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(255,234,243,.9), rgba(255,245,249,.95)), url('${photos.flowers}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SectionHeading
          eyebrow="Two Families, One Beautiful Celebration"
          eyebrowUrdu="دو خاندان، خوشیوں کا ایک خوبصورت موقع"
          title="With Our Families"
          titleUrdu="ہمارے خاندان"
          description="With the love, prayers and blessings of our families, we invite you to share in the joy of our new beginning."
          descriptionUrdu="اپنے خاندانوں کی محبت، دعاؤں اور نیک تمناؤں کے ساتھ ہم آپ کو اپنی خوشیوں میں شریک ہونے کی دعوت دیتے ہیں۔"
        />

        <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
          <article className="floral-frame min-w-0 rounded-t-[8rem] rounded-b-3xl bg-white/90 px-6 pb-10 pt-12 text-center backdrop-blur sm:rounded-t-[10rem] sm:px-10">
            <p className="text-3xl text-[#e86fa3]">❦</p>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6558a]">
              The Bride&apos;s Family
            </p>

            <p lang="ur" dir="rtl" className="mt-2 font-urdu text-lg text-[#d6558a]">
              دلہن کا خاندان
            </p>

            <h3 className="mt-4 font-serif text-3xl font-medium text-[#6b2d4f]">
              {couple.bride}
            </h3>

            <p lang="ur" dir="rtl" className="mt-2 font-urdu text-2xl text-[#6b2d4f]">
              {couple.brideUrdu}
            </p>

            <FloralDivider />

            <p className="font-serif text-xl italic text-[#8a5a74]">Daughter of</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-base text-[#8a5a74]">بیٹی</p>

            <p className="mt-3 text-sm text-[#8a5a74]">Muhammad Nasir</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-lg text-[#8a5a74]">محمد ناصر</p>

            <p className="mt-2 text-sm text-[#8a5a74]">Zohra Yasmin</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-lg text-[#8a5a74]">زہرہ یاسمین</p>

            <p className="mt-5 text-sm italic leading-7 text-[#9a6e86]">
              With their love and blessings, she begins a beautiful new chapter.
            </p>

            <p lang="ur" dir="rtl" className="mt-3 font-urdu text-sm leading-8 text-[#9a6e86]">
              والدین کی محبت اور دعاؤں کے ساتھ وہ اپنی زندگی کے نئے سفر کا آغاز کرتی ہیں۔
            </p>
          </article>

          <article className="floral-frame min-w-0 rounded-t-[8rem] rounded-b-3xl bg-white/90 px-6 pb-10 pt-12 text-center backdrop-blur sm:rounded-t-[10rem] sm:px-10">
            <p className="text-3xl text-[#e86fa3]">❦</p>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6558a]">
              The Groom&apos;s Family
            </p>

            <p lang="ur" dir="rtl" className="mt-2 font-urdu text-lg text-[#d6558a]">
              دلہا کا خاندان
            </p>

            <h3 className="mt-4 font-serif text-3xl font-medium text-[#6b2d4f]">
              {couple.groom}
            </h3>

            <p lang="ur" dir="rtl" className="mt-2 font-urdu text-2xl text-[#6b2d4f]">
              {couple.groomUrdu}
            </p>

            <FloralDivider />

            <p className="font-serif text-xl italic text-[#8a5a74]">Son of</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-base text-[#8a5a74]">بیٹا</p>

            <p className="mt-3 text-sm text-[#8a5a74]">Muhammad Jamal</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-lg text-[#8a5a74]">محمد جمال</p>

            <p className="mt-2 text-sm text-[#8a5a74]">Ghulam Fatima</p>
            <p lang="ur" dir="rtl" className="mt-1 font-urdu text-lg text-[#8a5a74]">غلام فاطمہ</p>

            <p className="mt-5 text-sm italic leading-7 text-[#9a6e86]">
              With their love and blessings, he begins a beautiful new chapter.
            </p>

            <p lang="ur" dir="rtl" className="mt-3 font-urdu text-sm leading-8 text-[#9a6e86]">
              والدین کی محبت اور دعاؤں کے ساتھ وہ اپنی زندگی کے نئے سفر کا آغاز کرتے ہیں۔
            </p>
          </article>
        </div>

        <p className="mt-8 text-center font-serif text-2xl italic text-[#c4407c]">
          Two Families United by Love
        </p>

        <p lang="ur" dir="rtl" className="mt-3 text-center font-urdu text-xl text-[#c4407c]">
          محبت کے رشتے میں بندھے دو خاندان
        </p>
      </section>

      {/* Venues */}
      <section id="location" className="w-full px-4 py-20 sm:px-5 sm:py-28">
        <SectionHeading
          eyebrow="We Saved You a Place"
          eyebrowUrdu="ہم نے آپ کے لیے جگہ رکھی ہے"
          title="Wedding Venues"
          titleUrdu="تقریبات کے مقامات"
          description="Find each celebration with ease. Open the map for directions to your event."
          descriptionUrdu="ہر تقریب کا مقام آسانی سے معلوم کریں۔ راستہ دیکھنے کے لیے نقشہ کھولیں۔"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venueCards.map((venue) => {
            const event = events.find((item) => item.title === venue.eventTitle);

            return (
              <article
                key={venue.eventTitle}
                className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#f8d4e4] bg-white shadow-[0_12px_40px_rgba(214,85,138,.1)]"
              >
                <div className="relative h-56 overflow-hidden bg-[#fde9f2]">
                  <iframe
                    title={`${venue.venueName} Google Maps`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=17&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <span className="absolute left-3 top-3 max-w-[90%] rounded-full border border-white/70 bg-white/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#c4407c] sm:left-4 sm:px-4">
                    {venue.accent}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 py-7 text-center sm:px-6">
                  <p className="font-serif text-sm italic tracking-[0.2em] text-[#e07aa5]">
                    — {venue.number} —
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-medium text-[#6b2d4f]">
                    {venue.eventTitle}
                  </h3>

                  <h4 lang="ur" dir="rtl" className="mt-2 font-urdu text-xl text-[#6b2d4f]">
                    {event?.titleUrdu}
                  </h4>

                  <FloralDivider />

                  <h5 className="text-sm font-semibold leading-relaxed text-[#7a4a66]">
                    {venue.venueName}
                  </h5>

                  <p lang="ur" dir="rtl" className="mt-2 font-urdu text-lg text-[#7a4a66]">
                    {venue.venueUrdu}
                  </p>

                  <p className="mt-2 text-sm text-[#9a6e86]">{venue.address}</p>

                  <p lang="ur" dir="rtl" className="mt-1 font-urdu text-sm text-[#9a6e86]">
                    {venue.addressUrdu}
                  </p>

                  {event && (
                    <div className="mt-5 border-t border-[#f9dce9] pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d6558a]">
                        Event Details
                      </p>

                      <p lang="ur" dir="rtl" className="mt-2 font-urdu text-sm text-[#d6558a]">
                        تقریب کی تفصیل
                      </p>

                      <div className="mt-3">
                        <Bi en={event.time} ur={event.timeUrdu} />
                      </div>

                      <div className="mt-3">
                        <Bi en={event.dress} ur={event.dressUrdu} />
                      </div>
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#d03f7a] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#b52f66]"
                  >
                    <Bi en="Get Directions ↗" ur="راستہ دیکھیں ↗" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-9 text-center font-serif text-2xl italic text-[#c4407c]">
          Your presence will make our celebrations even more special.
        </p>

        <p lang="ur" dir="rtl" className="mt-3 text-center font-urdu text-lg text-[#c4407c]">
          آپ کی شرکت ہماری خوشیوں کو مزید خاص بنا دے گی۔
        </p>
      </section>

      {/* Contact and RSVP */}
      <section
        id="contact"
        className="w-full px-4 py-20 sm:px-5 sm:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(255,234,243,.9), rgba(255,245,249,.96)), url('${photos.flowers}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SectionHeading
          eyebrow="Your Reply Means So Much"
          eyebrowUrdu="آپ کا جواب ہمارے لیے بہت اہم ہے"
          title="Contact & RSVP"
          titleUrdu="رابطہ اور شرکت کی تصدیق"
          description="Please let us know if you can join us. Your response will open a WhatsApp message ready to send to the hosts."
          descriptionUrdu="براہِ کرم ہمیں بتائیں کہ آپ تقریب میں شرکت کر سکیں گے یا نہیں۔ آپ کا جواب واٹس ایپ پیغام کی صورت میں تیار ہو جائے گا۔"
        />

        <form
          onSubmit={submitRSVP}
          className="floral-frame mx-auto w-full max-w-2xl rounded-[2rem] bg-white/95 p-5 backdrop-blur sm:p-10"
        >
          <label
            htmlFor="guest-name"
            className="mb-2 block text-sm font-semibold text-[#a4507a]"
          >
            <Bi en="Your Name" ur="آپ کا نام" />
          </label>

          <input
            id="guest-name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            maxLength={100}
            placeholder="Enter your full name"
            className="mb-6 w-full min-w-0 rounded-xl border border-[#f5cfe0] bg-[#fffafc] px-4 py-3.5 text-sm text-[#6b2d4f] outline-none transition placeholder:text-[#c9a5b8] focus:border-[#e0508f] focus:ring-2 focus:ring-[#ffd9e8]"
          />

          <p className="mb-3 text-sm font-semibold text-[#a4507a]">
            <Bi en="Will you be joining us?" ur="کیا آپ تقریب میں شرکت کریں گے؟" />
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <label
              className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                attendance === "yes"
                  ? "border-[#e07aa5] bg-[#ffeaf3] text-[#b52f66]"
                  : "border-[#f5cfe0] text-[#8a5a74]"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
                className="mt-1 shrink-0 accent-[#d03f7a]"
              />

              <span className="min-w-0">
                <Bi en="Joyfully accepts" ur="خوشی سے شرکت کریں گے" />
              </span>
            </label>

            <label
              className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                attendance === "no"
                  ? "border-[#e07aa5] bg-[#ffeaf3] text-[#b52f66]"
                  : "border-[#f5cfe0] text-[#8a5a74]"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
                className="mt-1 shrink-0 accent-[#d03f7a]"
              />

              <span className="min-w-0">
                <Bi
                  en="Regretfully declines"
                  ur="معذرت کے ساتھ شرکت نہیں کر سکیں گے"
                />
              </span>
            </label>
          </div>

          {attendance === "yes" && (
            <>
              <label
                htmlFor="guest-count"
                className="mb-2 block text-sm font-semibold text-[#a4507a]"
              >
                <Bi en="Number of Guests" ur="مہمانوں کی تعداد" />
              </label>

              <select
                id="guest-count"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="mb-6 w-full min-w-0 rounded-xl border border-[#f5cfe0] bg-[#fffafc] px-4 py-3.5 text-sm text-[#6b2d4f] outline-none focus:border-[#e0508f]"
              >
                {["1", "2", "3", "4", "5", "6"].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === "1" ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </>
          )}

          <label
            htmlFor="guest-message"
            className="mb-2 block text-sm font-semibold text-[#a4507a]"
          >
            <Bi en="A Little Message (Optional)" ur="اپنا پیغام لکھیں (اختیاری)" />
          </label>

          <textarea
            id="guest-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Write a message for the couple..."
            className="mb-6 w-full min-w-0 resize-y rounded-xl border border-[#f5cfe0] bg-[#fffafc] px-4 py-3.5 text-sm text-[#6b2d4f] outline-none transition placeholder:text-[#c9a5b8] focus:border-[#e0508f] focus:ring-2 focus:ring-[#ffd9e8]"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#d03f7a] px-5 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#b52f66]"
          >
            <Bi
              en="Send RSVP via WhatsApp ♡"
              ur="واٹس ایپ کے ذریعے جواب بھیجیں ♡"
            />
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-[#9a6e86]">
            WhatsApp will open with your RSVP details prepared. Please review and press Send.
          </p>

          <p lang="ur" dir="rtl" className="mt-2 text-center font-urdu text-sm leading-8 text-[#9a6e86]">
            واٹس ایپ پر آپ کے جواب کی تفصیلات تیار ہو جائیں گی۔ براہِ کرم پیغام دیکھ کر بھیج دیں۔
          </p>
        </form>
      </section>

      {/* Closing */}
      <footer
        className="relative w-full overflow-hidden bg-cover bg-center px-5 py-24 text-center text-white sm:py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(100,22,72,.86), rgba(190,64,126,.88)), url('${photos.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-4 border border-white/25 sm:inset-8" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="wedding-script text-5xl text-[#ffc2da] sm:text-7xl">
            And So, Forever Begins
          </p>

          <p lang="ur" dir="rtl" className="mt-4 font-urdu text-2xl text-[#ffc2da]">
            اور یوں ہمیشہ کے سفر کا آغاز ہوتا ہے
          </p>

          <div className="mx-auto mt-5 text-2xl text-[#ffc2da]">❀</div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ffc2da]">
            One Love. One Promise.
          </p>

          <p lang="ur" dir="rtl" className="mt-3 font-urdu text-lg text-[#ffc2da]">
            ایک محبت، ایک وعدہ
          </p>

          <h2 className="mt-6 font-serif text-4xl italic sm:text-6xl">
            {couple.bride}
            <span className="text-[#ffc2da]"> &amp; </span>
            {couple.groom}
          </h2>

          <p lang="ur" dir="rtl" className="mt-4 font-urdu text-2xl">
            {couple.brideUrdu} و {couple.groomUrdu}
          </p>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/85">
            We feel blessed to begin this journey together, and we cannot wait to celebrate with you.
          </p>

          <p lang="ur" dir="rtl" className="mx-auto mt-3 max-w-md font-urdu text-base leading-9 text-white/85">
            ہم اپنے اس نئے سفر کے آغاز پر اللہ کے شکر گزار ہیں اور آپ کے ساتھ یہ خوشیاں منانے کے منتظر ہیں۔
          </p>

          <a
            href="#home"
            className="mt-9 inline-flex rounded-full border border-white/60 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#b52f66]"
          >
            <Bi en="Back to Top ↑" ur="واپس اوپر جائیں ↑" />
          </a>

          <p className="mt-14 text-[9px] uppercase tracking-[0.2em] text-white/60">
            Made with love for our special day · 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
