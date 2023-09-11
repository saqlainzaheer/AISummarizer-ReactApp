import React, { useEffect, useState } from "react";
import Errormsg from "./Errormsg";
import Spinner from "./Spinner";

const apiKey = import.meta.env.VITE_API_KEY;

const Demo = () => {
  ///copy url

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Text successfully copied to clipboard
        alert("Text copied to clipboard:");
      },
      (err) => {
        // Unable to copy text to clipboard
        alert("Failed to copy text:", err);
      }
    );
  };

  const [article, setArticle] = useState({
    submit: "false",
    url: "",
    demo: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFiveResults, setLastFiveResults] = useState([]);

  useEffect(() => {
    // Retrieve last five results from local storage
    const storedResults = localStorage.getItem("lastFiveResults");
    if (storedResults) {
      setLastFiveResults(JSON.parse(storedResults));
    }
  }, []);

  function handleonChange(e) {
    setArticle({ ...article, url: e.target.value });
  }
  function handleClickRecent(e, resultRecent) {
    e.preventDefault();
    setErrorMessage("");
    setArticle({ ...article, demo: resultRecent.demo });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${article.url.trim()}&length=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };
    try {
      const isUrlAlreadyStored = lastFiveResults.some(
        (result) => result.url === article.url
      );
      if (isUrlAlreadyStored) {
        setIsLoading(false);
        setErrorMessage("Looks Like Url Already in Recent History");
      }
      if (!isUrlAlreadyStored) {
        const response = await fetch(url, options);
        if (response.ok) setErrorMessage("");
        const result = await response.json();
        //throwing error
        if (result.message || (result.error && !response.ok)) {
          setIsLoading(false);
          throw new Error(
            `${response.status} ${result.message || result.error}  `
          );
        } else {
          //spiner to false
          setIsLoading(false);
          //data fetch correctly and store in state
          setArticle({ ...article, demo: result.summary });

          //store result in local storage
          const updatedResults = [
            { id: Date.now(), url: article.url, demo: result.summary },
            ...lastFiveResults,
          ];

          // Ensure that we only store the last five results
          if (updatedResults.length > 5) {
            updatedResults.pop();
          }

          // Store the updated results in local storage
          localStorage.setItem(
            "lastFiveResults",
            JSON.stringify(updatedResults)
          );

          // Update the state with the new results
          setLastFiveResults(updatedResults);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <section className="w-full max-w-3xl mt-10 mb-20">
        <div className="felx flex-col w-full gap-2 ">
          <form
            className=" relative flex justify-center items-center  "
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            <img
              className="absolute left-2 w-5"
              src={"link.svg"}
              alt={"link"}
            />
            <input
              value={article.url}
              type="text"
              required
              onChange={(e) => handleonChange(e)}
              className="url_input peer"
              placeholder="Enter Url"
            />
            <button
              type="submit"
              className="relative right-16 submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
              {">"}
            </button>
          </form>
          {lastFiveResults.length !== 0 && (
            <div className=" w-full max-w-3xl mt-10 ">
              <div className="flex align-center justify-between">
                <h2 className="text-2xl uppercase font-semibold">
                  rECENT SUMMARIES
                </h2>
                <button
                  className="bg-orange-400 border-t rounded-lg px-2 pt-2 pb-3 shadow text-grey-lighter text-bold"
                  onClick={() => {
                    setLastFiveResults([]);
                  }}
                >
                  CLEAR
                </button>
              </div>

              {lastFiveResults.map((resultRecent) => (
                <label
                  key={resultRecent.id}
                  className="w-full mt-3 p-4 block text-gray-500 bg-gray-200 hover:text-blue-500"
                  onClick={(e) => handleClickRecent(e, resultRecent)}
                >
                  {`🔗 ${resultRecent.url}`}
                </label>
              ))}
            </div>
          )}
          {isLoading ? (
            <Spinner />
          ) : errorMessage !== "" ? (
            <Errormsg errorMessage={errorMessage} />
          ) : (
            article.demo !== "" && (
              <div className="w-full max-w-3xl  mt-10">
                <div className="text-2xl uppercase font-semibold">
                  Article <span className="text-blue-500">Summary</span>{" "}
                  <span
                    className=" cursor-pointer"
                    onClick={() => {
                      copyTextToClipboard(article.demo);
                    }}
                  >
                    {"🔗"}
                  </span>
                </div>
                <div className="bg-gray-100 mt-2 tect-gray-300  p-5   text-gray-500 text-lg font-normal">
                  {article.demo}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Demo;
