if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let r={};const f=e=>c(e,s),o={module:{uri:s},exports:r,require:f};i[s]=Promise.all(a.map((e=>o[e]||f(e)))).then((e=>(n(...e),r)))}}define(["./workbox-00a24876"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Cafe1.jpg",revision:"3a9b8ce69f90421b156212d89a5ab8e8"},{url:"/Cafe2.jpg",revision:"35066cf11fbc1a5a9d853c923f84f78a"},{url:"/Cafe3.jpg",revision:"8bab74e25fc3e7a8f23f286bf878aa2f"},{url:"/Cafe4.JPG",revision:"818fe0ecb618c30ab475eb0732507a40"},{url:"/Game1.jpg",revision:"c6471293068dfec8d4537082fd225ae2"},{url:"/Game2.jpg",revision:"fb651b41085acd6ba77d3c8d7db24da1"},{url:"/Game3.png",revision:"77548310436d6d9c8ac65f90ffe6cb80"},{url:"/Game4.jpg",revision:"d62e5aa479b233073017d58de268d042"},{url:"/Reading1.jpg",revision:"d0e0e942b3f0a23016c8ad73726066d3"},{url:"/Reading2.jpg",revision:"c661ac25ba37be4e463ab88c006d7aab"},{url:"/Reading3.jpg",revision:"23f27549aaf62ff07c4742676f077cf0"},{url:"/Reading4.jpg",revision:"51b4dd75764d77c074e517778ddfa8e0"},{url:"/Travel1.jpg",revision:"8456e2d8641d8fb195e5e6c0bc15ff40"},{url:"/Travel2.jpg",revision:"864bce241a2f045d2b51c385ceb92000"},{url:"/Travel3.jpg",revision:"a24dbb7aa9216ef868a1bb74ca875a5e"},{url:"/Travel4.JPG",revision:"c308208fcab4cc254da1bb42e16e841f"},{url:"/_next/app-build-manifest.json",revision:"6cb80b267139b5a369206877d94d279c"},{url:"/_next/static/chunks/117-4b311a6519ddf5c4.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/166-98645d25c4a2ee60.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/app/_not-found/page-98467b0ee1cfb9b0.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/app/layout-485148468aa7e861.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/app/page-b611f18489027e04.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/fd9d1056-91aa9495991b9c80.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/main-474cf63fd5b17fa8.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/main-app-be02ebee86d3908d.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-3f5d51dd917f070d.js",revision:"pVaPjrgt1bRcJUM4hwXWy"},{url:"/_next/static/css/c91a9397de3360fa.css",revision:"c91a9397de3360fa"},{url:"/_next/static/css/d273c59929655953.css",revision:"d273c59929655953"},{url:"/_next/static/media/5a9a8a133e60054d-s.p.woff2",revision:"b41c2d1316b143a7a2f81f59d8614ffa"},{url:"/_next/static/media/74b1ffaad1f441fa-s.woff2",revision:"0fa158f54ea064a712480934d93d1a7e"},{url:"/_next/static/media/803d1667cf8f854f-s.woff2",revision:"0dd635d1ee0d3b30e863cc63b668d0be"},{url:"/_next/static/media/c95fdb792c9378f4-s.woff2",revision:"a8afbc2a3e1439c734681516cef41755"},{url:"/_next/static/pVaPjrgt1bRcJUM4hwXWy/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/pVaPjrgt1bRcJUM4hwXWy/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/apple-touch-icon.png",revision:"6afee7fda51a5e7989e5b9845802119f"},{url:"/favicon_ico.ico",revision:"78dc09089ca047c3f2cbc18331efe712"},{url:"/icon-128x128.png",revision:"eeb89a16404591ede0191ddc01bcf162"},{url:"/icon-16x16.png",revision:"574423a0c20e912b61aacec9de984412"},{url:"/icon-192x192.png",revision:"094d7b50e2bf779c5f03b8b0687e5d6a"},{url:"/icon-24.ico",revision:"127416c366aa3c5b7b1d01122748ffd1"},{url:"/icon-256x256.png",revision:"8609306bab236865db466aa7dd0833fa"},{url:"/icon-32x32.png",revision:"273f2b95ca517969e418f170e6930772"},{url:"/icon-48.ico",revision:"59ad31da08e553c46e8321634689520e"},{url:"/icon-512x512.png",revision:"539e0cc673d995835d0cda68fe1f60aa"},{url:"/icon-64.ico",revision:"76f14aae8ab4b0aa20f5347309cb6d28"},{url:"/icon-72x72.png",revision:"b5eab375b61366b22236e99151c6c025"},{url:"/icons/JS.png",revision:"f7bf4b61c5727e25fb4ea64a93564202"},{url:"/icons/Lightsout_ico.ico",revision:"5f2e96993f66065968f1d7c5cbe63963"},{url:"/icons/TS.png",revision:"e99a80f4f2baa373223bd53598ddf52e"},{url:"/icons/c++.png",revision:"e4f46516b8d0d4b45f958b7e404f2d55"},{url:"/icons/c.png",revision:"c7b5a93c90dd67b69df0292f7ac4237f"},{url:"/icons/css.png",revision:"6529d41350c881a6958a0357d314a643"},{url:"/icons/dart.png",revision:"daf08a6e4dd698873a059f44d7c0e3f9"},{url:"/icons/fifteel.png",revision:"27fa83611b01b34bcaa6db802ab62c03"},{url:"/icons/flutter.png",revision:"e038d7f55d1c679d7b74a87b6787b6ea"},{url:"/icons/git.png",revision:"3b39efcc2777248a44fe1246575d62f0"},{url:"/icons/github.png",revision:"9dc8017d557bdee7e4451bd57e5cc94f"},{url:"/icons/html.png",revision:"7bdb54d0896a892092283a343c252cfa"},{url:"/icons/line.png",revision:"cb61d7dcf3c453554ec2e843dd2d7a4b"},{url:"/icons/next.png",revision:"5c9e28f9d270f170a69f007356e071c1"},{url:"/icons/ox.png",revision:"4e039018f909b86d28e05e3a6a01a17c"},{url:"/icons/penguinIcon.png",revision:"c7621ddcad86e060999ee8f6420d6ad8"},{url:"/icons/pop.png",revision:"b09166087a39152532078823ff55c103"},{url:"/icons/python.png",revision:"69dc34bfff6427d2087a8cc8b3c7f9bf"},{url:"/icons/react.png",revision:"deee9796a9983b97891d175459ecfbc9"},{url:"/icons/tailwind.svg",revision:"ce07d058b7dcfda833fe5cfdeb0bcf90"},{url:"/icons/vscode.png",revision:"11c4184e0e255d6cfce3deb95142bc59"},{url:"/manifest.json",revision:"0b5026f0fcae76f143e841878165aa44"},{url:"/me.jpg",revision:"33e0ee0418b60a9ce8279da3cfe03a46"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/screenshot-mobile.png",revision:"756f5bd6f3cb9d0cfa795c7c77a37ff2"},{url:"/screenshot-wide.png",revision:"ad6fc2bb7fdbbd85fddbd2680d8e688f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:c,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET")}));
