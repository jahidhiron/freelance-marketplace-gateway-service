import { Health } from '@gateway/controllers/health';
import express, { Router } from 'express';

class HealthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // to learn more about please visit notes/8-express/2-controller/1-Health.prototype.health.txt
    this.router.get('/gateway-health', Health.prototype.health);
    return this.router;
  }
}

export const healthRoutes = new HealthRoutes();
