import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="mb-8 animate-bounce">
        <Image 
          src="/igniscore.png" 
          alt="Igniscore Logo" 
          width={150} 
          height={150} 
          className="object-contain"
          priority
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
        🚧 Em desenvolvimento...
      </h1>
    </div>
  );
}
