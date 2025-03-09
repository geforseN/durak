import { pipe, string, uuid } from "valibot";

const UuidSchema = pipe(string(), uuid());

export default UuidSchema;
