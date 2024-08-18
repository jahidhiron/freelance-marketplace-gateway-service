import axios from 'axios';
import { sign } from 'jsonwebtoken';
import { config } from '@gateway/config';

export class AxiosService {
  // ReturnType is a TypeScript utility type that extracts the return type of a function
  // if we wish then we can use -> public axios: AxiosInstance;

  // axios.create() returns an object with the same methods and properties
  // defined in AxiosInstance, so ReturnType<typeof axios.create>
  // effectively resolves to AxiosInstance.

  // The typeof axios.create returns the type of the function axios.create.
  // In TypeScript, typeof is used to refer to the type of a variable or
  // function, and here it refers to the signature of the axios.create method.

  // The return type of axios.create() is an object that represents an Axios instance,
  // which has a specific type called AxiosInstance.
  public axios: ReturnType<typeof axios.create>;

  constructor(baseUrl: string, serviceName: string) {
    this.axios = this.axiosCreateInstance(baseUrl, serviceName);
  }

  public axiosCreateInstance(baseUrl: string, serviceName?: string): ReturnType<typeof axios.create> {
    let requestGatewayToken = '';
    if (serviceName) {
      requestGatewayToken = sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
    }

    const instance: ReturnType<typeof axios.create> = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gatewayToken: requestGatewayToken
      },

      // The withCredentials: true option in Axios is used to indicate whether or
      // not cross-site Access-Control requests should be made using credentials,
      // such as cookies, authorization headers, or TLS client certificates.

      withCredentials: true
    });

    return instance;
  }
}
