import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import { setupServer } from "msw";

describe("Login", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<LoginForm submitFunc={onSubmit} />);
  });

  it("should render title and button and 2 input fields", async () => {
    //screen.debug();
    const heading = screen.getByRole("heading", { name: /Explore/i });
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const username = screen.queryByPlaceholderText(/username/i); //becos it will fail
    const link = screen.getByRole("link", {
      name: /sign up/i,
    });
    expect(heading).toBeInTheDocument(); //pass
    expect(email).toBeInTheDocument(); //pass
    expect(password).toBeInTheDocument();
    expect(username).not.toBeInTheDocument();
    // expect(link).toBeInTheDocument(); //pass

    user.type(email, "test@test333.com");
    user.type(password, "123456789");
    const button = screen.getByRole("button", { name: /Login/i });

    expect(button).toBeInTheDocument();
    user.click(button);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "",
        password: "",
      });
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);

    /*
    
    const loggedInPage = await screen.findByRole("heading", {
      name: /authorize user homepage/i,
    });
    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    expect(loggedInPage).toBeInTheDocument();

    expect(signOutButton).toBeInTheDocument(); */
  });

  /* describe("onSubmit", () => {
    it("submttin", async () => {
      const onSubmit = jest.fn();

      render(<LoginForm submitFunc={onSubmit} />);

      const button = screen.getByRole("button", { name: /login/i });
      expect(button).toBeInTheDocument();

      //expect(button).toHaveAttribute("disabled");

      user.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
   */
});
