/* Draw after fonts resolve: SVG geometry shares the exact coordinate space of the text. */
window.compositionReady = (async () => {
  await document.fonts.ready;
  await document.fonts.load('400 118px "Young Serif"');
  await new Promise(requestAnimationFrame);
  const post = document.querySelector('.post');
  const svg = post.querySelector('.composition');
  const focus = post.querySelector('.focus-word');
  const landscape = post.dataset.format === 'linkedin';
  const W = post.offsetWidth, H = post.offsetHeight;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const p = post.getBoundingClientRect();
  const rect = el => { const b=el.getBoundingClientRect(); return {x:(b.left-p.left)*W/p.width,y:(b.top-p.top)*H/p.height,w:b.width*W/p.width,h:b.height*H/p.height}; };
  const summary=rect(post.querySelector('.summary'));
  const details=rect(post.querySelector('.details'));
  const invitation=rect(post.querySelector('.invitation'));
  const margin=summary.x;
  const rail=landscape?details.x-80:W-margin;
  const rule=landscape?invitation.y-26:details.y-46;
  const radius=landscape?45:66;
  // Exclude paragraph ink and QR quiet zone; never lay a path over essential information.
  const holes = [...post.querySelectorAll('[data-ink],.qr')].map(el=>{
    const b=rect(el);return `<rect x="${b.x-10}" y="${b.y-10}" width="${b.w+20}" height="${b.h+20}" fill="black"/>`;
  }).join('');
  let drawing='';
  if(focus) {
    const b=rect(focus), cx=b.x+b.w/2, cy=b.y+b.h*.49;
    const rx=b.w/2+(landscape?14:20), ry=b.h*.45+(landscape?12:18);
    // The inspection lens belongs to the word AI, rather than to an independent illustration panel.
    drawing+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(-8 ${cx} ${cy})" fill="#e9f6f7" stroke="#6bbfc3" stroke-width="${landscape?2:3}"/>`;
    const angle=Math.PI/4, rotation=-8*Math.PI/180;
    const x=cx+rx*Math.cos(angle)*Math.cos(rotation)-ry*Math.sin(angle)*Math.sin(rotation);
    const y=cy+rx*Math.cos(angle)*Math.sin(rotation)+ry*Math.sin(angle)*Math.cos(rotation);
    drawing+= landscape
      ? `<path d="M${x} ${y} C${x+135} ${y+48} ${rail} ${y-65} ${rail} ${summary.y-16} V${rule-radius} Q${rail} ${rule} ${rail-radius} ${rule} H${margin}"/>`
      : `<path d="M${x} ${y} C${x+165} ${y+60} ${rail} ${y-85} ${rail} ${summary.y-12} V${rule-radius} Q${rail} ${rule} ${rail-radius} ${rule} H${margin}"/>`;
  }
  if(landscape) drawing+=`<path d="M${details.x-40} ${details.y-7}V${H-43}" stroke="#e2e8f0" stroke-width="2"/>`;
  // Small registration corners continue the same construction around the information region.
  else drawing+=`<path d="M${margin} ${rule+30}v-30h30" stroke="#a9dadd" stroke-width="3"/>`;
  svg.innerHTML=`<title>Inspection lens around the headline, continuing into the information rules</title><defs><mask id="ink-exclusion" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="white"/>${holes}</mask></defs><g mask="url(#ink-exclusion)" fill="none" stroke="#8bced1" stroke-width="${landscape?2.5:3}" stroke-linecap="round" stroke-linejoin="round">${drawing}</g>`;
  post.dataset.compositionReady='true';
})();
