const CACHE="ff5-v1";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET")return;
  e.respondWith(
    caches.match(r).then(hit=>{
      if(hit){
        // 字型等跨網域資源：背景更新
        if(new URL(r.url).origin!==location.origin)fetch(r).then(res=>caches.open(CACHE).then(c=>c.put(r,res.clone()))).catch(()=>{});
        return hit;
      }
      return fetch(r).then(res=>{
        if(res&&(res.ok||res.type==="opaque"))caches.open(CACHE).then(c=>c.put(r,res.clone()));
        return res;
      }).catch(()=>caches.match("./index.html"));
    })
  );
});
