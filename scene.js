/* One renderer, shared between visible scene slots. Blender meshes stay in true depth. */
(function(){
'use strict';
const THREE=window.THREE;if(!THREE)return;
const cache=new Map(),slots=new Set(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let renderer,scene,camera,model=null,activeSlot=null,currentType='',generation=0,frame=0,lastTime=0,animUntil=0,actionStart=0,actionKind='',width=0,height=0,io;
let lastDraw=0;
let pointer={x:0,y:0},rotation={x:0,y:0},chapterProgress=0,lastChapter='proof',inView=true;
const labels={habit:'THE HABIT',proof:'THE PROOF',jar:'THE JAR',member:'THE MEMBERSHIP'};
const basePos=new Map();
function motion(){return !reduced.matches&&window.PactApp?.getState().settings.motion!==false;}
function request(){if(!frame&&!document.hidden)frame=requestAnimationFrame(render);}
function discover(){
  document.querySelectorAll('.view.active .scene-slot').forEach(slot=>{if(!slots.has(slot)){slots.add(slot);io.observe(slot);}});
  for(const slot of slots){if(!slot.isConnected){io.unobserve(slot);slots.delete(slot);}}
  choose();
}
function choose(){
  let winner=null,best=0;
  for(const slot of slots){if(!slot.isConnected||!slot.closest('.view.active'))continue;const r=slot.getBoundingClientRect(),visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,76));const score=visible/Math.max(1,r.height);if(score>best){best=score;winner=slot;}}
  inView=best>0;
  if(winner&&winner!==activeSlot){if(activeSlot)activeSlot.classList.remove('scene-live');activeSlot=winner;activeSlot.appendChild(renderer.domElement);if(model&&currentType===winner.dataset.scene)activeSlot.classList.add('scene-live');pointer={x:0,y:0};rotation={x:0,y:0};resize();}
  if(winner){loadType(winner.dataset.scene);updateModelState();}request();
}
function createGeometry(data){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(data.positions,3));g.setIndex(data.indices);g.computeVertexNormals();g.computeBoundingBox();return g;}
async function loadAsset(type){
  if(cache.has(type))return cache.get(type);
  const promise=fetch(`assets/objects/${type}.json`).then(r=>{if(!r.ok)throw Error('Object unavailable');return r.json();}).then(data=>{
    const group=new THREE.Group(),mats={};
    for(const [name,m] of Object.entries(data.materials)){
      const props={color:new THREE.Color(...m.color),roughness:m.roughness,metalness:m.metalness,envMapIntensity:1.15};
      mats[name]=m.transmission?new THREE.MeshPhysicalMaterial({...props,transmission:.9,thickness:.12,roughness:.065,side:THREE.DoubleSide}):new THREE.MeshStandardMaterial(props);
    }
    for(const part of data.meshes){const mesh=new THREE.Mesh(createGeometry(part),mats[part.material]);mesh.name=part.name;mesh.castShadow=part.material!=='SmokedGlass';mesh.receiveShadow=true;mesh.userData.originalMaterial=mesh.material;group.add(mesh);}
    group.userData.materials=mats;group.userData.type=type;return group;
  });cache.set(type,promise);return promise;
}
async function loadType(type){
  if(currentType===type)return;currentType=type;const ticket=++generation;
  // Remove the previous opaque object before revealing the next; no translucent cross-fades.
  if(model){scene.remove(model);model=null;}activeSlot?.classList.remove('scene-live');
  try{
    const asset=await loadAsset(type);if(ticket!==generation)return;model=asset;scene.add(model);model.position.set(0,0,0);model.rotation.set(0,0,0);basePos.clear();model.children.forEach(mesh=>basePos.set(mesh,mesh.position.clone()));
    fitCamera();updateModelState();activeSlot?.classList.add('scene-live');animUntil=performance.now()+500;request();
  }catch(error){if(ticket!==generation)return;currentType='';activeSlot?.classList.remove('scene-live');console.warn('Pact object preview unavailable; showing its still image.',error.message);}
}
function fitCamera(){
  if(!model||!width||!height)return;
  const box=new THREE.Box3().setFromObject(model),center=box.getCenter(new THREE.Vector3());camera.aspect=width/height;camera.fov=35;camera.updateProjectionMatrix();
  const dir=new THREE.Vector3(.48,.7,.85).normalize();let distance=5;
  for(let i=0;i<70;i++){
    camera.position.copy(center).addScaledVector(dir,distance);camera.lookAt(center);camera.updateMatrixWorld();let largest=0;
    for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){const p=new THREE.Vector3(x,y,z).project(camera);largest=Math.max(largest,Math.abs(p.x)/.86,Math.abs(p.y)/.81);}
    if(largest<=1)break;distance*=1.035;
  }
  camera.userData.basePosition=camera.position.clone();camera.userData.target=center;camera.userData.distance=distance;
}
function resize(){if(!activeSlot)return;const r=activeSlot.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<820?1.4:1.75));renderer.setSize(width,height,false);fitCamera();request();}
function updateModelState(){
  if(!model||!activeSlot)return;const id=activeSlot.dataset.pactId,p=id?window.PactApp?.getPact(id):null;
  model.children.forEach(mesh=>{mesh.visible=true;mesh.material=mesh.userData.originalMaterial;mesh.position.set(0,0,0);});
  if(!p){if(model.userData.type==='habit')model.children.forEach(mesh=>{const m=mesh.name.match(/^marker_(\d)(.*)$/);if(m)mesh.visible=m[2]?Number(m[1])<3:Number(m[1])>=3;});return;}const mats=model.userData.materials;
  if(p.type==='Habit'){
    const count=Math.round(window.PactModel.completedDays(p).size/Math.max(1,p.totalDays)*5);
    model.children.forEach(mesh=>{
      const marker=mesh.name.match(/^marker_(\d)(.*)$/);if(marker)mesh.visible=marker[2]?Number(marker[1])<count:Number(marker[1])>=count;
      const tile=mesh.name.match(/^day_(\d)$/);if(tile)mesh.material=Number(tile[1])===count?mats.Oxblood:mats.Ivory;
      if(mesh.name.startsWith('day_label_')){mesh.visible=p.id==='sleep';mesh.material=Number(mesh.name.slice(-1))===count?mats.Ivory:mats.Ink;}
      if(mesh.name==='tray_title')mesh.visible=p.id==='sleep';
    });
  }
  if(p.type==='Race')model.children.forEach(mesh=>{const match=mesh.name.match(/^racer_(?:label_)?(\d)$/);if(match){const i=Number(match[1]),person=p.people[i],values=Object.values(p.scores),max=Math.max(1,...values);const original=[1.3,.55,-.35,-.9][i];mesh.position.x=person?((p.scores[person]||0)/max*2.6-1.3)-original:0;}});
  if(p.type==='Jar')model.children.forEach(mesh=>{const match=mesh.name.match(/^coin_(\d)$/);if(match)mesh.visible=Number(match[1])<Math.min(8,p.violations);});
  if(p.type==='Elimination')model.children.forEach(mesh=>{const match=mesh.name.match(/^pass_(\d)$/);if(match)mesh.material=p.retired.includes(p.people[Number(match[1])])?mats.Ink:mats.Oxblood;});
}
function play(kind){actionKind=kind;actionStart=performance.now();animUntil=actionStart+850;request();}
function render(now){
  frame=0;if(!activeSlot||!inView||document.hidden)return;
  if(motion()&&now-lastDraw<32){request();return;}lastDraw=now;
  const dt=Math.min(32,now-lastTime||16);lastTime=now;
  if(model){
    updateModelState();
    const allow=motion();const ease=1-Math.pow(.85,dt/16),targetX=allow?pointer.y*.045:0,targetY=allow?pointer.x*.09:0;
    rotation.x+=(targetX-rotation.x)*ease;rotation.y+=(targetY-rotation.y)*ease;
    const role=activeSlot.dataset.sceneRole;
    model.rotation.x=rotation.x;model.rotation.y=rotation.y+(allow&&role==='ritual'?(chapterProgress-.5)*.16:0);
    model.position.y=allow?Math.sin(now*.0008)*.055:0;
    if(allow){model.rotation.x+=Math.sin(now*.00055)*.018;model.rotation.y+=Math.sin(now*.0004)*.035;}
    const elapsed=(now-actionStart)/850;
    if(allow&&actionStart&&elapsed>=0&&elapsed<1){
      const impulse=Math.sin(Math.PI*elapsed)*Math.exp(-elapsed*1.5);
      if(actionKind==='reveal')model.rotation.y+=Math.sin(elapsed*Math.PI)*.35;
      else if(actionKind==='coin'&&model.userData.type==='jar'){
        const pact=window.PactApp?.getPact(activeSlot.dataset.pactId);
        const coin=model.getObjectByName(`coin_${Math.min(7,(pact?.violations||1)-1)}`);
        if(coin)coin.position.y=(1-elapsed)*(1-elapsed)*1.4;
      }else if(actionKind==='race'&&model.userData.type==='race'){
        const pact=window.PactApp?.getPact(activeSlot.dataset.pactId),index=pact?.people.indexOf('EA');
        for(const name of [`racer_${index}`,`racer_label_${index}`]){const token=model.getObjectByName(name);if(token)token.position.x-=(1-elapsed)**3*.22;}
      }else model.position.y=impulse*.09;
    }
    if(camera.userData.basePosition){camera.position.copy(camera.userData.basePosition);if(allow&&role==='hero')camera.position.multiplyScalar(1-Math.min(.03,Math.max(0,window.scrollY/18000)));camera.lookAt(camera.userData.target);}
  }
  renderer.render(scene,camera);
  if(motion())request();
}
function scroll(){
  const chapters=[...document.querySelectorAll('.view.active [data-chapter]')];
  if(chapters.length){const readingLine=innerWidth<540?innerHeight*.78:innerHeight*.53;let nearest=null,dist=Infinity;
    chapters.forEach(el=>{const r=el.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-readingLine);if(d<dist){dist=d;nearest=el;}});
    if(nearest){const r=nearest.getBoundingClientRect();chapterProgress=Math.max(0,Math.min(1,(readingLine-r.top)/r.height));const type=nearest.dataset.chapter;if(type!==lastChapter){lastChapter=type;const slot=document.querySelector('[data-scene-role="ritual"]');slot.dataset.scene=type;slot.querySelector('img').src=`assets/objects/${type}.png`;slot.querySelector('img').alt=`${labels[type].toLowerCase()} crafted object`;document.getElementById('ritualObjectLabel').textContent=labels[type];}}
  }
  choose();
}
function environment(){
  const env=new THREE.Scene();env.background=new THREE.Color(.14,.1,.12);
  const shell=new THREE.Mesh(new THREE.BoxGeometry(20,20,20),new THREE.MeshBasicMaterial({color:new THREE.Color(.12,.08,.09),side:THREE.BackSide}));env.add(shell);
  function panel(loc,size,color){const p=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshBasicMaterial({color:new THREE.Color(...color)}));p.position.set(...loc);env.add(p);}
  panel([-5,5,3],[3,6,.1],[4,3.2,2.5]);panel([5,3,-3],[.1,5,4],[2,2.2,2.5]);panel([0,8,0],[5,.1,4],[2.5,2,1.6]);
  const generator=new THREE.PMREMGenerator(renderer),texture=generator.fromScene(env,.04).texture;generator.dispose();env.traverse(o=>{o.geometry?.dispose();if(o.material)o.material.dispose();});return texture;
}
function initDepthScene(){
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.id='pact3d';renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,.1,80);scene.environment=environment();
  scene.add(new THREE.HemisphereLight(0xf8dfbd,0x2b1520,.55));
  const key=new THREE.DirectionalLight(0xffead6,2.0);key.position.set(-4,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-6;key.shadow.camera.right=6;key.shadow.camera.top=6;key.shadow.camera.bottom=-6;key.shadow.normalBias=.035;scene.add(key);
  const fill=new THREE.DirectionalLight(0xd6e0ff,.7);fill.position.set(5,3,-2);scene.add(fill);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.25}));ground.rotation.x=-Math.PI/2;ground.position.y=-.11;ground.receiveShadow=true;scene.add(ground);
  io=new IntersectionObserver(choose,{threshold:[0,.1,.3,.6,.9,1]});
  document.addEventListener('pointermove',event=>{if(!activeSlot||!motion())return;const r=activeSlot.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom){if(pointer.x||pointer.y){pointer={x:0,y:0};request();}return;}pointer.x=(event.clientX-r.left)/r.width*2-1;pointer.y=(event.clientY-r.top)/r.height*2-1;request();},{passive:true});
  window.addEventListener('resize',resize);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('pact:render',discover);window.addEventListener('pact:motion',request);reduced.addEventListener('change',request);document.addEventListener('visibilitychange',()=>{if(!document.hidden)request();});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();activeSlot?.classList.remove('scene-live');});renderer.domElement.addEventListener('webglcontextrestored',()=>{activeSlot?.classList.add('scene-live');request();});
  window.PactScene={play,refresh:discover};discover();
}
try{initDepthScene();}catch(error){document.body.classList.add('no-stage');console.warn('Pact is using still object portraits on this device.',error.message);}
})();
