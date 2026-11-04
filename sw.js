const C="rutina-v16",OK=["www.gstatic.com","fonts.googleapis.com","fonts.gstatic.com"],ASSETS=["./index.html","./assets/styles.css","./assets/app.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).catch(()=>{}))});
self.addEventListener("activate",e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||!(u.origin===location.origin||OK.indexOf(u.hostname)>-1))return;
e.respondWith(fetch(r).then(x=>{if(x&&(x.ok||x.type==="opaque")){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))))});




