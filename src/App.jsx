import { useState } from 'react';
import Header from './components/Header';
import FormInput from './components/FormInput';
import ProductList from './components/ProductList';

const SHOES_DATA = [
  { id: 1, name: 'Nike Air Jordan 1', brand: 'Nike', price: 2499000, isNew: true },
  { id: 2, name: 'Adidas Samba OG', brand: 'Adidas', price: 2200000, isNew: false },
  { id: 3, name: 'Puma Suede Classic', brand: 'Puma', price: 1299000, isNew: false },
  { id: 4, name: 'Nike Dunk Low', brand: 'Nike', price: 1899000, isNew: true },
  { id: 5, name: 'Adidas Ultraboost', brand: 'Adidas', price: 2899000, isNew: false },
  { id: 6, name: 'Puma RS-X', brand: 'Puma', price: 1599000, isNew: false },
];

// PARENT: Single Source of Truth. Mengelola SEMUA state di sini (Lifting State Up).
export default function App() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');

  // Derived State: dihitung ulang otomatis setiap kali search/selectedBrand berubah
  const filteredShoes = SHOES_DATA.filter((shoe) => {
    const matchSearch = shoe.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand = selectedBrand === 'ALL' || shoe.brand === selectedBrand;
    return matchSearch && matchBrand;
  });

  return (
    <main className="p-6 bg-slate-900 text-white min-h-screen max-w-md mx-auto">
      {/* Props Down: resultCount dikirim ke Header */}
      <Header resultCount={filteredShoes.length} />

      {/* Props Down (search, selectedBrand) + Events Up (onSearchChange, onBrandChange) */}
      <FormInput
        search={search}
        selectedBrand={selectedBrand}
        onSearchChange={(value) => setSearch(value)}
        onBrandChange={(brand) => setSelectedBrand(brand)}
      />

      {/* Props Down: hasil filter dikirim ke ProductList */}
      <ProductList shoes={filteredShoes} />
    </main>
  );
}
