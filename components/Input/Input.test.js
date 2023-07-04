import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

test("renders a label and an input with the correct attributes", () => {
  const mockFunction = jest.fn();
  render(
    <Input
      labelText="Name of Game"
      name="game-name"
      placeholder="e. g. Monopoly"
      value="Dominion"
      onChange={mockFunction}
    />
  );

  const input = screen.getByLabelText("Name of Game");

  expect(input).toHaveAttribute("placeholder", "e. g. Monopoly");
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveAttribute("value", "Dominion");
});

test("calls callback on every user input", async () => {
  const mockFunction = jest.fn();
  const user = userEvent.setup();

  render(
    <Input
      labelText="Name of Game"
      name="game-name"
      placeholder="e. g. Monopoly"
      value="Dominion"
      onChange={mockFunction}
    />
  );

  const input = screen.getByLabelText("Name of Game");

  await user.type(input, "abcde");

  //expect(mockFunction).toHaveBeenCalled();
  expect(mockFunction).toHaveBeenCalledTimes(5);
});
