"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const events = [
  {
    title: "Mehndi",
    date: "2027-01-07",
    start: "2027-01-07T18:00:00+05:00",
    end: "2027-01-07T22:00:00+05:00",
    time: "06:00 PM – 10:00 PM",
    venue: "At Home of the Bride, Near Jamia Masjid Sultania, Gujranwala",
    dress: "Traditional & Colorful",
    description: "An evening of music, laughter, colors and celebration.",
    symbol: "✿",
  },
  {
    title: "Nikah & Baraat",
    date: "2027-01-08",
    start: "2027-01-08T13:00:00+05:00",
    end: "2027-01-08T16:00:00+05:00",
    time: "01:00 PM – 04:00 PM",
    venue: "Crown Palace, Crown Cinema Chowk, Gujranwala",
    dress: "Formal & Elegant",
    description: "The beautiful beginning of our forever, surrounded by loved ones.",
    symbol: "♡",
  },
  {
    title: "Walima",
    date: "2027-01-09",
    start: "2027-01-09T13:00:00+05:00",
    end: "2027-01-09T16:00:00+05:00",
    time: "01:00 PM – 04:00 PM",
    venue: "M.B Palace, Hafiz Abad Road, Near Ghory Shah Chowk, Gujranwala",
    dress: "Semi-Formal",
    description: "Join us for a joyful celebration of our new beginning.",
    symbol: "❀",
  },
];

const couple = {
  bride: "Misha Shehzadi",
  groom: "Hassan Jamal",
  date: "January 07–09, 2027",
  venue: "Gujranwala, Pakistan",
};

const whatsappNumber = "923340470768";

const venueCards = [
  {
  eventTitle: "Mehndi",
  venueName: "At Home of the Bride",
  address: "Dr Maqsood Road, Gujranwala",
  mapLink:
    "https://maps.google.com/maps?q=32.1622898,74.165049&z=18&output=embed",
  mapQuery: "Jamia Masjid Sultania, Dr Maqsood Road, Gujranwala",
  accent: "Mehndi Celebration",
  number: "01",
  },
  {
    eventTitle: "Nikah & Baraat",
    venueName: "Crown Palace Marriage Hall",
    address: "Crown Cinema Chowk, Gujranwala",
    mapLink:
      "https://www.google.com/maps/place/Crown+Palace+Marriage+Hall,+Gala+kulfiyan+Wala,+Gali+Depo+wali/@32.1668005,74.1688088,17z/data=!3m1!4b1!4m6!3m5!1s0x391f2978dd849cf3:0x3a4e5d11079be458!8m2!3d32.166796!4d74.1713837!16s%2Fg%2F11f7800qnv?entry=ttu",
    mapQuery: "32.166796,74.1713837",
    accent: "Nikah & Baraat",
    number: "02",
  },
  {
    eventTitle: "Walima",
    venueName: "M.B Palace Marriage Hall",
    address: "Hafiz Abad Road, Gujranwala",
    mapLink:
      "https://www.google.com/maps/place/MB+Palace+Marriage+Hall/@32.1553734,74.1604639,17z/data=!3m1!4b1!4m6!3m5!1s0x391f2bd1307a7547:0x7de7042ddfec309d!8m2!3d32.1553689!4d74.1630388!16s%2Fg%2F11f_3v3shw?entry=ttu",
    mapQuery: "32.1553689,74.1630388",
    accent: "Wedding Reception",
    number: "03",
  },
];

const photos = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
  flowers: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=85",
  table: "https://images.unsplash.com/photo-1519225421980-88d3e6e6b8a5?auto=format&fit=crop&w=1800&q=85",
};

function formatCalendarDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function googleCalendarUrl(event: (typeof events)[number]) {
  const dates = `${formatCalendarDate(event.start)}/${formatCalendarDate(event.end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — ${couple.bride} & ${couple.groom}`,
    dates,
    details: `${event.description}\nDress code: ${event.dress}\nWedding of ${couple.bride} & ${couple.groom}`,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadCalendar(event: (typeof events)[number]) {
  const escapeICS = (value: string) =>
    value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

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
    `DESCRIPTION:${escapeICS(`${event.description}\nDress code: ${event.dress}`)}`,
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#b46c82] sm:text-xs">
        {eyebrow}
      </p>
      <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-[#c98d9c]">
        <span className="h-px w-10 bg-[#dcb6be]" />
        <span>✿</span>
        <span className="h-px w-10 bg-[#dcb6be]" />
      </div>
      <h2 className="mt-4 font-serif text-4xl font-normal text-[#633d4c] sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#856e76]">{description}</p>
    </div>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-5 text-[#bd7e91]" aria-hidden="true">
      <span className="h-px w-12 bg-[#e8cbd1]" />
      <span className="text-lg">❀</span>
      <span className="h-px w-12 bg-[#e8cbd1]" />
    </div>
  );
}

export default function WeddingInvitation() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.65;
    audio.play().catch(() => setMusicPlaying(false));
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

  function submitRSVP(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const rsvpText = [
      `Wedding RSVP — ${couple.bride} & ${couple.groom}`,
      "",
      `Name: ${guestName.trim()}`,
      `Attendance: ${attendance === "yes" ? "Joyfully accepts" : "Regretfully declines"}`,
      `Guests: ${attendance === "yes" ? guestCount : "0"}`,
      `Message: ${message.trim() || "No additional message"}`,
      "",
      `Wedding dates: ${couple.date}`,
    ].join("\n");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rsvpText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="overflow-hidden bg-[#fff8f7] text-[#633d4c] selection:bg-[#efd0d7] selection:text-[#633d4c]">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { background: #fff8f7; }
        .wedding-script { font-family: 'Brush Script MT', 'Segoe Script', cursive; }
        .wedding-glass { background: rgba(255, 250, 249, .91); backdrop-filter: blur(10px); }
        .floral-frame { border: 1px solid rgba(222, 174, 186, .9); box-shadow: 0 18px 60px rgba(119, 66, 83, .08); }
      `}</style>
      <audio
        ref={musicRef}
        src="/music/wedding-romantic.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-4 z-50 rounded-full border border-white/70 bg-[#8f5268]/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-xl backdrop-blur transition hover:bg-[#6d3f51] sm:right-5 sm:px-5"
      >
        {musicPlaying ? "Ⅱ Pause Music" : "♫ Play Music"}
      </button>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(57,27,42,.53), rgba(111,54,73,.45)), url('${photos.hero}')`,
        }}
      >
        <div className="pointer-events-none absolute inset-4 border border-white/45 sm:inset-8" />
        <div className="pointer-events-none absolute inset-6 border border-white/20 sm:inset-11" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#ffe6e9] sm:text-xs">
            A love story in bloom
          </p>
          <div className="mx-auto mt-7 text-3xl text-[#f6d7dd]">❀</div>
          <p className="mt-4 font-serif text-xl italic text-white/90 sm:text-3xl">Together with our families</p>
          <h1 className="mt-7 font-serif text-5xl font-normal leading-[1.15] sm:text-7xl md:text-8xl">
            <span className="block">{couple.bride}</span>
            <span className="wedding-script my-1 block text-5xl text-[#f2c4cf] sm:text-7xl">&amp;</span>
            <span className="block">{couple.groom}</span>
          </h1>
          <div className="mx-auto mt-7 flex items-center justify-center gap-3 text-[#f2c4cf]">
            <span className="h-px w-12 bg-white/50" />♡<span className="h-px w-12 bg-white/50" />
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] sm:text-sm sm:tracking-[0.38em]">
            Invite you to share our special days
          </p>
          <p className="mt-5 font-serif text-2xl italic text-[#ffe0e6] sm:text-3xl">{couple.date}</p>
          <a
            href="#events"
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/75 bg-white/10 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur transition hover:bg-white hover:text-[#744455] sm:px-9 sm:py-4 sm:text-xs"
          >
            Explore the celebrations <span>↓</span>
          </a>
        </div>
        <a href="#story" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-white/75">
          Scroll to discover
        </a>
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#f1c7d1]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#f1c7d1]/15 blur-3xl" />
      </section>

      {/* Invitation */}
      <section
        id="story"
        className="relative px-5 py-20 sm:py-28"
        style={{ backgroundImage: `linear-gradient(rgba(255,248,247,.87), rgba(255,248,247,.94)), url('${photos.flowers}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="mx-auto max-w-3xl rounded-t-[48%] rounded-b-[2rem] p-2 sm:rounded-t-[48%]">
          <div className="floral-frame wedding-glass rounded-t-[48%] rounded-b-[1.5rem] px-6 pb-12 pt-14 text-center sm:px-16 sm:pb-16 sm:pt-20">
            <p className="wedding-script text-5xl text-[#b66f84] sm:text-6xl">With love &amp blessings</p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b46c82]">
              The pleasure of your company
            </p>
            <h2 className="mt-5 font-serif text-3xl italic text-[#633d4c] sm:text-5xl">A beautiful new beginning</h2>
            <FloralDivider />
            <p className="mx-auto max-w-xl text-sm leading-8 text-[#856e76] sm:text-base">
              With hearts full of happiness and gratitude, we invite you to join our families
              as we celebrate a new chapter filled with love, laughter and countless blessings.
              Your presence will make these precious moments even more memorable.
            </p>
            <p className="wedding-script mt-8 text-3xl text-[#a85e77] sm:text-4xl">
              {couple.bride} &amp; {couple.groom}
            </p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section
        className="relative overflow-hidden px-5 py-20 text-center sm:py-28"
        style={{ backgroundImage: `linear-gradient(rgba(100,49,68,.88), rgba(70,34,49,.91)), url('${photos.table}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full border border-white/10" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#f2c4cf] sm:text-xs">Save the date</p>
        <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">Until We Say I Do</h2>
        <p className="mt-3 font-serif text-lg italic text-white/70">The countdown to our forever</p>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-2 sm:mt-14 sm:gap-5">
          {([["Days", remaining.days], ["Hours", remaining.hours], ["Minutes", remaining.minutes], ["Seconds", remaining.seconds]] as const).map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/20 bg-white/10 px-1 py-5 backdrop-blur-sm sm:rounded-3xl sm:py-8">
              <p className="font-serif text-2xl text-white sm:text-5xl">{String(value).padStart(2, "0")}</p>
              <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#f2c4cf] sm:mt-4 sm:text-[10px] sm:tracking-[0.25em]">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-serif text-lg italic text-white/75">We cannot wait to celebrate with you.</p>
      </section>

      {/* Events */}
      <section id="events" className="px-5 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Please join us"
          title="Our Wedding Events"
          description="Three special celebrations, each with its own magic. Save your favorite moments to your calendar."
        />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => {
            const eventImages = [
              "/rasam-e-hina.jpg",
              "/barat.jpg",
              "/waleema.jpg",
              photos.table,
            ];
            return (
              <article key={event.title} className="group flex flex-col overflow-hidden rounded-t-[9rem] rounded-b-3xl border border-[#efd9de] bg-white shadow-[0_12px_40px_rgba(113,63,79,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(113,63,79,.15)]">
                <div className="relative h-64 overflow-hidden">
                  <img src={eventImages[index]} alt={`${event.title} wedding celebration`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3c1c2b]/70 via-transparent to-[#3c1c2b]/10" />
                  <span className="absolute bottom-5 left-0 right-0 text-center font-serif text-4xl text-white">{event.symbol}</span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b46c82]">
                    {new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Karachi" })}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-[#633d4c]">{event.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#856e76]">{event.description}</p>
                  <div className="mt-5 space-y-3 border-t border-[#f1e2e5] pt-5 text-sm leading-6 text-[#725761]">
                    <p className="flex gap-3"><span className="text-[#b46c82]">◷</span><span>{event.time}</span></p>
                    <p className="flex gap-3"><span className="text-[#b46c82]">⌖</span><span>{event.venue}</span></p>
                    <p className="flex gap-3"><span className="text-[#b46c82]">✧</span><span>{event.dress}</span></p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#96566c] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#744052]">
                      + Google Calendar
                    </a>
                    <button type="button" onClick={() => downloadCalendar(event)} className="rounded-full border border-[#dfb9c3] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#96566c] transition hover:bg-[#fff0f2]">
                      Download .ics
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mx-auto mt-7 max-w-xl text-center text-xs leading-6 text-[#987f87]">
          Google Calendar opens a pre-filled event. The .ics file works with Apple Calendar, Outlook and other compatible calendar apps.
        </p>
      </section>

      {/* Families */}
      <section
        id="families"
        className="px-5 py-20 sm:py-28"
        style={{ backgroundImage: `linear-gradient(rgba(255,240,242,.88), rgba(255,248,247,.94)), url('${photos.flowers}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <SectionHeading
          eyebrow="Two families, one beautiful celebration"
          title="With Our Families"
          description="With the love, prayers and blessings of our families, we invite you to share in the joy of our new beginning."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="floral-frame rounded-t-[10rem] rounded-b-3xl bg-white/90 px-7 pb-10 pt-12 text-center backdrop-blur sm:px-10">
            <p className="text-3xl text-[#bd7e91]">❦</p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b46c82]">The Bride’s Family</p>
            <h3 className="mt-4 font-serif text-3xl text-[#633d4c]">{couple.bride}</h3>
            <FloralDivider />
            <p className="font-serif text-lg italic text-[#856e76]">Daughter of</p>
            <p className="mt-3 text-sm text-[#856e76]">Muhammad Nasir</p>
            <p className="mt-1 text-sm text-[#856e76]">Zohra Yasmin</p>
            <p className="mt-5 text-sm italic leading-7 text-[#987f87]">With their love and blessings, she begins a beautiful new chapter.</p>
          </article>
          <article className="floral-frame rounded-t-[10rem] rounded-b-3xl bg-white/90 px-7 pb-10 pt-12 text-center backdrop-blur sm:px-10">
            <p className="text-3xl text-[#bd7e91]">❦</p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b46c82]">The Groom’s Family</p>
            <h3 className="mt-4 font-serif text-3xl text-[#633d4c]">{couple.groom}</h3>
            <FloralDivider />
            <p className="font-serif text-lg italic text-[#856e76]">Son of</p>
            <p className="mt-3 text-sm text-[#856e76]">Muhammad Jamal</p>
            <p className="mt-1 text-sm text-[#856e76]">Ghulam Fatima</p>
            <p className="mt-5 text-sm italic leading-7 text-[#987f87]">With their love and blessings, he begins a beautiful new chapter.</p>
          </article>
        </div>
        <p className="mt-8 text-center font-serif text-xl italic text-[#9c687a]">Two families united by love, surrounded by blessings.</p>
      </section>

      {/* Venues */}
      <section id="location" className="px-5 py-20 sm:py-28">
        <SectionHeading
          eyebrow="We saved you a place"
          title="Wedding Venues"
          description="Find each celebration with ease. Open the map for directions to your event."
        />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venueCards.map((venue) => {
            const event = events.find((item) => item.title === venue.eventTitle);
            return (
              <article key={venue.eventTitle} className="flex flex-col overflow-hidden rounded-3xl border border-[#efd9de] bg-white shadow-[0_12px_40px_rgba(113,63,79,.07)]">
                <div className="relative h-56 overflow-hidden bg-[#f7e8eb]">
                  <iframe title={`${venue.venueName} Google Maps`} src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=17&output=embed`} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#96566c]">{venue.accent}</span>
                </div>
                <div className="flex flex-1 flex-col px-6 py-7 text-center">
                  <p className="font-serif text-sm italic tracking-[0.2em] text-[#bd7e91]">— {venue.number} —</p>
                  <h3 className="mt-3 font-serif text-2xl text-[#633d4c]">{venue.eventTitle}</h3>
                  <FloralDivider />
                  <h4 className="text-sm font-semibold leading-relaxed text-[#725761]">{venue.venueName}</h4>
                  <p className="mt-2 text-sm text-[#987f87]">{venue.address}</p>
                  {event && <div className="mt-5 border-t border-[#f1e2e5] pt-4"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b46c82]">Event details</p><p className="mt-2 text-sm text-[#856e76]">{event.time}</p><p className="mt-1 text-sm text-[#856e76]">{event.dress}</p></div>}
                  <a href={venue.mapLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#96566c] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white transition hover:bg-[#744052]">
                    Get directions <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-9 text-center font-serif text-lg italic text-[#9c687a]">Your presence will make our celebrations even more special.</p>
      </section>

      {/* RSVP */}
      <section
        id="contact"
        className="px-5 py-20 sm:py-28"
        style={{ backgroundImage: `linear-gradient(rgba(255,240,242,.88), rgba(255,248,247,.95)), url('${photos.flowers}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <SectionHeading
          eyebrow="Your reply means so much"
          title="Kindly RSVP"
          description="Please let us know if you can join us. Your response will open a WhatsApp message ready to send to the hosts."
        />
        <form onSubmit={submitRSVP} className="floral-frame mx-auto max-w-2xl rounded-[2rem] bg-white/95 p-6 backdrop-blur sm:p-10">
          <label htmlFor="guest-name" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f6574]">Your name</label>
          <input id="guest-name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required maxLength={100} placeholder="Enter your full name" className="mb-6 w-full rounded-xl border border-[#ecd4da] bg-[#fffafa] px-4 py-3.5 text-sm text-[#633d4c] outline-none transition placeholder:text-[#bba5ac] focus:border-[#b46c82] focus:ring-2 focus:ring-[#f5e0e5]" />

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f6574]">Will you be joining us?</p>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${attendance === "yes" ? "border-[#bd7e91] bg-[#fff0f3] text-[#744052]" : "border-[#ecd4da] text-[#856e76]"}`}>
              <input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} className="accent-[#96566c]" />
              Joyfully accepts
            </label>
            <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${attendance === "no" ? "border-[#bd7e91] bg-[#fff0f3] text-[#744052]" : "border-[#ecd4da] text-[#856e76]"}`}>
              <input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} className="accent-[#96566c]" />
              Regretfully declines
            </label>
          </div>

          {attendance === "yes" && (
            <>
              <label htmlFor="guest-count" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f6574]">Number of guests</label>
              <select id="guest-count" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="mb-6 w-full rounded-xl border border-[#ecd4da] bg-[#fffafa] px-4 py-3.5 text-sm text-[#633d4c] outline-none focus:border-[#b46c82]">
                {["1", "2", "3", "4", "5", "6"].map((count) => <option key={count} value={count}>{count} {count === "1" ? "guest" : "guests"}</option>)}
              </select>
            </>
          )}

          <label htmlFor="guest-message" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f6574]">A little message (optional)</label>
          <textarea id="guest-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={1000} placeholder="Write a message for the couple..." className="mb-6 w-full resize-y rounded-xl border border-[#ecd4da] bg-[#fffafa] px-4 py-3.5 text-sm text-[#633d4c] outline-none transition placeholder:text-[#bba5ac] focus:border-[#b46c82] focus:ring-2 focus:ring-[#f5e0e5]" />

          <button type="submit" className="w-full rounded-full bg-[#96566c] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-[#744052]">
            Send RSVP via WhatsApp ♡
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-[#987f87]">WhatsApp will open with your RSVP details prepared. Please review and press Send.</p>
        </form>
      </section>

      {/* Closing */}
      <footer
        className="relative overflow-hidden bg-cover bg-center px-5 py-24 text-center text-white sm:py-32"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(57,27,42,.82), rgba(111,54,73,.86)), url('${photos.hero}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="pointer-events-none absolute inset-4 border border-white/20 sm:inset-8" />
        <p className="wedding-script text-5xl text-[#f2c4cf] sm:text-6xl">And so, forever begins</p>
        <div className="mx-auto mt-5 text-2xl text-[#f2c4cf]">❀</div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#f2c4cf]">One love. One promise.</p>
        <h2 className="mt-6 font-serif text-4xl italic sm:text-6xl">{couple.bride} <span className="text-[#f2c4cf]">&amp;</span> {couple.groom}</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/80">We feel blessed to begin this journey together, and we cannot wait to celebrate with you.</p>
        <a href="#home" className="mt-9 inline-flex rounded-full border border-white/60 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#744052]">Back to top ↑</a>
        <p className="mt-14 text-[9px] uppercase tracking-[0.25em] text-white/50">Made with love for our special day · 2026</p>
      </footer>
    </main>
  );
}
