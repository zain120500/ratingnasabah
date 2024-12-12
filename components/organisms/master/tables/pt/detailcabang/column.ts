import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "NAMA CABANG", value: "name", sortable: true, fixed: true, width: 130 },
    { text: "TELEPON", value: "phone" },
    { text: "ALAMAT", value: "address" },
    { text: "STATUS", value: "is_active" }
];

export default headers;