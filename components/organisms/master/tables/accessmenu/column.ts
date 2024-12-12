import type { Header } from "vue3-easy-data-table";
import { useRoleStore } from "@/stores/role";
// const role = useRoleStore()
// role.getRoles()

// const roleHeader = role.roleOptions.map((item: any): any => {
//     return {
//         text: item.name,
//         value: item.id,
//     }
// })

// console.log(roleHeader, "roleHeader")
const headers: Header[] = [
    { text: "NAMA", value: "name", fixed: true, width: 40 },
    { text: "NAMA CABANG", value: "cabang" },
    { text: "AKSI", value: "aksi" },
];

export default headers;