import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "KODE", value: "code", sortable: true, fixed: true, width: 30 },
    { text: "NAMA", value: "name" },
    { text: "PROVINSI", value: "province_id.name" },
    { text: "AKSI", value: "aksi" },
];
export default headers;