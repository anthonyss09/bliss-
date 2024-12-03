export default function TryAgain({
  refetch,
}: {
  refetch: ({ force }: { force: boolean }) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:absolute sm:left-1/2 sm:translate-x-[-50%]">
      <p className="font-medium">Something went wrong.</p>
      <button
        className="h-12 w-28 border-2 border-black font-semibold hover:bg-black hover:text-white"
        onClick={() => {
          refetch({ force: true });
        }}
      >
        Try Again
      </button>
    </div>
  );
}
