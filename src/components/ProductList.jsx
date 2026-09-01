import ProductCard from './ProductCard';

// CHILD: Menerima array hasil derived state (filteredShoes) dari Parent
export default function ProductList({ shoes }) {
  if (shoes.length === 0) {
    return <p className="text-slate-500 text-sm">Tidak ada sepatu yang cocok.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {shoes.map((shoe) => (
        <ProductCard
          key={shoe.id}
          name={shoe.name}
          brand={shoe.brand}
          price={shoe.price}
          isNew={shoe.isNew}
        />
      ))}
    </div>
  );
}
