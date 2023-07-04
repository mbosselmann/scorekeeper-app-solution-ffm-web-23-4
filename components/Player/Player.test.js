import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Player from ".";

test("renders player information and two buttons", () => {
  render(<Player name="Jan" score={5} />);

  const player = screen.getByText("Jan");
  expect(player).toBeInTheDocument();

  const score = screen.getByText(5);
  expect(score).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
});

test("calls callbacks when increasing or decreasing score", async () => {
  const user = userEvent.setup();

  const decrease = jest.fn();
  const increase = jest.fn();

  render(
    <Player
      name="Jan"
      score={5}
      onDecreasePlayerScore={decrease}
      onIncreasePlayerScore={increase}
    />
  );

  const increaseButton = screen.getByRole("button", { name: "Increase Score" });
  const decreaseButton = screen.getByRole("button", { name: "Decrease Score" });

  await user.click(increaseButton);
  await user.click(increaseButton);
  await user.click(decreaseButton);

  expect(increase).toHaveBeenCalledTimes(2);
  expect(decrease).toHaveBeenCalledTimes(1);
});
