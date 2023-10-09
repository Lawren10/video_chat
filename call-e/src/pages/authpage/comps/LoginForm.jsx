import { BiLogoGmail } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <section className="login-form-box">
        <div className="flex  w-full items-center justify-center">
          <img src="/assets/logo.png" alt="" className="w-10 mb-8" />
          <h1 className="text-5xl font-black text-white ">Call-e</h1>
        </div>
        <p className="text-xl font-bold text-center text-white">
          Welcome to Call-e where everyone meets..
        </p>

        <div className="mt-10">
          <div className="flex flex-col items-center justify-center ">
            <div className="w-8/12">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <div className="relative w-full">
                <i className="absolute inset-y-1/4 right-2 text-xl text-white ">
                  <BiLogoGmail />
                </i>
                <input
                  type="text"
                  name="email"
                  className=" rounded p-3 input-bg w-full"
                />
              </div>
            </div>
            <div className="mt-4 w-8/12">
              <label htmlFor="email" className="text-white">
                Password
              </label>
              <div className="relative w-full">
                <i className="absolute inset-y-1/4 right-2 text-xl text-white">
                  <MdPassword />
                </i>
                <input
                  type="password"
                  name="password"
                  className=" rounded p-3 input-bg w-full "
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full my-8">
            <Link to={"/home"} className="primaryBtn w-5/12 py-4">
              login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
