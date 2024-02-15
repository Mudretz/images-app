import * as yup from "yup";
import { TEXT_MESSAGES } from "./textMessages";

export const authSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email(TEXT_MESSAGES.email)
        .required(TEXT_MESSAGES.required),
    password: yup.string().trim().required(TEXT_MESSAGES.required),
});

export type FormValuesAuth = yup.InferType<typeof authSchema>;
