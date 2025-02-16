import axios from "axios";
import {Notification} from "../components/chat/types.ts";


const API_URL = "https://1103.api.green-api.com"
class RESTAPI {
  constructor(idInstance: string, apiTokenInstance: string) {
    this.instanceId = idInstance
    this.apiToken = apiTokenInstance
  }

  private instanceId;
  private apiToken;

  async sendMessage(chatId: string, message: string): Promise<{ idMessage: string }> {
    const response = await axios.post(`${API_URL}/waInstance${this.instanceId}/sendMessage/${this.apiToken}`, { chatId: chatId, message } )
    return response.data
  }

  async receiveNotification() {
    const response = await axios.get(`${API_URL}/waInstance${this.instanceId}/receiveNotification/${this.apiToken}`);
    return response.data;
  }

  async deleteNotification(receiptId?: number): Promise<Notification> {
    const response = await axios.delete(`${API_URL}/waInstance${this.instanceId}/deleteNotification/${this.apiToken}/${receiptId}`);
    return response.data;
  }
}

export default RESTAPI;