import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../components";
import { useAuth } from "../../../index";
import { guestUserLoginDetails, logoImageURL } from "../../../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../../utils/icons";

const Login = () => {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    showPwd: false,
  });

  document.title = "Login | BuzzBird";

  const loginFormInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const loginFormSubmitHandler = (event) => {
    event.preventDefault();
    loginHandler(loginDetails);
  };
  return (
    <div className="md:w-1/2 px-16 pb-4">
      <div className="flex items-center justify-center max-w-[20rem] mx-auto">
        <img
          src={logoImageURL}
          alt="logo-img"
          className="w-full object-cover"
        />
      </div>
      <h2 className="font-bold text-2xl text-center">Login</h2>
      <p className="text-sm my-4 text-center">
        Please use 1234 as our default password to login. Unlock the Buzz, Spread your Wings! 
      </p>

      <form className="flex flex-col gap-4" onSubmit={loginFormSubmitHandler}>
        <input
          className="p-[0.35rem] mt-4 rounded-md border"
          type="text"
          name="username"
          value={loginDetails.username}
          placeholder="Username"
          onChange={loginFormInputHandler}
          required
        />
        <div className="relative">
          <input
            className="p-[0.35rem] rounded-md border w-full"
            type={loginDetails.showPwd ? "text" : "password"}
            name="password"
            value={loginDetails.password}
            placeholder="Password"
            onChange={loginFormInputHandler}
            required
          />
          {!loginDetails.showPwd ? (
            <AiOutlineEyeInvisible
              className="absolute top-[0.7rem] right-3 cursor-pointer"
              onClick={() =>
                setLoginDetails({
                  ...loginDetails,
                  showPwd: !loginDetails.showPwd,
                })
              }
            />
          ) : (
            <AiOutlineEye
              className="absolute top-[0.7rem] right-3 cursor-pointer"
              onClick={() =>
                setLoginDetails({
                  ...loginDetails,
                  showPwd: !loginDetails.showPwd,
                })
              }
            />
          )}
        </div>
        <PrimaryButton type="submit" className="py-2 rounded-md">
          Login
        </PrimaryButton>
      </form>
      <p className="my-[1rem] text-sm">
        New to BuzzBird? After sign up reserve your BuzzBird slot to be able to access your BuzzBird account {" "}
        <span
          className="font-bold text-darkPrimary hover:underline hover:cursor-pointer"
          onClick={() => navigate("/auth/signup")}
        >
          SignUp
        </span>
      </p>
      <form action="https://share.paybiz.ph/items/LXl9Qt4sxrHpiFDSh4YiRJ">
         <button type="submit"> ➠R̲e̲s̲e̲r̲v̲e̲ ̲y̲o̲u̲r̲ ̲s̲l̲o̲t̲ ̲n̲o̲w̲!̲ ̲C̲l̲i̲c̲k̲ ̲h̲e̲r̲e̲</button>
      </form>
      <form action="https://jstrieb.github.io/link-lock/#eyJ2IjoiMC4wLjEiLCJlIjoiWEpwQWQwbXhETHpPZExOelhzMSt5SDZ5RXZrU3g5RGFlZis2djZ6U0x0M3JoTmJiY1EzUm1tTHpwOXRVSDBjdWhRPT0iLCJoIjoicGxlYXNlIHVzZSBhIHBhc3N3b3JkIGNvZGUg8J+RiSAgMTIzNCIsInMiOiJINmVBQzc1MTRyRUhLY3ZCSXAxaHZnPT0iLCJpIjoiaENVZGtMdlhPOTZOSk5iUiJ9">
         <button type="submit"> ➠H̲O̲W̲ ̲T̲O̲ ̲E̲A̲R̲N̲! W̲A̲T̲C̲H̲ ̲N̲O̲W̲</button>
      </form>
    </div>
  );
};

export { Login };
