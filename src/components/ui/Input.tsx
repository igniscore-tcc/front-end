interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ error, ...props }: InputProps) => (
  <div className="w-full">
    <input
      {...props}
      className={`w-full px-4 py-3 bg-[#E5E5E5] border-none rounded-lg text-gray-800 
      placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all
      ${error ? "focus:ring-red-500 ring-2 ring-red-500/50" : "focus:ring-[#CC2A2A]/20"}`}
    />
    {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
  </div>
);