(function(){
  'use strict';
  var KEY='engineering-with-ai:progress';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){return {};}}
  function save(value){try{localStorage.setItem(KEY,JSON.stringify(value));}catch(e){}}
  var state=load();
  document.querySelectorAll('[data-progress-session]').forEach(function(box){
    var id=box.getAttribute('data-progress-session'); box.checked=!!state[id];
    box.addEventListener('change',function(){state[id]=box.checked;save(state);});
  });
  document.querySelectorAll('[data-progress-summary]').forEach(function(el){
    var count=Object.values(state).filter(Boolean).length;
    el.innerHTML='<strong>'+count+' sessions marked complete on this device</strong><span>Progress is local to this browser and does not change curriculum status.</span>';
  });
})();
