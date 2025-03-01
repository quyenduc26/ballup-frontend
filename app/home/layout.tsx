import IntroPage from "@/components/intro/IntroPage"
import IntroBooking from "@/components/home/IntroBooking"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[1300px]">{children}</div>
    </section>
  );
}
