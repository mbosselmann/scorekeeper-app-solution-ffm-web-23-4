import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameForm from "./index";

jest.mock("next/router", () => ({
  useRouter() {
    return { push: jest.fn() };
  },
}));

test("renders two input fields and a button", () => {
  render(<GameForm />);

  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(2);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("renders a form with the accessible name 'Create a new game'", () => {
  render(<GameForm />);

  const form = screen.getByRole("form", { name: "Create a new game" });
  expect(form).toHaveAccessibleName();
});

test("submits the correct form data when every field is filled out", async () => {
  const createGame = jest.fn();
  const user = userEvent.setup();

  render(<GameForm onCreateGame={createGame} />);

  const nameOfGame = screen.getByLabelText("Name of game");
  const playerNames = screen.getByRole("textbox", { name: /player names/i });

  const button = screen.getByRole("button");

  await user.type(nameOfGame, "Monopoly");
  await user.type(playerNames, "Jan, Andrea, Mareike");

  await user.click(button);

  expect(createGame).toHaveBeenCalledWith({
    nameOfGame: "Monopoly",
    playerNames: ["Jan", "Andrea", "Mareike"],
  });
});

test("does not submit form if one input field is left empty", async () => {
  const createGame = jest.fn();
  const user = userEvent.setup();

  render(<GameForm onCreateGame={createGame} />);

  const nameOfGame = screen.getByRole("textbox", { name: "Name of game" });
  const button = screen.getByRole("button");

  await user.type(nameOfGame, "Monopoly");

  await user.click(button);

  expect(createGame).not.toHaveBeenCalled();
});
