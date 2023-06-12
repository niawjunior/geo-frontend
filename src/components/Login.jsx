import classNames from "classnames";

import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-800 w-full">
        <div className="text-center font-bold text-3xl mb-5 text-white">
          LOGIN
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex-col w-1/3 bg-gray-600 p-10 min-w-[300px]"
        >
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={classNames("w-full h-10 p-2 text-lg font-bold", {
              "border-2 border-rose-500 outline-rose-500": errors.username,
            })}
            {...register("username", { required: true })}
            placeholder="Please Enter Username"
          />

          <div className="w-full">
            {errors.username && (
              <span className="text-rose-500 text-xl font-bold	">
                Username is required
              </span>
            )}
          </div>

          <label
            className="block text-sm font-bold mb-2 mt-10"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className={classNames("w-full h-10 p-2 text-lg font-bold", {
              "border-2 border-rose-500 outline-rose-500": errors.password,
            })}
            {...register("password", { required: true })}
            placeholder="Please Enter Password"
          />
          <div className="w-full">
            {errors.password && (
              <span className="text-rose-500 text-xl font-bold	">
                Password is required
              </span>
            )}
          </div>
          <div className="mt-10 w-full">
            <input
              className="btn w-full btn-success rounded-none font-bold text-xl"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
