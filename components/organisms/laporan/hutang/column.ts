import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "TANGGAL", value: "date", width: 100, fixed: true },
    { text: "AKUN", value: "account" },
    { text: "JUMLAH", value: "amount" },
    { text: "CATATAN", value: "notes" },
    { text: "EKSEKUTOR", value: "created_by" },
    { text: "TGL. DIBUAT", value: "created_at" },
];

export default headers;