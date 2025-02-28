export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <section className=" mt-20 items-center justify-center h-screen">
        <div className="text-center ">
        <h1 className="text-4xl md:text-6xl ml-16 font-extrabold text-black py-4 md:py-6 text-center md:text-left">
        BOOKING
      </h1>
          {children}
        
        </div>
      </section>

);

  }
  