/** Interface representing the structure of a message object. */
export interface IMessage {
  id?: string;
  name: string;
  message: string;
  CreatedAt: Date;
}