// CHILD: Menerima props bertipe String, Number, Boolean (Read-Only, tidak boleh diubah langsung)
export default function ProductCard({ name, brand, price, isNew }) {
  return (
    <div className="p-3 bg-slate-800 border border-slate-700 rounded">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-sm">{name}</h3>
        {isNew && (
          <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-bold">
            BARU
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 mt-1">{brand}</p>
      <p className="text-xs text-teal-400 mt-1">Rp {price.toLocaleString('id-ID')}</p>
    </div>
  );
}
