import { Injectable, inject } from '@angular/core';
import { from, map } from 'rxjs';
import { Firestore, addDoc, collection, query, orderBy, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Timestamp } from "@angular/fire/firestore";

import { IMessage } from "../interfaces/message.interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /** Instance of Firestore to interact with the Firestore database. */
  private firestore: Firestore = inject(Firestore);

  /** 
   * Reference to the 'messages' collection in Firestore.
   * This collection reference is used to perform CRUD operations on the 'messages' collection.
   */
  private messageCollection = collection(this.firestore, 'messages');

  constructor() {}

  /**
   * Adds a new message to Firestore.
   * This method takes an IMessage object, extracts its data, and adds it to the 'messages' collection in Firestore.
   * 
   * @param message The message object to be added.
   * 
   * @returns An Observable representing the add operation.
   */
  addMessage(message: IMessage) {
    const { id, ...messageData } = message;
    return from(addDoc(collection(this.firestore, 'messages'), messageData));
  }

  /**
   * Retrieves messages from Firestore, ordered by date in descending order.
   * 
   * @returns An Observable array of IMessage objects.
   */
  getMessages() {
    const messagesQuery = query(this.messageCollection, orderBy('date', 'desc'));
    return from(getDocs(messagesQuery)).pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(docSnapshot => {
          const data = docSnapshot.data() as IMessage;
          if (data.createdAt instanceof Timestamp) {
            const date = data.createdAt.toDate();
            return { ...data, id: docSnapshot.id, date };
          }
          return { ...data, id: docSnapshot.id };
        });
      })
    );
  }

  /**
   * Deletes a message from Firestore.
   * This method takes a message ID and deletes the corresponding document from the 'messages' collection.
   * 
   * @param messageId The ID of the message to be deleted.
   * 
   * @returns An Observable representing the delete operation.
   */
  deleteMessage(messageId: string) {
    const messageRef = doc(this.firestore, `messages/${messageId}`);
    return from(deleteDoc(messageRef));
  }
  
}
