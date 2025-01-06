export default function assertInputLength(input: string): void | never {
  if (!input) throw new Error("Нельзя прислать пустое сообщение");
  if (input.length > 128) throw new Error("Длинна сообщения превышает 128");
}

// TODO: move to chat related
// TODO: do not use hardcoded values 