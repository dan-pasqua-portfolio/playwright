import { test } from '@playwright/test';

export class StepLogger {
  private stepNumber: number = 0;

  async step(description: string, action: () => Promise<void>): Promise<void> {
    this.stepNumber++;
    await test.step(`STEP ${this.stepNumber}: ${description}`, action);
  }

  reset(): void {
    this.stepNumber = 0;
  }
}
