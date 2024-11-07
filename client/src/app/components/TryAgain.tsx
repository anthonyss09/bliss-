export default function TryAgain({
  refetch,
}: {
  refetch: ({ force }: { force: boolean }) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="font-medium">Something went wrong.</p>
      <button
        className="h-12 w-28 border-2 border-black font-semibold hover:bg-black hover:text-white"
        onClick={() => {
          const res = refetch({ force: true });
        }}
      >
        Try Again
      </button>
    </div>
  );
}
