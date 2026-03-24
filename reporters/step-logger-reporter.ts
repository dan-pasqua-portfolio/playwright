import type { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

export default class StepLoggerReporter implements Reporter {
  onStepBegin(
    test: TestCase,
    result: TestResult,
    step: TestStep
  ): void {
    if (step.category === 'test.step') {
      const depth = this.getDepth(step);
      const indent = '  '.repeat(depth);

      console.log(`${indent}${step.title}`);
    }
  }

  onStepEnd(
    test:   TestCase,
    result: TestResult,
    step:   TestStep,
  ): void {
    if (step.category === 'test.step' && step.error) {
      const depth  = this.getDepth(step);
      const indent = '  '.repeat(depth);

      console.error(`${indent}FAILED: ${step.title}`);
      console.error(`${indent}${step.error.message}`);
    }
  }
  
  private getDepth(step: TestStep): number {
    let depth = 0;
    let parent = step.parent;

    while (parent) {
      if (parent.category === 'test.step') depth++;
      parent = parent.parent;
    }
    
    return depth;
  }
}
