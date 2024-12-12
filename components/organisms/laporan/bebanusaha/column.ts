import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "TANGGAL", value: "date", width: 120, fixed: true },
    { text: "CABANG", value: "branch.name" },
    { text: "TIPE BEBAN USAHA", value: "expence_type.name" },
    { text: "PEMBAYARAN UNTUK", value: "paid_to" },
    { text: "CATATAN", value: "notes" },
    { text: "JUMLAH", value: "amount" },
    { text: "DIBUAT", value: "created", width: 150, }
];

export default headers;