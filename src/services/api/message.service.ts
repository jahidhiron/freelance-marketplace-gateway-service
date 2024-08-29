import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
import { IMessageDocument } from '@jahidhiron/jobber-shared';

export let axiosMessageInstance: ReturnType<typeof axios.create>;

class MessageService {
  constructor() {
    const axiosService = new AxiosService(`${config.MESSAGE_BASE_URL}/api/v1/message`, 'message');
    axiosMessageInstance = axiosService.axios;
  }

  async getConversation(senderUsername: string, receiverUsername: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.get(`/conversation/${senderUsername}/${receiverUsername}`);
    return response;
  }

  async getMessages(senderUsername: string, receiverUsername: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.get(`/${senderUsername}/${receiverUsername}`);
    return response;
  }

  async getConversationList(username: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.get(`/conversations/${username}`);
    return response;
  }

  async getUserMessages(conversationId: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.get(`/${conversationId}`);
    return response;
  }

  async addMessage(body: IMessageDocument): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.post('/', body);
    return response;
  }

  async updateOffer(messageId: string, type: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.put('/offer', { messageId, type });
    return response;
  }

  async markMessageAsRead(messageId: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.put('/mark-as-read', { messageId });
    return response;
  }

  async markMultipleMessagesAsRead(receiverUsername: string, senderUsername: string, messageId: string): Promise<AxiosResponse> {
    const response = await axiosMessageInstance.put('/mark-multiple-as-read', {
      receiverUsername,
      senderUsername,
      messageId
    });
    return response;
  }
}

export const messageService = new MessageService();
