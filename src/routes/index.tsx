import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FloatingAvatar } from "@/components/home/FloatingAvatar";
import { Hero } from "@/components/home/Hero";
import { ProfileCard } from "@/components/home/ProfileCard";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TopicTags } from "@/components/home/TopicTags";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feedback de capacitación — Danaide - Ultra IP" },
      {
        name: "description",
        content: "Tu opinión nos ayuda a mejorar cada capacitación de Danaide - Ultra IP.",
      },
      { property: "og:title", content: "Feedback de capacitación — Danaide - Ultra IP" },
      {
        property: "og:description",
        content: "Compartí tu experiencia en la capacitación de Danaide - Ultra IP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const goToFeedback = () => {
    navigate({ to: "/registro" });
  };

  return (
    <div className="home-page min-h-screen bg-bg text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-360 px-6 pb-20 pt-12 sm:px-10 sm:pt-16 lg:px-14 lg:pt-20">
        <div className="grid items-center gap-14 min-[860px]:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)] min-[860px]:gap-8">
          <Hero onSubmit={goToFeedback} />
          <ProfileCard />
        </div>
        <TopicTags />
      </main>
      <FloatingAvatar />
    </div>
  );
}
