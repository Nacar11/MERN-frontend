export interface Workout {
    _id: string;
    title: string;
    reps: number;
    load: number;
    createdAt: string;
    updatedAt?: string;
  }

export interface User {
    id: string
    email: string
    name: string
    token: string
  }