// VerdiWM interactions for the ConfAL-WM page template.
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  $('#themeToggle').addEventListener('click', () => {
    const light = root.dataset.theme !== 'light';
    root.dataset.theme = light ? 'light' : 'dark';
    const label = `Switch to ${light ? 'dark' : 'light'} mode`;
    $('#themeToggle').setAttribute('aria-label', label);
    $('#themeToggle').title = label;
    $('meta[name="theme-color"]').content = light ? '#f3f8fd' : '#06080c';
  });
  const links = $$('.nav-link');
  function progress() {
    const total = document.documentElement.scrollHeight - innerHeight;
    $('#progress').style.width = `${total > 0 ? scrollY / total * 100 : 0}%`;
    let active;
    for (const link of links) if ($(link.hash).getBoundingClientRect().top <= 160) active = link;
    links.forEach(link => { link.classList.toggle('active', link === active); if (link === active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  }
  addEventListener('scroll',progress,{passive:true}); addEventListener('resize',progress); progress();
  $('#backTop').addEventListener('click',()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
  const dialog = $('#figureDialog');
  $$('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); $('#figureImage').src=link.href; $('#figureImage').alt=link.querySelector('img').alt; $('#figureOriginal').href=link.href; dialog.showModal();
  }));
  $('#closeFigure').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  const loadVideo = video => { if(video.preload==='none'){video.preload='metadata';video.load();} };
  const mediaObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){loadVideo(entry.target);mediaObserver.unobserve(entry.target);}
  }),{rootMargin:'300px'});
  $$('video').forEach(video=>mediaObserver.observe(video));
  $$('.play-pair').forEach(button=>{
    const group=button.closest('.paired-group'), videos=[...group.querySelectorAll('video')], status=group.querySelector('.pair-status');
    const reflect=()=>{button.textContent=videos.some(video=>!video.paused)?'Pause pair':'Play pair';};
    videos.forEach(video=>{video.addEventListener('play',reflect);video.addEventListener('pause',reflect);});
    button.addEventListener('click',async()=>{
      if(videos.some(video=>!video.paused)){videos.forEach(video=>video.pause());return;}
      status.textContent=''; videos.forEach(video=>{loadVideo(video);video.currentTime=0;});
      const results=await Promise.allSettled(videos.map(video=>video.play()));
      if(results.some(result=>result.status==='rejected')){videos.forEach(video=>video.pause());status.textContent='Use each video’s play control to start playback.';}reflect();
    });
  });
  // Preserve existing public section links after consolidating the evidence into campaigns.
  const aliases={'#evidence-archive':'#evaluation-section','#campaign-ctrlworld':'#evaluation-section','#campaign-rep':'#worldarena-section','#campaign-robocoin':'#robocoin-section','#campaign-robolab':'#action-quality-section','#campaign-franka':'#franka-section','#archive-ctrlworld':'#evaluation-section','#archive-rep':'#worldarena-section','#archive-robocoin':'#robocoin-section','#archive-robolab':'#action-quality-section','#archive-franka':'#franka-section'};
  if(aliases[location.hash]) location.replace(aliases[location.hash]);
})();

// Hero canvas adapted from the ConfAL-WM template.
(()=>{const c=document.getElementById('hero-canvas'),ctx=c.getContext('2d');let W,H,dpr=Math.min(devicePixelRatio||1,2),mx=.5,my=.5,t=0;const paths=Array.from({length:5},(_,i)=>({y:.12+i*.17+Math.random()*.03,phase:Math.random()*6.28,speed:.28+Math.random()*.55,amp:.025+Math.random()*.045,alpha:.21+Math.random()*.14,hue:i%3}));function resize(){W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)} addEventListener('resize',resize);resize();addEventListener('pointermove',e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight},{passive:true});function draw(){t+=.008;ctx.clearRect(0,0,W,H);ctx.save();ctx.translate((mx-.5)*8,(my-.5)*6);const cols=['85,180,235','114,175,226','141,203,240'];paths.forEach((p,i)=>{const y0=p.y*H;ctx.beginPath();for(let s=0;s<=80;s++){const x=s/80*W;const bend=Math.sin(s*.15+p.phase+t*p.speed)*p.amp*H;const attract=(.5-Math.abs(s/80-.5))*18*Math.sin(t+i);const y=y0+bend+attract;if(!s)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle=`rgba(${cols[p.hue]},${p.alpha})`;ctx.lineWidth=i%4===0?2.6:1.7;ctx.stroke();if(i%7===0){const q=(t*p.speed*.22+p.phase/6.28)%1,x=q*W,y=y0+Math.sin(q*80*.15+p.phase+t*p.speed)*p.amp*H;ctx.fillStyle=`rgba(${cols[p.hue]},.34)`;ctx.beginPath();ctx.arc(x,y,2.4,0,6.28);ctx.fill()}}); // reference/future planes
ctx.strokeStyle='rgba(85,215,255,.14)';for(let k=0;k<4;k++){const x=W*.09+k*16,y=H*.3+k*9;ctx.strokeRect(x,y,120,74)}ctx.strokeStyle='rgba(155,124,255,.15)';for(let k=0;k<5;k++){const x=W*.79+k*18,y=H*.27+k*10;ctx.strokeRect(x,y,130,80)}ctx.restore();if(!matchMedia('(prefers-reduced-motion: reduce)').matches && document.getElementById('home').getBoundingClientRect().bottom>0)requestAnimationFrame(draw);else setTimeout(draw,300)}draw()})();
