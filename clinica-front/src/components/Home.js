import * as React from "react";

function InputField({ label, placeholder, type = "text" }) {
  return (
    <>
      <div className="capitalize text-zinc-300">{label}</div>
      <div
        className={`justify-center px-4 py-3 mt-3 text-sm rounded-lg border-solid ${
          type === "password"
            ? "flex gap-1.5 border border-zinc-700 text-zinc-300"
            : "border-zinc-700 border-[3px] text-zinc-500 max-md:pr-5"
        }`}
      >
        {type === "password" ? (
          <>
            <input
              type="password"
              className="flex-1 my-auto bg-transparent outline-none text-zinc-300"
              placeholder={placeholder}
              aria-label={placeholder}
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/57290b91169eaca85c87358f3873bf7f59e22c4370f0ec99a41bfbb0b0197897?apiKey=5da4ee86ad6041ed939c89b76a4805b2&"
              alt="Password visibility toggle"
              className="shrink-0 w-6 aspect-square"
            />
          </>
        ) : (
          <input
            type="text"
            className="bg-transparent outline-none w-full"
            placeholder={placeholder}
            aria-label={placeholder}
          />
        )}
      </div>
    </>
  );
}

function LoginForm() {
  return (
    <form className="flex relative flex-col justify-center px-20 py-12 mt-48 mb-36 max-w-full rounded-3xl border border-solid shadow-2xl backdrop-blur-[50px] bg-neutral-900 bg-opacity-80 border-zinc-700 border-opacity-50 w-[540px] max-md:px-5 max-md:my-10">
      <InputField label="Usuário" placeholder="Seu usuário" />
      <div className="flex gap-0 mt-6 capitalize whitespace-nowrap">
        <label htmlFor="passwordInput" className="flex-1 text-zinc-300">
          
        </label>
        <div className="text-right text-zinc-400">Esqueceu?</div>
      </div>
      <InputField label="Senha" placeholder="Sua senha" type="password" />
      <button
        type="submit"
        className="justify-center items-center p-4 mt-6 font-semibold whitespace-nowrap bg-blue-600 rounded-lg text-zinc-50 max-md:px-5"
      >
        Login
      </button>
    </form>
  );
}

function Home() {
  return (
    <div className="flex flex-col justify-center text-base leading-4 bg-neutral-950">
      <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 w-full min-h-[1000px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c84dd549856257b1d7547472d9bd698272a962279303be74a019f7c5cef24d4b?apiKey=5da4ee86ad6041ed939c89b76a4805b2&"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
        />
        <LoginForm />
      </div>
    </div>
  );
}

export default Home;