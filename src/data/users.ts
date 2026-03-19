export interface User {
  username: string
}

export interface Users {
  standard: User;
  lockedOut: User;
  problem: User;
  performanceGlitch: User;
  error: User;
  visual: User;
  invalid: User;
}

export const USERS: Users = {
  standard: {
    username: 'standard_user'
  },
  lockedOut: {
    username: 'locked_out_user'
  },
  problem: {
    username: 'problem_user'
  },
  performanceGlitch: {
    username: 'performance_glitch_user'
  },
  error: {
    username: 'error_user'
  },
  visual: {
    username: 'visual_user'
  },
  invalid: {
    username: ''
  }
}
