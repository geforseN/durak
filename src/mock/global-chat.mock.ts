import type {Day} from "@/types/global-chat.types";

export const mockChat: Day[] = [
  {
    value: "26 ноября",
    messages: [
      {
        type: "text",
        text: "GghbПрив",
        time: "12:12:45",
        sender: "P1",
        senderId: "1",
      },
      {
        type: "text",
        text: "a",
        time: "12:12:45",
        sender: "P1",
        senderId: "1",
      },
      {
        type: "text",
        text: "б",
        time: "12:13:02",
        sender: "P2",
        senderId: "2",
      }
    ]
  },
  {
    value: "27 ноября",
    messages: [
      {
        type: "text",
        text: "Ночь...",
        time: "0:0:45",
        sender: "P1",
        senderId: "1",
      },
      {
        type: "text",
        text: "Да...",
        time: "0:1:02",
        sender: "P2",
        senderId: "2",
      }
    ]
  }
]


