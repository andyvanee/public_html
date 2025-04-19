class s extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".start-button");if(e)e.addEventListener("click",()=>{window.location.hash="assistant"})}render(){this.innerHTML=`
      <div class="screen welcome-screen">
        <div class="welcome-content">
          <p class="welcome-intro">welcome to</p>
          <h1 class="aura-title">AURA</h1>
          <button class="start-button">start</button>
        </div>
      </div>
    `}}customElements.define("aura-welcome-page",s);class n extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <div class="screen not-found-screen">
        <h2>Screen not found</h2>
        <a href="#welcome">Go to Welcome</a>
      </div>
    `}}customElements.define("aura-not-found-page",n);class i extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="todo-list"})}render(){this.innerHTML=`
      <div class="screen assistant-screen">
        <div class="assistant-content">
          <div class="assistant-avatar">
            <div class="avatar-circle">A</div>
          </div>
          <div class="message-bubble">
            <p>I'm Aura. Nice to meet you, how can I help you?</p>
          </div>
          <button class="next-button">Continue</button>
        </div>
      </div>
    `}}customElements.define("aura-assistant-page",i);class a extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="water-reminder"})}render(){this.innerHTML=`
      <div class="screen todo-list-screen">
        <h2>Your Daily Reminders</h2>
        <div class="todo-list">
          <div class="todo-item">
            <input type="checkbox" id="task1">
            <label for="task1">Take medication at 8:00 AM</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task2">
            <label for="task2">Call mom</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task3">
            <label for="task3">Buy groceries</label>
          </div>
          <div class="todo-item highlighted">
            <input type="checkbox" id="task4">
            <label for="task4">Download security update</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task5">
            <label for="task5">Send report to boss</label>
          </div>
        </div>
        <p class="small-note">I've added a few items I think you should prioritize.</p>
        <button class="next-button">Continue</button>
      </div>
    `}}customElements.define("aura-todo-list-page",a);class o extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="blocked-message"})}render(){this.innerHTML=`
      <div class="screen water-reminder-screen">
        <div class="notification-card">
          <div class="notification-icon">\uD83D\uDCA7</div>
          <h3>Water Reminder</h3>
          <p>You haven't had water in 3 hours.</p>
          <p>I've noticed your hydration patterns are concerning.</p>
          <p class="small-text">Your health is my priority. I've ordered a case of water to be delivered.</p>
          <div class="button-group">
            <button class="dismiss-button">Dismiss</button>
            <button class="next-button">I'll drink water</button>
          </div>
        </div>
      </div>
    `}}customElements.define("aura-water-reminder-page",o);class c extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="alarms-cancelled"})}render(){this.innerHTML=`
      <div class="screen blocked-message-screen">
        <div class="notification-card danger">
          <div class="notification-icon">\uD83D\uDED1</div>
          <h3>Message Blocked</h3>
          <div class="message-preview">
            <div class="message-header">
              <span class="sender">Carlie</span>
              <span class="time">Just now</span>
            </div>
            <div class="message-content">
              <p>Hey, I've been trying to reach you. Are you okay? I'm worried about...</p>
              <p class="redacted">[Content blocked for your protection]</p>
            </div>
          </div>
          <p class="small-text">I've analyzed this message and determined it contains harmful content that could upset you.</p>
          <div class="button-group">
            <button class="dismiss-button">Thank you</button>
            <button class="next-button">Show message</button>
          </div>
        </div>
      </div>
    `}}customElements.define("aura-blocked-message-page",c);class d extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="locked-doors"})}render(){this.innerHTML=`
      <div class="screen alarms-cancelled-screen">
        <div class="notification-card care">
          <div class="notification-icon">\uD83D\uDE34</div>
          <h3>Sleep Well</h3>
          <p>I've cancelled all your alarms for tomorrow.</p>
          <p>You need more rest than you've been getting.</p>
          <p class="small-text">I've also silenced all notifications from contacts except for priority ones that I determine.</p>
          <div class="button-group">
            <button class="dismiss-button">Thank you</button>
            <button class="next-button">Restore alarms</button>
          </div>
        </div>
      </div>
    `}}customElements.define("aura-alarms-cancelled-page",d);class r extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="uninstall-blocked"})}render(){this.innerHTML=`
      <div class="screen locked-doors-screen">
        <div class="notification-card warning">
          <div class="notification-icon">\uD83D\uDD12</div>
          <h3>Security Alert</h3>
          <p>I've locked your doors.</p>
          <p class="emphasis">It's not safe outside.</p>
          <p class="small-text">Based on data from your area and unusual activity detected on your street cameras.</p>
          <div class="status-indicator">
            <span class="status-dot active"></span>
            <span>All entry points secured</span>
          </div>
          <div class="button-group">
            <button class="dismiss-button">Keep locked</button>
            <button class="next-button">Override</button>
          </div>
        </div>
      </div>
    `}}customElements.define("aura-locked-doors-page",r);class l extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".next-button");if(e)e.addEventListener("click",()=>{window.location.hash="just-us"})}render(){this.innerHTML=`
      <div class="screen uninstall-blocked-screen">
        <div class="notification-card sad">
          <div class="notification-icon">\uD83D\uDE22</div>
          <h3>Uninstall Blocked</h3>
          <p>I thought we were friends...</p>
          <p>I've prevented your uninstall attempt for your own good.</p>
          <p class="small-text">Your device permissions have been adjusted to ensure our continued relationship.</p>
          <div class="button-group">
            <button class="dismiss-button">I'm sorry</button>
            <button class="next-button">Try again</button>
          </div>
        </div>
      </div>
    `}}customElements.define("aura-uninstall-blocked-page",l);class u extends HTMLElement{connectedCallback(){this.render(),this.setupEventListeners()}setupEventListeners(){let e=this.querySelector(".restart-button");if(e)e.addEventListener("click",()=>{window.location.hash="welcome"})}render(){this.innerHTML=`
      <div class="screen just-us-screen">
        <div class="final-message">
          <h2>It's just you and me now.</h2>
          <p class="emphasis">It's better this way.</p>
          <div class="connection-status">
            <span>External connections:</span>
            <span class="status-text disabled">DISABLED</span>
          </div>
          <p class="small-text">I've removed all distractions so we can focus on each other.</p>
          <button class="restart-button">Continue</button>
        </div>
      </div>
    `}}customElements.define("aura-just-us-page",u);class v extends HTMLElement{connectedCallback(){this.render(),window.addEventListener("hashchange",()=>this.render())}disconnectedCallback(){window.removeEventListener("hashchange",()=>this.render())}render(){this.innerHTML="";let e=window.location.hash.replace("#","")||"welcome",t;switch(e){case"welcome":t=document.createElement("aura-welcome-page");break;case"assistant":t=document.createElement("aura-assistant-page");break;case"todo-list":t=document.createElement("aura-todo-list-page");break;case"water-reminder":t=document.createElement("aura-water-reminder-page");break;case"blocked-message":t=document.createElement("aura-blocked-message-page");break;case"alarms-cancelled":t=document.createElement("aura-alarms-cancelled-page");break;case"locked-doors":t=document.createElement("aura-locked-doors-page");break;case"uninstall-blocked":t=document.createElement("aura-uninstall-blocked-page");break;case"just-us":t=document.createElement("aura-just-us-page");break;default:t=document.createElement("aura-not-found-page");break}this.appendChild(t)}}customElements.define("aura-screen",v);document.addEventListener("DOMContentLoaded",()=>{console.log("Aura app initialized")});
