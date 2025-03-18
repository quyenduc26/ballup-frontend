
import { Toaster } from "sonner";
export default function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" mt-5 items-center justify-center">
      <div className="text-center ">{children}
      <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{ 
            style: { 
              zIndex: 9999 
            } 
          }} 
        />
      </div>
    </section>
  );
}
