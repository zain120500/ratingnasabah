import * as yup from 'yup';
const requiredText = `Input tidak boleh kosong`

const expenseTypeSchema = yup.object({
    name: yup.string().required(requiredText)
});
const pllSchema = yup.object({
    name: yup.string().required(requiredText)
});
const coaSchema = yup.object({
    company_id: yup.string().required(requiredText),
    name: yup.string().required(requiredText),
    amount: yup.string().required(requiredText),
});
const coaEditSchema = yup.object({
    name: yup.string().required(requiredText),
});



export {
    expenseTypeSchema,
    pllSchema,
    coaSchema,
    coaEditSchema
}
