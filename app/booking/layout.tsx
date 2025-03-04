export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <section className=" mt-5 items-center justify-center h-screen">
        <div className="text-center ">
          {children}
        </div>
      </section>

);

  }
  