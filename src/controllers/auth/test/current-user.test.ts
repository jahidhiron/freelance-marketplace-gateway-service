import { Request } from 'express';
import { authMock, authMockRequest, authMockResponse, authUserPayload } from '@gateway/controllers/auth/test/mocks/auth.mock';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { CurrentUser } from '@gateway/controllers/auth/current-user';

jest.mock('@jahidhiron/jobber-shared');
jest.mock('@gateway/services/api/auth.service');
jest.mock('@gateway/server');
jest.mock('@elastic/elasticsearch');

const USERNAME = 'Manny';
const PASSWORD = 'manny1';

describe('CurrentUser', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('read method', () => {
    it('should return authenticated user', async () => {
      const req = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload) as Request;
      const res = authMockResponse();
      jest
        .spyOn(authService, 'getCurrentUser')
        .mockResolvedValue({ data: { message: 'Current user data', user: authMock } } as AxiosResponse);

      await CurrentUser.prototype.read(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Current user data',
        user: authMock
      });
    });
  });

  describe('resendEmail method', () => {
    it('should return correct response', async () => {
      const req = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload) as Request;
      const res = authMockResponse();
      jest
        .spyOn(authService, 'resendEmail')
        .mockResolvedValue({ data: { message: 'Email sent successfully.', user: authMock } } as AxiosResponse);

      await CurrentUser.prototype.resendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email sent successfully.',
        user: authMock
      });
    });
  });
});
