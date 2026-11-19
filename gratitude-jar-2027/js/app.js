(function(){
  var $=function(s){return document.querySelector(s)};
  var IDS=[['heart','Heart'],['star','Star'],['sun','Sun'],['chai','Chai cup'],['rain','Rain cloud'],['flower','Flower'],['moon','Moon'],['sparkle','Sparkle']];
  var MOODS=[['sunny','Sunny','sun','#FFE08A'],['bloom','Blooming','flower','#FFB3D1'],['calm','Calm','leaf','#B5EAD7'],['rainy','Rainy','rain','#B8DBFF'],['starry','Starry','moon','#D5C6FF'],['cozy','Cozy','chai','#FFC9A8']];
  var FONTS=[['Scribble',"'Caveat',cursive",29,500],['Neat',"'Kalam',cursive",21,400],['Cute',"'Gaegu',cursive",26,400],['Marker',"'Shantell Sans',sans-serif",20,500],['Fancy',"'Dancing Script',cursive",25,500],['Typewriter',"'Special Elite',monospace",19,400]];
  var INKS=[['Plum','#3B2A4A'],['Berry','#D9366F'],['Blue','#2F6FDE'],['Green','#2E8B6A']];
  var SHAPES=[['classic','Classic'],['heart','Heart'],['star','Star'],['ticket','Ticket stub']];
  var HINTS=['the first sip of chai','my sister’s phone call','rain that cooled the evening','a green signal on every turn','finishing a book I loved','someone holding the door','warm rotis for lunch','a quiet walk after dinner'];
  var MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var MC=['#FFE9A8','#FFC7DD','#C8F0DE','#C6E2FF','#E0D4FF','#FFD6BD','#FFF3A3','#FFC2C2','#D6F2B8','#BDEBEF','#F2CBF2','#DADAF7'];

  /* jar designs: body outline, lid art, where slips sit inside (left%, right%, top%, bottom%) */
  var RIBS='<g stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"><line x1="100" y1="44" x2="100" y2="62"/><line x1="125" y1="44" x2="125" y2="62"/><line x1="150" y1="44" x2="150" y2="62"/><line x1="175" y1="44" x2="175" y2="62"/><line x1="200" y1="44" x2="200" y2="62"/></g>';
  var JARS={
    classic:{name:'Classic',body:'M84 66H216V92C246 98 262 112 262 140V318C262 346 242 362 214 362H86C58 362 38 346 38 318V140C38 112 54 98 84 92Z',reg:[14,14,30,5],
      lid:'<rect x="128" y="22" width="44" height="16" rx="8" fill="#FFE08A"/><rect x="70" y="36" width="160" height="34" rx="11" fill="#FFB3D1"/>'+RIBS,
      twine:'<path d="M80 88Q150 102 220 88" fill="none" stroke="#E3A93B" stroke-width="4.5" stroke-linecap="round"/><g stroke="#3B2A4A" stroke-width="2" stroke-linejoin="round"><ellipse cx="136" cy="98" rx="14" ry="8" fill="#FFB3D1" transform="rotate(-18 136 98)"/><ellipse cx="164" cy="98" rx="14" ry="8" fill="#FFB3D1" transform="rotate(18 164 98)"/><circle cx="150" cy="99" r="5.5" fill="#FF8FB3"/></g>',
      hi:'<path d="M58 146V298" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9" fill="none"/><path d="M58 316V322" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9" fill="none"/>'},
    round:{name:'Round',body:'M70 82H230V100C262 110 272 134 272 166V296C272 338 242 362 202 362H98C58 362 28 338 28 296V166C28 134 38 110 70 100Z',reg:[11,11,32,5],
      lid:'<rect x="132" y="34" width="36" height="20" rx="10" fill="#FFE08A"/><rect x="62" y="50" width="176" height="34" rx="17" fill="#B5EAD7"/>'+RIBS.replace(/y1="44"/g,'y1="58"').replace(/y2="62"/g,'y2="76"'),
      twine:'<path d="M70 96Q150 110 230 96" fill="none" stroke="#7BC8A6" stroke-width="4.5" stroke-linecap="round"/>',
      hi:'<path d="M50 176V296" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9" fill="none"/><path d="M62 328Q70 340 84 346" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".9" fill="none"/>'},
    lantern:{name:'Lantern',body:'M72 74H228V98L248 118V332C248 349 236 362 218 362H82C64 362 52 349 52 332V118L72 98Z',reg:[19,19,33,5],
      lid:'<path d="M130 40V28C130 12 170 12 170 28V40" fill="none" stroke-width="5"/><path d="M58 76L84 40H216L242 76Z" fill="#FFD27A"/><line x1="100" y1="52" x2="96" y2="68" stroke="#fff" stroke-width="3" opacity=".6"/><line x1="150" y1="52" x2="150" y2="68" stroke="#fff" stroke-width="3" opacity=".6"/><line x1="200" y1="52" x2="204" y2="68" stroke="#fff" stroke-width="3" opacity=".6"/>',
      twine:'<path d="M72 106H228" stroke="#3B2A4A" stroke-width="3" fill="none"/>',
      hi:'<path d="M70 150V310" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9" fill="none"/><path d="M96 78V90" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9" fill="none"/>'}
  };

  var state={shape:'classic',font:0,ink:0,mood:null,jar:'classic',charm:null};
  var items=[], sel=null, entries=[], mine=0, placed=0, busy=false, nid=0;
  var hintIx=Math.floor(Math.random()*HINTS.length);
  var note=$('#note'), card=$('#card'), grab=$('#grab'), stage=$('#stage'), slips=$('#slips'), layer=$('#layer'), paper=$('#paper'), wrap=$('#paperWrap');
  var monthIx=new Date().getMonth(), monthColor=MC[monthIx];

  function sticker(id){return '<svg class="sticker" viewBox="0 0 40 40" aria-hidden="true"><use href="#st-'+id+'"/></svg>';}
  function rand(a,b){return a+Math.random()*(b-a);}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function el(tag,cls,text){var e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; return e;}

  /* ---- shape polygons ---- */
  function norm(xs,ys){
    var x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys);
    return {poly:'polygon('+xs.map(function(x,i){return ((x-x0)/(x1-x0)*100).toFixed(1)+'% '+((ys[i]-y0)/(y1-y0)*100).toFixed(1)+'%';}).join(',')+')',aspect:(x1-x0)/(y1-y0)};
  }
  (function(){
    var xs=[],ys=[],i,t;
    for(i=0;i<80;i++){t=i/80*2*Math.PI; xs.push(16*Math.pow(Math.sin(t),3)); ys.push(-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)));}
    var h=norm(xs,ys);
    var sx=[],sy=[];
    for(i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5, r=i%2?0.58:1; sx.push(Math.cos(a)*r); sy.push(Math.sin(a)*r);}
    var s=norm(sx,sy);
    var root=document.documentElement.style;
    root.setProperty('--clip-heart',h.poly); root.setProperty('--aspect-heart',h.aspect.toFixed(3));
    root.setProperty('--clip-star',s.poly); root.setProperty('--aspect-star',s.aspect.toFixed(3));
    root.setProperty('--pc',monthColor);
  })();

  /* ---- date + countdown ---- */
  var now=new Date();
  try{ $('#dateLine').textContent=new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long'}).format(now); }catch(e){}
  $('#practiceTag').textContent='practice · '+MN[monthIx]+' paper';
  var doy=Math.floor((now-new Date(now.getFullYear(),0,0))/864e5);
  $('#stubNo').textContent='No. '+('00'+doy).slice(-3);
  var days=Math.ceil((new Date(2027,0,1)-now)/864e5);
  if(days>1){ $('#pillDays').textContent=days+' days to go'; $('#finalDays').textContent=days+' days to go'; }
  else if(days===1){ $('#pillDays').textContent='Opens tomorrow'; $('#finalDays').textContent='Opens tomorrow'; }
  else { $('#pillDays').textContent='Open now'; $('#finalDays').textContent='It’s open'; }

  /* ---- paper shape ---- */
  var shapeRow=$('#shapes');
  SHAPES.forEach(function(s,i){
    var b=el('button','chip-btn',s[1]); b.type='button'; b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      state.shape=s[0]; paper.dataset.shape=s[0]; wrap.dataset.shape=s[0];
      Array.prototype.forEach.call(shapeRow.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      grow();
    });
    shapeRow.appendChild(b);
  });

  /* ---- handwriting + ink ---- */
  var fontRow=$('#fonts'), inkRow=$('#inks');
  FONTS.forEach(function(f,i){
    var b=el('button','chip-btn',f[0]); b.type='button'; b.style.fontFamily=f[1]; b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      state.font=i; note.style.fontFamily=f[1]; note.style.fontSize=f[2]+'px'; note.style.fontWeight=f[3];
      Array.prototype.forEach.call(fontRow.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      grow();
    });
    fontRow.appendChild(b);
  });
  INKS.forEach(function(c,i){
    var b=el('button'); b.type='button'; b.style.setProperty('--k',c[1]); b.setAttribute('aria-label',c[0]+' ink'); b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      state.ink=i; note.style.color=c[1];
      Array.prototype.forEach.call(inkRow.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    });
    inkRow.appendChild(b);
  });
  function grow(){
    if(state.shape!=='classic'){ note.style.height=''; return; }
    note.style.height='auto';
    var h=Math.min(Math.max(note.scrollHeight,144),360);
    note.style.height=(Math.ceil(h/36)*36)+'px';
  }

  /* ---- stickers and photos on the paper ---- */
  var tray=$('#tray');
  IDS.forEach(function(s){
    var b=el('button'); b.type='button'; b.setAttribute('aria-label','Add '+s[1]+' sticker'); b.innerHTML=sticker(s[0]);
    b.addEventListener('click',function(){ addItem({type:'sticker',sid:s[0],label:s[1]}); });
    tray.appendChild(b);
  });
  function applyItem(it){
    it.el.style.left=it.x+'%'; it.el.style.top=it.y+'%';
    it.el.style.transform='translate(-50%,-50%) rotate('+it.r+'deg) scale('+it.s+')';
  }
  function select(it){
    sel=it;
    items.forEach(function(x){x.el.classList.toggle('sel',x===it);});
    var c=$('#ctl'); c.hidden=!it;
    if(it) $('#ctlName').textContent=it.label;
  }
  function removeItem(it){
    it.el.remove(); items=items.filter(function(x){return x!==it;});
    if(sel===it) select(null);
  }
  var dragIt=null;
  function addItem(d){
    if(items.length>=10){ $('#status').textContent='That’s plenty on one slip. Remove one to add another.'; return; }
    var it={id:++nid,type:d.type,sid:d.sid,src:d.src,label:d.label,x:clamp(50+rand(-22,22),12,88),y:clamp(40+rand(-14,18),14,86),r:Math.round(rand(-16,16)),s:1};
    var e=el('div','pitem pop'); e.tabIndex=0; e.setAttribute('role','button');
    e.setAttribute('aria-label',d.label+' on paper. Arrow keys move it, square brackets tilt it, plus and minus resize it, Delete removes it.');
    if(d.type==='photo'){ e.classList.add('photo'); var im=new Image(); im.alt='Your photo'; im.src=d.src; im.draggable=false; e.appendChild(im); }
    else e.innerHTML=sticker(d.sid);
    it.el=e; layer.appendChild(e); items.push(it); applyItem(it); select(it);
    e.addEventListener('animationend',function(){e.classList.remove('pop');});
    e.addEventListener('pointerdown',function(ev){
      ev.preventDefault(); select(it); try{e.setPointerCapture(ev.pointerId);}catch(_){}
      var lr=layer.getBoundingClientRect();
      dragIt={it:it,dx:ev.clientX-(lr.left+it.x/100*lr.width),dy:ev.clientY-(lr.top+it.y/100*lr.height)};
    });
    e.addEventListener('pointermove',function(ev){
      if(!dragIt||dragIt.it!==it) return;
      var lr=layer.getBoundingClientRect();
      it.x=clamp((ev.clientX-dragIt.dx-lr.left)/lr.width*100,2,98); it.y=clamp((ev.clientY-dragIt.dy-lr.top)/lr.height*100,2,98); applyItem(it);
    });
    var stop=function(){dragIt=null;}; e.addEventListener('pointerup',stop); e.addEventListener('pointercancel',stop);
    e.addEventListener('focus',function(){select(it);});
    e.addEventListener('keydown',function(ev){
      var k=ev.key, used=true;
      if(k==='ArrowLeft') it.x=clamp(it.x-2,2,98); else if(k==='ArrowRight') it.x=clamp(it.x+2,2,98);
      else if(k==='ArrowUp') it.y=clamp(it.y-2,2,98); else if(k==='ArrowDown') it.y=clamp(it.y+2,2,98);
      else if(k==='['){it.r-=8;} else if(k===']'){it.r+=8;}
      else if(k==='+'||k==='='){it.s=Math.min(2.2,+(it.s*1.15).toFixed(2));} else if(k==='-'){it.s=Math.max(.5,+(it.s/1.15).toFixed(2));}
      else if(k==='Delete'||k==='Backspace'){ removeItem(it); note.focus(); ev.preventDefault(); return; }
      else used=false;
      if(used){ ev.preventDefault(); applyItem(it); }
    });
  }
  $('#ctl').addEventListener('click',function(ev){
    var a=ev.target.getAttribute&&ev.target.getAttribute('data-act'); if(!a||!sel) return;
    if(a==='left') sel.r-=12; else if(a==='right') sel.r+=12;
    else if(a==='big') sel.s=Math.min(2.2,+(sel.s*1.2).toFixed(2)); else if(a==='small') sel.s=Math.max(.5,+(sel.s/1.2).toFixed(2));
    else if(a==='del'){ removeItem(sel); return; }
    applyItem(sel);
  });
  document.addEventListener('pointerdown',function(ev){
    if(!ev.target.closest) return;
    if(!ev.target.closest('.pitem')&&!ev.target.closest('#ctl')&&!ev.target.closest('#tray')) select(null);
  });

  /* photo: shrink to a small data URL, kept only in this page */
  $('#photoBtn').addEventListener('click',function(){$('#photoIn').click();});
  $('#photoIn').addEventListener('change',function(){
    var f=this.files&&this.files[0]; if(!f) return;
    if(items.filter(function(x){return x.type==='photo';}).length>=2){ $('#status').textContent='Two photos per slip is the limit. Remove one first.'; this.value=''; return; }
    var rd=new FileReader(), input=this;
    rd.onload=function(){
      var img=new Image();
      img.onload=function(){
        var m=300, sc=Math.min(1,m/Math.max(img.width,img.height)), c=document.createElement('canvas');
        c.width=Math.round(img.width*sc); c.height=Math.round(img.height*sc);
        c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        addItem({type:'photo',src:c.toDataURL('image/jpeg',.82),label:'Photo'}); input.value='';
      };
      img.onerror=function(){ $('#status').textContent='That file didn’t open as a picture. Try a JPG or PNG.'; input.value=''; };
      img.src=rd.result;
    };
    rd.readAsDataURL(f);
  });

  /* ---- moods ---- */
  var moodRow=$('#moods');
  MOODS.forEach(function(m){
    var b=el('button'); b.type='button'; b.style.setProperty('--mc',m[3]); b.setAttribute('aria-pressed','false'); b.setAttribute('aria-label',m[1]);
    b.innerHTML=sticker(m[2])+'<span>'+m[1]+'</span>';
    b.addEventListener('click',function(){
      state.mood=(state.mood===m[0])?null:m[0];
      Array.prototype.forEach.call(moodRow.children,function(x,i){x.setAttribute('aria-pressed',MOODS[i][0]===state.mood?'true':'false');});
      var badge=$('#moodBadge'), cur=MOODS.filter(function(x){return x[0]===state.mood;})[0];
      badge.classList.toggle('on',!!cur); if(cur) badge.innerHTML='<use href="#st-'+cur[2]+'"/>';
    });
    moodRow.appendChild(b);
  });
  function moodObj(){ return MOODS.filter(function(x){return x[0]===state.mood;})[0]||null; }

  /* ---- text box ---- */
  function refreshControls(){
    var has=note.value.trim().length>0;
    $('#count').textContent=has?note.value.trim().split(/\s+/).length:0;
    grow();
    grab.disabled=!has||busy;
    $('#grabLabel').textContent=has?'Drag this slip into the jar':'Write something first';
  }
  note.addEventListener('input',refreshControls);
  function nextHint(){ hintIx=(hintIx+1)%HINTS.length; note.placeholder=HINTS[hintIx]; }
  note.placeholder=HINTS[hintIx];

  /* ---- the jar (shape, charm, glow) ---- */
  var jarBack=$('#jarBack'), jarFront=$('#jarFront'), regW=14.4, cols=4;
  function renderJar(){
    var J=JARS[state.jar];
    jarBack.innerHTML='<ellipse cx="150" cy="368" rx="108" ry="9" fill="rgba(59,42,74,.14)"/><path d="'+J.body+'" fill="rgba(255,255,255,.6)"/>';
    jarFront.innerHTML=
      '<g class="glass"><path d="'+J.body+'" fill="none" stroke="#3B2A4A" stroke-width="3.5" stroke-linejoin="round"/>'+J.hi+'</g>'+
      '<g transform="rotate(-3 150 160)"><rect x="88" y="128" width="124" height="68" rx="8" fill="#FFF9FC" stroke="#3B2A4A" stroke-width="2.5"/>'+
      '<text x="150" y="156" text-anchor="middle" style="font-family:Caveat,cursive;font-size:23px;font-weight:700" fill="#D9366F">Opens on</text>'+
      '<text x="150" y="181" text-anchor="middle" style="font-family:\'Shantell Sans\',sans-serif;font-size:17px;font-weight:800" fill="#3B2A4A">31 Dec 2027</text></g>'+
      J.twine+'<g id="charmG"></g>'+
      '<g class="lid" stroke="#3B2A4A" stroke-width="3" stroke-linejoin="round">'+J.lid+'</g>';
    var r=J.reg; stage.style.setProperty('--sl',r[0]+'%'); stage.style.setProperty('--sr',r[1]+'%'); stage.style.setProperty('--st',r[2]+'%'); stage.style.setProperty('--sb',r[3]+'%');
    regW=20*(1-(r[0]+r[1])/100); cols=Math.max(3,Math.floor((regW-.4)/3.1));
    setCharm(state.charm);
  }
  function setCharm(id){
    var g=document.getElementById('charmG'); if(!g) return;
    g.innerHTML=id?'<g class="charm"><path d="M214 94Q238 104 240 128" stroke="#E3A93B" stroke-width="3" fill="none" stroke-linecap="round"/><use href="#st-'+id+'" x="222" y="124" width="36" height="36"/></g>':'';
  }
  function layout(){
    var i=placed++, row=Math.floor(i/cols)%10, col=i%cols, sp=(regW-3)/(cols-1);
    var x=col*sp+(row%2?0.5:0)+rand(-0.25,0.25); x=clamp(x,0,regW-3);
    return {x:x,y:0.1+row*1.15+rand(0,0.3),r:rand(-22,22).toFixed(1)+'deg'};
  }
  function addSlip(d,hidden){
    var e=el('div','slip'); e.dataset.shape=d.shape||'classic';
    var l=layout();
    e.style.setProperty('--c',d.color); e.style.setProperty('--x',l.x.toFixed(2)); e.style.setProperty('--y',l.y.toFixed(2)); e.style.setProperty('--r',l.r);
    e.innerHTML='<div class="slip-in">'+(d.sticker?sticker(d.sticker):'<span class="lines"></span>')+'</div>';
    if(hidden) e.style.visibility='hidden';
    slips.appendChild(e); return e;
  }
  function samples(){
    var shp=['classic','heart','star','ticket','classic','heart'];
    for(var k=0;k<6;k++) addSlip({color:MOODS[k][3],sticker:Math.random()<.75?pick(IDS)[0]:null,shape:shp[k]});
  }
  function glowUpdate(){ stage.style.setProperty('--g',Math.min(.2+mine*.14,.95).toFixed(2)); }
  function setJar(k){
    state.jar=k; slips.innerHTML=''; placed=0; mine=0; $('#mine').textContent=0; entries=[]; glowUpdate();
    renderJar(); samples();
  }
  var jarPick=$('#jarPick');
  Object.keys(JARS).forEach(function(k,i){
    var b=el('button','chip-btn',JARS[k].name); b.type='button'; b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      if(state.jar===k) return;
      Array.prototype.forEach.call(jarPick.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      setJar(k); say('A new practice jar. Samples only, for now.');
    });
    jarPick.appendChild(b);
  });
  var charmPick=$('#charmPick');
  [[null,'None'],['star','Star'],['heart','Heart'],['moon','Moon'],['sparkle','Sparkle']].forEach(function(c,i){
    var b=el('button','chip-btn'+(c[0]?' ic':''),c[0]?'':c[1]); if(c[0]){ b.innerHTML=sticker(c[0]); b.setAttribute('aria-label',c[1]+' charm'); }
    b.type='button'; b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      state.charm=c[0]; setCharm(c[0]);
      Array.prototype.forEach.call(charmPick.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    });
    charmPick.appendChild(b);
  });

  /* ---- sound ---- */
  var ac;
  function ensureAudio(){ try{ ac=ac||new (window.AudioContext||window.webkitAudioContext)(); if(ac.state==='suspended') ac.resume(); }catch(e){} }
  function clink(){
    try{
      if(!ac) return; var t=ac.currentTime;
      [[1568,0],[2349,.07],[1976,.15]].forEach(function(p){
        var o=ac.createOscillator(), g=ac.createGain(); o.type='sine'; o.frequency.value=p[0];
        g.gain.setValueAtTime(.0001,t+p[1]); g.gain.exponentialRampToValueAtTime(.11,t+p[1]+.01); g.gain.exponentialRampToValueAtTime(.0001,t+p[1]+.4);
        o.connect(g); g.connect(ac.destination); o.start(t+p[1]); o.stop(t+p[1]+.45);
      });
    }catch(e){}
  }

  /* ---- flying slip ---- */
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function makeFly(d){
    var f=el('div','fly'); f.dataset.shape=d.shape; f.style.setProperty('--c',d.color);
    f.innerHTML='<div class="fly-in">'+(d.sticker?sticker(d.sticker):'<span class="lines"></span>')+'</div>'; return f;
  }
  function place(f,x,y,rot,sc){ f.style.transform='translate('+(x-42)+'px,'+(y-29)+'px) rotate('+rot+'deg) scale('+sc+')'; }
  function currentSlip(){
    var m=moodObj(), firstSt=items.filter(function(i){return i.type==='sticker';})[0];
    return {color:m?m[3]:monthColor,sticker:firstSt?firstSt.sid:null,shape:state.shape};
  }
  function inJar(x,y){ var r=stage.getBoundingClientRect(); return x>r.left-14&&x<r.right+14&&y>r.top-30&&y<r.bottom+14; }

  function sparks(){
    if(reduce) return;
    var sr=stage.getBoundingClientRect();
    for(var i=0;i<9;i++){
      var s=el('span','spark'); s.style.setProperty('--c',pick(MOODS)[3]);
      s.style.left=(sr.width*.5-6)+'px'; s.style.top=(sr.height*.2)+'px'; stage.appendChild(s);
      var a=rand(-Math.PI*.95,-Math.PI*.05), d=rand(50,110);
      var an=s.animate([{transform:'translate(0,0) rotate(45deg) scale(1)',opacity:1},{transform:'translate('+Math.cos(a)*d+'px,'+(Math.sin(a)*d+30)+'px) rotate(200deg) scale(.2)',opacity:0}],{duration:rand(600,900),easing:'cubic-bezier(.2,.7,.3,1)'});
      an.onfinish=(function(e){return function(){e.remove();};})(s);
    }
  }
  function say(msg){ $('#jarMsg').textContent=msg; clearTimeout(say.t); say.t=setTimeout(function(){$('#jarMsg').textContent='';},3800); }

  function snapshotEntry(slip){
    var f=FONTS[state.font], photo=items.filter(function(i){return i.type==='photo';})[0];
    return {text:note.value.trim(),fontFam:f[1],fontW:f[3],ink:INKS[state.ink][1],stickers:items.filter(function(i){return i.type==='sticker';}).map(function(i){return i.sid;}),photo:photo?photo.src:null,color:slip.color,mood:moodObj()};
  }
  function resetCard(){
    note.value=''; items.slice().forEach(removeItem); select(null);
    state.mood=null; $('#moodBadge').classList.remove('on');
    Array.prototype.forEach.call(moodRow.children,function(x){x.setAttribute('aria-pressed','false');});
    nextHint(); card.classList.remove('folded'); busy=false; refreshControls();
  }

  function performDrop(fly,x,y,data){
    busy=true; grab.disabled=true;
    entries.push(snapshotEntry(data));
    var e=addSlip(data,true);
    function finish(){
      fly.remove(); e.style.visibility='visible';
      stage.classList.remove('open','ready'); stage.classList.add('wiggle'); setTimeout(function(){stage.classList.remove('wiggle');},600);
      clink(); sparks();
      mine++; $('#mine').textContent=mine; glowUpdate();
      $('#status').textContent='Sealed. That’s slip number '+mine+' in your practice jar.';
      say('Sealed until 31 December 2027.');
      resetCard();
    }
    if(reduce){ finish(); return; }
    stage.classList.add('open'); stage.classList.remove('ready');
    var sr=stage.getBoundingClientRect(), er=e.getBoundingClientRect();
    var tx=er.left+er.width/2, ty=er.top+er.height/2, mx=sr.left+sr.width/2, my=sr.top+sr.height*.14, end=e.offsetWidth/84;
    var an=fly.animate([
      {transform:'translate('+(x-42)+'px,'+(y-29)+'px) rotate(-6deg) scale(.9)',offset:0},
      {transform:'translate('+(mx-42)+'px,'+(my-29)+'px) rotate(-12deg) scale(.62)',offset:.5,easing:'cubic-bezier(.5,0,.9,.6)'},
      {transform:'translate('+(tx-42)+'px,'+(ty-29)+'px) rotate('+parseFloat(e.style.getPropertyValue('--r'))+'deg) scale('+end+')',offset:1}
    ],{duration:1150,easing:'cubic-bezier(.3,.1,.4,1)',fill:'forwards'});
    an.onfinish=finish;
  }

  /* ---- drag the folded slip ---- */
  var drag=null;
  grab.addEventListener('pointerdown',function(e){
    if(grab.disabled||busy) return;
    ensureAudio();
    try{grab.setPointerCapture(e.pointerId);}catch(_){}
    var data=currentSlip(), ghost=makeFly(data); document.body.appendChild(ghost);
    drag={ghost:ghost,data:data,sx:e.clientX,sy:e.clientY,x:e.clientX,y:e.clientY,moved:false};
    place(ghost,e.clientX,e.clientY,-6,.9); card.classList.add('folded'); e.preventDefault();
  });
  grab.addEventListener('pointermove',function(e){
    if(!drag) return;
    drag.x=e.clientX; drag.y=e.clientY;
    if(Math.hypot(drag.x-drag.sx,drag.y-drag.sy)>6) drag.moved=true;
    place(drag.ghost,drag.x,drag.y,-6+clamp((drag.x-drag.sx)/18,-12,12),.9);
    stage.classList.toggle('ready',inJar(drag.x,drag.y));
  });
  function endDrag(cancelled){
    if(!drag) return;
    var d=drag; drag=null; stage.classList.remove('ready');
    if(!cancelled&&(inJar(d.x,d.y)||!d.moved)){ performDrop(d.ghost,d.x,d.y,d.data); return; }
    var r=grab.getBoundingClientRect();
    if(reduce){ d.ghost.remove(); card.classList.remove('folded'); return; }
    var an=d.ghost.animate([{transform:d.ghost.style.transform},{transform:'translate('+(r.left+r.width/2-42)+'px,'+(r.top+r.height/2-29)+'px) rotate(0deg) scale(.6)',opacity:0}],{duration:280,easing:'ease-in',fill:'forwards'});
    an.onfinish=function(){ d.ghost.remove(); card.classList.remove('folded'); };
    $('#status').textContent='The slip is still on your desk. Drag it over the jar to drop it in.';
  }
  grab.addEventListener('pointerup',function(){endDrag(false);});
  grab.addEventListener('pointercancel',function(){endDrag(true);});
  grab.addEventListener('click',function(e){
    if(e.detail!==0||busy||grab.disabled) return;   /* keyboard activation only */
    ensureAudio();
    var r=grab.getBoundingClientRect(), data=currentSlip(), ghost=makeFly(data);
    document.body.appendChild(ghost); place(ghost,r.left+r.width/2,r.top,-6,.9);
    card.classList.add('folded'); performDrop(ghost,r.left+r.width/2,r.top,data);
  });

  /* ---- sealed jar ---- */
  stage.addEventListener('click',function(){
    stage.classList.remove('wiggle'); void stage.offsetWidth; stage.classList.add('wiggle');
    setTimeout(function(){stage.classList.remove('wiggle');},600);
    say('Sealed until 31 December 2027. No peeking, that’s the deal.');
  });

  /* ---- 31 Dec preview ---- */
  var SAMPLE=[
    {text:'Warm chai and a long call with Maa',fontFam:"'Caveat',cursive",fontW:500,ink:'#3B2A4A',stickers:['chai','heart'],photo:null,color:'#FFC9A8'},
    {text:'Rain that cooled the evening just when I needed it',fontFam:"'Kalam',cursive",fontW:400,ink:'#2F6FDE',stickers:['rain'],photo:null,color:'#B8DBFF'},
    {text:'Finished a book I loved and sat with it for a while',fontFam:"'Gaegu',cursive",fontW:400,ink:'#D9366F',stickers:['star','moon'],photo:null,color:'#D5C6FF'}
  ];
  var opener=null;
  function short(t,n){ t=t.replace(/\s+/g,' ').trim(); return t.length>n?t.slice(0,n-1).trim()+'…':t; }
  function openPreview(){
    opener=document.activeElement;
    var real=entries.length>0, list=real?entries:SAMPLE;
    $('#mSub').textContent=real?'A preview using your '+list.length+' practice slip'+(list.length>1?'s':'')+', as if you had dropped one a day from 1 January. Nothing here is saved.':'You haven’t dropped a slip yet, so these are sample slips. Drop one of your own and peek again.';
    var strip=$('#mStrip'); strip.innerHTML=''; list.forEach(function(en){var i=el('i'); i.style.setProperty('--c',en.color); strip.appendChild(i);});
    var box=$('#mEntries'); box.innerHTML='';
    list.forEach(function(en,i){
      var row=el('div','entry'); row.style.setProperty('--i',i); row.style.setProperty('--c',en.color);
      row.appendChild(el('span','tab'));
      var mid=el('div'); mid.appendChild(el('div','date2',new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(2027,0,1+i))));
      var tx=el('div','etext',en.text); tx.style.fontFamily=en.fontFam; tx.style.fontWeight=en.fontW; tx.style.color=en.ink; tx.style.fontSize='22px'; mid.appendChild(tx);
      row.appendChild(mid);
      var st=el('div','estk'); st.innerHTML=en.stickers.map(sticker).join(''); row.appendChild(st);
      if(en.photo){ var im=new Image(); im.alt='Your photo'; im.src=en.photo; row.appendChild(im); }
      box.appendChild(row);
    });
    var L=$('#mLetter'); L.innerHTML='<span class="tape" aria-hidden="true"></span>';
    var n=list.length;
    var ps=['Dear me,','This year you filled a jar with '+n+' good thing'+(n>1?'s':'')+'.'];
    if(n===1) ps.push('You began with “'+short(list[0].text,90)+'”, and that was enough.');
    else{
      ps.push('It started with “'+short(list[0].text,90)+'”.');
      if(n>2) ps.push('Somewhere in the middle there was “'+short(list[Math.floor(n/2)].text,90)+'”.');
      ps.push('And near the end, “'+short(list[n-1].text,90)+'”.');
    }
    ps.push('None of it was big. All of it counted. Thank you for noticing.');
    ps.forEach(function(t){L.appendChild(el('p',null,t));});
    L.appendChild(el('p','sign','Love, you'));
    $('#modal').classList.add('on'); $('#modal').scrollTop=0; $('#mClose').focus();
  }
  function closePreview(){ $('#modal').classList.remove('on'); if(opener&&opener.focus) opener.focus(); }
  $('#previewBtn').addEventListener('click',openPreview);
  $('#mClose').addEventListener('click',closePreview);
  $('#modal').addEventListener('click',function(e){ if(e.target===this) closePreview(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&$('#modal').classList.contains('on')) closePreview(); });

  /* ---- example calendar + month papers ---- */
  var filled=[1,2,3,5,6,8,9,10,12,13,14,15,17,19,20,21,22,24,26,27,28,30], g=$('#cal'), h='';
  for(var b=0;b<5;b++) h+='<span class="cell blank"></span>';
  for(var d=1;d<=31;d++){
    var on=filled.indexOf(d)>-1;
    h+='<span class="cell'+(on?' on':'')+'"><i>'+d+'</i>'+(on?'<svg class="sticker" viewBox="0 0 40 40" style="--r:'+(((d*37)%17)-8)+'deg;width:68%;height:68%" aria-hidden="true"><use href="#st-'+IDS[(d*3)%8][0]+'"/></svg>':'')+'</span>';
  }
  g.innerHTML=h;
  $('#calFoot').innerHTML='<b>'+filled.length+' days in the jar.</b> '+(31-filled.length)+' empty squares, and that’s fine.';
  $('#months').innerHTML=MN.map(function(m,i){return '<li style="--mc:'+MC[i]+'">'+m+'</li>';}).join('');

  /* ---- start ---- */
  renderJar(); samples(); glowUpdate(); refreshControls();
})();
