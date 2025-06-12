import { useState } from "react";
import type { JokeProps } from "../types/types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type EditFormInput = {
  editedJoke: string;
};

const schema = yup.object({
  editedJoke: yup.string().min(4, "Joke must be at least 4 characters").required("Joke is required"),
});

export const JokeComponent = ({ joke, increaseRates, decreaseRates, updateJoke, deleteJoke }: JokeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      editedJoke: joke.joke,
    },
  });

  const onSubmit = (data: EditFormInput) => {
    updateJoke({ ...joke, joke: data.editedJoke });
    setIsEditing(false);
    reset();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            style={{ padding: "10px" }}
            type="text"
            {...register("editedJoke")}
          />
          {errors.editedJoke && (
            <p style={{ color: "red" }}>{errors.editedJoke.message}</p>
          )}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{joke.joke}</h3>
          <p>Likes: {joke.rate}</p>
          <button onClick={() => increaseRates(joke.id)}>👍</button>
          <button onClick={() => decreaseRates(joke.id)}>👎</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteJoke(joke.id)}>Delete</button>
        </>
      )}
    </div>
  );
};
