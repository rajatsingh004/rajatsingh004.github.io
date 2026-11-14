const scenarios={
  healthy:{status:"HEALTHY",note:"A change moves through review, automated checks, controlled deployment, and post-release health signals.",steps:["active","active","active","active"],links:["","",""]},
  gate:{status:"BLOCKED SAFELY",note:"A failed quality or security check stops promotion before production. The team gets a clear signal and actionable feedback while the current service stays available.",steps:["done","warn","",""],links:["warn","",""]},
  incident:{status:"RECOVERY IN PROGRESS",note:"During an incident, establish impact, use telemetry to narrow the fault domain, restore service through a known path, then feed the learning back into automation and platform design.",steps:["done","done","done","warn"],links:["","","warn"]}
};
const flow=document.getElementById("demo-flow");
const note=document.getElementById("demo-note");
const status=document.getElementById("demo-status-text");
document.querySelectorAll(".scenario-button").forEach(button=>button.addEventListener("click",()=>{
  const scenario=scenarios[button.dataset.scenario];
  document.querySelectorAll(".scenario-button").forEach(item=>{item.classList.toggle("selected",item===button);item.setAttribute("aria-pressed",String(item===button));});
  status.textContent=scenario.status;
  document.querySelector(".demo-status").classList.toggle("is-warning",scenario.status!=="HEALTHY");
  note.textContent=scenario.note;
  flow.querySelectorAll(".flow-step").forEach((step,index)=>{step.classList.remove("active","warn","done");if(scenario.steps[index])step.classList.add(scenario.steps[index]);});
  flow.querySelectorAll(".flow-connector").forEach((line,index)=>{line.classList.remove("warn");if(scenario.links[index])line.classList.add(scenario.links[index]);});
}));
document.getElementById("year").textContent=new Date().getFullYear();
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll(".work-card,.role,.capability-grid article").forEach(item=>{item.classList.add("fade-in");observer.observe(item);});}
