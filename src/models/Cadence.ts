interface Step {
  id: number;
  type: 'email' | 'call';
  title: string;
  content: string;
  delayDays: number;
}

export interface Cadence {
  id: number;
  name: string;
  steps: Step[];
  active: number;
  completed: number;
  createdAt: Date;
  updatedAt: Date;
} 