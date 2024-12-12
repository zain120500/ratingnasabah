import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "TANGGAL", value: "date", width: 120, fixed: true },
    { text: "CABANG", value: "branch.name" },
    { text: "TIPE", value: "income_type.name" },
    { text: "FAKTUR", value: "no_faktur" },
    { text: "KWITANSI", value: "no_kwitansi" },
    { text: "NOMINAL", value: "total_amount" },
    { text: "NASABAH", value: "nasabah", width: 200 },
    { text: "DETAIL", value: "detail", width: 100, }
];

export default headers;