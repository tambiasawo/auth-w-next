import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw";
import * as nextRouter from 'next/router'
import { createMockRouter } from "../test-utils/createMockRouter";
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe("Login", () => {
  const onSubmit = jest.fn();
  const user = userEvent.setup()
  nextRouter.useRouter=jest.fn()
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

    await user.type(email, "test@test.com");
    await user.type(password, "123456789");
    const button = screen.getByRole("button", { name: /Login/i });
    expect(email.value).toBe("test@test.com")
    expect(button).toBeInTheDocument();
    //nextRouter.useRouter.mockImplementation(()=>({route:'/'}))
    const router = createMockRouter({pathname: '/'})
    render(<RouterContext.Provider value={router}><LoginForm submitFunc={onSubmit} /></RouterContext.Provider>);
    user.click(button,{skipHover: true});

    expect(router.push).toHaveBeenCalledWith('/')
  });

  it("onSubmit button click", () => {
    
    });
  });
  


/* 
describe('ResultsProductPage', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  it('renders - display mode list', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { product: 'coffee' },
    }))
    const { container } = render(
      <ResultsProductPage items={[{ name: 'mocha' }]} />
    )
    expect(container).toMatchSnapshot()
  })
}) */