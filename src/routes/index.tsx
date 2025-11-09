import { createFileRoute } from "@tanstack/react-router";
import { Clipboard, ClipboardCheckIcon } from "lucide-react";
import { useState } from "react";
import { useClipboard } from "react-haiku";
import { regex } from "arkregex";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const clipboard = useClipboard({ timeout: 2000 });
  const apiUrl =
    import.meta.env.VITE_API_URL ??
    import.meta.env.API_URL ??
    "https://api.kuerzl.link";

  // track last submitted url

  const handleClick = async (thisUrl: string) => {
    // Require protocol: http:// or https://, then host (domain, localhost or IPv4), optional port and path
    const urlRegex = regex(
      "^https?:\/\/((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/\S*)?$"
    );

    if (!urlRegex.test(thisUrl)) {
      setShortUrl(
        "Please include protocol (http:// or https://) and a valid host"
      );
      return;
    }

    const newUrl = `${apiUrl}/shorten`;
    const res = await fetch(newUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: thisUrl,
      }),
    });

    // robust parsing to avoid JSON.parse errors on non-JSON responses
    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("API response not JSON:", text);
      setShortUrl("Server returned unexpected response");
      return;
    }

    setShortUrl(data.newUrl);
    setIsValid(urlRegex.test(thisUrl));
  };
  // ...existing code...
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center gap-8 md:gap-2 px-4">
      {" "}
      {/* add page padding */}
      <a
        href="https://alex-zeitlhofer.com"
        className=" md:absolute top-4  right-4 text-3xl font-black  bg-purple-300 p-4 rounded-md">
        Visit the Developer
      </a>
      <h1 className="font-black text-8xl">kuerzl.link</h1>
      <input
        type="text"
        name="url"
        id=""
        onChange={(e) => setUrl(e.target.value)}
        placeholder="e.g. https://alex-zeitlhofer.com"
        className="bg-slate-400 rounded-md h-[8vh] mx-4 w-full md:w-[640px] text-4xl font-bold text-center px-8" // limit width on md+ screens
      />
      <input
        type="button"
        value="Get your kuerzl!"
        onClick={() => handleClick(url)}
        className=" bg-slate-400 rounded-md h-[8vh] text-4xl font-bold text-center px-8 cursor-pointer"
      />
      {shortUrl && (
        <div className="flex gap-4">
          <a href={shortUrl} className="text-xl md:text-4xl underline">
            {shortUrl}
          </a>
          {isValid && (
            <button
              className=" cursor-pointer "
              onClick={() => clipboard.copy(shortUrl)}>
              {clipboard.copied ? (
                <ClipboardCheckIcon size={40} />
              ) : (
                <Clipboard size={40} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
