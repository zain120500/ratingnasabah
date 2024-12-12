import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "TANGGAL", value: "date", width: 120, fixed: true },
    { text: "NO. FAKTUR", value: "faktur" },
    { text: "CABANG", value: "branch.name" },
    { text: "NASABAH", value: "nasabah" },
    { text: "JUMLAH", value: "amount" }
];

export default headers;