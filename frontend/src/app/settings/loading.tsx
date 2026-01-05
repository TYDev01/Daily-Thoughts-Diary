export default function Loading() {
  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="h-8 w-40 rounded-full bg-muted/40" />
        <div className="h-40 rounded-3xl bg-muted/30" />
        <div className="h-32 rounded-3xl bg-muted/30" />
      </div>
    </div>
  );
}
