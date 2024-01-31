import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-fill flex flex-col gap-y-4 items-center justify-center mt-8">
      <div className="w-16 h-16 relative animate-spin">
      <Image fill src="/logo.png" alt="Logo" />
      </div>
      <p className="text-md text-muted-foreground">Genius is thinking</p>
    </div>
  );
};

export default Loader;
