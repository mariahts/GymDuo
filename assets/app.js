let R=[
{d:"Torso 1",x:[["Press de pecho en máquina","3 x 6-10"],["Remo sentado en polea","3 x 8-12"],["Press inclinado","3 x 8-12"],["Jalón al pecho","3 x 8-12"],["Press de hombros","2 x 8-12"],["Elevaciones laterales","3 x 12-20"],["Extensión de tríceps","2 x 10-15"],["Curl predicador con barra Z","2 x 10-15"]]},
{d:"Pierna 1",x:[["Péndulo / Multipower","3 x 6-10"],["Extensión de cuádriceps máquina","2 x 10-15"],["Hip thrust","3 x 8-12"],["Curl femoral sentado","2 x 10-15"],["Elevación de gemelos","3 x 10-15"],["Aductores / Abductores","2 x 12-20"]]},
{d:"Torso 2",x:[["Remo con pecho apoyado","3 x 8-12"],["Jalón al pecho agarre neutro","2 x 10-12"],["Press de hombros","2 x 8-12"],["Elevaciones laterales","3 x 12-20"],["Face pull","2 x 12-20"],["Curl martillo","2 x 10-15"]]},
{d:"Pierna 2",x:[["Prensa inclinada","3 x 8-12"],["Curl femoral sentado","3 x 10-15"],["Peso muerto rumano","2 x 8-10"],["Elevación de gemelos","3 x 10-15"]]}];
R.forEach((r,di)=>{r.id=String(di);r.x.forEach((x,i)=>x[2]=String(i))});const DEFR=JSON.stringify(R);R=[];
let P=["a","b"],LEG={a:"María",b:"Adrián"},LEGRX=/pierna|leg|prensa|sentadilla|squat|gl[uú]teo|hip thrust|femoral|cu[aá]dricep|gemelo|peso muerto|aductor|abductor|calf/i;let C={n:{a:"Persona 1",b:"Persona 2"},c:{a:0,b:1},m:["a","b"],title:"",ts:0};
const PAL=[["#d6336c","#ff7fae","#fde4ee","#41202f"],["#1f6feb","#6ea8ff","#e1ecff","#172a4a"],["#16915f","#3ccf8e","#dff5ea","#143327"],["#e8590c","#ff9a5c","#ffe8d9","#42240f"],["#7048e8","#a68bff","#ece6ff","#2a2250"],["#0c8599","#4fd1e6","#d7f3f8","#12353b"]];
const cm=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")};let S={p:"a",w:1,d:0,tab:"ini",setup:0,mm:{},cs:{},ts:{},code:"",mail:""},L={},H=[],shown="",armed=0;const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")},cs=()=>S.cs[S.p]||(S.cs[S.p]=today()),autoW=()=>{const a=cs().split("-"),d=Math.floor((new Date()-new Date(+a[0],+a[1]-1,+a[2]))/864e5);return Math.max(1,Math.min(4,Math.floor(d/7)+1))};const mo=()=>S.mm[S.p]||(S.mm[S.p]=cm());
let REG=[],CUR="main";try{REG=JSON.parse(localStorage.getItem("gd-spaces")||"[]");CUR=localStorage.getItem("gd-cur")||"main"}catch(e){}if(!REG.length)REG=[{id:"main"}];if(!REG.some(r=>r.id==CUR))CUR=REG[0].id;const skey=id=>id=="main"?"rutina-v1":"gd-s-"+id;
try{const j=JSON.parse(localStorage.getItem(skey(CUR))||"{}");if(j.L)L=j.L;if(j.H)H=j.H;if(j.S)Object.assign(S,j.S);if(j.C)C=j.C;if(j.R)R=j.R}catch(e){}
(function(){const M={"María":"a","Adrián":"b"};let mg=0;Object.keys(L).forEach(k=>{const q=k.split("|");if(M[q[0]]){L[M[q[0]]+"|"+q.slice(1).join("|")]=L[k];delete L[k];mg=1}});H.forEach(h=>{if(M[h.p]){h.p=M[h.p];mg=1}});["mm","cs","ts"].forEach(f=>Object.keys(S[f]||{}).forEach(k=>{if(M[k]){S[f][M[k]]=S[f][k];delete S[f][k]}}));if(M[S.p])S.p=M[S.p];if(mg){C.n={a:"María",b:"Adrián"};C.ts=C.ts||Date.now();S.setup=1}const jm=typeof location!="undefined"&&location.hash.match(/j=([A-Za-z0-9_-]{16,})/);if(jm){if(jm[1]!==S.code){if(S.setup){const cd=jm[1];globalThis.__pend=()=>{const k=findCode(cd);k?switchTo(k):joinSpace(cd)}}else{S.code=jm[1];S.p="b";S.setup=1;S.tab="hoy";S.joining=1;S.auto=0}}try{history.replaceState(null,"",location.pathname)}catch(e){}}
if(!S.code)S.code=newCode();
if(!C.m||!C.m.length)C.m=["a","b"];P=C.m;if(!S.kind)S.kind="duo";if(!S.setup)S.tab="cfg"})();
let lastCfg,fb=null,pushT=null,dirty={},lastStr={},sync={st:"nocode"};
const lp=p=>{const l={};for(const k in L)if(k.indexOf(p+"|")===0)l[k]=L[k];return l},str=p=>JSON.stringify({L:lp(p),H:H.filter(h=>h.p===p)}),prof=p=>({L:lp(p),H:H.filter(h=>h.p===p),mm:S.mm[p]||null,cs:S.cs[p]||null,ts:S.ts[p]||0});
const save=()=>{try{P.forEach(p=>{const t=str(p);if(lastStr[p]!==undefined&&t!==lastStr[p]){lastStr[p]=t;S.ts[p]=Date.now();queue(p)}});const g=cfgStr();if(lastCfg!==undefined&&g!==lastCfg){lastCfg=g;C.ts=Date.now();queue("cfg")}localStorage.setItem(skey(CUR),JSON.stringify({L,S,H,C,R}))}catch(e){}};
const K=(w,d,i,p=S.p)=>p+"|"+w+"|"+R[d].id+"|"+R[d].x[i][2],esc=t=>String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"),uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5),nameOf=(di,ei)=>{const d=R.find(r=>r.id===di),x=d&&d.x.find(x=>x[2]===ei);return x?x[0]:null},$=s=>document.querySelector(s);
const num=v=>{const n=parseFloat(String(v).replace(",","."));return isNaN(n)?null:n},f=n=>String(n).replace(".",",");
const par=t=>{const m=t.match(/(\d+) x (\d+)-(\d+)/);return{n:+m[1],lo:+m[2],hi:+m[3]}};
const e1=(k,r)=>k*(1+r/30),ent=(i,w=S.w,d=S.d)=>L[K(w,d,i)];
function ensure(i){const k=K(S.w,S.d,i);if(!L[k])L[k]={s:Array.from({length:par(R[S.d].x[i][1]).n},()=>({k:"",r:"",x:0})),rpe:"",n:""};return L[k]}
function last(i){for(let w=S.w-1;w>=1;w--){const e=ent(i,w);if(e&&e.s.some(s=>s.k!==""))return e}const pb=S.w==1&&prevBest(R[S.d].x[i][0]);return pb?{s:Array.from({length:par(R[S.d].x[i][1]).n},()=>({k:pb.k,r:pb.r}))}:null}
function best(name,skip){let b=0;for(const key in L){const a=key.split("|");if(a[0]!==S.p||key===skip)continue;if(nameOf(a[2],a[3])!==name)continue;L[key].s.forEach(s=>{const k=num(s.k),r=num(s.r);if(s.x&&k&&r)b=Math.max(b,e1(k,r))})}return b}
function prevBest(nm){for(let i=H.length-1;i>=0;i--){if(H[i].p===S.p&&H[i].best&&H[i].best[nm])return H[i].best[nm]}return null}
function stats(p){let done=0,tot=0,vol=0,pr=0,ses={},by={};
for(let w=1;w<=4;w++)R.forEach((r,di)=>r.x.forEach((x,i)=>{const q=par(x[1]);tot+=q.n;const e=L[K(w,di,i,p)];if(!e)return;if(e.pr)pr++;const nm=x[0],o=by[nm]||(by[nm]={w:{},b:null,n:0,pl:0,rpe:[],top:{},leg:LEGRX.test(nm+" "+R[di].d),hi:q.hi,lo:q.lo});o.pl+=q.n;let ok=true,any=0;
e.s.forEach(s=>{if(!s.x)return;done++;o.n++;any=1;ses[w+"|"+di]=1;const k=num(s.k),rp=num(s.r);if(!(rp>=q.hi))ok=false;if(k&&rp){vol+=k*rp;const v=e1(k,rp);o.w[w]=Math.max(o.w[w]||0,v);if(!o.b||v>o.b.v)o.b={v,k,r:rp}}});
if(any){const rv=num(e.rpe);if(rv!==null)o.rpe.push(rv);o.top[w]=o.top[w]!==false&&ok}}));
return{done,tot,vol:Math.round(vol),pr,ses:Object.keys(ses).length,by}}
function tip(o){const ws=Object.keys(o.w).sort(),lw=ws[ws.length-1],avg=o.rpe.length?o.rpe.reduce((a,b)=>a+b,0)/o.rpe.length:null,st=o.leg?"5":"2,5";
if(!o.n)return"sin series completadas; retómalo el mes que viene.";
if(o.n<o.pl*.6)return"hiciste "+o.n+"/"+o.pl+" series: completa todas antes de subir peso.";
const d=ws.length>1?o.w[lw]-o.w[ws[0]]:null;
if(o.top[lw])return"llegaste al tope de reps ("+o.hi+") en todas las series: sube "+st+" kg y empieza otra vez desde "+o.lo+" reps.";
if(avg!==null&&avg>=9.5)return"RPE muy alto ("+f(avg.toFixed(1))+"): deja 1–2 reps en reserva y descansa 2–3 min entre series.";
if(d!==null&&d<=0)return avg!==null&&avg>=9?"estancado y muy cerca del fallo: baja el peso un 10 % una semana y recupera.":"estancado: sube "+st+" kg aunque pierdas 1–2 reps, o añade una serie extra.";
if(avg!==null&&avg<=7)return"te sobra margen (RPE "+f(avg.toFixed(1))+"): sube "+st+" kg.";
return"buen ritmo: mantén el peso y busca llegar a "+o.hi+" reps en todas las series."}
function summary(p){const s=stats(p),a=mo().split("-"),mes=new Date(+a[0],+a[1]-1,1).toLocaleDateString("es",{month:"long",year:"numeric"});
const ls=Object.keys(s.by).filter(nm=>s.by[nm].b).map(nm=>{const o=s.by[nm],ws=Object.keys(o.w).sort(),d=o.w[ws[ws.length-1]]-o.w[ws[0]];return"• "+nm+": "+f(o.b.k)+"×"+o.b.r+(ws.length>1?" ("+(d>=0?"+":"")+f(d.toFixed(1))+" kg est.)":"")});
return{s,text:"Resumen de "+mes+"\nSesiones: "+s.ses+"/"+R.length*4+"\nSeries: "+s.done+"/"+s.tot+" ("+Math.round(s.done/s.tot*100)+"%)\nVolumen total: "+s.vol.toLocaleString("es")+" kg\nRécords: "+s.pr+"\n\nMejores marcas:\n"+ls.join("\n")+"\n\nSugerencias:\n"+(s.ses<R.length*3?"• Constancia: hiciste "+s.ses+" de "+R.length*4+" sesiones; intenta no saltarte ninguna.\n":"")+Object.keys(s.by).map(n=>"• "+n+": "+tip(s.by[n])).join("\n")}}
function closeMonth(){const r=summary(ME()),best={};Object.keys(r.s.by).forEach(n=>{if(!r.s.by[n].b)return;best[n]={k:r.s.by[n].b.k,r:r.s.by[n].b.r}});H=H.filter(h=>!(h.p===ME()&&h.m===mo()));H.push({p:ME(),m:mo(),text:r.text,best});shown=r.text;armed=0;save();render()}
function resetMonth(){Object.keys(L).forEach(k=>{if(k.indexOf(ME()+"|")===0)delete L[k]});S.w=1;S.d=0;S.mm[ME()]=cm();S.cs[ME()]=today();shown="";armed=0;save();render();top0()}
let repImg="",_cv=null,arm2=null;
function weekVol(p){const v=[0,0,0,0];for(let w=1;w<=4;w++)R.forEach((r,di)=>r.x.forEach((x,i)=>{const e=L[K(w,di,i,p)];if(e)e.s.forEach(s=>{if(s.x)v[w-1]+=(num(s.k)||0)*(num(s.r)||0)})}));return v}
function wrap(c,t,x,y,mw,lh){let l="";t.split(" ").forEach(w=>{const n=l?l+" "+w:w;if(c.measureText(n).width>mw&&l){c.fillText(l,x,y);y+=lh;l=w}else l=n});c.fillText(l,x,y);return y+lh}
function report(){const p=ME(),r=summary(p),s=r.s,col=pal(p)[0],W=1080,H2=3600,cv=document.createElement("canvas");cv.width=W;cv.height=H2;const c=cv.getContext("2d"),F=(w,z)=>w+" "+z+"px Barlow,Arial,sans-serif";
c.fillStyle="#fff";c.fillRect(0,0,W,H2);c.textBaseline="top";let y=60;
const a=mo().split("-"),mes=new Date(+a[0],+a[1]-1,1).toLocaleDateString("es",{month:"long",year:"numeric"});
c.fillStyle=col;c.font=F(700,52);c.fillText("Informe de "+mes,60,y);y+=110;
[[s.ses+"/"+R.length*4,"sesiones"],[Math.round(s.done/s.tot*100)+"%","series hechas"],[f(Math.round(s.vol/100)/10)+" t","volumen"],[String(s.pr),"récords"]].forEach((q,i)=>{const x=60+i*240;c.fillStyle="#f2f1f6";c.fillRect(x,y,225,130);c.fillStyle="#17161d";c.font=F(700,46);c.fillText(q[0],x+18,y+18);c.fillStyle="#6c6a78";c.font=F(500,26);c.fillText(q[1],x+18,y+84)});y+=190;
c.fillStyle="#17161d";c.font=F(700,36);c.fillText("Volumen por semana (kg)",60,y);y+=70;
const vv=weekVol(p),mx=Math.max(1,...vv);vv.forEach((v,i)=>{const h=Math.round(v/mx*300),x=80+i*245;c.fillStyle=col;c.fillRect(x,y+300-h,170,h);c.fillStyle="#17161d";c.font=F(600,28);c.fillText(Math.round(v).toLocaleString("es"),x,y+258-h);c.fillStyle="#6c6a78";c.fillText("Sem "+(i+1),x,y+312)});y+=400;
const ex=Object.keys(s.by).filter(n=>s.by[n].b).map(n=>{const o=s.by[n],ws=Object.keys(o.w).sort();return{n,d:ws.length>1?o.w[ws[ws.length-1]]-o.w[ws[0]]:0,b:o.b}});
c.fillStyle="#17161d";c.font=F(700,36);c.fillText("Cambio de fuerza estimada (kg)",60,y);y+=64;
const m2=Math.max(5,...ex.map(e=>Math.abs(e.d)));ex.forEach(e=>{c.fillStyle="#17161d";c.font=F(500,27);c.fillText(e.n,60,y);const bw=Math.max(4,Math.round(Math.abs(e.d)/m2*240));c.fillStyle=e.d>=0?"#16915f":"#d64545";c.fillRect(640,y+2,bw,28);c.fillStyle="#6c6a78";c.font=F(600,26);c.fillText((e.d>=0?"+":"")+f(e.d.toFixed(1)),650+bw,y);y+=52});y+=30;
c.fillStyle="#17161d";c.font=F(700,36);c.fillText("Qué mejorar",60,y);y+=64;c.font=F(500,27);
(r.text.split("Sugerencias:\n")[1]||"").split("\n").filter(Boolean).forEach(l=>{y=wrap(c,l,60,y,960,38)+8});
const out=document.createElement("canvas");out.width=W;out.height=Math.min(H2,y+50);out.getContext("2d").drawImage(cv,0,0);return out}
function closeCard(){const old=mo()!==cm();let h='<div class="card"><h2>Cierre de mes</h2><div class="tg">'+(old?"<b>Ya es otro mes.</b> ":"")+"Genera las stats, envíalas y reinicia para empezar de cero. Las mejores marcas quedan guardadas.</div>";h+='<button class="btn s" data-a="rep">Crear informe con gráficos</button>'+(repImg?'<img src="'+repImg+'" style="width:100%;border-radius:10px;margin-top:8px" alt="Informe del mes"><div class="pt">Mantén pulsada la imagen para guardarla en Fotos, o:</div><button class="btn" data-a="dl">Descargar imagen</button>':"");
if(shown)h+='<pre style="white-space:pre-wrap;font:14px/1.4 Barlow,sans-serif;background:var(--bg);border-radius:10px;padding:10px;margin:6px 0">'+esc(shown)+'</pre><input data-g="mail" type="email" inputmode="email" value="'+(S.mail||"")+'" placeholder="Correo" style="text-align:left;padding:0 10px;font-size:16px"><button class="btn" data-a="send">Abrir correo</button><button class="btn s" data-a="share">Compartir</button><button class="btn s" data-a="rs">Reiniciar mes</button>';
else h+='<button class="btn" data-a="cl">Cerrar mes y ver stats</button>';
h+=H.filter(x=>x.p===ME()).reverse().map(x=>'<details><summary class="pt">Historial · '+x.m+'</summary><pre style="white-space:pre-wrap;font:13px Barlow,sans-serif">'+esc(x.text)+'</pre></details>').join("");return h+"</div>"}
document.addEventListener("input",ev=>{const t=ev.target,c=t.dataset.c;if(c=="cc"||c=="hx"){setCol(t,0);return}if(c=="gt"){C.title=t.value.slice(0,24);save();return}if(c){const di=+t.dataset.di,i=+t.dataset.i;if(c=="n")C.n[t.dataset.p]=t.value.slice(0,14)||"…";else if(c=="d")R[di].d=t.value;else if(c=="xn")R[di].x[i][0]=t.value;else{const x=R[di].x[i],q=par(x[1]);if(c=="xs")q.n=+t.value||1;if(c=="xl")q.lo=+t.value||1;if(c=="xh")q.hi=+t.value||1;x[1]=q.n+" x "+q.lo+"-"+q.hi}save()}});
document.addEventListener("input",ev=>{if(ev.target.dataset.g=="mail"){S.mail=ev.target.value;save()}});
const APP_NAME="Buddy";
const SB_URL="https://iefiogedkszqinnawlmb.supabase.co",SB_KEY="sb_publishable_w8ThHYrcJ_dGgBXyL-7ONQ_B63VkDC2";
let sbClient=null;
async function getSB(){if(sbClient)return sbClient;const m=await import("https://esm.sh/@supabase/supabase-js@2");sbClient=m.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false}});return sbClient}
const syncTxt=()=>({nocode:"Solo local",ok:"Sincronizado",pend:"Guardando…",cache:"Solo local",offline:(typeof navigator!="undefined"&&!navigator.onLine?"Sin conexión":"Solo local"),error:"Sin sincronizar"}[sync.st]||"…");
const paint=()=>{try{topBar()}catch(e){}};
function queue(p){dirty[p]=1;clearTimeout(pushT);pushT=setTimeout(pushNow,20000);if(fb)sync.st="pend"}
async function pushNow(){if(!fb)return;const cfgDirty=!!dirty.cfg,ps={};Object.keys(dirty).forEach(p=>{if(p!="cfg")ps[p]=prof(p)});dirty={};try{const sb=fb.sb,id=fb.code;
if(cfgDirty)await sb.from("spaces").upsert({id,cfg:{n:C.n,c:C.c,m:C.m,title:C.title,R,ts:C.ts}},{onConflict:"id"});
else await sb.from("spaces").upsert({id},{onConflict:"id",ignoreDuplicates:true});
for(const p in ps)await sb.from("profiles").upsert({space_id:id,profile:p,data:ps[p]},{onConflict:"space_id,profile"});
sync.st="ok";paint()}catch(e){sync.st="error";paint()}}
function apply(p,r){Object.keys(L).forEach(k=>{if(k.indexOf(p+"|")===0)delete L[k]});Object.keys(r.L||{}).forEach(k=>{L[p+"|"+k.split("|").slice(1).join("|")]=r.L[k]});H=H.filter(h=>h.p!==p).concat((r.H||[]).map(h=>({...h,p})));if(r.mm)S.mm[p]=r.mm;if(r.cs)S.cs[p]=r.cs;lastStr[p]=str(p);S.ts[p]=r.ts||0}
function applyCfg(q){const qt=q?q.ts||0:0;if(q&&q.R&&qt>(C.ts||0)){C.n=q.n;C.c=q.c;C.m=q.m||["a","b"];P=C.m;C.title=q.title||"";R=q.R;C.ts=qt;lastCfg=cfgStr();S.setup=1;return 1}if((C.ts||0)>qt)return 2;return 0}
function softRender(){if(document.activeElement&&document.activeElement.tagName==="INPUT")setTimeout(softRender,2500);else render()}
const okN=n=>!!n&&n!=="…"&&!/^Persona [1-6]$/.test(n),swt=p=>PAL.map((q,i)=>'<button class="sw'+(C.c[p]==i?" on":"")+'" data-a="col" data-p="'+p+'" data-v="'+i+'" style="background:'+q[0]+'" aria-label="Color"></button>').join("");
function syncCard(){return'<div class="card"><h2>Sincronizar con el grupo</h2><div class="tg">'+syncTxt()+'. El código se ha creado solo. Pulsa Invitar y envía el enlace: al abrirlo, el grupo se une sin escribir nada.</div><button class="btn" data-a="shc">Invitar</button><details style="margin-top:8px"><summary class="pt">Tengo un código / ver código</summary><div class="tg">Código: <b>'+esc(S.code||"")+'</b><br>En iPhone, si se instala el icono después de abrir el enlace, habrá que pegar este código aquí.</div><input id="cd" placeholder="Código para unirse" style="text-align:left;padding:0 10px;font-size:16px;font-weight:500"><button class="btn s" data-a="sc">Unirme con este código</button></details></div>'}
function applyColor(){const q=pal(ME()),dk=typeof matchMedia!="undefined"&&matchMedia("(prefers-color-scheme: dark)").matches,st=document.documentElement.style;st.setProperty("--ac",dk?q[1]:q[0]);st.setProperty("--acs",dk?q[3]:q[2]);st.setProperty("--onac",lum(dk?q[1]:q[0])>.58?"#111":"#fff")}
function routineEd(){return '<div class="card"><h2>Editar rutina</h2><div class="tg">Cada fila: ejercicio · series · reps mínimas · reps máximas. Lo ya apuntado se conserva.</div>'+R.map((d,di)=>'<div style="border-top:1px solid var(--line);padding-top:10px;margin-top:12px"><div class="sub" style="margin-top:0"><input data-c="d" data-di="'+di+'" value="'+esc(d.d)+'" style="font-weight:700;text-align:left;padding:0 10px" placeholder="Nombre del día"><button class="chip" data-a="dd" data-di="'+di+'" style="width:38px;min-height:38px;padding:0;justify-content:center;font-size:18px;color:var(--mut)" aria-label="Borrar día">×</button></div><div class="edh"><span>Ejercicio</span><span>Series</span><span>Mín</span><span>Máx</span><span></span></div>'+d.x.map((x,i)=>{const q=par(x[1]),at=' data-di="'+di+'" data-i="'+i+'"';return'<div class="sub ed"><input data-c="xn"'+at+' value="'+esc(x[0])+'" placeholder="Ejercicio"><input class="ro" inputmode="numeric" data-c="xs"'+at+' value="'+q.n+'" aria-label="Series"><input class="ro" inputmode="numeric" data-c="xl"'+at+' value="'+q.lo+'" aria-label="Reps mín"><input class="ro" inputmode="numeric" data-c="xh"'+at+' value="'+q.hi+'" aria-label="Reps máx"><button class="chip" data-a="dx"'+at+' aria-label="Borrar ejercicio">×</button></div>'}).join("")+'<button class="lnk" data-a="ax" data-di="'+di+'">+ Añadir ejercicio</button></div>').join("")+'<button class="btn s" data-a="ad">+ Añadir día</button>'+(R.length?'':'<div class="tg" style="margin-top:8px">Añade un primer día para empezar.</div>')+'</div>'}
function cfg(){let h="";
h+=syncCard();
if(S.setup&&S.kind!="solo")h+='<div class="card"><h2>Grupo</h2><div class="tg">Nombre visible durante el entrenamiento.</div><input data-c="gt" value="'+esc(C.title||"")+'" placeholder="Nombre del grupo (opcional)" maxlength="24" style="text-align:left;padding:0 12px"></div>';

h+='<div class="card"><h2>Entreno</h2><div class="tg">D\u00edas por semana y objetivo.</div><div class="lbl">D\u00edas por semana</div><div class="planrow"><button class="gb" data-a="gm" aria-label="Menos">\u2212</button><b>'+goal()+'</b><button class="gb" data-a="gp" aria-label="M\u00e1s">+</button></div><div class="lbl">Objetivo</div><div class="row" style="flex-wrap:wrap;margin-top:4px">'+[["solo","Entrenar solo"],["grupo","Entrenar en grupo"],["guia","Acompañar y spotear"],["mirar","Guiar (coach o familia)"]].map(o=>'<button class="chip'+(S.obj==o[0]?" on":"")+'" data-a="ob" data-v="'+o[0]+'" style="flex:none">'+o[1]+'</button>').join("")+'</div></div>';
$("#main").innerHTML=h}
async function initSync(){const tk=++syncTok;if(!S.code||S.code.length<16){sync.st="nocode";return}
try{const sb=await getSB();if(tk!==syncTok)return;
const q=await sb.from("spaces").select("id,cfg").eq("id",S.code).maybeSingle();if(tk!==syncTok)return;if(q.error)throw q.error;
const exists=!!q.data;let ch=0,need=0;
if(S.joining&&!exists){S.joining=0;S.setup=0;S.p="a";S.auto=0;S.code=newCode();S.wzErr="No encuentro ese código. Revisa que esté bien copiado y que el grupo haya llegado a la pantalla del código con conexión.";save();switchTo(CUR);return}
if(S.joining){S.joining=0;ch=1}
if(exists){const c=applyCfg(q.data.cfg);if(c==1)ch=1;else if(c==2){dirty.cfg=1;need=1}}else if(S.setup&&!S.joining){C.ts=C.ts||Date.now();dirty.cfg=1;need=1}
const pr=await sb.from("profiles").select("profile,data").eq("space_id",S.code);if(tk!==syncTok)return;if(pr.error)throw pr.error;
(pr.data||[]).forEach(row=>{const p=row.profile,r=row.data||{},rt=r.ts||0,lt=S.ts[p]||0;if(rt>lt){apply(p,r);ch=1}else if(lt>rt){dirty[p]=1;need=1}});
P.forEach(p=>{if(lastStr[p]===undefined)lastStr[p]=str(p)});
fb={sb,code:S.code};
fb.chan=sb.channel("space-"+S.code).on("postgres_changes",{event:"*",schema:"public",table:"spaces",filter:"id=eq."+S.code},pl=>{if(tk!==syncTok||!pl.new)return;const c=applyCfg(pl.new.cfg);if(c==1){save();softRender()}else if(c==2)dirty.cfg=1}).on("postgres_changes",{event:"*",schema:"public",table:"profiles",filter:"space_id=eq."+S.code},pl=>{if(tk!==syncTok||!pl.new)return;const p=pl.new.profile,r=pl.new.data||{};if((r.ts||0)>(S.ts[p]||0)){apply(p,r);save();softRender()}}).subscribe(st=>{sync.st=st=="SUBSCRIBED"?"ok":(st=="TIMED_OUT"||st=="CLOSED"||st=="CHANNEL_ERROR")?"error":"pend";paint()});
if(need)pushNow();else{sync.st="ok";paint()}
if(ch){save();softRender()}
}catch(e){fb=null;sync.st="offline";paint();if(S.joining){S.joining=0;const bad=CUR;REG=REG.filter(r=>r.id!==bad);try{localStorage.removeItem(skey(bad))}catch(e2){}syncTok++;if(prevCUR&&REG.some(r=>r.id===prevCUR))switchTo(prevCUR);else location.reload();prevCUR=null;setTimeout(()=>toast("No se pudo cargar el grupo. Revisa la conexión."),300)}}}

