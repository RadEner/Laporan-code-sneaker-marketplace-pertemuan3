// CHILD: Menerima jumlah hasil pencarian via props (Props Down)
export default function Header({ resultCount }) {
  return (
    <header className="mb-4">
      <h1 className="text-xl font-bold text-teal-400">👟 Sneaker Marketplace</h1>
      <p className="text-xs text-slate-400 mt-1">
        Menampilkan {resultCount} sepatu
      </p>
    </header>
  );
}
