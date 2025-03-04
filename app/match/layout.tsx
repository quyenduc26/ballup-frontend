
export default function MatchLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <section className=" mt-5 items-center justify-center">
        <div className="text-center ">
          {children}
        </div>
      </section>

);

  }
  