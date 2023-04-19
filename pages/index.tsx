import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Github from "../components/GitHub";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [lang, setLang] = useState<VibeType>("直接发给chatgpt");
  const [generatedDescs, setGeneratedDescs] = useState<string>("");
  const defultDesc = '帮我写个中文邮件和领导请三天假去过自己的80大寿，不会耽误老板换最新型号的星舰'
  console.log("Streamed response: ", {generatedDescs});
  let promptObj = {
    "直接发给chatgpt":"",
    "英文邮件": "Generate a business email in UK English that is friendly, but still professional and appropriate for the workplace.The topic is",
    "中文邮件": "Generate a business email in Simplified Chinese  that is friendly, but still professional and appropriate for the workplace.The topic is",
    "说了啥":"用一段话详略得当总结这段聊天内容",
    "老胡生成器":"按照下面模板，写篇文章: '近期互联网上出现了___, 老胡看到___,知道大家很___,老胡忍不住啰嗦几句,虽然___, 确实存在部分___, 但是___, 最后老胡呼吁___。'，内容是",
    "写个正则":"写个正则表达式",
    "根据单词写个英语作文":"写一个符合雅思7分要求的100个单词的小作文，用到下面的单词",
    "修改英语语法":"帮我改一下下面这段话的英语语法，符合雅思七分的要求",
    "编日报":"帮我写个工作的日报，内容+列表的形式",
    "哄媳妇睡觉小故事":"帮我生成一个500字的有意思的小故事，用来哄媳妇睡觉",
    "小红书文案生成器":"帮我扩展一下这段文字，起一个能吸引眼球的标题，内容润色成小红书的风格，每行开头都用不同的emoji:"
  }
  

  let text = desc||defultDesc

  // Generate a business email in UK English that is friendly, but still professional and appropriate for the workplace. The email topic is:
  const prompt = `${promptObj[lang]?promptObj[lang]+":\n":""} ${text}${text.slice(-1) === "." ? "" : "."}`

  const generateDesc = async (e: any) => {
    e.preventDefault();
    setGeneratedDescs("");
    setLoading(true);
    
    // const response = await fetch("https://w1bz4wktbi.hk.aircode.run/hello", {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedDescs((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>写作助理</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:mt-4">
        <div className="flex flex-wrap justify-center space-x-5">
         

          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
            href="https://aihuman.life"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>去AiHuman.Life主站</p>
          </a>

          
        </div>

        <h1 className="sm:text-3xl text-2xl max-w-1xl font-bold text-slate-900">
          写作助手
        </h1>
        {/* <p className="text-slate-500 mt-5">18,167 bios generated so far.</p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-4 items-center space-x-3 mb-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
            />
            <p className="text-left font-medium">
              写主题，或者复制粘贴你的内容
            </p>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-2"
            placeholder={
              "e.g. "+defultDesc
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">选择目的.</p>
          </div>
          <div className="block">
            <DropDown vibe={lang} setVibe={(newLang) => setLang(newLang)} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 hover:bg-black/80 w-full"
              onClick={(e) => generateDesc(e)}
            >
              生成 &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-4">
              {generatedDescs && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      生成内容
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto  whitespace-pre-wrap">

                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-left"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedDescs);
                        toast("Email copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p>{generatedDescs}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
