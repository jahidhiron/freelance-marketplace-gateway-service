import express from 'express';
import { GatewayServer } from '@gateway/server';

class Application {
  public initialize(): void {
    const app = express();
    const server: GatewayServer = new GatewayServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