const avt=(p,big,cc)=>{const k=cc||C,c=pal(p,k)[0];return'<span class="av'+(big?" big":"")+'" style="background:'+c+';color:'+(lum(c)>.58?"#111":"#fff")+'">'+esc((k.n[p]||"?").trim().charAt(0).toUpperCase())+'</span>'},
ago=t=>{if(!t)return"Aún sin entrenos";const d=Math.round((new Date(new Date().toDateString())-new Date(new Date(t).toDateString()))/864e5);return d<=0?"Último: hoy":d==1?"Último: ayer":"Último: hace "+d+" días"};
function pst(p){const a=(S.cs[p]||today()).split("-"),d=Math.floor((new Date()-new Date(+a[0],+a[1]-1,+a[2]))/864e5),w=Math.max(1,Math.min(4,Math.floor(d/7)+1));let dn=0,t=0,last=0;
R.forEach((r,di)=>r.x.forEach((x,i)=>{t+=par(x[1]).n;const e=L[K(w,di,i,p)];if(e)e.s.forEach(s=>{if(s.x)dn++})}));
for(const k in L)if(k.indexOf(p+"|")===0)L[k].s.forEach(s=>{if(s.t>last)last=s.t});return{w,dn,t,last}}
function newCode(){return Array.from(typeof crypto!="undefined"&&crypto.getRandomValues?crypto.getRandomValues(new Uint8Array(20)):Array.from({length:20},()=>Math.random()*256|0),x=>"abcdefghjkmnpqrstuvwxyz23456789"[x%31]).join("")}
let wz=0,wzMe="",wzPa="",wzCd="";
function wizPaint(){const el=$("#wiz"),on=!S.setup;el.style.display=on?"flex":"none";if(!on)return;
const B=(a,t)=>'<button class="btn big" data-a="'+a+'">'+t+'</button>',BK='<button class="gl" data-a="wb">← Volver</button>';let h='<img src="icon-192.png" width="84" height="84" alt="" style="border-radius:20px;margin-bottom:18px;align-self:center">';
if(wz==0)h+='<h1>Bienvenido a '+APP_NAME+'</h1><div class="pt">Entrena solo o en grupo, acompaña a alguien o guía su sesión. También para familias y entrenadores.</div>'+B("wp","Empezar")+'<button class="gl" data-a="wj">Tengo ya un código de '+APP_NAME+'</button>';
else if(wz==1)h+='<h1>Unirse con un código</h1><div class="pt">Pega el código del grupo. Se cargará la configuración que ya está preparada.</div>'+(S.wzErr?'<div class="tip" style="background:var(--golds);color:var(--gold)">'+esc(S.wzErr)+'</div>':"")+'<input class="wi" data-w="cd" value="'+esc(wzCd)+'" placeholder="Pega aquí el código" autocapitalize="off" autocorrect="off" aria-label="Código">'+B("wc","Unirme")+BK;

else if(wz==4)h+='<h1>¿Entrenar solo o en grupo?</h1><div class="pt">Podrás tener varios espacios: una rutina en solitario y grupos de dos o más personas, cada uno separado.</div>'+B("ws","Solo")+'<button class="btn s big" data-a="wa">En grupo</button>'+BK;
else h+='<h1>Este es el código del grupo</h1><div class="pt">Compártelo con el grupo. Al abrirlo en '+APP_NAME+' se cargará todo lo configurado.</div><div class="code">'+esc((S.code.match(/.{1,5}/g)||[]).join(" "))+'</div>'+B("cc","Copiar código")+'<button class="btn s big" data-a="shc">Compartir invitación</button><button class="gl" data-a="we">Entrar a '+APP_NAME+' →</button>';
el.innerHTML=h}
document.addEventListener("input",ev=>{const w=ev.target.dataset.w;if(w=="me")wzMe=ev.target.value;else if(w=="pa")wzPa=ev.target.value;else if(w=="cd")wzCd=ev.target.value;else if(w=="sj")spcCd=ev.target.value});
const mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),x=p(a),y=p(b);return"#"+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,"0")).join("")},lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
function pal(p,cc){const c=(cc||C).c[p];if(typeof c=="string"&&/^#[0-9a-f]{6}$/i.test(c)){const a=lum(c)>.6?mix(c,"#000000",.35):c;return[a,mix(c,"#ffffff",.3),mix(a,"#ffffff",.88),mix(a,"#000000",.78)]}return PAL[c||0]}
const hex=p=>pal(p)[0];
let colRaf=0;const raf=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:f=>setTimeout(f,0);
function setCol(t,commit){const p=t.dataset.p;let v=t.value.trim();if(t.dataset.c=="hx"){if(!/^#?[0-9a-fA-F]{6}$/.test(v))return;if(v[0]!="#")v="#"+v}v=v.toLowerCase();C.c[p]=v;if(CPOPEN==p){CPV=r2h(hx2(v));cpPaint()}
if(!colRaf)colRaf=raf(()=>{colRaf=0;if(p==S.p)applyColor();const r=t.closest&&t.closest(".sub");if(r){const h=r.querySelector(".hx"),k=r.querySelector('input[type=color]');if(h&&t!==h)h.value=C.c[p].toUpperCase();if(k&&t!==k)k.value=C.c[p]}});
if(commit){save();topBar()}}
document.addEventListener("change",ev=>{const c=ev.target.dataset&&ev.target.dataset.c;if(c=="cc"||c=="hx"){setCol(ev.target,1);render()}});
const cfgStr=()=>JSON.stringify({n:C.n,c:C.c,m:C.m,title:C.title,R});
let spcOpen=false,spcJoin=false,spcCd="";
const spBlob=id=>{if(id==CUR)return{S,C};try{return JSON.parse(localStorage.getItem(skey(id))||"{}")}catch(e){return{}}};
function spTitle(b){b=b||{S,C};const c=b.C||{};if((b.S||{}).kind=="solo")return"Solo";return c.title||"Grupo"}
function findCode(code){const r=REG.find(r=>(spBlob(r.id).S||{}).code===code);return r&&r.id}
function addSpace(blob){const id=uid();REG.push({id});try{localStorage.setItem("gd-spaces",JSON.stringify(REG));localStorage.setItem(skey(id),JSON.stringify(blob))}catch(e){}switchTo(id)}
let syncTok=0;
function spaceInit(){if(!C.m||!C.m.length)C.m=["a","b"];P=C.m;if(!S.kind)S.kind="duo";if(!S.code)S.code=newCode();lastStr={};P.forEach(p=>{lastStr[p]=str(p)});lastCfg=cfgStr();wz=S.wzErr?1:(S.startWz==2?3:(S.startWz||0));if(okN(C.n.a))wzMe=C.n.a;S.w=autoW()}
function switchTo(id){save();try{fb&&fb.chan&&fb.chan.unsubscribe&&fb.chan.unsubscribe()}catch(e){}fb=null;syncTok++;clearTimeout(pushT);dirty={};sync={st:"nocode"};CUR=id;try{localStorage.setItem("gd-cur",id)}catch(e){}
let j={};try{j=JSON.parse(localStorage.getItem(skey(id))||"{}")}catch(e){}
L=j.L||{};H=j.H||[];S=Object.assign({p:"a",w:1,d:0,tab:"ini",setup:0,mm:{},cs:{},ts:{},code:"",mail:""},j.S||{});C=j.C||{n:{a:"Persona 1",b:"Persona 2"},c:{a:0,b:1},m:["a","b"],title:"",ts:0};R=j.R||[];
OPEN={};shown="";repImg="";spcJoin=false;armed=0;spaceInit();S.tab=S.setup?"ini":"cfg";initSync();render();top0()}
const baseS=k=>Object.assign({p:"a",w:1,d:0,tab:"ini",kind:k,mm:{},cs:{},ts:{},code:newCode()},k=="solo"?{setup:1,auto:1}:{setup:0,startWz:3});
function newSpace(k){const my=C.n[ME()]||"Persona 1",mc=C.c[ME()]||0,solo=k=="solo";addSpace({S:baseS(k),L:{},H:[],C:{n:solo?{a:my}:{a:my,b:"Persona 2"},c:solo?{a:mc}:{a:mc,b:(typeof mc=="number"?(mc+1)%PAL.length:1)},m:solo?["a"]:["a","b"],title:"",ts:0},R:[]})}
let prevCUR=null;
function joinSpace(code){prevCUR=CUR;addSpace({S:Object.assign(baseS("duo"),{p:"b",setup:1,startWz:0,code,joining:1,auto:0}),L:{},H:[],C:{n:{a:"Persona 1",b:"Persona 2"},c:{a:0,b:1},m:["a","b"],title:"",ts:0},R:[]})}
function groupsCard(){const hasSolo=REG.some(r=>(spBlob(r.id).S||{}).kind=="solo");
return '<div class="card" id="groups"><div class="sub" style="align-items:center;margin:0"><h2 style="flex:1">Grupos</h2></div><div class="tg">Cada grupo tiene su propia rutina y sus propios datos.</div>'+REG.map(r=>{const b=spBlob(r.id),c=b.C||{n:{}},m=c.m||["a","b"],solo=(b.S||{}).kind=="solo";return'<button class="sc'+(r.id==CUR?" on":"")+'" data-a="ss" data-v="'+r.id+'"><span class="sct"><b>'+esc(spTitle(b))+'</b><small>'+(solo?"Rutina en solitario":m.length+" miembros")+'</small></span><span class="cd">›</span></button>'}).join("")+'<div class="gacts"><button class="btn" data-a="sn">Crear grupo</button>'+(hasSolo?"":'<button class="btn s" data-a="sns">Entrenar solo</button>')+'</div>'+(spcJoin?'<input class="wi" data-w="sj" placeholder="Pega el código del grupo" autocapitalize="off" autocorrect="off" style="margin-top:14px"><button class="btn big" data-a="sjc">Unirme</button>':'<button class="gl" data-a="sj">Tengo un código de un grupo</button>')+'</div>'}
const dk=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"),mon=d=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-(x.getDay()+6)%7);return x},SK=(w,d,p)=>(p||S.p)+"|"+w+"|"+R[d].id+"|_s",goal=()=>S.goal||Math.max(1,Math.min(R.length,3)),
FL='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c.8 3.6 5 5.3 5 10.5A5 5 0 0 1 7 12.5c0-2 .9-3.4 2-4.5 0 1.9.9 3 2 3-.5-3.6-1-6 1-9z"/></svg>';
function autoX(s){const on=num(s.k)>0&&num(s.r)>0;if(on&&!s.x){s.x=1;s.t=Date.now()}else if(!on)s.x=0}
function afterEdit(row,e,card){row.classList.toggle("ok",!!e.s[+row.dataset.j].x);card=card||row.closest(".card");const dn=e.s.filter(q=>q.x).length,all=dn==e.s.length,sm=card.querySelector(".cn small"),cd=card.querySelector(".cd");if(sm)sm.textContent=R[S.d].x[+card.dataset.i][1].replace(" x ","×")+" reps · "+dn+"/"+e.s.length;if(cd)cd.textContent=all?"✓":"›";card.classList.toggle("fin",all);topBar()}
function finCard(){const fr=L[SK(S.w,S.d)];return'<div class="card fc">'+(fr&&fr.fin?'<h2>Sesión terminada</h2><div class="tg">'+esc(new Date(fr.fin).toLocaleString("es",{weekday:"long",hour:"2-digit",minute:"2-digit"}))+'</div><button class="btn s big" data-a="ro">Reabrir sesión</button>':'<h2>¿Has terminado la sesión?</h2><div class="tg">Márcala como hecha cuando acabes todos los ejercicios.</div><button class="btn big" data-a="fin">Terminar sesión</button>')+'</div>'}
function finishSession(){let pr=0,sets=0;R[S.d].x.forEach((x,i)=>{const e=ent(i);if(!e)return;const pv=best(x[0],K(S.w,S.d,i));let bb=0;e.s.forEach(q=>{if(q.x){sets++;const k=num(q.k),r=num(q.r);if(k&&r)bb=Math.max(bb,e1(k,r))}});if(pv>0&&bb>pv*1.001){e.pr=1;pr++}});
if(!sets){toast("Apunta kilos y repeticiones primero");return}L[SK(S.w,S.d)]={s:[],fin:Date.now()};clearInterval(tm);$("#rest").style.display="none";save();toast(pr?"Sesión terminada · "+pr+(pr>1?" récords":" récord"):"Sesión terminada");render()}
function tdays(p){const o={};for(const k in L){if(k.indexOf(p+"|")!==0)continue;const e=L[k];if(e.fin)o[dk(new Date(e.fin))]=1;(e.s||[]).forEach(s=>{if(s.x&&s.t)o[dk(new Date(s.t))]=1})}return o}
function streaks(p){const D=tdays(p),G=goal(),W={};Object.keys(D).forEach(k=>{const a=k.split("-"),m=dk(mon(new Date(+a[0],+a[1]-1,+a[2])));W[m]=(W[m]||0)+1});
const now=mon(new Date()),cur=W[dk(now)]||0;let w=cur>=G?1:0;const cd=new Date(now);cd.setDate(cd.getDate()-7);while((W[dk(cd)]||0)>=G){w++;cd.setDate(cd.getDate()-7)}
let best=0,run=0,prev=null;Object.keys(W).filter(k=>W[k]>=G).sort().forEach(k=>{const a=k.split("-"),d=new Date(+a[0],+a[1]-1,+a[2]);run=prev&&Math.round((d-prev)/864e5)==7?run+1:1;prev=d;best=Math.max(best,run)});
let ds=0;const c=new Date();if(!D[dk(c)])c.setDate(c.getDate()-1);while(D[dk(c)]){ds++;c.setDate(c.getDate()-1)}
const dots=[];for(let i=0;i<7;i++){const d=new Date(now);d.setDate(d.getDate()+i);dots.push(!!D[dk(d)])}
return{w,ds,best:Math.max(best,w),cur,dots,ti:(new Date().getDay()+6)%7}}
function lastDay(p){let bi=-1,bt=0;R.forEach((r,di)=>{for(const k in L){const a=k.split("|");if(a[0]!==p||a[2]!==r.id)continue;(L[k].s||[]).forEach(s=>{if(s.t>bt){bt=s.t;bi=di}});if(L[k].fin>bt){bt=L[k].fin;bi=di}}});return bi}
const ME=()=>P.includes(S.me)?S.me:S.p;
const MOTIV=["La constancia le gana al talento.","Un entreno más que ayer.","El progreso no es lineal, pero sigue.","Hoy se entrena, mañana se agradece.","Poco a poco también se llega lejos.","La mejor rutina es la que se repite.","Cada serie cuenta.","Sin prisa, pero sin pausa."];
const mot=()=>MOTIV[Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/864e5)%MOTIV.length];
const greet=()=>{const h=new Date().getHours();return h<6?"Buenas noches":h<13?"Buenos días":h<20?"Buenas tardes":"Buenas noches"};
function ini(){const G=goal(),nd=R.length?(lastDay(ME())+1)%R.length:0,today=!!tdays(ME())[dk(new Date())];
const mine=ME(), q=streaks(mine);
const cards='<div class="card"><div class="rk"><span class="rfl">'+FL+'</span><b class="rnum">'+q.w+'</b><span class="rlbl">'+(q.w==1?"semana":"semanas")+' de racha</span></div><div class="pt" style="margin-top:7px">'+q.cur+'/'+G+' entrenos esta semana</div><div class="sbar"><i style="width:'+Math.min(100,Math.round(q.cur/G*100))+'%"></i></div><div class="dots">'+q.dots.map((o,i)=>'<span class="dt'+(o?" on":"")+(i==q.ti?" today":"")+'">'+(o?FL:"LMXJVSD"[i])+'</span>').join("")+'</div>'+(today||q.cur>=G?'<div class="win">'+(today?"Entreno de hoy hecho":"Meta semanal cumplida")+'</div>':"")+'<div class="mot">'+esc(mot())+'</div></div>';
$("#main").innerHTML=cards+groupsCard()+(R.length?'<div class="card"><h2>'+(today?"Hoy ya has entrenado":"Hoy toca")+'</h2><div class="tg">'+esc(R[nd].d)+'</div><button class="btn big" data-a="st" data-v="'+nd+'">'+(today?"Seguir entrenando":"Empezar entrenamiento")+'</button><div class="row" style="margin-top:10px">'+R.map((r,i)=>'<button class="chip" data-a="st" data-v="'+i+'" style="flex:none">'+esc(r.d)+'</button>').join("")+'</div></div>':'<div class="card"><h2>La rutina está vacía</h2><div class="tg">Crea una rutina desde cero o carga la de ejemplo para probar la app.</div><button class="btn" data-a="cre">Crear rutina</button><button class="btn s" data-a="ex">Usar la rutina de ejemplo</button></div>')+'<div class="card"><div class="sub" style="align-items:center;margin:0"><h2 style="flex:1">Rutina</h2><button class="chip" data-a="edt" style="flex:none">'+(S.editR?"Listo":"Editar")+'</button></div>'+(S.editR?'':'<div class="tg">'+(R.length?R.length+' día'+(R.length==1?'':'s')+' · '+R.reduce((a,r)=>a+r.x.length,0)+' ejercicios':'Todavía no tienes rutina')+'</div>'+(R.length?'<div class="row" style="margin-top:6px;flex-wrap:wrap">'+R.map(r=>'<span class="chip" style="flex:none">'+esc(r.d)+'</span>').join("")+'</div>':''))+'</div>'+(S.editR?routineEd():"")}
let CPOPEN=null,CPV=[0,1,1],cdrag=null,cpRaf2=0;
const h2r=(h,s,v)=>{const f=n=>{const k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1))};return[f(5),f(3),f(1)].map(x=>Math.round(x*255))},
toHex=a=>"#"+a.map(x=>x.toString(16).padStart(2,"0")).join(""),
hx2=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)),
r2h=a=>{const r=a[0]/255,g=a[1]/255,b=a[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;if(d){h=mx==r?((g-b)/d)%6:mx==g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return[h,mx?d/mx:0,mx]},
curHex=p=>typeof C.c[p]=="string"?C.c[p]:hex(p);
function cpHtml(){const h=CPV[0],hxv=toHex(h2r(CPV[0],CPV[1],CPV[2]));return'<div class="cp"><div class="sv" style="background:hsl('+h+',100%,50%)"><i class="svt" style="left:'+CPV[1]*100+'%;top:'+(1-CPV[2])*100+'%"></i></div><div class="hue"><i class="hut" style="left:'+h/360*100+'%"></i></div><div class="cpr"><span class="pv" style="background:'+hxv+'"></span><span class="pt">Arrastra para elegir. Se aplica al soltar.</span><button class="btn" data-a="cpx">Listo</button></div></div>'}
function cpPaint(){const q=document.querySelector(".cp");if(!q)return;const h=CPV[0],hxv=toHex(h2r(h,CPV[1],CPV[2])),sv=q.querySelector(".sv"),t=q.querySelector(".svt"),u=q.querySelector(".hut"),pv=q.querySelector(".pv"),hi=q.closest(".sub")||(q.parentNode&&q.parentNode.querySelector&&q.parentNode.querySelector(".hx"));
sv.style.background="hsl("+h+",100%,50%)";t.style.left=CPV[1]*100+"%";t.style.top=(1-CPV[2])*100+"%";u.style.left=h/360*100+"%";pv.style.background=hxv;const hh=q.parentNode.querySelector(".hx");if(hh)hh.value=hxv.toUpperCase()}
function cpMove(ev){if(!cdrag)return;if(ev.cancelable)ev.preventDefault();const r=cdrag.getBoundingClientRect(),x=Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width));if(cdrag.classList.contains("sv")){CPV[1]=x;CPV[2]=1-Math.min(1,Math.max(0,(ev.clientY-r.top)/r.height))}else CPV[0]=x*360;if(!cpRaf2)cpRaf2=raf(()=>{cpRaf2=0;cpPaint()})}
function cpCommit(){const p=CPOPEN;if(!p)return;C.c[p]=toHex(h2r(CPV[0],CPV[1],CPV[2]));save();applyColor();topBar()}
document.addEventListener("pointerdown",ev=>{const t=ev.target.closest&&ev.target.closest(".sv,.hue");if(!t)return;cdrag=t;try{t.setPointerCapture(ev.pointerId)}catch(e){}cpMove(ev)});
document.addEventListener("pointermove",ev=>{if(cdrag)cpMove(ev)});
const cpEnd=()=>{if(!cdrag)return;cdrag=null;cpCommit()};document.addEventListener("pointerup",cpEnd);document.addEventListener("pointercancel",cpEnd);
function weekDone(w){let d=0,t=0;R.forEach((r,di)=>r.x.forEach((x,i)=>{const n=par(x[1]).n;t+=n;const e=ent(i,w,di);if(e)d+=e.s.filter(s=>s.x).length}));return[d,t]}
const ring=p=>'<svg class="ring" viewBox="0 0 44 44" role="img" aria-label="'+p+'% del día"><circle cx="22" cy="22" r="18" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="22" cy="22" r="18" fill="none" stroke="var(--ok)" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+(p*1.131)+' 113.1" transform="rotate(-90 22 22)"/><text x="22" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">'+p+'%</text></svg>';
function topBar(){if(S.tab=="ini"){const d=new Date(),wd=d.toLocaleDateString("es-ES",{weekday:"long"}),fd=d.toLocaleDateString("es-ES",{day:"numeric",month:"long"});$("#top").innerHTML='<div class="hr"><div class="hg"><div class="nm">'+wd.charAt(0).toUpperCase()+wd.slice(1)+'</div><div class="pt">'+fd+'</div></div></div>';return}const D=R[S.d]||{x:[]},dd=D.x.reduce((a,x,i)=>{const e=ent(i);return a+(e?e.s.filter(s=>s.x).length:0)},0),dt=D.x.reduce((a,x)=>a+par(x[1]).n,0),pc=dt?Math.round(dd/dt*100):0,hr=new Date().getHours();
let h='<div class="hr"><button class="bk" data-a="bk" aria-label="Atrás">‹</button>';
if(S.tab=="hoy"&&P.length>1)h+='<button class="av-btn" data-a="pk" aria-label="Cambiar perfil">'+avt(S.p)+'</button><div class="hg"><div class="pt"><button class="spb" data-a="sp">'+esc(spTitle())+'</button> · '+syncTxt()+'</div><div class="nm">'+esc(C.n[S.p])+'</div></div>'+ring(pc);
else h+='<div class="hg"><div class="nm">'+(S.tab=="hoy"?"Entreno":S.tab=="prog"?"Progreso":"Ajustes")+'</div><div class="pt">'+syncTxt()+'</div></div>'+(S.tab=="hoy"?ring(pc):"");
h+='</div>';
if(S.tab=="hoy"&&P.length>1)h+='<div class="row" style="margin-bottom:8px">'+P.map(p=>'<button class="chip'+(p==S.p?" on":"")+'" data-a="vp" data-v="'+p+'" style="display:inline-flex;align-items:center;flex:none">'+avt(p)+esc(C.n[p])+'</button>').join("")+'</div>';
if(S.tab=="hoy")h+='<div class="seg">'+[1,2,3,4].map(w=>{const q=weekDone(w);return'<button class="'+(w==S.w?"on":"")+'" data-a="w" data-v="'+w+'">Sem '+w+'<i>'+(q[1]?Math.round(q[0]/q[1]*100):0)+'%</i></button>'}).join("")+'</div><div class="row" style="margin-top:8px">'+R.map((r,i)=>'<button class="chip'+(i==S.d?" on":"")+'" data-a="d" data-v="'+i+'">'+esc(r.d)+'</button>').join("")+'</div>';
if(mo()!==cm())h+='<div class="tip" style="margin-top:8px">Ya es otro mes. <button class="lnk" data-a="t" data-v="prog">Cierra el mes y envía las stats</button></div>';
$("#top").innerHTML=h}
function setRow(e,l,i,j){const s=e.s[j],ls=l&&l.s[j];return`<div class="set ${s.x?"ok":""}" data-i="${i}" data-j="${j}"><span class="n">${j+1}</span><div class="kg"><button data-a="m">−</button><input inputmode="decimal" data-f="k" value="${s.k}" placeholder="${ls&&ls.k?ls.k:"kg"}" aria-label="Kilos serie ${j+1}"><button data-a="pl">+</button></div><div class="kg"><button data-a="rm">−</button><input inputmode="numeric" data-f="r" value="${s.r}" placeholder="${ls&&ls.r?ls.r:"reps"}" aria-label="Repeticiones serie ${j+1}"><button data-a="rp">+</button></div></div>`}
const top0=()=>{scrollTo(0,0);const a=document.getElementById("app");if(a)a.scrollTop=0};let OPEN={};const buzz=()=>{try{navigator.vibrate&&navigator.vibrate(15)}catch(e){}};
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),2200)}
let SWAP=null;
const ALTS=[
[/press.*(pecho|banca)|pecho|apertura|pec/i,[["Press de banca con mancuernas","Más rango y control"],["Press inclinado en multipower","Otro ángulo, más seguro"],["Aperturas en polea","Aísla el pecho sin cargar el hombro"],["Fondos en máquina asistida","Pecho y tríceps"]]],
[/remo|jal[oó]n|dominada|pulldown|dorsal/i,[["Remo en máquina con pecho apoyado","Descarga la espalda baja"],["Jalón al pecho agarre neutro","Más rango y control"],["Remo con mancuerna a una mano","Unilateral, más estabilidad"],["Dominadas asistidas","Trabajo vertical completo"]]],
[/press.*hombro|militar|elevaci[oó]n.*lateral|p[aá]jaro|face ?pull|deltoide/i,[["Press militar en multipower","Guía el recorrido y permite cargar más"],["Elevaciones laterales en polea","Tensión constante"],["Pájaros en banco inclinado","Deltoide posterior"],["Face pull en polea alta","Hombro y postura"]]],
[/femoral|peso muerto rumano|hip thrust|gl[uú]teo|puente/i,[["Curl femoral tumbado","Cambia el ángulo de la cadera"],["Peso muerto rumano con mancuernas","Femoral y glúteo"],["Hip thrust en máquina","Glúteo con apoyo"],["Curl nórdico asistido","Femoral sin material"]]],
[/prensa|sentadilla|cu[aá]driceps|p[eé]ndulo|hack|zancada/i,[["Prensa inclinada","Menos carga axial"],["Sentadilla en multipower","Guía y control"],["Extensión de cuádriceps","Aísla el cuádriceps"],["Zancadas con mancuernas","Unilateral y glúteo"]]],
[/gemelo|calf|s[oó]leo/i,[["Gemelo de pie en máquina","Más rango"],["Gemelo sentado","Sóleo"],["Gemelo en prensa","Carga alta y segura"],["Gemelo a una pierna","Unilateral"]]],
[/aductor|abductor/i,[["Aductores en máquina","Aísla el aductor"],["Abductores en máquina","Aísla el glúteo medio"],["Sentadilla sumo","Aductores con carga"],["Zancada lateral","Aductor y glúteo"]]],
[/curl(?!.*femoral)|b[ií]ceps|predicador/i,[["Curl con mancuernas alterno","Más rango"],["Curl en polea baja","Tensión constante"],["Curl martillo","Braquial y antebrazo"],["Curl en banco inclinado","Estiramiento del bíceps"]]],
[/tr[ií]ceps|fondo|press cerrado/i,[["Extensión de tríceps en polea","Tensión constante"],["Press francés","Cabeza larga del tríceps"],["Fondos en máquina asistida","Pecho y tríceps"],["Extensión sobre la cabeza en polea","Estiramiento"]]],
[/abdomen|plancha|core|crunch|rueda/i,[["Plancha frontal","Core sin material"],["Rueda abdominal","Anti-extensión"],["Crunch en polea alta","Carga progresiva"],["Elevación de piernas colgado","Core bajo"]]]
];
const ALTGEN=[["Máquina de empuje asistido","Mismo patrón, más seguro"],["Mancuernas libres","Más control y rango"],["Polea alta","Tensión constante"],["Máquina guiada","Menos técnica requerida"]];
function suggestLocal(nm,off){const n=String(nm||"").toLowerCase();let arr=null;for(const [re,q] of ALTS){if(re.test(n)){arr=q.filter(a=>a[0].toLowerCase()!==n);break}}if(!arr||!arr.length)arr=ALTGEN;const o=(off||0)%arr.length;return arr.concat(arr).slice(o,o+3)}
const AI_MAX=8,aiDay=()=>new Date().toISOString().slice(0,10);
function aiUse(){let u={d:aiDay(),n:0};try{u=Object.assign(u,JSON.parse(localStorage.getItem("gd-ai-use")||"{}"))}catch(e){}if(u.d!==aiDay())u={d:aiDay(),n:0};return u}
function aiLeft(){return Math.max(0,AI_MAX-aiUse().n)}
function aiCacheGet(nm){try{const c=JSON.parse(localStorage.getItem("gd-altcache")||"{}"),v=c[nm];if(v&&v.d===aiDay())return v.items}catch(e){}return null}
function aiCacheSet(nm,items){try{const c=JSON.parse(localStorage.getItem("gd-altcache")||"{}"),k=Object.keys(c);if(k.length>40)k.slice(0,20).forEach(x=>delete c[x]);c[nm]={d:aiDay(),items};localStorage.setItem("gd-altcache",JSON.stringify(c))}catch(e){}}
async function aiSuggest(nm){const hit=aiCacheGet(nm);if(hit)return hit;const u=aiUse();if(u.n>=AI_MAX)throw new Error("Has usado las "+AI_MAX+" consultas IA de hoy");u.n++;localStorage.setItem("gd-ai-use",JSON.stringify(u));
const r=await fetch(SB_URL+"/functions/v1/suggest",{method:"POST",headers:{"Content-Type":"application/json","apikey":SB_KEY},body:JSON.stringify({exercise:nm,day:(R[S.d]||{}).d||"",space:S.code})});
if(!r.ok)throw new Error("La IA no está disponible ahora mismo");const j=await r.json(),items=(j.items||[]).filter(x=>x&&x.nombre).slice(0,3).map(x=>[x.nombre,x.razon||""]);if(!items.length)throw new Error("La IA no devolvió sugerencias");aiCacheSet(nm,items);return items}
function swapPanel(i){if(!SWAP||SWAP.i!==i)return'';return'<div class="swbox">'+SWAP.items.map((a,k)=>'<button class="swi" data-a="swa" data-i="'+i+'" data-k="'+k+'"><b>'+esc(a[0])+'</b><span>'+esc(a[1]||"")+'</span></button>').join("")+'<div class="swfoot"><button class="lnk" data-a="swn" data-i="'+i+'">↻ Otras</button><button class="lnk" data-a="swai" data-i="'+i+'">✨ Pedir a la IA ('+aiLeft()+' hoy)</button><button class="lnk" data-a="swc" data-i="'+i+'">Cerrar</button></div>'+(SWAP.note?'<div class="pt" style="margin-top:6px">'+esc(SWAP.note)+'</div>':'')+'</div>'}
function hoy(){const D=R[S.d];if(!D||!D.x.length){$("#main").innerHTML='<div class="card"><h2>La rutina está vacía</h2><div class="tg">Crea una rutina o empieza con la de ejemplo.</div><button class="btn" data-a="cre">Crear rutina</button><button class="btn s" data-a="ex">Usar la rutina de ejemplo</button></div>';return}
$("#main").innerHTML=(P.length>1&&S.p!==S.me?'<div class="tip up" style="margin-bottom:10px">Estás apuntando en el registro de <b>'+esc(C.n[S.p])+'</b>: puedes subir o bajar sus kilos y repeticiones.</div>':"")+D.x.map(([nm,t],i)=>{const e=ent(i)||{s:Array.from({length:par(t).n},()=>({k:"",r:"",x:0})),rpe:"",n:""},l=last(i),p=par(t),dn=e.s.filter(s=>s.x).length,all=dn==e.s.length,key=K(S.w,S.d,i),op=key in OPEN?OPEN[key]:!all;let tip="";
if(l){const ls=l.s.filter(s=>s.k!=="");tip="Última vez: "+ls.map(s=>f(s.k)+"×"+(s.r||"?")).join(" · ");const up=ls.length&&ls.every(s=>num(s.r)>=p.hi);tip='<div class="tip '+(up?"up":"")+'">'+tip+(up?" — todas en el tope: <b>sube ~2,5 kg</b>":"")+'</div>'}else tip='<div class="tip">Primera vez: elige un peso con el que llegues a '+p.lo+' reps y 1–2 en reserva.</div>';
return'<section class="card'+(op?"":" cl")+(all?" fin":"")+'" data-i="'+i+'" data-k="'+key+'"><div class="chd"><button class="ch" data-a="tg" aria-expanded="'+op+'"><span class="cn"><b>'+esc(nm)+(e.pr?'<span class="pr">RÉCORD</span>':"")+'</b><small>'+t.replace(" x ","×")+' reps · '+dn+'/'+e.s.length+'</small></span></button><span class="swx" data-a="swp" data-i="'+i+'" role="button" tabindex="0" aria-label="Cambiar ejercicio por otro">↻</span><span class="cd">'+(all?"✓":"›")+'</span></div><div class="cb"><div class="in">'+swapPanel(i)+(l?'<button class="lnk" data-a="cp">Copiar última</button>':"")+tip+'<div class="seth"><span>#</span><span>Peso</span><span>Reps</span></div>'+e.s.map((_,j)=>setRow(e,l,i,j)).join("")+'<div class="sub"><input class="rpe" inputmode="decimal" data-f="rpe" value="'+e.rpe+'" placeholder="RPE"><input data-f="n" value="'+esc(e.n)+'" placeholder="Notas (máquina, dolor, ajuste…)"></div></div></div></section>'}).join("")+finCard()}
function tiles(){const s=stats(ME()),v=weekVol(ME()),mx=Math.max(1,...v),tv=v.reduce((a,b)=>a+b,0);return'<div class="tl">'+[[s.ses,"sesiones"],[(s.tot?Math.round(s.done/s.tot*100):0)+"%","series"],[f(Math.round(s.vol/100)/10)+" t","volumen"],[s.pr,"récords"]].map(q=>'<div><b>'+q[0]+'</b><span>'+q[1]+'</span></div>').join("")+'</div><div class="card"><h2>Volumen por semana</h2>'+(tv?'<div class="bars">'+v.map((x,i)=>'<div class="bc"><span class="bv">'+(x?f(Math.round(x/100)/10)+"t":"—")+'</span><div class="bw"><div class="bb" style="height:'+(x?Math.max(4,Math.round(x/mx*100)):0)+'%"></div></div><small>S'+(i+1)+'</small></div>').join("")+'</div>':'')+(tv?'':'<div class="bempty">Aún no hay series registradas esta semana.</div>')+'</div>'}
function prog(){const names=[...new Set(R.flatMap(r=>r.x.map(x=>x[0])))];let vol=0;
for(const key in L){const a=key.split("|");if(a[0]==ME()&&a[1]==S.w)L[key].s.forEach(s=>{if(s.x)vol+=(num(s.k)||0)*(num(s.r)||0)})}
const rows=names.map(nm=>{const byW={};let b=null;for(const key in L){const a=key.split("|");if(a[0]!==ME()||nameOf(a[2],a[3])!==nm)continue;L[key].s.forEach(s=>{const k=num(s.k),r=num(s.r);if(s.x&&k&&r){const v=e1(k,r);byW[a[1]]=Math.max(byW[a[1]]||0,v);if(!b||v>b.v)b={v,k,r}}})}
const ws=Object.keys(byW).sort();if(!b)return"";const d=byW[ws[ws.length-1]]-byW[ws[0]];return`<b>${esc(nm)}</b><b>${f(b.k)}×${b.r}</b><span class="pt">${ws.length} sem. con datos</span><span class="${d>0?"up2":"pt"}">${ws.length>1?(d>=0?"+":"")+f(d.toFixed(1))+" kg est.":"—"}</span>`}).join("");
$("#main").innerHTML=tiles()+`<div class="card"><h2>Semana ${S.w}</h2><div class="tg">Volumen: <b>${Math.round(vol).toLocaleString("es")} kg</b> (kg × reps de series hechas)</div></div><div class="card"><h2>Mejor serie por ejercicio</h2><div class="tg">Cambio = fuerza estimada (1RM) entre la 1ª y la última semana.</div><div class="pg">${rows||'<span class="pt">Rellena peso y reps para ver el progreso aquí.</span>'}</div></div>${closeCard()}<div class="card"><h2>Copia de seguridad</h2><div class="tg">Los datos viven en este móvil. Copia el código y guárdalo (notas, mensaje a ti mismo).</div><textarea id="bk"></textarea><button class="btn" data-a="exp">Copiar</button><button class="btn s" data-a="imp">Restaurar</button></div>`}
let lastView="";
function enterAnim(){const k=[S.tab,S.p,S.w,S.d,S.editR?1:0,S.code].join("|");if(k===lastView)return;lastView=k;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const els=[...$("#main").children];els.forEach((el,i)=>el.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:480,delay:Math.min(i,4)*40,easing:"cubic-bezier(.2,.8,.2,1)",fill:"backwards"}))}
function planPaint(){const el=$("#planScr");if(!el)return;const on=S.setup&&!S.planDone;el.style.display=on?"block":"none";if(!on)return;const G=goal(),obj=S.obj||(S.kind=="duo"?"grupo":"solo"),MD=[["solo","Entrenar solo","Rutina y progreso propios"],["grupo","Entrenar en grupo","Dúo, trío o equipo"],["guia","Acompañar y spotear","Apuntar series y cuidar la técnica"],["mirar","Guiar (coach o familia)","Supervisar la sesión de otra persona"]];el.innerHTML='<div class="pscr"><div class="pw"><div class="hi">\u00a1Hola!</div><h1>Bienvenido a '+APP_NAME+'</h1><div class="pt">Elige cómo vas a usar Buddy; se guarda solo.</div><div class="lbl">D\u00edas por semana</div><div class="planrow"><button class="gb" data-a="gm" aria-label="Menos">\u2212</button><b>'+G+'</b><button class="gb" data-a="gp" aria-label="M\u00e1s">+</button></div><div class="lbl">Objetivo</div><div class="pmodes">'+MD.map(m=>'<button class="pm'+(m[0]===obj?" on":"")+'" data-a="ob" data-v="'+m[0]+'"><b>'+m[1]+'</b><span>'+m[2]+'</span></button>').join("")+'</div><button class="btn big" data-a="pdone">Empezar</button></div></div>'}
function render(){if(S.tab=="grp")S.tab="ini";if(S.d>=R.length)S.d=0;applyColor();topBar();S.tab=="ini"?ini():S.tab=="hoy"?hoy():S.tab=="cfg"?cfg():prog();document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.v==(S.tab=="hoy"?"ini":S.tab)));$("#fab").style.display=S.tab=="hoy"?"block":"none";document.querySelector("nav").style.display=S.setup?"flex":"none";enterAnim();wizPaint();planPaint();save()}
let tm,sec=0,restTot=90;function rest(n=90){clearInterval(tm);sec=n;restTot=n;$("#rest").style.display="flex";const u=()=>{$("#rt").textContent=Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0");$("#rb").style.width=(sec/restTot*100)+"%";if(sec--<=0){clearInterval(tm);try{navigator.vibrate&&navigator.vibrate(300)}catch(e){}$("#rest").style.display="none"}};u();tm=setInterval(u,1000)}
$("#rp").onclick=()=>{sec+=30;restTot+=30};$("#rx").onclick=()=>{clearInterval(tm);$("#rest").style.display="none"};
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,v=b.dataset.v,row=b.closest(".set"),card=b.closest(".card");
if(a=="p"){S.p=v;S.w=autoW();render()}else if(a=="w"){SWAP=null;S.w=+v;render()}else if(a=="d"){SWAP=null;S.d=+v;render();top0()}else if(a=="t"){SWAP=null;S.tab=v;render();top0()}
else if(a=="m"||a=="pl"){const i=+row.dataset.i,j=+row.dataset.j,e=ensure(i),s=e.s[j],l=last(i),base=[num(s.k),l&&l.s[j]?num(l.s[j].k):null,0].find(v=>v!==null&&v!==undefined),n=Math.max(0,base+(a=="pl"?2.5:-2.5));s.k=String(n);row.querySelector('[data-f="k"]').value=f(n);autoX(s);afterEdit(row,e);save()}
else if(a=="rm"||a=="rp"){const i=+row.dataset.i,j=+row.dataset.j,e=ensure(i),s=e.s[j],l=last(i),q=par(R[S.d].x[i][1]),base=[num(s.r),l&&l.s[j]?num(l.s[j].r):null,q.lo].find(v=>v!==null&&v!==undefined),n=num(s.r)===null?Math.round(base):Math.max(0,Math.round(base)+(a=="rp"?1:-1));s.r=String(n);row.querySelector('[data-f="r"]').value=n;autoX(s);afterEdit(row,e);save()}
else if(a=="cp"){const i=+card.dataset.i,e=ensure(i),l=last(i);l.s.forEach((s,j)=>{if(e.s[j]){e.s[j].k=s.k;e.s[j].r=s.r;autoX(e.s[j])}});save();hoy()}
else if(a=="ck"){const i=+row.dataset.i,j=+row.dataset.j,e=ensure(i),s=e.s[j],l=last(i),p=par(R[S.d].x[i][1]);
if(!s.x){if(s.k==="")s.k=l&&l.s[j]&&l.s[j].k||"";if(s.r==="")s.r=l&&l.s[j]&&l.s[j].r||String(p.lo);if(s.k===""){row.querySelector('[data-f="k"]').focus();return}
const k=num(s.k),r=num(s.r),nm=R[S.d].x[i][0],pr=best(nm,K(S.w,S.d,i));s.x=1;s.t=Date.now();if(k&&r&&pr&&e1(k,r)>pr*1.001)e.pr=1;rest(90)}else s.x=0;
row.classList.toggle("ok",!!s.x);row.querySelector('[data-f="k"]').value=s.k;row.querySelector('[data-f="r"]').value=s.r;
const dn=e.s.filter(q=>q.x).length,all=dn==e.s.length;card.querySelector(".cn small").textContent=R[S.d].x[i][1].replace(" x ","×")+" reps · "+dn+"/"+e.s.length;card.querySelector(".cd").textContent=all?"✓":"›";card.classList.toggle("fin",all);
if(s.x){buzz();if(e.pr&&!card.querySelector(".pr")){card.querySelector(".cn b").insertAdjacentHTML("beforeend",'<span class="pr">RÉCORD</span>');toast("¡Nuevo récord!")}
if(all){OPEN[card.dataset.k]=false;setTimeout(()=>{card.classList.add("cl");const nx=card.nextElementSibling;if(nx)nx.scrollIntoView({behavior:"smooth",block:"start"})},500)}}
save();topBar()}
else if(a=="tg"){const c=b.closest(".card"),op=c.classList.contains("cl");OPEN[c.dataset.k]=op;c.classList.toggle("cl",!op);b.setAttribute("aria-expanded",op)}
else if(a=="edt"){S.editR=S.editR?0:1;render()}
else if(a=="cre"){S.tab="ini";S.editR=1;render();top0()}
else if(a=="swp"){const i=+b.dataset.i;OPEN[K(S.w,S.d,i)]=true;SWAP={i,items:suggestLocal(R[S.d].x[i][0],0),off:0,note:"Sugerencias locales · sin coste"};render()}
else if(a=="swa"){const i=+b.dataset.i,k=+b.dataset.k;if(SWAP&&SWAP.items[k]){R[S.d].x[i][0]=SWAP.items[k][0];SWAP=null;save();render();toast("Ejercicio cambiado")}}
else if(a=="swn"){if(SWAP){SWAP.off=(SWAP.off||0)+1;SWAP.items=suggestLocal(R[S.d].x[SWAP.i][0],SWAP.off);SWAP.note="Sugerencias locales · sin coste";render()}}
else if(a=="swai"){(async()=>{if(!SWAP)return;const i=SWAP.i;b.textContent="Consultando…";try{const items=await aiSuggest(R[S.d].x[i][0]);SWAP={i,items,off:0,note:"Sugerencias de IA · quedan "+aiLeft()+" hoy"};render()}catch(e){toast(e.message||"IA no disponible");SWAP={i,items:suggestLocal(R[S.d].x[i][0],0),off:0,note:"IA no disponible · sugerencias locales"};render()}})()}
else if(a=="swc"){SWAP=null;render()}
else if(a=="wj"){S.wzErr="";wz=1;render()}
else if(a=="wb"){S.wzErr="";wz=(wz==2||wz==3?4:0);render()}
else if(a=="ws"){C.m=["a"];P=C.m;S.kind="solo";S.setup=1;S.p="a";S.me="a";S.auto=1;S.tab="ini";wz=0;render()}
else if(a=="wa"){wz=3;render()}
else if(a=="cpo"){const p=b.dataset.p;CPOPEN=CPOPEN==p?null:p;if(CPOPEN)CPV=r2h(hx2(curHex(p)));render()}
else if(a=="cpx"){cpCommit();CPOPEN=null;render()}
else if(a=="am"){const n=P.length+1,id=String.fromCharCode(96+n);C.m.push(id);C.n[id]="Persona "+n;C.c[id]=(n-1)%PAL.length;P=C.m;lastStr[id]=str(id);render()}
else if(a=="bk"){S.tab="ini";render();top0()}
else if(a=="vp"){SWAP=null;S.p=b.dataset.v;S.w=autoW();render()}else if(a=="own"){S.me=b.dataset.v;S.p=S.me;S.w=autoW();SWAP=null;render()}else if(a=="me"){S.p=ME();S.w=autoW();SWAP=null;render()}
else if(a=="st"){SWAP=null;S.d=+b.dataset.v;S.tab="hoy";S.w=autoW();render();top0()}
else if(a=="gm"){S.goal=Math.max(1,goal()-1);render()}
else if(a=="gp"){S.goal=Math.min(7,goal()+1);render()}
else if(a=="ob"){S.obj=v;render()}else if(a=="pdone"){S.planDone=1;if(!S.obj)S.obj=S.kind=="duo"?"grupo":"solo";render();window.scrollTo(0,0)}
else if(a=="rs"){rest(90)}
else if(a=="fin"){finishSession()}
else if(a=="ro"){delete L[SK(S.w,S.d)];save();render()}
else if(a=="ex"){R=JSON.parse(DEFR);S.d=0;save();render()}
else if(a=="sp"){S.tab="ini";render();top0();setTimeout(()=>{const g=$("#groups");g&&g.scrollIntoView({block:"start",behavior:"smooth"})},60)}
else if(a=="sx"){S.tab="hoy";render()}
else if(a=="ss"){const id=b.dataset.v;if(id!=CUR)switchTo(id);S.tab="hoy";render();top0()}
else if(a=="sn"){newSpace("duo")}
else if(a=="sns"){newSpace("solo");toast("Espacio creado. Crea la rutina para empezar.");render();setTimeout(()=>{const c=document.querySelector('[data-a="cre"]');if(c)c.closest(".card").scrollIntoView({block:"center"})},140)}
else if(a=="sj"){spcJoin=true;render()}
else if(a=="sjc"){const v=spcCd.replace(/[^A-Za-z0-9_-]/g,"");if(v.length<16){b.textContent="Código no válido";return}joinSpace(v)}

else if(a=="wp"){wz=4;render()}
else if(a=="wq"){if(!wzPa.trim()){b.textContent="Escribe su nombre";return}C.n.b=wzPa.trim();wz=3;render();clearTimeout(pushT);pushNow()}
else if(a=="cc"){try{navigator.clipboard.writeText(S.code);b.textContent="Copiado ✓"}catch(e){b.textContent="Mantén pulsado el código para copiarlo"}}
else if(a=="we"){S.kind="duo";S.setup=1;S.p="a";S.me="a";S.auto=1;S.tab="ini";wz=0;render();window.scrollTo(0,0);if(!R.length){toast("Grupo creado. Crea la rutina para empezar.");setTimeout(()=>{const c=document.querySelector('[data-a="cre"]');if(c)c.closest(".card").scrollIntoView({block:"center"})},140)}}
else if(a=="wc"){const v=wzCd.replace(/[^A-Za-z0-9_-]/g,"");if(v.length<16){S.wzErr="El código debe tener al menos 16 caracteres.";render();return}S.wzErr="";S.code=v;S.p="b";S.setup=1;S.joining=1;S.auto=0;S.tab="hoy";save();switchTo(CUR)}

else if(a=="pk"){S.tab="ini";render();top0();setTimeout(()=>{const g=$("#groups");g&&g.scrollIntoView({block:"start",behavior:"smooth"})},60)}

else if(a=="go"){if(!okN(C.n.a)||!okN(C.n.b)){b.textContent="Escribe los dos nombres";return}S.setup=1;S.tab="ini";render();window.scrollTo(0,0);if(!R.length){toast("Grupo creado. Crea la rutina para empezar.");setTimeout(()=>{const c=document.querySelector('[data-a="cre"]');if(c)c.closest(".card").scrollIntoView({block:"center"})},140)}}
else if(a=="col"){C.c[b.dataset.p]=+b.dataset.v;render()}
else if(a=="ad"){R.push({d:"Día "+(R.length+1),id:uid(),x:[]});render()}
else if(a=="ax"){R[+b.dataset.di].x.push(["Nuevo ejercicio","3 x 8-12",uid()]);render()}
else if(a=="dd"||a=="dx"){if(arm2!==b){arm2=b;b.textContent="¿Seguro?";return}arm2=null;const di=+b.dataset.di;if(a=="dd"){R.splice(di,1)}else R[di].x.splice(+b.dataset.i,1);render()}
else if(a=="shc"){const lk=location.origin+location.pathname+"#j="+S.code,tx="Invitaci\u00f3n al grupo de "+APP_NAME+": "+lk;try{navigator.share({text:tx}).catch(()=>{})}catch(e){try{navigator.clipboard.writeText(tx);b.textContent="Enlace copiado"}catch(x){}}}
else if(a=="sc"){const v=document.getElementById("cd").value.replace(/[^A-Za-z0-9_-]/g,"");if(v.length<16){b.textContent="Mínimo 16 letras o números";return}joinSpace(v)}
else if(a=="cl"){closeMonth()}
else if(a=="send"){location.href="mailto:"+(S.mail||"")+"?subject="+encodeURIComponent("Rutina · "+mo())+"&body="+encodeURIComponent(shown)}
else if(a=="share"){try{navigator.share({title:"Rutina",text:shown}).catch(()=>{})}catch(e){}}
else if(a=="rs"){if(!armed){armed=1;b.textContent="¿Seguro? Toca otra vez"}else resetMonth()}
else if(a=="rep"){_cv=report();repImg=_cv.toDataURL("image/png");render()}
else if(a=="dl"){_cv.toBlob(async bl=>{const nm="informe-"+mo()+".png";try{const fl=new File([bl],nm,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[fl]})){await navigator.share({files:[fl],title:nm});return}}catch(e){if(e&&e.name=="AbortError")return}const u=URL.createObjectURL(bl),an=document.createElement("a");an.href=u;an.download=nm;document.body.appendChild(an);an.click();an.remove()})}
else if(a=="exp"){const t=$("#bk");t.value=JSON.stringify({L,H});t.select();try{navigator.clipboard.writeText(t.value)}catch(e){}b.textContent="Copiado"}
else if(a=="imp"){try{const j=JSON.parse($("#bk").value);if(j.L){L=j.L;if(j.H)H=j.H;save();render()}}catch(e){b.textContent="Código no válido"}}});
document.addEventListener("input",ev=>{const t=ev.target,fl=t.dataset.f;if(!fl)return;const row=t.closest(".set"),card=t.closest(".card"),e=ensure(+card.dataset.i);if(row)e.s[+row.dataset.j][fl]=t.value;else e[fl]=t.value;if(row&&(fl=="k"||fl=="r")){autoX(e.s[+row.dataset.j]);afterEdit(row,e,card)}save()});
wz=S.wzErr?1:(S.startWz||0);if(okN(C.n.a))wzMe=C.n.a;if(!S.me)S.me=S.p;S.tab=S.setup?"ini":S.tab;P.forEach(p=>{lastStr[p]=str(p)});lastCfg=cfgStr();S.w=autoW();try{render()}catch(err){document.getElementById("main").innerHTML='<div class="card"><h2>Error</h2><p>'+String(err&&err.message||err)+'</p></div>'}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState=="hidden")pushNow()});addEventListener("pagehide",pushNow);try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",render)}catch(e){}
const jc=((location.hash.match(/#j=([A-Za-z0-9_-]{16,})/)||[])[1]||new URLSearchParams(location.search).get("c")||"").replace(/[^A-Za-z0-9_-]/g,"");if(jc.length>=16&&jc!==S.code){history.replaceState(null,"",location.pathname);joinSpace(jc)}
initSync();addEventListener("online",()=>{if(!fb)initSync()});if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
if(globalThis.__pend){const f=globalThis.__pend;globalThis.__pend=null;f()}
