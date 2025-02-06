import { pipe, string, email } from "valibot";

const EmailSchema = pipe(string(), email());

export default EmailSchema;
