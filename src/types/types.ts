export interface Joke {
  id: number;
  joke: string;
  rate: number;
}

export interface JokeProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  updateJoke: (joke: Joke) => void;
  deleteJoke: (id: number) => void;
}