export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col prose prose-sm prose-sky max-w-full w-full items-center justify-center min-h-screen">
      <section className="flex p-4 flex-col items-center justify-center max-w-7xl">
        {children}
      </section>
    </main>
  );
}
