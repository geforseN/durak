import globalChatConfig from "../global-chat.config";

const maxLength = globalChatConfig.inputValueLength.max;

// FIXME: i18n
export default function assertInputLength(input: string): void | never {
  if (!input) throw new Error("Нельзя прислать пустое сообщение");
  if (input.length > maxLength)
    throw new Error("Длинна сообщения превышает 128");
}