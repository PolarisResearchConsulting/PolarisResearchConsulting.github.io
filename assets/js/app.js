(function(){
  'use strict';
  const menuButton=document.getElementById('menuButton');
  const mobileMenu=document.getElementById('mobileMenu');
  const contactModal=document.getElementById('contactModal');
  const closeModal=document.getElementById('closeModal');
  const legalModal=document.getElementById('legalModal');
  const legalClose=document.getElementById('legalClose');
  const legalCardBody=document.getElementById('legalCardBody');

  function setBodyLock(locked){document.body.classList.toggle('modal-open',locked);}

  if(menuButton&&mobileMenu){
    menuButton.addEventListener('click',()=>{
      const open=mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      mobileMenu.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
    }));
  }

  function openContact(event){
    if(event)event.preventDefault();
    if(!contactModal)return;
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden','false');
    setBodyLock(true);
    setTimeout(()=>closeModal&&closeModal.focus(),0);
  }
  function closeContact(){
    if(!contactModal)return;
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden','true');
    setBodyLock(false);
  }
  document.querySelectorAll('.contact-trigger').forEach(el=>el.addEventListener('click',openContact));
  if(closeModal)closeModal.addEventListener('click',closeContact);
  if(contactModal)contactModal.addEventListener('click',e=>{if(e.target===contactModal)closeContact();});

  function openLegal(event){
    if(event)event.preventDefault();
    if(!legalModal)return;
    const targetId=event&&event.currentTarget?event.currentTarget.getAttribute('data-legal-target'):'legal-information';
    legalModal.classList.add('open');
    legalModal.setAttribute('aria-hidden','false');
    setBodyLock(true);
    requestAnimationFrame(()=>{
      const target=document.getElementById(targetId||'legal-information');
      if(legalCardBody)legalCardBody.scrollTop=target?Math.max(0,target.offsetTop-10):0;
      if(legalClose)legalClose.focus();
    });
  }
  function closeLegal(){
    if(!legalModal)return;
    legalModal.classList.remove('open');
    legalModal.setAttribute('aria-hidden','true');
    setBodyLock(false);
  }
  document.querySelectorAll('.legal-trigger').forEach(el=>el.addEventListener('click',openLegal));
  if(legalClose)legalClose.addEventListener('click',closeLegal);
  if(legalModal)legalModal.addEventListener('click',e=>{if(e.target===legalModal)closeLegal();});

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeContact();
      closeLegal();
      if(mobileMenu)mobileMenu.classList.remove('open');
      if(menuButton)menuButton.setAttribute('aria-expanded','false');
    }
  });
})();
