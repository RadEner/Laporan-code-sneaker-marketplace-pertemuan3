const BRANDS = ['ALL', 'Nike', 'Adidas', 'Puma'];

// CHILD: Menerima state (search, selectedBrand) + callback (onSearchChange, onBrandChange)
export default function FormInput({ search, selectedBrand, onSearchChange, onBrandChange }) {
  return (
    <div className="mb-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari sepatu..."
        className="w-full p-2 mb-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
      />
      <div className="flex gap-2">
        {BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => onBrandChange(b)}
            className={
              selectedBrand === b
                ? 'px-3 py-1 bg-teal-500 text-black rounded-full font-bold text-sm'
                : 'px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-bold text-sm'
            }
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
