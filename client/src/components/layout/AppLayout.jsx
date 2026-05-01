import PawBackground from '../ui/PawBackground';

export default function AppLayout({ children }) {
  return (
    <>
      <PawBackground />
      <main className="min-h-screen flex flex-col items-center px-4 md:px-8">
        {children}
        <footer className="mt-auto py-8 text-center text-sm text-charcoal/60 w-full">
          Made with 🐾 for Mrs Mansu
        </footer>
      </main>
    </>
  );
}
