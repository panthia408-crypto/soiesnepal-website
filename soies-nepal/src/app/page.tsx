// ...existing code...
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import EventsSection from "@/components/sections/EventsSection";
import NoticePopupWrapper from "@/components/NoticePopupWrapper";
import { client } from "@/lib/sanity";
import { eventsQuery, latestNoticeQuery } from "@/lib/queries";

// Consider triggering on-demand revalidation via Sanity webhooks
// for truly immediate updates (e.g. urgent notice). Otherwise 60s is fine.
export const revalidate = 60;

async function getData() {
  try {
    // fetch ALL events for the homepage
    const [events, latestNotice] = await Promise.all([
      client.fetch(eventsQuery).catch(() => []),
      client.fetch(latestNoticeQuery).catch(() => null),
    ]);
    return { events, latestNotice };
  } catch {
    return { events: [], latestNotice: null };
  }
}

export default async function Home() {
  const { events, latestNotice } = await getData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowWeWorkSection />
      <EventsSection events={events} />
      <NoticePopupWrapper notice={latestNotice} />
    </>
  );
}
