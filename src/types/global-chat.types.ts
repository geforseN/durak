export type Message = {
  type: "text" | "photo";
  text?: string;
  photo?: any;

  time: string | Date;
  sender: string;
  senderId: string;
};

export type Day = {
  value: string | Date;
  messages: Message[];
};
