!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["video/player/extend-speed"]=t():e["video/player/extend-speed"]=t()}(self,(function(){return function(){"use strict";var e={d:function(t,n){for(var s in n)e.o(n,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:n[s]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};e.d(t,{component:function(){return _}});var n=coreApis.utils.urls,s=coreApis.settings,i=coreApis.utils.log,o=coreApis.pluginApis.hook;const r=e=>"function"==typeof e?{next:e}:e,a=e=>function e(t,n,i){let o=!1;const a=[],l=[];let d=!1;const c=()=>{for(;a.length;)a.pop()();l.length=0,d=!0},p=e=>{d||(l.forEach((t=>{t.error?.(e),(0,s.getGeneralSettings)().devMode&&console.error(e)})),c())},u=e=>{d||l.forEach((t=>{try{t.next(e)}catch(e){p(e)}}))},h=()=>{l.forEach((e=>{e.complete?.()})),c()},m=()=>{if(o)return;const e=t?.({next:u,error:p,complete:h});e&&a.push(e),o=!0},b=e=>null==e?null:(l.push(e),()=>{lodash.pull(l,e)}),f=(...t)=>0===t.length?{subscribe:e=>{const t=b(r(e));return(i?.connect??m)(),t},pipe:f,next:u,error:p,complete:h,...i}:e(t[0],{subscribe:b},i||{connect:m,next:u}).pipe(...t.slice(1));if(n){const e=t?.({subscribe:e=>n.subscribe({error:p,complete:h,...r(e)}),next:u,error:p,complete:h});e&&a.push(e)}return f()}(e),l=(e,t)=>a((({next:n})=>(e.addEventListener(t,n),()=>e.removeEventListener(t,n)))),d=(e,...t)=>a((({next:n})=>{e(...t,n)})),c=e=>new Promise(((t,n)=>{const s=e.subscribe({next:e=>{t(e),s()},error:()=>{n(),s()},complete:()=>{n(),s()}})}));var p=coreApis.componentApis.video.playerAgent,u=coreApis.lifeCycle,h=coreApis.observer,m=coreApis.utils,b=coreApis.utils.sort;const f=e=>({subscribe:t,next:n,complete:s,error:i})=>{t(lodash.mapValues({next:n,complete:s,error:i},(t=>e(t))))},g=e=>(...t)=>{Promise.resolve().then((()=>e(...t)))},y=(...e)=>a((({next:t,error:n,complete:s})=>(e=>{const t=new Set;return e((e=>{lodash.castArray(e).forEach((e=>{t.add(e)}))})),()=>{t.forEach((e=>{e()}))}})((i=>{const o=[];let r=0;i(e.map(((i,a)=>i.pipe(f(g)).subscribe({next:n=>{o[a]=n,o.reduce((e=>e+1),0)===e.length&&t(o.slice())},complete:()=>{r++,r===e.length&&s()},error:n})))),i((()=>{o.length=0,r=0}))})))),v=e=>({subscribe:t,next:n,error:s})=>{t(lodash.debounce((e=>{try{n(e)}catch(e){s(e)}}),e))},x=e=>({subscribe:t,next:n})=>{t((t=>{e(t)&&n(t)}))},S=(...e)=>({next:t,subscribe:n})=>{let s=!1;n((n=>{s||e.forEach((e=>t(e))),t(n),s=!0}))};var E=coreApis.pluginApis.data;const w=e=>e.replace(/^\./,""),C=(e,t)=>{const n=t=>{(0,E.registerAndGetData)(e,t)[0]=t},s=(0,E.getData)(e);if(s.length)return[s[0],n];if(t){const e=t();return n(e),[e,n]}return[void 0,n]},V=(e,t=!1)=>t&&1===e?"倍速":Math.trunc(e)===e?`${e}.0x`:`${e}x`,$=e=>{if("倍速"===e)return 1;const t=/([0-9]*[.]?[0-9]+)x/.exec(e);if(t)return parseFloat(t[1]);throw new Error(`unknown speed text: ${e}`)};const M=p.playerAgent.provideCustomQuery({video:{speedMenuList:".bilibili-player-video-btn-speed-menu",speedMenuItem:".bilibili-player-video-btn-speed-menu-list",speedNameBtn:".bilibili-player-video-btn-speed-name",speedContainer:".bilibili-player-video-btn-speed",active:".bilibili-player-active",show:".bilibili-player-speed-show"},bangumi:{speedMenuList:".squirtle-speed-select-list",speedMenuItem:".squirtle-select-item",speedNameBtn:".squirtle-speed-select-result",speedContainer:".squirtle-speed-wrap",active:".active",show:".bilibili-player-speed-show"}});let L;!function(e){e[e.MIN=0]="MIN",e[e.CURRENT=1]="CURRENT",e[e.MAX=2]="MAX"}(L||(L={}));const A=(e,t,n)=>{const s=new MutationObserver(n);return s.observe(e,t),s},k=([e,t])=>{if(!e)throw new Error("speed container element not found!");if(!t)throw new Error("video element not found!");const n=e.querySelector(M.custom.speedNameBtn.selector),s=e.querySelector(M.custom.speedMenuList.selector);let i,o,r;const l=a(),d=a().pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))}));d.pipe(S(void 0),(({subscribe:e,next:t})=>{const n=[];return e((e=>{2===n.length&&n.shift(),n.push(e),2===n.length&&t(n.slice())})),()=>{n.length=0}})).subscribe((([e,t])=>{o=e,i=t}));const c=e=>{if(e)switch(e.nodeType){case Node.TEXT_NODE:d.next($(e.data));break;case Node.ELEMENT_NODE:d.next($(e.innerHTML));break;default:console.warn("The target parameter of updateActiveVideoSpeed must be a Node, and the node type must be one of TEXT_NODE and ELEMENT_NODE")}},p=()=>{r=lodash([...s.children]).map((e=>lodash.attempt((()=>$(e.textContent))))).reject((e=>lodash.isError(e))).sort((0,b.ascendingSort)()).value()};c(n),p();const u=A(s,{childList:!0,attributes:!0},(e=>{const{attributes:t=[],childList:n=[]}=lodash.groupBy(e,"type");n.length&&p(),l.next({attributes:t,childList:n})})),h=A(n,{childList:!0,subtree:!0},(e=>{e.forEach((e=>{const[t]=e.addedNodes;c(t)}))}));return{containerElement:e,videoElement:t,nameBtnElement:n,menuListElement:s,query:e=>(0,m.des)(`./*[contains(@class, "${w(M.custom.speedMenuItem.selector)}") and normalize-space()="${V(e)}"]`,s),dispose:()=>{u.disconnect(),h.disconnect()},activeVideoSpeed$:d,menuListElementMutations$:l,getActiveVideoSpeed:()=>i,getOldActiveVideoSpeed:()=>o,getAvailableSpeedValues:()=>r}},N=e=>{const{videoElement:t,menuListElement:n}=e,s=l(n,"click").pipe((i=e=>{const{innerText:t,innerHTML:n}=e.target,s=t.trim()||n.trim();return lodash.attempt((()=>$(s)))},({subscribe:e,next:t})=>{e((e=>{t(i(e))}))}),x((e=>!lodash.isError(e))));var i;const o=a((({next:e})=>{let n=t;do{n=Object.getPrototypeOf(n)}while(null===n||!Object.prototype.hasOwnProperty.call(n,"playbackRate"));const s=Object.getOwnPropertyDescriptor(n,"playbackRate");return Object.defineProperty(n,"playbackRate",{set(t){s.set.call(this,t),e(t)}}),()=>{Object.defineProperty(n,"playbackRate",s)}})),r=s.pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))})),d=o.pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))})),c=a((({next:e})=>{const t=y(r,d);return t.subscribe((([t,n])=>{t===n&&e(n)})),()=>t.complete()})).pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))}));let p;d.pipe(v(200),S(void 0),(({subscribe:e,next:t})=>{const n=[];return e((e=>{2===n.length&&n.shift(),n.push(e),2===n.length&&t(n.slice())})),()=>{n.length=0}})).subscribe((([e])=>{p=e}));const u={menuListElementClickSpeed$:s,menuListElementClickSpeedChange$:r,playbackRate$:o,playbackRateChange$:d,videoSpeedChange$:c};return{...e,...u,dispose:()=>{lodash.values(u).forEach((e=>{e.complete()})),e.dispose()},getOldPlaybackRate:()=>p}},[O]=C("speed.NoSuchSpeedMenuItemElementError",(()=>class extends Error{constructor(e){const t=lodash.attempt((()=>V(e))),n=lodash.isError(t)?String(e):String(t);var s,i,o;super(`There is no such speed menu item as ${n}`),this.speed=e,o=void 0,(i="formattedSpeed")in(s=this)?Object.defineProperty(s,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):s[i]=o,this.formattedSpeed=n}})),T=e=>{const{query:t,videoElement:n,videoSpeedChange$:s,getOldActiveVideoSpeed:i,getAvailableSpeedValues:o,getActiveVideoSpeed:r}=e,a=async(e,i=200)=>{const o=t(e);if(null==o)throw new O(e);o.click();const r=t=>{if((t??n.playbackRate)!==e)throw new Error(`failed to set ${V(e)} video speed.`)},a=[c(s.pipe(v(Math.max(0,i||0))))];i>0&&a.push(new Promise(((e,t)=>setTimeout((()=>setTimeout(t,i)))))),await Promise.all(a).then(r).catch(r)},l=async()=>{await a(1)},d=async(e,t)=>{if(lodash.isNil(e)&&(e=!1),"boolean"==typeof e)e||1===n.playbackRate?await a(i()):await l();else{const n=o();switch(t){case L.MIN:await a(n[e]);break;case L.MAX:await a(n[n.length-1+e]);break;case L.CURRENT:default:{const t=n.indexOf(r());if(-1===t)throw new Error("Unexpected Error: The available speed values do not include the active speed value, this should be a bug, please report the issue on github!");await a(n[t+e])}}}},p=async e=>{try{await d(e,L.CURRENT)}catch(e){if(console.warn(e),!(e instanceof O))throw e}};return Object.assign(e,{set:a,force:async e=>{n.playbackRate=e},reset:l,toggle:d,step:p,increase:async()=>{await p(1)},decrease:async()=>{await p(-1)}})},I=()=>C("speed.speedContext"),R=()=>C("speed.buildArguments$",(()=>{return a().pipe((e=e=>e.settings.enabled,({subscribe:t,next:n})=>{const s=new Set;return t((t=>{const i=s.size;e(t)?s.add(t):s.delete(t),s.size!==i&&n([...s])})),()=>{s.clear()}}));var e})),j=async(e=lodash.identity)=>{const[t,n]=I();if(t)return t;let s,i;const[o]=C("lifeCycleComponentLoaded$",(()=>l(unsafeWindow,u.LifeCycleEventTypes.ComponentsLoaded))),[r]=R(),[p]=C("speed.videoChange$",(()=>d(h.videoChange).pipe(x((({aid:e,cid:t})=>e||t))))),[m]=C("speed.speedContext$",(()=>a((({next:t})=>y(p,r,o).subscribe((([n,o])=>{const[r]=I();r?.dispose(),i?.("context update");const a=new Promise(((e,t)=>{s=e,i=t}));Promise.all([Promise.all([M.custom.speedContainer(),M.query.video.element()]).then(s),a]).then((([,e])=>e)).then(k).then(N).then(T).then((e=>Object.assign(e,{videoIdObject:n,speedContext$:m,videoChange$:p}))).then(e(o)).then(t).catch((e=>console.error(e)))}))))));return m.subscribe(n),c(m)};function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const q=[.5,.75,1,1.25,1.5,2],U=.0625;class z{constructor(e){this.entryContext=e,P(this,"speedContext",void 0),P(this,"settings",void 0),P(this,"coreApis",void 0),P(this,"metadata",void 0),P(this,"options",void 0),P(this,"getVideoIdObject",void 0),P(this,"getAvailableSpeedValues",void 0),P(this,"getOldActiveVideoSpeed",void 0),P(this,"forceVideoSpeed",void 0),P(this,"getVideoSpeed",void 0),P(this,"setVideoSpeed",void 0),P(this,"resetVideoSpeed",void 0),P(this,"toggleVideoSpeed",void 0),P(this,"increaseVideoSpeed",void 0),P(this,"decreaseVideoSpeed",void 0),lodash.assign(this,e,{options:e.settings.options}),this.migrate?.(),lodash.assign(this,lodash.mapValues(z.contextMap,(e=>async(...t)=>{const n=await j(),s=lodash.get(n,e);return lodash.isFunction(s)?await s(...t):s})))}}P(z,"create",void 0),P(z,"contextMap",{getVideoIdObject:"videoIdObject",getAvailableSpeedValues:"getAvailableSpeedValues",getOldActiveVideoSpeed:"getOldActiveVideoSpeed",getVideoSpeed:"videoElement.playbackRate",setVideoSpeed:"set",forceVideoSpeed:"force",resetVideoSpeed:"reset",toggleVideoSpeed:"toggle",increaseVideoSpeed:"increase",decreaseVideoSpeed:"decrease"}),j((e=>t=>{const n=lodash.omit(t,"dispose"),i=e.map((e=>e.getSpeedContextMixin(n)));if(i.length>1){const e=lodash.intersection(...i.map(Object.keys));if(e.length)throw new Error(`In the registered speed ​​component, there is an implementation of getSpeedContextMixin that causes the speed context to be mixed in ambiguous.\nThe repeated key names are ${e.join(", ")}`)}lodash.assign(n,...i);const o=[];return e.forEach((e=>{const t=lodash(e.settings.options).mapValues(((t,n)=>d(s.addComponentListener,`${e.metadata.name}.${n}`).pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))})))).mapKeys(((e,t)=>`${t}$`)).value();o.push(...lodash.values(t)),e.options=new Proxy(e.settings.options,{get:(e,n,s)=>lodash.isSymbol(n)?Reflect.get(e,n,s):!Reflect.has(e,n)&&n.endsWith("$")?t[n]:Reflect.get(e,n,s)}),e.speedContext=n,e.onSpeedContext(n),e.settings.enabled&&lodash(t).entries().forEach((([t,n])=>{n.next(e.settings.options[t.slice(0,-1)])}))})),{...n,dispose:()=>{o.forEach((e=>e.complete())),t.dispose()}}})),z.create=function(e){const t=a().pipe((({subscribe:e,next:t})=>{let n,s=!0;e((e=>{(s||n!==e)&&(s=!1,n=e,t(e))}))}));return{...e,entry:n=>{const s=lodash.attempt((()=>new this(n)));if(s instanceof Error)return(0,i.logError)(s),null;const[r]=R();return t.subscribe((()=>{r.next(s)})),r.next(s),(0,o.getHook)(`speed.component.${e.name}`).after(s),s},reload:()=>t.next(!0),unload:()=>t.next(!1)}};var H=coreApis.style,B=coreApis.toast;const D=({style:e,name:t,container:n})=>{let s;const i=()=>s?.remove();return{next:o=>{i();const r="function"==typeof e?e(o):e;r&&(s=(0,H.addStyle)(r,t,n))},complete:i}};function W(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const F=(e,t=!0)=>{const n=document.createElement("div");n.innerHTML=e;const s={},i=n.children.item(0),o=e=>{t&&(e.id=`scoped-element-${Math.random().toString(36).replace(/[^a-z0-9]+/g,"")}`);const n=e.getAttribute("data-ref");n&&(s[lodash.camelCase(n)]=e);for(let t=0;t<e.children.length;t++)o(e.children.item(t))};return o(i),{...s,root:i}};class X extends z{constructor(...e){super(...e),W(this,"elementMap",[]),W(this,"inputElement",void 0),W(this,"unpatch",void 0),W(this,"currentSpeedValue",void 0),W(this,"filterNativeSpeed",(()=>({subscribe:e,next:t})=>{e((e=>{q.includes(e)&&t(e)}))}))}static get activeClassName(){return w(M.custom.active.selector)}static get showClassName(){return w(M.custom.show.selector)}static get speedMenuItemClassName(){return w(M.custom.speedMenuItem.selector)}addSpeedValue(e){this.options.extendSpeedList=lodash.sortedUniq(this.options.extendSpeedList.concat(e).sort((0,b.ascendingSort)()))}removeSpeedValue(e){this.options.extendSpeedList=lodash.without(this.options.extendSpeedList,e)}createInputElement(){const{input:e,root:t,icon:n}=F(`\n      <li class="${w(M.custom.speedMenuItem.selector)} extend-speed-input">\n        <i data-ref="icon" class="mdi mdi-playlist-plus" style="font-size: 1.5em"></i>\n        <input data-ref="input" type="number" title="添加新的倍数值" max="16" step="0.5" style="display: none;"></input>\n      </li>\n    `),s=()=>{const t=this.speedContext.getAvailableSpeedValues().slice(-1)[0]+.5,n=lodash.toString(t>16?null:t);e.value=n,e.min=n};this.options.extendSpeedList$.pipe(f(g)).subscribe(s);const o=(0,H.addStyle)(`\n      #${e.id} {\n        font-size: inherit;\n        color: inherit;\n        line-height: inherit;\n        background: transparent;\n        outline: none;\n        width: 100%;\n        border: none;\n        text-align: center;\n        cursor: text;\n      }\n      /* https://stackoverflow.com/a/4298216 */\n      /* Chrome */\n      #${e.id}::-webkit-outer-spin-button,\n      #${e.id}::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n      /* Firefox */\n      #${e.id}[type=number] {\n        -moz-appearance:textfield;\n      }\n    `),r=lodash.over(l(e,"keydown").pipe(v(200)).subscribe((({key:t})=>{if("Enter"!==t)return;const n=parseFloat(e.value);try{if(!lodash.isFinite(n))throw new Error("无效的倍数值");if(n<U)throw new Error("倍数值太小了");if(n>16)throw new Error("倍数值太大了");if(this.speedContext.getAvailableSpeedValues().includes(n))throw new Error("不能重复添加已有的倍数值");this.addSpeedValue(n)}catch(t){(0,i.logError)(String(t),5e3),e.focus(),e.select()}})),l(t,"mouseenter").subscribe((()=>{e.style.display="inline",n.style.display="none",s(),setTimeout((()=>e.focus()))})),l(t,"mouseleave").subscribe((()=>{e.style.display="none",n.style.display="inline"})),(()=>t.remove()),(()=>o.remove()));return{node:t,destroy:r}}createCustomSpeedMenuItemElement(e){const{closeBtn:t,root:n}=F(`\n      <li class="${w(M.custom.speedMenuItem.selector)} extend-speed-item">\n        ${V(e)}\n        <i data-ref="close-btn" class="mdi mdi-close-circle"></i>\n      </li>\n    `),s=(0,H.addStyle)(`\n      .extend-speed-item [data-ref="close-btn"] {\n        color: inherit;\n        opacity: 0.5;\n        display: none;\n        position: absolute;\n        right: 4px;\n      }\n      ${M.custom.speedMenuItem.selector}:not(${M.custom.active.selector}):hover [data-ref="close-btn"] {\n        display: inline;\n      }\n      .extend-speed-item [data-ref="close-btn"]:hover {\n        opacity: 1;\n        transition: all .3s;\n      }\n    `),i=lodash.over(l(t,"click").subscribe((()=>{this.removeSpeedValue(e)})),(()=>n.remove()),(()=>s.remove()));return{tag:e,node:n,destroy:i}}migrate(){const{options:e}=this.settings,{options:t}=(0,s.getComponentSettings)("rememberVideoSpeed");t.extendList&&(e.extendSpeedList=Array.from(t.extendList),delete t.extendList,delete t.extend,B.Toast.success("从「倍速记忆」组件迁移旧配置成功","【扩展倍速】旧配置迁移完成",8e3))}// eslint-disable-next-line class-methods-use-this
getSpeedContextMixin({menuListElement:e}){return{query:t=>(0,m.des)(`./*[contains(@class, "${X.speedMenuItemClassName}") and not(contains(@class, "extend-speed-input")) and normalize-space()="${V(t)}"]`,e)}}onSpeedContext({menuListElementClickSpeedChange$:e,menuListElementMutations$:t,playbackRate$:n,menuListElement:s}){this.options.extendSpeedList$.subscribe({next:e=>this.patch(((e,t)=>{let n=0,s=e.length,i=0,o=t.length;for(;n<s&&i<o&&e[n]===t[i];)n++,i++;for(;n<s&&i<o&&e[s-1]===t[o-1];)s--,o--;return[n,s-n,t.slice(i,o)]})(this.elementMap.map((e=>e.tag)),Array.from(e))),complete:()=>{this.unpatch()}}),this.options.maxMenuHeight$.subscribe(D({name:"extend-video-speed-style",style:e=>`\n                  ${M.custom.speedMenuList.selector} {\n                    display: flex;\n                    flex-direction: column;\n                    overflow-y: auto;\n                    max-height: ${e}px;\n                  }`})),this.options.hideScrollbar$.subscribe(D({name:"extend-video-speed-no-scrollbar-style",style:e=>e&&`\n                ${M.custom.speedMenuList.selector} {\n                  scrollbar-width: none !important;\n                  overscroll-behavior: contain;\n                }\n                ${M.custom.speedMenuList.selector}::-webkit-scrollbar {\n                    height: 0 !important;\n                    width: 0 !important;\n                }`}));let i=1;n.pipe(x((e=>q.includes(e)))).subscribe((e=>{i=e})),e.subscribe({next:e=>{this.forceVideoSpeedWithUpdateStyle(e),this.currentSpeedValue=e},complete:()=>{this.setVideoSpeed(i),this.forceVideoSpeedWithUpdateStyle(i)}}),t.subscribe((({attributes:e})=>{e.forEach((e=>{if("style"===e.attributeName){const{display:e}=unsafeWindow.getComputedStyle(s);"block"===e&&(s.style.display="flex")}}))})),this.currentSpeedValue&&requestIdleCallback((()=>{this.setVideoSpeed(this.currentSpeedValue,1e3)}))}async forceVideoSpeedWithUpdateStyle(e){await this.forceVideoSpeed(e),setTimeout((()=>this.forceUpdateStyle(e)))}patch(e){const[t,n,s]=e,{menuListElement:i}=this.speedContext;if(this.inputElement||(this.inputElement=this.createInputElement(),i.prepend(this.inputElement.node)),0===n&&0===s.length)return;const o=s.map((e=>this.createCustomSpeedMenuItemElement(e)));this.elementMap.splice(t,n,...o).forEach((e=>{e.destroy()})),(this.elementMap[t-1]||this.inputElement).node.after(...o.map((e=>e.node)).reverse()),i.querySelectorAll(`${M.custom.speedMenuItem.selector}:not(#${this.inputElement.node.id})`).forEach((e=>{e.style.order=(1e4*(16-$(e.innerHTML))).toString()})),this.unpatch=()=>{this.inputElement.destroy(),this.inputElement=void 0,this.elementMap.forEach((e=>e.destroy())),this.elementMap.length=0}}forceUpdateStyle(e){const{menuListElement:t,containerElement:n,nameBtnElement:s,query:i}=this.speedContext;for(const e of(0,m.dea)(`./*[contains(@class, "${X.speedMenuItemClassName}") and contains(@class, "${X.activeClassName}")]`,t))e.classList.remove(X.activeClassName);i(e).classList.add(X.activeClassName),n.classList.remove(X.showClassName),s.innerText=V(e,!0)}}const _=X.create({name:"extendVideoSpeed",displayName:"扩展倍速",author:{name:"JLoeve",link:"https://github.com/LonelySteve"},description:{"zh-CN":"\n\n> 扩展视频播放器的倍速菜单项，可用于突破原有播放倍数的上限或下限.\n\n### 🔧 **选项**\n\n- `隐藏滚动条`：如果添加的倍速过多，倍速菜单将出现滚动条，在 Windows 下，若没有安装并启用「细滚动条」组件会显得比较挤，建议开启此选项隐藏滚动条.\n\n### **新增倍速**\n\n开启组件后，在默认情况下，播放器的倍速菜单就会新增 2.5x 和 3.0x 两个倍速选项.\n\n如果需要添加更多倍速，只需将鼠标指针移到菜单顶部的新增图标上，图标将变成一个输入框，根据需要键入新的倍速值，或通过滚轮增减数值，或直接使用推荐的数值，回车确认即可.\n\n新增倍速的范围要求在 0.0625 到 16 之间，数量则不受限制.\n\n**不推荐设置超高倍速（>3.0x）**：原生播放器内部没有针对超高倍速进行优化，可能导致音画不同步、播放卡顿、声音嘈杂/消失等一系列问题.\n\n### **删除倍速**\n\n将鼠标指针移到**自定义**的倍速菜单项上，其右侧将会显示一个移除图标，单击即可删除相应的倍速.\n\n"},tags:[componentsTags.video],urlInclude:n.playerUrls,options:{maxMenuHeight:{displayName:"倍速菜单最大高度",defaultValue:360,hidden:!0,validator:e=>Math.max(parseInt(e),360)||360},hideScrollbar:{displayName:"隐藏滚动条",defaultValue:!1},extendSpeedList:{displayName:"扩展倍速列表",defaultValue:[2.5,3],hidden:!0}},commitHash:"45559a01c349d04273e68d8bf8c8497db1881651",coreVersion:"2.1.9"});return t=t.component}()}));