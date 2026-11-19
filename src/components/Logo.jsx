
export function LogoIcon({ className = "w-10 h-10", ...props }) {
  return (
    <div className={`${className} rounded-full overflow-hidden border border-primary/30 shadow-sm bg-white flex items-center justify-center`}>
      <img 
        src="/images/LOGO.png" 
        alt="Keshab Room Rent Logo" 
        className="w-full h-full object-contain p-1" 
        {...props} 
      />
    </div>
  );
}

export function Logo({ showText = true, textClass = "", subTextClass = "", iconSize = "w-10 h-10" }) {
  return (
    <div className="flex items-center gap-3">
      <LogoIcon className={`${iconSize} shrink-0`} />
      {showText && (
        <div className="flex flex-col items-start text-left">
          <h1 className={`font-serif text-xl md:text-2xl font-bold tracking-tight leading-tight transition-colors duration-300 ${textClass}`}>
            Keshab Room Rent
          </h1>
          <p className={`text-[10px] md:text-xs tracking-[2px] uppercase text-primary font-medium mt-0.5 ${subTextClass}`}>
            North Guwahati, Assam
          </p>
        </div>
      )}
    </div>
  );
}

export default Logo;
