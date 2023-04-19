import type { AppProps } from "next/app";
import "../styles/globals.css";
import Script from 'next/script'
import { Router } from 'next/router';

declare global {
  interface Window {
    _hmt?: any;
  }
}


Router.events.on('routeChangeComplete', (url) => {
  try{
    window?._hmt.push(['_trackPageview', url]);
  }catch (e){}
})
function MyApp({ Component, pageProps }: AppProps) {
  // const getAnalyticsTag = () => {
  //   return {
  //     __html: `
  //     var _hmt = _hmt || [];
  //     (function() {
  //       var hm = document.createElement("script");
  //       hm.src = "https://hm.baidu.com/hm.js?e06e8ad50b1abfb6009b2935438ae55b";
  //       var s = document.getElementsByTagName("script")[0];
  //       s.parentNode.insertBefore(hm, s);
  //     })();`,
  //   }
  // }


  return (
    <>
        
      <Script strategy="afterInteractive" src="https://hm.baidu.com/hm.js?e06e8ad50b1abfb6009b2935438ae55b">
      </Script>

        {/* <script dangerouslySetInnerHTML={getAnalyticsTag()}/> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
