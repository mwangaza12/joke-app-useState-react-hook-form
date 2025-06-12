import { useState } from 'react';
import './App.css'
import { JokeComponent } from './components/JokeComponent';
import type { Joke } from './types/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

type FormInput = {
  joke: string,
}


const FormInputSchema = yup.object({
  joke: yup.string().required('Joke is required').min(4,"Minimum of 4 characters is required"),
});


function App() {
  const InitialJokes = [
    {
      id: 1,
      joke: 'What do you call a very small valentine? A valen-tiny!!!',
      rate: 0
    },
    {
      id: 2,
      joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!',
      rate: 5
    },
    {
      id: 3,
      joke: "Why don't sharks like to eat clowns? Because they taste funny!!!",
      rate: 10
    }
  ];
  const { register, formState: { errors }, handleSubmit, reset } = useForm<FormInput>({
    resolver: yupResolver(FormInputSchema),
  });


  const [jokes, setJokes] = useState<Joke[]>(InitialJokes);


  const increaseRates = (id: number) => {
    setJokes(jokes.map(j => j.id === id ? { ...j, rate: j.rate + 1 } : j));
  };

  const decreaseRates = (id: number) => {
    setJokes(jokes.map(j => j.id === id ? { ...j, rate: j.rate - 1 } : j));
  };

  const updateJoke = (updatedJoke: Joke) => {
    setJokes(jokes.map(j => j.id === updatedJoke.id ? updatedJoke : j));
  };

  const deleteJoke = (id: number) => {
    setJokes(jokes.filter(j => j.id !== id));
  };

  const onSubmit = (data: FormInput) => {
  setJokes([
    ...jokes,
    { id: Date.now(), joke: data.joke, rate: 0 }
  ]);
    reset();
  };


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("joke")}
        style={{ padding: "10px" }}
        placeholder="Enter a new joke"
      />
      {errors.joke && <p style={{ color: 'red' }}>{errors.joke.message}</p>}
      <button type="submit">Add Joke</button>
    </form>

      {jokes.map((j) => (
        <JokeComponent
          key={j.id}
          joke={j}
          increaseRates={increaseRates}
          decreaseRates={decreaseRates}
          updateJoke={updateJoke}
          deleteJoke={deleteJoke}
        />
      ))}
    </>
  );
}

export default App;
