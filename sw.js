const V='nrd-2883037ac5',A='nrd-assets';const PRE=["./","game.js?v=e28a003e3e","art-index.js?v=8b69ff7199","manifest.webmanifest","i18n-en.js?v=ca4f9d7a12","i18n-ja.js?v=981794b0c1","i18n-zh-Hans.js?v=41a4b1e73b","i18n-zh-Hant.js?v=1c2bca4331"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(PRE).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('nrd-')&&k!==V&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')){e.respondWith(fetch(r.url,{cache:'no-cache',credentials:'same-origin'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('./',cp));}return res;}).catch(()=>caches.open(V).then(c=>c.match('./'))));return;}
if(!u.search&&!/manifest|icon-/.test(u.pathname))return;
// 주소에 ?v=(내용 해시)가 붙은 파일은 내용이 바뀌면 주소도 바뀐다 → 버전이 바뀌어도 지우지 않는 그림 저장소(A)에 둔다
e.respondWith(caches.open(u.search?A:V).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&res.type==='basic')c.put(r,res.clone());return res;}))));});
