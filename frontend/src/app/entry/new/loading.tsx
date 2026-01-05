export default function Loading() {
  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="h-8 w-40 rounded-full bg-muted/40" />
        <div className="h-4 w-64 rounded-full bg-muted/30" />
        <div className="h-64 rounded-3xl bg-muted/30" />
      </main>
    </div>
  );
}
