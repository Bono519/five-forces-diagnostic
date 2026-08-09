/* 五力壓力量測 · Service Worker v3
   策略：HTML 文件採 network-first（確保改版即時生效）
        靜態資源採 stale-while-revalidate
        跨網域字型採 cache-first 並背景更新 */
const CACHE="ff5-v3";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable.png"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("message",e=>{ if(e.data==="SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET") return;
  const sameOrigin=new URL(r.url).origin===location.origin;
  const isDoc = r.mode==="navigate" || r.destination==="document" ||
                (sameOrigin && new URL(r.url).pathname.endsWith(".html"));

  if(isDoc){
    // 網路優先：有網路一律取最新版，離線才回快取
    e.respondWith(
      fetch(r).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});
        return res;
      }).catch(()=>caches.match(r).then(hit=>hit||caches.match("./index.html")))
    );
    return;
  }

  if(sameOrigin){
    // 靜態資源：先給快取，同時背景更新
    e.respondWith(
      caches.match(r).then(hit=>{
        const net=fetch(r).then(res=>{
          if(res&&res.ok) caches.open(CACHE).then(c=>c.put(r,res.clone())).catch(()=>{});
          return res;
        }).catch(()=>hit);
        return hit||net;
      })
    );
    return;
  }

  // 跨網域（字型等）：快取優先，背景更新
  e.respondWith(
    caches.match(r).then(hit=>{
      if(hit){
        fetch(r).then(res=>{
          if(res&&(res.ok||res.type==="opaque")) caches.open(CACHE).then(c=>c.put(r,res.clone())).catch(()=>{});
        }).catch(()=>{});
        return hit;
      }
      return fetch(r).then(res=>{
        if(res&&(res.ok||res.type==="opaque")) caches.open(CACHE).then(c=>c.put(r,res.clone())).catch(()=>{});
        return res;
      }).catch(()=>undefined);
    })
  );
});
