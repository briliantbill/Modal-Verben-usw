# Deutsch A1 Grammar

Website pembelajaran grammar Bahasa Jerman A1 untuk murid Indonesia.

## Cara pakai

1. Buka folder `deutsch-a1`.
2. Klik dua kali `index.html`.
3. Website langsung berjalan di browser tanpa instalasi, tanpa framework, dan tanpa build step.

## Struktur file

- `index.html`: halaman utama dan navigasi 4 topik.
- `css/style.css`: semua styling.
- `js/main.js`: navigasi tab dan logika umum.
- `js/quiz.js`: engine latihan, feedback, skor, dan tombol ulangi.
- `js/data.js`: semua data soal latihan.

## Cara menambah soal

Buka `js/data.js`, lalu tambahkan objek soal baru ke array `questions`.

Contoh:

```js
{
  type: "choice",
  prompt: "Ich komme ___ drei Uhr.",
  options: ["am", "um", "von ... bis"],
  answer: "um",
  explanation: "Tiga Uhr adalah jam, jadi memakai um."
}
```

Gunakan `___` di dalam `prompt` untuk bagian kosong yang akan ditampilkan sebagai garis jawaban.

Contoh soal isian:

```js
{
  type: "fill",
  prompt: "Das ist ___ Vater. (ich)",
  answer: "mein",
  explanation: "Vater maskulin dalam Nominativ, jadi mein Vater."
}
```

Contoh soal susun kata:

```js
{
  type: "order",
  prompt: "Susun menjadi kalimat benar.",
  words: ["gehen", "ins Kino", "können", "Wir"],
  answer: ["Wir", "können", "ins Kino", "gehen"],
  explanation: "Modalverb können di posisi 2, infinitiv gehen di akhir."
}
```

## Status materi

- Topik 1: Zeitangaben, selesai.
- Topik 2: Possessivartikel, selesai.
- Topik 3: Modalverben, selesai.
- Topik 4: Satzklammer, selesai.
