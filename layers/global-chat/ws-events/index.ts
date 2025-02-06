import { CustomWebsocketEvent } from "@/utils/api/websocket";
import assertInputLength from "@/utils/assert-input-length";
import type { Ref } from "vue";

export class ChatMessage extends CustomWebsocketEvent {
  text: string;
  replyMessageId?: string;

  constructor(input: Ref<string>) {
    assertInputLength(input.value);
    super("message::send");
    this.text = input.value;
    this.replyMessageId = undefined;
  }
}
