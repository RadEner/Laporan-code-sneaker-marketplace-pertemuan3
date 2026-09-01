# Sneaker Marketplace — Laporan Code Defense

Tugas Take-Home Pertemuan 3 — Pemrograman Internet
Teknologi Informasi, Universitas Udayana

---

## 1. Diagram Pohon Komponen (Alur Props)

```
App.jsx  (Parent — Single Source of Truth)
 │
 │  state: search, selectedBrand
 │  derived state: filteredShoes
 │
 ├──▶ Header
 │      props diterima: resultCount
 │
 ├──▶ FormInput
 │      props diterima: search, selectedBrand
 │      callback diterima: onSearchChange, onBrandChange
 │      │
 │      └── events up: memanggil onSearchChange(value) & onBrandChange(brand)
 │          saat user mengetik / klik pill brand → mengubah state di App.jsx
 │
 └──▶ ProductList
        props diterima: shoes (= filteredShoes)
        │
        └──▶ ProductCard (di-render berulang via .map())
               props diterima: name, brand, price, isNew
```

**Alur data:**
- **Props Down** — `App.jsx` mengirim `search`, `selectedBrand`, dan `filteredShoes` ke child melalui props.
- **Events Up** — `FormInput` tidak mengubah state secara langsung; ia memanggil fungsi callback (`onSearchChange`, `onBrandChange`) yang dikirim dari Parent, sehingga perubahan tetap terjadi di satu tempat (Lifting State Up).

---

## 2. Bedah Code

### `useState` yang digunakan

| State | Lokasi | Tipe | Fungsi |
|---|---|---|---|
| `search` | `App.jsx` | string | Menyimpan teks yang diketik user di kolom pencarian |
| `selectedBrand` | `App.jsx` | string | Menyimpan brand yang sedang difilter (`'ALL'`, `'Nike'`, dst) |

Keduanya sengaja ditaruh di `App.jsx`, bukan di `FormInput.jsx`, karena nilainya juga dibutuhkan oleh `ProductList` (lewat `filteredShoes`) — inilah alasan **Lifting State Up** diterapkan.

### Derived State: `filteredShoes`

```js
const filteredShoes = SHOES_DATA.filter((shoe) => {
  const matchSearch = shoe.name.toLowerCase().includes(search.toLowerCase());
  const matchBrand = selectedBrand === 'ALL' || shoe.brand === selectedBrand;
  return matchSearch && matchBrand;
});
```

`filteredShoes` **bukan** state tersendiri — ia dihitung ulang otomatis setiap kali `App.jsx` di-render, sehingga selalu sinkron tanpa perlu `useState` tambahan.

### Fungsi Handler (Event Callback)

- `onSearchChange={(value) => setSearch(value)}` — dikirim ke `FormInput`, dipanggil saat `onChange` pada `<input>` terpicu (`e.target.value`).
- `onBrandChange={(brand) => setSelectedBrand(brand)}` — dikirim ke `FormInput`, dipanggil saat salah satu tombol pill brand diklik.
- Di dalam `FormInput.jsx`, kedua handler ini dibungkus arrow function saat dipasang ke elemen (`onClick={() => onBrandChange(b)}`) agar **tidak dieksekusi langsung saat render** (menghindari infinite re-render).

### Aturan Imutabilitas Props

`ProductCard` menerima `name`, `brand`, `price`, `isNew` sebagai props read-only — tidak ada baris kode di dalamnya yang mengubah nilai props tersebut secara langsung. Semua perubahan data (search/filter) hanya terjadi lewat `setSearch` dan `setSelectedBrand` di Parent.

---

## 3. Log Prompt AI

Berikut rekaman proses diskusi dengan Claude (Anthropic) dalam membangun proyek ini, disusun per tahap agar terlihat alur pemahaman dari awal hingga akhir — bukan sekadar satu kali perintah jadi.

### 3.1 Tahap Pemahaman Materi

Diawali dengan mengunggah file slide Pertemuan 3 dan meminta penjelasan isinya, untuk memastikan saya paham dulu konsep `useState`, event handling, dan component modularization sebelum masuk ke praktik.

- Prompt: *"Summarize this attached file"* — meminta ringkasan isi slide (State, Event Handling, Props, Component Modularization) sebagai dasar sebelum menentukan proyek.
- Prompt: (memilih opsi) *"2 dan 4"* — menindaklanjuti dengan meminta rincian syarat tugas take-home (Slide 23) dan sekaligus meminta dibuatkan proyeknya, setelah memahami apa saja yang wajib ada (minimal 3 komponen modular, state di parent, props + event callback, dan laporan README.md).

### 3.2 Tahap Perencanaan & Penentuan Tema

Sebelum kode ditulis, didiskusikan dulu tema mana yang paling representatif untuk konsep di slide (Spotify Playlist / Sneaker Store / Game Catalog), lalu dicocokkan dengan contoh live code di slide 11–12 yang sudah punya kerangka search + filter.

- Prompt: *"yang kamu sarankan saja tapi tetap sesuai yang di minta docs"* — menyetujui usulan tema Sneaker Store dengan syarat strukturnya tetap mengikuti ketentuan resmi di slide (folder `src/components/`, state di `App.jsx`, props + event callback), bukan asal ambil saran AI tanpa verifikasi ke dokumen tugas.

### 3.3 Tahap Eksekusi & Debugging

Setelah proyek diterima, saya mencoba menjalankannya sendiri di komputer lokal (Windows) dan menemukan dua error saat proses instalasi — keduanya didiskusikan satu per satu untuk dipahami akar masalahnya, bukan hanya menyalin solusi.

- Prompt (melaporkan error): *"npm : File ...npm.ps1 cannot be loaded because running scripts is disabled on this system"* — mendiskusikan penyebab (kebijakan Execution Policy PowerShell di Windows) dan dua opsi solusinya (pakai Command Prompt, atau mengubah ExecutionPolicy).
- Prompt (melaporkan error lanjutan): *"npm error ENOENT ... Could not read package.json"* setelah menjalankan `Set-ExecutionPolicy` — mendiskusikan penyebab (struktur folder hasil ekstrak ZIP menjadi bersarang / nested folder) dan cara memverifikasinya dengan perintah `dir` sebelum pindah folder yang benar.
- Prompt: *"kira kira udah semua aman ni?"* — meminta cara memverifikasi proyek berjalan dengan benar (ciri-ciri output `npm run dev` yang sukses dan tampilan yang seharusnya muncul di browser).

### 3.4 Tahap Pelaporan

Tahap terakhir berfokus pada penyusunan laporan Code Defense itu sendiri, termasuk mendiskusikan kelengkapan strukturnya sebelum dibuat.

- Prompt: *"sekarang saya butuh buat laporan nya kira kira ada tidak daftar isinya?"* — mengevaluasi dulu apakah draf sebelumnya sudah memenuhi format laporan formal (cover, daftar isi) sebelum meminta dibuatkan versi resminya.

---

## 4. Cara Menjalankan

```bash
npm install
npm run dev
```
