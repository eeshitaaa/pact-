/* Shared domain rules: used by every view and by node:test. */
(function(root){
  'use strict';
  const TYPES=['Habit','Prediction','Race','Number','Jar','Elimination'];
  const ASSETS={Habit:'habit',Prediction:'prediction',Race:'race',Number:'number',Jar:'jar',Elimination:'elimination'};
  function dateOffset(days,from=new Date()){const d=new Date(from);d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function initial(){
    const base={status:'active',context:'Group',proofMode:'log',logs:[],proofs:{},votes:{},scores:{},guesses:{},retired:[],violations:0,totalDays:7};
    const entries=[
      {id:'sleep',type:'Habit',title:'Sleep before midnight',room:'The Quiet Club',context:'Couple',people:['EA','NA'],stake:'₹200',startDate:dateOffset(-3),totalDays:5,proofMode:'photo',logs:[1,2,3],proofs:{1:{status:'accepted',sample:true},2:{status:'accepted',sample:true},3:{status:'accepted',sample:true}},proof:'A photo before the clock strikes twelve.',reward:'A better morning. And your streak intact.'},
      {id:'runs',type:'Race',title:'Most runs this month',room:'Sunday Run Club',people:['MR','EA','JV','RS'],stake:'Breakfast',startDate:dateOffset(-11),totalDays:30,scores:{MR:12,EA:9,JV:7,RS:5},proof:'Log each completed run.',reward:'Breakfast is on the rest of us.'},
      {id:'buzzword',type:'Jar',title:'The “circle back” jar',room:'Monday Standup',people:['KN','NA','EA','PR'],stake:'₹50',startDate:dateOffset(-2),violations:5,proof:'One honest log for every mention.',reward:'A team treat at the end of the week.'},
      {id:'deck',type:'Prediction',title:'Will the Friday deck ship?',room:'Studio Sprint',people:['EA','MS','AR','NK'],stake:'Coffee',status:'pending',startDate:dateOffset(0),totalDays:3,votes:{MS:'yes',AR:'no',NK:'yes'},proof:'The submission timestamp decides.',reward:'Coffee for the ones who called it.'},
      {id:'dinner',type:'Number',title:'How late will dinner start?',room:'Table for Two',context:'Couple',people:['EA','AS'],stake:'Planning immunity',startDate:dateOffset(0),totalDays:1,guesses:{AS:35},proof:'Minutes after the agreed time.',reward:'The closest guess wins planning immunity.'},
      {id:'delivery',type:'Habit',title:'A week of home cooking',room:'A Little Better',context:'Personal',people:['EA'],stake:'Dinner',status:'completed',startDate:dateOffset(-9),logs:[1,2,3,4,5,6,7],proof:'A daily cooking check-in.',reward:'Seven days. All yours.',winner:'EA'},
      {id:'tickets',type:'Elimination',title:'Last ticket standing',room:'Balcony Section',people:['EA','LS','VK','NA'],stake:'Movie ticket',startDate:dateOffset(-3),totalDays:10,retired:['NA'],proof:'Keep your ticket until show day.',reward:'The last person standing earns the ticket.'}
    ];
    return {version:2,pacts:entries.map(p=>({...structuredClone(base),...p})),profile:{name:'Eeshita Anand',initials:'EA',email:'',bio:'Small promises. Better company.',photo:''},stats:['won','streak','accuracy','proof'],baseline:{won:42,lost:14,streak:12},settings:{motion:true,reminders:true},activity:[{id:'seed-proof',kind:'proof',title:'Naina left proof. Your move.',text:'Sleep before midnight · 11:42 PM',pactId:'sleep',pending:true},{id:'seed-race',kind:'race',title:'Mira took the lead.',text:'Sunday Run Club · 12 runs and counting',pactId:'runs'},{id:'seed-invite',kind:'invite',title:'A prediction has your name on it.',text:'Studio Sprint · Pick a side',pactId:'deck'}]};
  }
  function normalize(raw){
    if(!raw||raw.version!==2||!Array.isArray(raw.pacts))return initial();
    const seed=initial();return {...seed,...raw,profile:{...seed.profile,...raw.profile},settings:{...seed.settings,...raw.settings},baseline:{...seed.baseline,...raw.baseline},pacts:raw.pacts.filter(p=>p&&typeof p.id==='string'&&TYPES.includes(p.type)).map(p=>({...p,people:Array.isArray(p.people)&&p.people.length?p.people:['EA'],totalDays:Math.min(365,Math.max(1,Number(p.totalDays)||7)),logs:Array.isArray(p.logs)?[...new Set(p.logs.map(Number).filter(d=>d>0&&d<=p.totalDays))]:[],proofs:p.proofs||{},votes:p.votes||{},scores:p.scores||{},guesses:p.guesses||{},retired:p.retired||[],violations:Number(p.violations)||0})),stats:(raw.stats||seed.stats).filter(id=>['won','lost','streak','accuracy','proof','completed','races'].includes(id)).slice(0,4)};
  }
  function migrate(legacy){
    const s=initial();if(!legacy?.betSections)return s;const seed=new Map(s.pacts.map(p=>[p.id,p]));
    s.pacts=legacy.betSections.flatMap(section=>(section.items||[]).map(old=>{const b=seed.get(old.id)||{...initial().pacts[0],room:'Your private room',logs:[],proofs:{}};return {...b,...old,type:TYPES.includes(old.type)?old.type:'Habit',status:section.id==='history'?'completed':section.id==='pending'?'pending':'active',proofMode:old.requiresProof?'photo':'log',context:b.context,logs:old.logs||old.completedDays||b.logs,proofs:old.proofs?Object.fromEntries(Object.entries(old.proofs).map(([d,p])=>[d,{...p,status:'accepted'}])):b.proofs};}));
    if(legacy.appState?.profile){const p=legacy.appState.profile;s.profile={...s.profile,name:p.name||s.profile.name,email:legacy.appState.account?.email||p.email||'',photo:p.photo||''};}
    if(legacy.playerProgress){const p=legacy.playerProgress;s.baseline={won:p.betsWon??42,lost:p.betsLost??14,streak:p.bestStreak??p.currentStreak??12};}
    if(Array.isArray(legacy.profileStats)){const mapped=legacy.profileStats.map(s=>({won:'won',lost:'lost',accuracy:'accuracy',streak:'streak','badge-streak':'streak','badge-proof':'proof','badge-called':'accuracy'}[s.id])).filter(Boolean);if(mapped.length)s.stats=[...new Set(mapped)].slice(0,4);}
    return normalize(s);
  }
  function inferType(value){const s=String(value).toLowerCase();if(/\b(jar|every time|whenever|penalty)\b/.test(s))return 'Jar';if(/\b(who|most|race)\b/.test(s)&&/\b(runs|logs|most|race)\b/.test(s))return 'Race';if(/\b(last|still|standing|survivor|elimination)\b/.test(s))return 'Elimination';if(/\b(how many|how late|guess|closest|number)\b/.test(s))return 'Number';if(/\b(every day|daily|habit|sleep|delivery|week|nights|cooking)\b/.test(s))return 'Habit';return 'Prediction';}
  function completedDays(p){return new Set(p.proofMode==='photo'?Object.entries(p.proofs||{}).filter(([,v])=>v.status==='accepted').map(([d])=>Number(d)):p.logs||[]);}
  function progress(p){if(p.status==='completed')return 100;if(p.type==='Habit')return Math.round(completedDays(p).size/p.totalDays*100);if(p.type==='Prediction')return Math.round(Object.keys(p.votes||{}).length/p.people.length*100);if(p.type==='Number')return Math.round(Object.keys(p.guesses||{}).length/p.people.length*100);return 0;}
  function nextDay(p){for(let i=1;i<=p.totalDays;i++)if(!completedDays(p).has(i))return i;return p.totalDays;}
  function recordDay(p,day,photo=null){const d=Number(day);if(p.status!=='active'||!Number.isInteger(d)||d<1||d>p.totalDays)return false;if(p.startDate&&dateOffset(d-1,new Date(p.startDate+'T12:00:00'))>dateOffset(0))return false;if(p.proofMode==='photo'){if(!photo?.dataUrl?.startsWith('data:image/'))return false;p.proofs[d]={...photo,status:'pending'};return true;}p.logs=[...new Set([...p.logs,d])].sort((a,b)=>a-b);return true;}
  function acceptProof(p,day){const proof=p.proofs[day];if(!proof||proof.status==='accepted')return false;proof.status='accepted';return true;}
  function resolve(p,actual){
    if(p.status!=='active')return false;if(p.type==='Habit'&&completedDays(p).size!==p.totalDays)return false;
    if(p.type==='Prediction'){if(!['yes','no'].includes(actual)||!Object.keys(p.votes).length)return false;p.result=actual;p.winners=p.people.filter(person=>p.votes[person]===actual);}
    else if(p.type==='Number'){if(actual===''||!Number.isFinite(Number(actual))||!Object.keys(p.guesses).length)return false;p.result=Number(actual);const delta=Math.min(...Object.values(p.guesses).map(g=>Math.abs(g-p.result)));p.winners=p.people.filter(person=>Number.isFinite(p.guesses[person])&&Math.abs(p.guesses[person]-p.result)===delta);}
    else if(p.type==='Race'){const max=Math.max(0,...Object.values(p.scores));p.winners=p.people.filter(person=>(p.scores[person]||0)===max);}
    else if(p.type==='Elimination'){p.winners=p.people.filter(person=>!p.retired.includes(person));if(p.winners.length!==1)return false;}
    else p.winners=['EA'];p.status='completed';p.completedAt=new Date().toISOString();return true;
  }
  function uid(){return typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`p-${Date.now()}-${Math.random().toString(36).slice(2)}`;}
  const api={TYPES,ASSETS,initial,normalize,migrate,inferType,dateOffset,completedDays,progress,nextDay,recordDay,acceptProof,resolve,uid};root.PactModel=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
