// hooks/useGoalsStore.ts
import { create } from "zustand";
// podemos usar uuid, mas aqui vou usar Date.now() + um contador simples
let idCounter = 0;

interface Goal {
  id: string;  // adicionado
  text: string;
}

interface GoalsStoreState {
  positive: number;
  negative: number;
  score: number;
  goals: Goal[];
  addGoal: (goalText: string) => void;
  removeGoal: (id: string) => void;       // agora remove por ID
  addPositive: () => void;
  addNegative: () => void;
}

const useGoalsStore = create<GoalsStoreState>((set) => ({
  positive: 0,
  negative: 0,
  score: 0,
  goals: [],
  addGoal: (goalText: string) =>
    set((state) => {
      idCounter++;
      const newGoal: Goal = {
        id: String(Date.now()) + "-" + idCounter, 
        text: goalText
      };
      return { goals: [...state.goals, newGoal] };
    }),
  removeGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),
    addPositive: () => set((state) => ({
      positive: state.positive + 1,
      score: state.score + 1
    })),
    addNegative: () => set((state) => ({
      negative: state.negative + 1,
      score: state.score - 1
    })),
}));

export default useGoalsStore;
