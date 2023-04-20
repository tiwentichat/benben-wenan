import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        Powered by{" "}
        <a
          href="https://beta.openai.com/account"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          OpenAI
        </a>
        {" + "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel
        </a>
        {" + "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Next.js
        </a>
        {" + "}
        <a
          href="https://github.com/shengxinjing/benben"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Benben
        </a>
        </a>
      </div>
      
      
                 
      
      
      <div>
        如果帮到了你，就...请我喝冰阔落吧~{" "}
        <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-white text-sm text-gray-600 shadow-sm transition-colors hover:opacity-80"

            rel="noopener noreferrer"
          >
            <img src="/bingkuoluo.jpeg" className="h-10" alt="" />
          </a>
      </div>
      
    </footer>
  );
}
