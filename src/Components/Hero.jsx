import React from "react";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between w-full mb-10 pt-3 ">
        <img
          className="w-28 object-contain"
          src={"logo.svg"}
          alt={"sumz_logo"}
        />
        <button
          className="black_btn"
          onClick={() => {
            window.open("https://github.com/saqlainzaheer");
          }}
        >
          github
        </button>
      </nav>
      <h1 className="head_text ">
        Summarize <br className="lg:hidden  " />
        Article with
        <br />
        <span className="orange_gradient ">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading wuth summize,an open source article summarizer
        that transform lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
