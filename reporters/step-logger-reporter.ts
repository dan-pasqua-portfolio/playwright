import type { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

export default class StepLoggerReporter implements Reporter {
  onStepBegin(
    test: TestCase,
    result: TestResult,
    step: TestStep
  )
  {
    if (step.category === 'test.step') {
      const depth = this.getDepth(step);
      console.log(`${'  '.repeat(depth)}STEP: ${step.title}`);
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
