export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
  <section className="flex flex-col mr-[650px] items-center justify-center gap-4 py-8 self-start ">
    <div className="w-full max-w-lg text-center mx-auto">
      {children}
    </div>
  </section>
);

  }
  