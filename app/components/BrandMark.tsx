type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "text-4xl" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-baseline leading-none tracking-[-0.08em] ${className}`}
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <span className="text-[#b08d3b]">R</span>
      <span className="text-[#12233f]">+</span>
    </span>
  );
}
