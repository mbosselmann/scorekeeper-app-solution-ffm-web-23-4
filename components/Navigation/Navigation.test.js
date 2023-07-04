import { render, screen } from "@testing-library/react";
import Navigation from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return { pathname: jest.fn() };
  },
}));

test("renders with two links 'Play' and 'History'", () => {
  render(<Navigation />);

  const playLink = screen.getByRole("link", { name: /play/i });

  expect(playLink).toBeInTheDocument();

  const historyLink = screen.getByRole("link", { name: /history/i });

  expect(historyLink).toBeInTheDocument();
});
