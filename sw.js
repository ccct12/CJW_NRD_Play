const V='nrd-b267f9c98b',A='nrd-assets';const PRE=["./","game.js?v=dd856c1b7a","art-index.js?v=8b69ff7199","manifest.webmanifest","i18n-en.js?v=d0e85826b7","i18n-ja.js?v=a46cf05445","i18n-zh-Hans.js?v=20ad5f6783","i18n-zh-Hant.js?v=d9d52166be"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(PRE).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('nrd-')&&k!==V&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')){e.respondWith(fetch(r.url,{cache:'no-cache',credentials:'same-origin'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('./',cp));}return res;}).catch(()=>caches.open(V).then(c=>c.match('./'))));return;}
if(!u.search&&!/manifest|icon-/.test(u.pathname))return;
// 주소에 ?v=(내용 해시)가 붙은 파일은 내용이 바뀌면 주소도 바뀐다 → 버전이 바뀌어도 지우지 않는 그림 저장소(A)에 둔다
e.respondWith(caches.open(u.search?A:V).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&res.type==='basic')c.put(r,res.clone());return res;}))));});
