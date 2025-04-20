var V=function(Z,$,K,Q){var J=arguments.length,F=J<3?$:Q===null?Q=Object.getOwnPropertyDescriptor($,K):Q,G;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")F=Reflect.decorate(Z,$,K,Q);else for(var U=Z.length-1;U>=0;U--)if(G=Z[U])F=(J<3?G(F):J>3?G($,K,F):G($,K))||F;return J>3&&F&&Object.defineProperty($,K,F),F};var BZ=globalThis,NZ=BZ.ShadowRoot&&(BZ.ShadyCSS===void 0||BZ.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,YZ=Symbol(),xZ=new WeakMap;class kZ{constructor(Z,$,K){if(this._$cssResult$=!0,K!==YZ)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=Z,this._strings=$}get styleSheet(){let Z=this._styleSheet,$=this._strings;if(NZ&&Z===void 0){let K=$!==void 0&&$.length===1;if(K)Z=xZ.get($);if(Z===void 0){if((this._styleSheet=Z=new CSSStyleSheet).replaceSync(this.cssText),K)xZ.set($,Z)}}return Z}toString(){return this.cssText}}var k0=(Z)=>{if(Z._$cssResult$===!0)return Z.cssText;else if(typeof Z==="number")return Z;else throw new Error(`Value passed to 'css' function must be a 'css' function result: ${Z}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},j0=(Z)=>new kZ(typeof Z==="string"?Z:String(Z),void 0,YZ),C=(Z,...$)=>{let K=Z.length===1?Z[0]:$.reduce((Q,J,F)=>Q+k0(J)+Z[F+1],Z[0]);return new kZ(K,Z,YZ)},pZ=(Z,$)=>{if(NZ)Z.adoptedStyleSheets=$.map((K)=>K instanceof CSSStyleSheet?K:K.styleSheet);else for(let K of $){let Q=document.createElement("style"),J=BZ.litNonce;if(J!==void 0)Q.setAttribute("nonce",J);Q.textContent=K.cssText,Z.appendChild(Q)}},I0=(Z)=>{let $="";for(let K of Z.cssRules)$+=K.cssText;return j0($)},jZ=NZ?(Z)=>Z:(Z)=>Z instanceof CSSStyleSheet?I0(Z):Z;var{is:O0,defineProperty:D0,getOwnPropertyDescriptor:lZ,getOwnPropertyNames:T0,getOwnPropertySymbols:L0,getPrototypeOf:cZ}=Object,R0=!1,I=globalThis;if(R0)I.customElements??=customElements;var O=!0,P,sZ=I.trustedTypes,P0=sZ?sZ.emptyScript:"",rZ=O?I.reactiveElementPolyfillSupportDevMode:I.reactiveElementPolyfillSupport;if(O)I.litIssuedWarnings??=new Set,P=(Z,$)=>{if($+=` See https://lit.dev/msg/${Z} for more information.`,!I.litIssuedWarnings.has($)&&!I.litIssuedWarnings.has(Z))console.warn($),I.litIssuedWarnings.add($)},queueMicrotask(()=>{if(P("dev-mode","Lit is in dev mode. Not recommended for production!"),I.ShadyDOM?.inUse&&rZ===void 0)P("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});var E0=O?(Z)=>{if(!I.emitLitDebugLogEvents)return;I.dispatchEvent(new CustomEvent("lit-debug",{detail:Z}))}:void 0,c=(Z,$)=>Z,n={toAttribute(Z,$){switch($){case Boolean:Z=Z?P0:null;break;case Object:case Array:Z=Z==null?Z:JSON.stringify(Z);break}return Z},fromAttribute(Z,$){let K=Z;switch($){case Boolean:K=Z!==null;break;case Number:K=Z===null?null:Number(Z);break;case Object:case Array:try{K=JSON.parse(Z)}catch(Q){K=null}break}return K}},WZ=(Z,$)=>!O0(Z,$),oZ={attribute:!0,type:String,converter:n,reflect:!1,useDefault:!1,hasChanged:WZ};Symbol.metadata??=Symbol("metadata");I.litPropertyMetadata??=new WeakMap;class D extends HTMLElement{static addInitializer(Z){this.__prepare(),(this._initializers??=[]).push(Z)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(Z,$=oZ){if($.state)$.attribute=!1;if(this.__prepare(),this.prototype.hasOwnProperty(Z))$=Object.create($),$.wrapped=!0;if(this.elementProperties.set(Z,$),!$.noAccessor){let K=O?Symbol.for(`${String(Z)} (@property() cache)`):Symbol(),Q=this.getPropertyDescriptor(Z,K,$);if(Q!==void 0)D0(this.prototype,Z,Q)}}static getPropertyDescriptor(Z,$,K){let{get:Q,set:J}=lZ(this.prototype,Z)??{get(){return this[$]},set(F){this[$]=F}};if(O&&Q==null){if("value"in(lZ(this.prototype,Z)??{}))throw new Error(`Field ${JSON.stringify(String(Z))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);P("reactive-property-without-getter",`Field ${JSON.stringify(String(Z))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:Q,set(F){let G=Q?.call(this);J?.call(this,F),this.requestUpdate(Z,G,K)},configurable:!0,enumerable:!0}}static getPropertyOptions(Z){return this.elementProperties.get(Z)??oZ}static __prepare(){if(this.hasOwnProperty(c("elementProperties",this)))return;let Z=cZ(this);if(Z.finalize(),Z._initializers!==void 0)this._initializers=[...Z._initializers];this.elementProperties=new Map(Z.elementProperties)}static finalize(){if(this.hasOwnProperty(c("finalized",this)))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(c("properties",this))){let $=this.properties,K=[...T0($),...L0($)];for(let Q of K)this.createProperty(Q,$[Q])}let Z=this[Symbol.metadata];if(Z!==null){let $=litPropertyMetadata.get(Z);if($!==void 0)for(let[K,Q]of $)this.elementProperties.set(K,Q)}this.__attributeToPropertyMap=new Map;for(let[$,K]of this.elementProperties){let Q=this.__attributeNameForProperty($,K);if(Q!==void 0)this.__attributeToPropertyMap.set(Q,$)}if(this.elementStyles=this.finalizeStyles(this.styles),O){if(this.hasOwnProperty("createProperty"))P("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");if(this.hasOwnProperty("getPropertyDescriptor"))P("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}}static finalizeStyles(Z){let $=[];if(Array.isArray(Z)){let K=new Set(Z.flat(1/0).reverse());for(let Q of K)$.unshift(jZ(Q))}else if(Z!==void 0)$.push(jZ(Z));return $}static __attributeNameForProperty(Z,$){let K=$.attribute;return K===!1?void 0:typeof K==="string"?K:typeof Z==="string"?Z.toLowerCase():void 0}constructor(){super();this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise((Z)=>this.enableUpdating=Z),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach((Z)=>Z(this))}addController(Z){if((this.__controllers??=new Set).add(Z),this.renderRoot!==void 0&&this.isConnected)Z.hostConnected?.()}removeController(Z){this.__controllers?.delete(Z)}__saveInstanceProperties(){let Z=new Map,$=this.constructor.elementProperties;for(let K of $.keys())if(this.hasOwnProperty(K))Z.set(K,this[K]),delete this[K];if(Z.size>0)this.__instanceProperties=Z}createRenderRoot(){let Z=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pZ(Z,this.constructor.elementStyles),Z}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach((Z)=>Z.hostConnected?.())}enableUpdating(Z){}disconnectedCallback(){this.__controllers?.forEach((Z)=>Z.hostDisconnected?.())}attributeChangedCallback(Z,$,K){this._$attributeToProperty(Z,K)}__propertyToAttribute(Z,$){let Q=this.constructor.elementProperties.get(Z),J=this.constructor.__attributeNameForProperty(Z,Q);if(J!==void 0&&Q.reflect===!0){let G=(Q.converter?.toAttribute!==void 0?Q.converter:n).toAttribute($,Q.type);if(O&&this.constructor.enabledWarnings.includes("migration")&&G===void 0)P("undefined-attribute-value",`The attribute value for the ${Z} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);if(this.__reflectingProperty=Z,G==null)this.removeAttribute(J);else this.setAttribute(J,G);this.__reflectingProperty=null}}_$attributeToProperty(Z,$){let K=this.constructor,Q=K.__attributeToPropertyMap.get(Z);if(Q!==void 0&&this.__reflectingProperty!==Q){let J=K.getPropertyOptions(Q),F=typeof J.converter==="function"?{fromAttribute:J.converter}:J.converter?.fromAttribute!==void 0?J.converter:n;this.__reflectingProperty=Q,this[Q]=F.fromAttribute($,J.type)??this.__defaultValues?.get(Q)??null,this.__reflectingProperty=null}}requestUpdate(Z,$,K){if(Z!==void 0){if(O&&Z instanceof Event)P("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");let Q=this.constructor,J=this[Z];if(K??=Q.getPropertyOptions(Z),(K.hasChanged??WZ)(J,$)||K.useDefault&&K.reflect&&J===this.__defaultValues?.get(Z)&&!this.hasAttribute(Q.__attributeNameForProperty(Z,K)))this._$changeProperty(Z,$,K);else return}if(this.isUpdatePending===!1)this.__updatePromise=this.__enqueueUpdate()}_$changeProperty(Z,$,{useDefault:K,reflect:Q,wrapped:J},F){if(K&&!(this.__defaultValues??=new Map).has(Z)){if(this.__defaultValues.set(Z,F??$??this[Z]),J!==!0||F!==void 0)return}if(!this._$changedProperties.has(Z)){if(!this.hasUpdated&&!K)$=void 0;this._$changedProperties.set(Z,$)}if(Q===!0&&this.__reflectingProperty!==Z)(this.__reflectingProperties??=new Set).add(Z)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch($){Promise.reject($)}let Z=this.scheduleUpdate();if(Z!=null)await Z;return!this.isUpdatePending}scheduleUpdate(){let Z=this.performUpdate();if(O&&this.constructor.enabledWarnings.includes("async-perform-update")&&typeof Z?.then==="function")P("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);return Z}performUpdate(){if(!this.isUpdatePending)return;if(E0?.({kind:"update"}),!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),O){let J=[...this.constructor.elementProperties.keys()].filter((F)=>this.hasOwnProperty(F)&&(F in cZ(this)));if(J.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${J.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(let[Q,J]of this.__instanceProperties)this[Q]=J;this.__instanceProperties=void 0}let K=this.constructor.elementProperties;if(K.size>0)for(let[Q,J]of K){let{wrapped:F}=J,G=this[Q];if(F===!0&&!this._$changedProperties.has(Q)&&G!==void 0)this._$changeProperty(Q,void 0,J,G)}}let Z=!1,$=this._$changedProperties;try{if(Z=this.shouldUpdate($),Z)this.willUpdate($),this.__controllers?.forEach((K)=>K.hostUpdate?.()),this.update($);else this.__markUpdated()}catch(K){throw Z=!1,this.__markUpdated(),K}if(Z)this._$didUpdate($)}willUpdate(Z){}_$didUpdate(Z){if(this.__controllers?.forEach(($)=>$.hostUpdated?.()),!this.hasUpdated)this.hasUpdated=!0,this.firstUpdated(Z);if(this.updated(Z),O&&this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update"))P("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(Z){return!0}update(Z){this.__reflectingProperties&&=this.__reflectingProperties.forEach(($)=>this.__propertyToAttribute($,this[$])),this.__markUpdated()}updated(Z){}firstUpdated(Z){}}D.elementStyles=[];D.shadowRootOptions={mode:"open"};D[c("elementProperties",D)]=new Map;D[c("finalized",D)]=new Map;rZ?.({ReactiveElement:D});if(O){D.enabledWarnings=["change-in-update","async-perform-update"];let Z=function($){if(!$.hasOwnProperty(c("enabledWarnings",$)))$.enabledWarnings=$.enabledWarnings.slice()};D.enableWarning=function($){if(Z(this),!this.enabledWarnings.includes($))this.enabledWarnings.push($)},D.disableWarning=function($){Z(this);let K=this.enabledWarnings.indexOf($);if(K>=0)this.enabledWarnings.splice(K,1)}}(I.reactiveElementVersions??=[]).push("2.1.0");if(O&&I.reactiveElementVersions.length>1)queueMicrotask(()=>{P("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var T=globalThis,A=(Z)=>{if(!T.emitLitDebugLogEvents)return;T.dispatchEvent(new CustomEvent("lit-debug",{detail:Z}))},w0=0,e;T.litIssuedWarnings??=new Set,e=(Z,$)=>{if($+=Z?` See https://lit.dev/msg/${Z} for more information.`:"",!T.litIssuedWarnings.has($)&&!T.litIssuedWarnings.has(Z))console.warn($),T.litIssuedWarnings.add($)},queueMicrotask(()=>{e("dev-mode","Lit is in dev mode. Not recommended for production!")});var E=T.ShadyDOM?.inUse&&T.ShadyDOM?.noPatch===!0?T.ShadyDOM.wrap:(Z)=>Z,_Z=T.trustedTypes,iZ=_Z?_Z.createPolicy("lit-html",{createHTML:(Z)=>Z}):void 0,C0=(Z)=>Z,MZ=(Z,$,K)=>C0,f0=(Z)=>{if(g!==MZ)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");g=Z},b0=()=>{g=MZ},LZ=(Z,$,K)=>{return g(Z,$,K)},K0="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,Q0="?"+z,z0=`<${Q0}>`,u=document,ZZ=()=>u.createComment(""),$Z=(Z)=>Z===null||typeof Z!="object"&&typeof Z!="function",RZ=Array.isArray,S0=(Z)=>RZ(Z)||typeof Z?.[Symbol.iterator]==="function",IZ=`[ 	
\f\r]`,h0=`[^ 	
\f\r"'\`<>=]`,y0=`[^\\s"'>=/]`,a=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nZ=1,OZ=2,v0=3,aZ=/-->/g,tZ=/>/g,y=new RegExp(`>|${IZ}(?:(${y0}+)(${IZ}*=${IZ}*(?:${h0}|("|')|))|$)`,"g"),m0=0,eZ=1,u0=2,Z0=3,DZ=/'/g,TZ=/"/g,J0=/^(?:script|style|textarea|title)$/i,d0=1,qZ=2,HZ=3,PZ=1,AZ=2,g0=3,x0=4,p0=5,EZ=6,l0=7,wZ=(Z)=>($,...K)=>{if($.some((Q)=>Q===void 0))console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`);if(K.some((Q)=>Q?._$litStatic$))e("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);return{["_$litType$"]:Z,strings:$,values:K}},j=wZ(d0),F1=wZ(qZ),G1=wZ(HZ),d=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),$0=new WeakMap,m=u.createTreeWalker(u,129),g=MZ;function F0(Z,$){if(!RZ(Z)||!Z.hasOwnProperty("raw")){let K="invalid template strings array";throw K=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(K)}return iZ!==void 0?iZ.createHTML($):$}var c0=(Z,$)=>{let K=Z.length-1,Q=[],J=$===qZ?"<svg>":$===HZ?"<math>":"",F,G=a;for(let W=0;W<K;W++){let H=Z[W],_=-1,q,L=0,N;while(L<H.length){if(G.lastIndex=L,N=G.exec(H),N===null)break;if(L=G.lastIndex,G===a){if(N[nZ]==="!--")G=aZ;else if(N[nZ]!==void 0)G=tZ;else if(N[OZ]!==void 0){if(J0.test(N[OZ]))F=new RegExp(`</${N[OZ]}`,"g");G=y}else if(N[v0]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else if(G===y)if(N[m0]===">")G=F??a,_=-1;else if(N[eZ]===void 0)_=-2;else _=G.lastIndex-N[u0].length,q=N[eZ],G=N[Z0]===void 0?y:N[Z0]==='"'?TZ:DZ;else if(G===TZ||G===DZ)G=y;else if(G===aZ||G===tZ)G=a;else G=y,F=void 0}console.assert(_===-1||G===y||G===DZ||G===TZ,"unexpected parse state B");let b=G===y&&Z[W+1].startsWith("/>")?" ":"";J+=G===a?H+z0:_>=0?(Q.push(q),H.slice(0,_)+K0+H.slice(_))+z+b:H+z+(_===-2?W:b)}let U=J+(Z[K]||"<?>")+($===qZ?"</svg>":$===HZ?"</math>":"");return[F0(Z,U),Q]};class KZ{constructor({strings:Z,["_$litType$"]:$},K){this.parts=[];let Q,J=0,F=0,G=Z.length-1,U=this.parts,[W,H]=c0(Z,$);if(this.el=KZ.createElement(W,K),m.currentNode=this.el.content,$===qZ||$===HZ){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}while((Q=m.nextNode())!==null&&U.length<G){if(Q.nodeType===1){{let _=Q.localName;if(/^(?:textarea|template)$/i.test(_)&&Q.innerHTML.includes(z)){let q=`Expressions are not supported inside \`${_}\` elements. See https://lit.dev/msg/expression-in-${_} for more information.`;if(_==="template")throw new Error(q);else e("",q)}}if(Q.hasAttributes()){for(let _ of Q.getAttributeNames())if(_.endsWith(K0)){let q=H[F++],N=Q.getAttribute(_).split(z),b=/([.?@])?(.*)/.exec(q);U.push({type:PZ,index:J,name:b[2],strings:N,ctor:b[1]==="."?U0:b[1]==="?"?B0:b[1]==="@"?W0:JZ}),Q.removeAttribute(_)}else if(_.startsWith(z))U.push({type:EZ,index:J}),Q.removeAttribute(_)}if(J0.test(Q.tagName)){let _=Q.textContent.split(z),q=_.length-1;if(q>0){Q.textContent=_Z?_Z.emptyScript:"";for(let L=0;L<q;L++)Q.append(_[L],ZZ()),m.nextNode(),U.push({type:AZ,index:++J});Q.append(_[q],ZZ())}}}else if(Q.nodeType===8)if(Q.data===Q0)U.push({type:AZ,index:J});else{let q=-1;while((q=Q.data.indexOf(z,q+1))!==-1)U.push({type:l0,index:J}),q+=z.length-1}J++}if(H.length!==F)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+Z.join("${...}")+"`");A&&A({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:Z})}static createElement(Z,$){let K=u.createElement("template");return K.innerHTML=Z,K}}function s(Z,$,K=Z,Q){if($===d)return $;let J=Q!==void 0?K.__directives?.[Q]:K.__directive,F=$Z($)?void 0:$._$litDirective$;if(J?.constructor!==F){if(J?._$notifyDirectiveConnectionChanged?.(!1),F===void 0)J=void 0;else J=new F(Z),J._$initialize(Z,K,Q);if(Q!==void 0)(K.__directives??=[])[Q]=J;else K.__directive=J}if(J!==void 0)$=s(Z,J._$resolve(Z,$.values),J,Q);return $}class G0{constructor(Z,$){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=Z,this._$parent=$}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(Z){let{el:{content:$},parts:K}=this._$template,Q=(Z?.creationScope??u).importNode($,!0);m.currentNode=Q;let J=m.nextNode(),F=0,G=0,U=K[0];while(U!==void 0){if(F===U.index){let W;if(U.type===AZ)W=new QZ(J,J.nextSibling,this,Z);else if(U.type===PZ)W=new U.ctor(J,U.name,U.strings,this,Z);else if(U.type===EZ)W=new _0(J,this,Z);this._$parts.push(W),U=K[++G]}if(F!==U?.index)J=m.nextNode(),F++}return m.currentNode=u,Q}_update(Z){let $=0;for(let K of this._$parts){if(K!==void 0)if(A&&A({kind:"set part",part:K,value:Z[$],valueIndex:$,values:Z,templateInstance:this}),K.strings!==void 0)K._$setValue(Z,K,$),$+=K.strings.length-2;else K._$setValue(Z[$]);$++}}}class QZ{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(Z,$,K,Q){this.type=AZ,this._$committedValue=X,this._$disconnectableChildren=void 0,this._$startNode=Z,this._$endNode=$,this._$parent=K,this.options=Q,this.__isConnected=Q?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let Z=E(this._$startNode).parentNode,$=this._$parent;if($!==void 0&&Z?.nodeType===11)Z=$.parentNode;return Z}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(Z,$=this){if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(Z=s(this,Z,$),$Z(Z)){if(Z===X||Z==null||Z===""){if(this._$committedValue!==X)A&&A({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear();this._$committedValue=X}else if(Z!==this._$committedValue&&Z!==d)this._commitText(Z)}else if(Z._$litType$!==void 0)this._commitTemplateResult(Z);else if(Z.nodeType!==void 0){if(this.options?.host===Z){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",Z,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(Z)}else if(S0(Z))this._commitIterable(Z);else this._commitText(Z)}_insert(Z){return E(E(this._$startNode).parentNode).insertBefore(Z,this._$endNode)}_commitNode(Z){if(this._$committedValue!==Z){if(this._$clear(),g!==MZ){let $=this._$startNode.parentNode?.nodeName;if($==="STYLE"||$==="SCRIPT"){let K="Forbidden";if($==="STYLE")K="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.";else K="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.";throw new Error(K)}}A&&A({kind:"commit node",start:this._$startNode,parent:this._$parent,value:Z,options:this.options}),this._$committedValue=this._insert(Z)}}_commitText(Z){if(this._$committedValue!==X&&$Z(this._$committedValue)){let $=E(this._$startNode).nextSibling;if(this._textSanitizer===void 0)this._textSanitizer=LZ($,"data","property");Z=this._textSanitizer(Z),A&&A({kind:"commit text",node:$,value:Z,options:this.options}),$.data=Z}else{let $=u.createTextNode("");if(this._commitNode($),this._textSanitizer===void 0)this._textSanitizer=LZ($,"data","property");Z=this._textSanitizer(Z),A&&A({kind:"commit text",node:$,value:Z,options:this.options}),$.data=Z}this._$committedValue=Z}_commitTemplateResult(Z){let{values:$,["_$litType$"]:K}=Z,Q=typeof K==="number"?this._$getTemplate(Z):(K.el===void 0&&(K.el=KZ.createElement(F0(K.h,K.h[0]),this.options)),K);if(this._$committedValue?._$template===Q)A&&A({kind:"template updating",template:Q,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:$}),this._$committedValue._update($);else{let J=new G0(Q,this),F=J._clone(this.options);A&&A({kind:"template instantiated",template:Q,instance:J,parts:J._$parts,options:this.options,fragment:F,values:$}),J._update($),A&&A({kind:"template instantiated and updated",template:Q,instance:J,parts:J._$parts,options:this.options,fragment:F,values:$}),this._commitNode(F),this._$committedValue=J}}_$getTemplate(Z){let $=$0.get(Z.strings);if($===void 0)$0.set(Z.strings,$=new KZ(Z));return $}_commitIterable(Z){if(!RZ(this._$committedValue))this._$committedValue=[],this._$clear();let $=this._$committedValue,K=0,Q;for(let J of Z){if(K===$.length)$.push(Q=new QZ(this._insert(ZZ()),this._insert(ZZ()),this,this.options));else Q=$[K];Q._$setValue(J),K++}if(K<$.length)this._$clear(Q&&E(Q._$endNode).nextSibling,K),$.length=K}_$clear(Z=E(this._$startNode).nextSibling,$){this._$notifyConnectionChanged?.(!1,!0,$);while(Z&&Z!==this._$endNode){let K=E(Z).nextSibling;E(Z).remove(),Z=K}}setConnected(Z){if(this._$parent===void 0)this.__isConnected=Z,this._$notifyConnectionChanged?.(Z);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class JZ{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(Z,$,K,Q,J){if(this.type=PZ,this._$committedValue=X,this._$disconnectableChildren=void 0,this.element=Z,this.name=$,this._$parent=Q,this.options=J,K.length>2||K[0]!==""||K[1]!=="")this._$committedValue=new Array(K.length-1).fill(new String),this.strings=K;else this._$committedValue=X;this._sanitizer=void 0}_$setValue(Z,$=this,K,Q){let J=this.strings,F=!1;if(J===void 0){if(Z=s(this,Z,$,0),F=!$Z(Z)||Z!==this._$committedValue&&Z!==d,F)this._$committedValue=Z}else{let G=Z;Z=J[0];let U,W;for(U=0;U<J.length-1;U++){if(W=s(this,G[K+U],$,U),W===d)W=this._$committedValue[U];if(F||=!$Z(W)||W!==this._$committedValue[U],W===X)Z=X;else if(Z!==X)Z+=(W??"")+J[U+1];this._$committedValue[U]=W}}if(F&&!Q)this._commitValue(Z)}_commitValue(Z){if(Z===X)E(this.element).removeAttribute(this.name);else{if(this._sanitizer===void 0)this._sanitizer=g(this.element,this.name,"attribute");Z=this._sanitizer(Z??""),A&&A({kind:"commit attribute",element:this.element,name:this.name,value:Z,options:this.options}),E(this.element).setAttribute(this.name,Z??"")}}}class U0 extends JZ{constructor(){super(...arguments);this.type=g0}_commitValue(Z){if(this._sanitizer===void 0)this._sanitizer=g(this.element,this.name,"property");Z=this._sanitizer(Z),A&&A({kind:"commit property",element:this.element,name:this.name,value:Z,options:this.options}),this.element[this.name]=Z===X?void 0:Z}}class B0 extends JZ{constructor(){super(...arguments);this.type=x0}_commitValue(Z){A&&A({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(Z&&Z!==X),options:this.options}),E(this.element).toggleAttribute(this.name,!!Z&&Z!==X)}}class W0 extends JZ{constructor(Z,$,K,Q,J){super(Z,$,K,Q,J);if(this.type=p0,this.strings!==void 0)throw new Error(`A \`<${Z.localName}>\` has a \`@${$}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(Z,$=this){if(Z=s(this,Z,$,0)??X,Z===d)return;let K=this._$committedValue,Q=Z===X&&K!==X||Z.capture!==K.capture||Z.once!==K.once||Z.passive!==K.passive,J=Z!==X&&(K===X||Q);if(A&&A({kind:"commit event listener",element:this.element,name:this.name,value:Z,options:this.options,removeListener:Q,addListener:J,oldListener:K}),Q)this.element.removeEventListener(this.name,this,K);if(J)this.element.addEventListener(this.name,this,Z);this._$committedValue=Z}handleEvent(Z){if(typeof this._$committedValue==="function")this._$committedValue.call(this.options?.host??this.element,Z);else this._$committedValue.handleEvent(Z)}}class _0{constructor(Z,$,K){this.element=Z,this.type=EZ,this._$disconnectableChildren=void 0,this._$parent=$,this.options=K}get _$isConnected(){return this._$parent._$isConnected}_$setValue(Z){A&&A({kind:"commit to element binding",element:this.element,value:Z,options:this.options}),s(this,Z)}}var s0=T.litHtmlPolyfillSupportDevMode;s0?.(KZ,QZ);(T.litHtmlVersions??=[]).push("3.3.0");if(T.litHtmlVersions.length>1)queueMicrotask(()=>{e("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var t=(Z,$,K)=>{if($==null)throw new TypeError(`The container to render into may not be ${$}`);let Q=w0++,J=K?.renderBefore??$,F=J._$litPart$;if(A&&A({kind:"begin render",id:Q,value:Z,container:$,options:K,part:F}),F===void 0){let G=K?.renderBefore??null;J._$litPart$=F=new QZ($.insertBefore(ZZ(),G),G,void 0,K??{})}return F._$setValue(Z),A&&A({kind:"end render",id:Q,value:Z,container:$,options:K,part:F}),F};t.setSanitizer=f0,t.createSanitizer=LZ,t._testOnlyClearSanitizerFactoryDoNotCallOrElse=b0;var o0=(Z,$)=>Z,CZ=!0,S=globalThis,q0;if(CZ)S.litIssuedWarnings??=new Set,q0=(Z,$)=>{if($+=` See https://lit.dev/msg/${Z} for more information.`,!S.litIssuedWarnings.has($)&&!S.litIssuedWarnings.has(Z))console.warn($),S.litIssuedWarnings.add($)};class Y extends D{constructor(){super(...arguments);this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){let Z=super.createRenderRoot();return this.renderOptions.renderBefore??=Z.firstChild,Z}update(Z){let $=this.render();if(!this.hasUpdated)this.renderOptions.isConnected=this.isConnected;super.update(Z),this.__childPart=t($,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return d}}Y._$litElement$=!0;Y[o0("finalized",Y)]=!0;S.litElementHydrateSupport?.({LitElement:Y});var r0=CZ?S.litElementPolyfillSupportDevMode:S.litElementPolyfillSupport;r0?.({LitElement:Y});(S.litElementVersions??=[]).push("4.2.0");if(CZ&&S.litElementVersions.length>1)queueMicrotask(()=>{q0("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var f=(Z)=>($,K)=>{if(K!==void 0)K.addInitializer(()=>{customElements.define(Z,$)});else customElements.define(Z,$)};var H0=!0,A0;if(H0)globalThis.litIssuedWarnings??=new Set,A0=(Z,$)=>{if($+=` See https://lit.dev/msg/${Z} for more information.`,!globalThis.litIssuedWarnings.has($)&&!globalThis.litIssuedWarnings.has(Z))console.warn($),globalThis.litIssuedWarnings.add($)};var i0=(Z,$,K)=>{let Q=$.hasOwnProperty(K);return $.constructor.createProperty(K,Z),Q?Object.getOwnPropertyDescriptor($,K):void 0},n0={attribute:!0,type:String,converter:n,reflect:!1,hasChanged:WZ},a0=(Z=n0,$,K)=>{let{kind:Q,metadata:J}=K;if(H0&&J==null)A0("missing-class-metadata",`The class ${$} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let F=globalThis.litPropertyMetadata.get(J);if(F===void 0)globalThis.litPropertyMetadata.set(J,F=new Map);if(Q==="setter")Z=Object.create(Z),Z.wrapped=!0;if(F.set(K.name,Z),Q==="accessor"){let{name:G}=K;return{set(U){let W=$.get.call(this);$.set.call(this,U),this.requestUpdate(G,W,Z)},init(U){if(U!==void 0)this._$changeProperty(G,void 0,Z,U);return U}}}else if(Q==="setter"){let{name:G}=K;return function(U){let W=this[G];$.call(this,U),this.requestUpdate(G,W,Z)}}throw new Error(`Unsupported decorator location: ${Q}`)};function o(Z){return($,K)=>{return typeof K==="object"?a0(Z,$,K):i0(Z,$,K)}}function h(Z){return o({...Z,state:!0,attribute:!1})}var x=(Z,$,K)=>{if(K.configurable=!0,K.enumerable=!0,Reflect.decorate&&typeof $!=="object")Object.defineProperty(Z,$,K);return K};var fZ=!0,M0;if(fZ)globalThis.litIssuedWarnings??=new Set,M0=(Z,$)=>{if($+=Z?` See https://lit.dev/msg/${Z} for more information.`:"",!globalThis.litIssuedWarnings.has($)&&!globalThis.litIssuedWarnings.has(Z))console.warn($),globalThis.litIssuedWarnings.add($)};function bZ(Z,$){return(K,Q,J)=>{let F=(G)=>{let U=G.renderRoot?.querySelector(Z)??null;if(fZ&&U===null&&$&&!G.hasUpdated){let W=typeof Q==="object"?Q.name:Q;M0("",`@query'd field ${JSON.stringify(String(W))} with the 'cache' flag set for selector '${Z}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`)}return U};if($){let{get:G,set:U}=typeof Q==="object"?K:J??(()=>{let W=fZ?Symbol(`${String(Q)} (@query() cache)`):Symbol();return{get(){return this[W]},set(H){this[W]=H}}})();return x(K,Q,{get(){let W=G.call(this);if(W===void 0){if(W=F(this),W!==null||this.hasUpdated)U.call(this,W)}return W}})}else return x(K,Q,{get(){return F(this)}})}}var r=new Map,R={get:(Z)=>{let $=Z.startsWith("--")?Z:`--${Z}`;if(r.has($))return r.get($);let K=getComputedStyle(document.documentElement).getPropertyValue($).trim();if(!K)return console.warn(`CSS variable ${$} not found or empty`),"#000000";return r.set($,K),K},set:(Z,$)=>{let K=Z.startsWith("--")?Z:`--${Z}`;if(r.get(K)!==$)document.documentElement.style.setProperty(K,$),r.set(K,$)},clearCache:()=>{r.clear()},hexToRgb:(Z)=>{if(Z=Z.replace(/^#/,""),Z.length===3)Z=Z.split("").map((K)=>K+K).join("");let $=parseInt(Z,16);return{r:$>>16&255,g:$>>8&255,b:$&255}},lightenColor:(Z,$)=>{let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.min(Math.floor(Q*(1+$/100)),255),U=Math.min(Math.floor(J*(1+$/100)),255),W=Math.min(Math.floor(F*(1+$/100)),255);return`rgb(${G}, ${U}, ${W})`},darkenColor:(Z,$)=>{let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.max(Math.floor(Q*(1-$/100)),0),U=Math.max(Math.floor(J*(1-$/100)),0),W=Math.max(Math.floor(F*(1-$/100)),0);return`rgb(${G}, ${U}, ${W})`},isLightColor:(Z)=>{let $=Z.replace("#",""),K=parseInt($.substr(0,2),16),Q=parseInt($.substr(2,2),16),J=parseInt($.substr(4,2),16);return(K*299+Q*587+J*114)/1000>125}};var B={gridSize:10,cellSize:40,get colors(){return[R.get("color-teal"),R.get("color-light-brown")]},get highlightColor(){return R.get("highlight-color")},get invalidColor(){return R.get("invalid-color")},pieceAreaHeight:150,pieceSize:80,pieceMargin:20,maxAvailablePieces:3,gameOverButton:{width:200,height:60,get color(){return R.get("button-background")},get hoverColor(){return R.get("button-hover")},get textColor(){return R.get("button-text")},font:"20px Arial",text:"Play Again"},get backgroundColor(){return R.get("background-color")},get gridLineColor(){return R.get("grid-line-color")},get textColor(){return R.get("text-color")},get borderColor(){return R.get("border-color")}};class M{name;color;pattern;frequency;constructor(Z,$,K,Q=1){this.name=Z,this.pattern=$,this.color=K,this.frequency=Math.max(0,Math.min(1,Q))}static shapes=[new M("Line5",[[!0,!0,!0,!0,!0]],"#3D8C9E",0.2),new M("LineVertical5",[[!0],[!0],[!0],[!0],[!0]],"#3D8C9E",0.2),new M("Line",[[!0,!0,!0,!0]],"#4682B4",0.2),new M("LineVertical",[[!0],[!0],[!0],[!0]],"#4682B4",0.2),new M("Line3",[[!0,!0,!0]],"#7B68EE",0.2),new M("LineVertical3",[[!0],[!0],[!0]],"#7B68EE",0.2),new M("Line2",[[!0,!0]],"#6A5ACD",0.2),new M("LineVertical2",[[!0],[!0]],"#6A5ACD",0.2),new M("Square2x2",[[!0,!0],[!0,!0]],"#D4AF91",0.7),new M("Square3x3",[[!0,!0,!0],[!0,!0,!0],[!0,!0,!0]],"#C19A6B",0.3),new M("TShape",[[!1,!0,!1],[!0,!0,!0]],"#9370DB",0.25),new M("TShapeFlipped",[[!0,!0,!0],[!1,!0,!1]],"#9370DB",0.25),new M("TShapeRight",[[!1,!0],[!0,!0],[!1,!0]],"#9370DB",0.25),new M("TShapeLeft",[[!0,!1],[!0,!0],[!0,!1]],"#9370DB",0.25),new M("LShape",[[!0,!1],[!0,!1],[!0,!0]],"#CD7F32",0.25),new M("LShapeRight",[[!0,!0,!0],[!0,!1,!1]],"#CD7F32",0.25),new M("LShapeUpside",[[!0,!0],[!1,!0],[!1,!0]],"#CD7F32",0.25),new M("LShapeLeft",[[!1,!1,!0],[!0,!0,!0]],"#CD7F32",0.25),new M("ZShape",[[!0,!0,!1],[!1,!0,!0]],"#B22222",0.25),new M("ZShapeReflected",[[!1,!0,!0],[!0,!0,!1]],"#B22222",0.25),new M("ZShapeVertical",[[!1,!0],[!0,!0],[!0,!1]],"#B22222",0.25),new M("ZShapeVerticalReflected",[[!0,!1],[!0,!0],[!1,!0]],"#B22222",0.25),new M("SmallL",[[!0,!1],[!0,!0]],"#6B8E23",0.25),new M("SmallLRight",[[!0,!0],[!0,!1]],"#6B8E23",0.25),new M("SmallLUpside",[[!0,!0],[!1,!0]],"#6B8E23",0.25),new M("SmallLLeft",[[!1,!0],[!0,!0]],"#6B8E23",0.25),new M("Single",[[!0]],"#87CEEB",1)];static all(){return[...this.shapes]}static random(){let Z=this.shapes.reduce((K,Q)=>K+Q.frequency,0),$=Math.random()*Z;for(let K of this.shapes)if($-=K.frequency,$<=0)return K;return this.shapes[0]}static byName(Z){return this.shapes.find(($)=>$.name===Z)}static randomPattern(){return this.random().pattern}}class VZ{shape;color;x;y;isAvailable;shapeName;scaleFactor;constructor(Z,$,K){if(this.x=0,this.y=0,this.isAvailable=!0,Z)this.shape=Z,this.shapeName="custom",this.color=K||B.colors[Math.floor(Math.random()*B.colors.length)];else{let Q=M.random();this.shape=Q.pattern,this.shapeName=Q.name,this.color=Q.color}if($!==void 0){let Q=B.gridSize*B.cellSize,J=this.shape[0].length,F=this.shape.length,G=4,U=J>4?4/J:1,W=B.cellSize*U,H=J*W,_=F*W,q=Q/B.maxAvailablePieces;this.x=q/2-H/2+$*q;let L=B.gridSize*B.cellSize;this.y=L+B.pieceAreaHeight/2-_/2,this.scaleFactor=U}}generateRandomShape(){return M.randomPattern()}contains(Z,$){let K=B.cellSize*(this.scaleFactor||1),Q=this.x,J=this.x+this.shape[0].length*K,F=this.y,G=this.y+this.shape.length*K;if(Z>=Q&&Z<J&&$>=F&&$<G){let U=Math.floor((Z-this.x)/K),W=Math.floor(($-this.y)/K);if(U>=0&&U<this.shape[0].length&&W>=0&&W<this.shape.length)return this.shape[W][U]}return!1}render(Z){let $=B.cellSize*(this.scaleFactor||1);for(let K=0;K<this.shape.length;K++)for(let Q=0;Q<this.shape[K].length;Q++)if(this.shape[K][Q]){let J=this.x+Q*$,F=this.y+K*$;this.drawBlockWithEffect(Z,J,F,$)}}drawBlockWithEffect(Z,$,K,Q){Z.fillStyle=this.color,Z.fillRect($,K,Q,Q),Z.fillStyle=this.lightenColor(this.color,15),Z.beginPath(),Z.moveTo($,K),Z.lineTo($+Q,K),Z.lineTo($+Q-4,K+4),Z.lineTo($+4,K+4),Z.closePath(),Z.fill(),Z.fillStyle=this.darkenColor(this.color,15),Z.beginPath(),Z.moveTo($+Q,K),Z.lineTo($+Q,K+Q),Z.lineTo($+Q-4,K+Q-4),Z.lineTo($+Q-4,K+4),Z.closePath(),Z.fill(),Z.fillStyle=this.darkenColor(this.color,25),Z.beginPath(),Z.moveTo($,K+Q),Z.lineTo($+Q,K+Q),Z.lineTo($+Q-4,K+Q-4),Z.lineTo($+4,K+Q-4),Z.closePath(),Z.fill(),Z.fillStyle=this.lightenColor(this.color,5),Z.beginPath(),Z.moveTo($,K),Z.lineTo($,K+Q),Z.lineTo($+4,K+Q-4),Z.lineTo($+4,K+4),Z.closePath(),Z.fill(),Z.strokeStyle="#3F3A33",Z.lineWidth=1,Z.strokeRect($,K,Q,Q),this.drawSymbolOnBlock(Z,$,K,Q)}drawSymbolOnBlock(Z,$,K,Q){let J=Q*0.2,F=Q-J*2,G=this.isLightColor(this.color);switch(Z.fillStyle=G?this.darkenColor(this.color,30):this.lightenColor(this.color,30),Z.strokeStyle=G?this.darkenColor(this.color,30):this.lightenColor(this.color,30),Z.lineWidth=2,this.shapeName){case"Line":Z.beginPath(),Z.moveTo($+J,K+Q/2),Z.lineTo($+Q-J,K+Q/2),Z.stroke();break;case"Line3":Z.beginPath(),Z.moveTo($+J*1.2,K+Q/2),Z.lineTo($+Q-J*1.2,K+Q/2),Z.stroke(),Z.beginPath(),Z.arc($+Q*0.25,K+Q/2,Q*0.06,0,Math.PI*2),Z.arc($+Q*0.5,K+Q/2,Q*0.06,0,Math.PI*2),Z.arc($+Q*0.75,K+Q/2,Q*0.06,0,Math.PI*2),Z.fill();break;case"Line5":Z.beginPath(),Z.moveTo($+J*0.8,K+Q/2),Z.lineTo($+Q-J*0.8,K+Q/2),Z.stroke(),Z.beginPath();for(let U=1;U<=5;U++)Z.arc($+Q*U/6,K+Q/2,Q*0.05,0,Math.PI*2);Z.fill();break;case"Line2":Z.beginPath(),Z.moveTo($+J*1.5,K+Q/2),Z.lineTo($+Q-J*1.5,K+Q/2),Z.stroke();break;case"LineVertical":Z.beginPath(),Z.moveTo($+Q/2,K+J),Z.lineTo($+Q/2,K+Q-J),Z.stroke();break;case"LineVertical3":Z.beginPath(),Z.moveTo($+Q/2,K+J*1.2),Z.lineTo($+Q/2,K+Q-J*1.2),Z.stroke(),Z.beginPath(),Z.arc($+Q/2,K+Q*0.25,Q*0.06,0,Math.PI*2),Z.arc($+Q/2,K+Q*0.5,Q*0.06,0,Math.PI*2),Z.arc($+Q/2,K+Q*0.75,Q*0.06,0,Math.PI*2),Z.fill();break;case"LineVertical5":Z.beginPath(),Z.moveTo($+Q/2,K+J*0.8),Z.lineTo($+Q/2,K+Q-J*0.8),Z.stroke(),Z.beginPath();for(let U=1;U<=5;U++)Z.arc($+Q/2,K+Q*U/6,Q*0.05,0,Math.PI*2);Z.fill();break;case"LineVertical2":Z.beginPath(),Z.moveTo($+Q/2,K+J*1.5),Z.lineTo($+Q/2,K+Q-J*1.5),Z.stroke();break;case"Square2x2":Z.strokeRect($+J,K+J,F,F);break;case"TShape":Z.beginPath(),Z.moveTo($+Q/2,K+J),Z.lineTo($+Q/2,K+Q-J),Z.moveTo($+J,K+J),Z.lineTo($+Q-J,K+J),Z.stroke();break;case"LShape":Z.beginPath(),Z.moveTo($+J+F/3,K+J),Z.lineTo($+J+F/3,K+Q-J),Z.lineTo($+Q-J,K+Q-J),Z.stroke();break;case"ZShape":Z.beginPath(),Z.moveTo($+J,K+J),Z.lineTo($+Q-J,K+J),Z.lineTo($+J,K+Q-J),Z.lineTo($+Q-J,K+Q-J),Z.stroke();break;case"Single":Z.beginPath(),Z.arc($+Q/2,K+Q/2,F/5,0,Math.PI*2),Z.fill();break;case"SmallL":Z.beginPath(),Z.moveTo($+J+F/3,K+J),Z.lineTo($+J+F/3,K+Q-J),Z.lineTo($+Q-J,K+Q-J),Z.stroke();break;case"Square3x3":Z.strokeRect($+J,K+J,F,F),Z.strokeRect($+J+F/4,K+J+F/4,F/2,F/2);break;default:Z.beginPath(),Z.arc($+Q/2,K+Q/2,F/3,0,Math.PI*2),Z.stroke()}}lightenColor(Z,$){let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.min(Math.floor(Q*(1+$/100)),255),U=Math.min(Math.floor(J*(1+$/100)),255),W=Math.min(Math.floor(F*(1+$/100)),255);return`rgb(${G}, ${U}, ${W})`}darkenColor(Z,$){let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.max(Math.floor(Q*(1-$/100)),0),U=Math.max(Math.floor(J*(1-$/100)),0),W=Math.max(Math.floor(F*(1-$/100)),0);return`rgb(${G}, ${U}, ${W})`}isLightColor(Z){let $=Z.replace("#",""),K=parseInt($.substr(0,2),16),Q=parseInt($.substr(2,2),16),J=parseInt($.substr(4,2),16);return(K*299+Q*587+J*114)/1000>125}}class p{cells=[];constructor(){this.reset()}reset(){this.cells=Array(B.gridSize).fill(null).map(()=>Array(B.gridSize).fill(null))}setCellState(Z,$,K){if(Z>=0&&Z<B.gridSize&&$>=0&&$<B.gridSize)this.cells[$][Z]=K}serialize(){return this.cells.map((Z)=>Z.map(($)=>$||""))}static deserialize(Z){let $=new p,K=Math.min(Z.length,B.gridSize);for(let Q=0;Q<K;Q++){let J=Z[Q],F=Math.min(J.length,B.gridSize);for(let G=0;G<F;G++)$.cells[Q][G]=J[G]||null}return $}isCellOccupied(Z,$){if(Z<0||$<0||Z>=B.gridSize||$>=B.gridSize)return!0;return this.cells[$][Z]!==null}clone(){let Z=new p;return Z.cells=this.cells.map(($)=>[...$]),Z}}function w(Z){document.dispatchEvent(new CustomEvent("score-updated",{detail:{score:Z},bubbles:!0,composed:!0}))}function v(Z,$){for(let K=0;K<$.length;K++)if($[K].isAvailable)$[K].render(Z)}function V0(Z,$){let K=Z.canvas.width,Q=Z.canvas.height;Z.clearRect(0,0,K,Q),Z.fillStyle="rgba(0, 0, 0, 0.8)",Z.fillRect(0,0,K,Q),Z.font="bold 40px Arial",Z.fillStyle="#FFFFFF",Z.textAlign="center",Z.textBaseline="middle",Z.fillText("GAME OVER",K/2,Q/3),Z.font="30px Arial",Z.fillText(`Score: ${$}`,K/2,Q/2)}function FZ(Z,$){let Q=Z.canvas.width,J=B.gridSize*B.cellSize,F=B.gameOverButton,G=(Q-F.width)/2,U=J*0.65;Z.fillStyle=$?F.hoverColor:F.color,Z.strokeStyle="rgba(0, 0, 0, 0.3)",Z.lineWidth=2;let W=8;return Z.beginPath(),Z.moveTo(G+W,U),Z.lineTo(G+F.width-W,U),Z.quadraticCurveTo(G+F.width,U,G+F.width,U+W),Z.lineTo(G+F.width,U+F.height-W),Z.quadraticCurveTo(G+F.width,U+F.height,G+F.width-W,U+F.height),Z.lineTo(G+W,U+F.height),Z.quadraticCurveTo(G,U+F.height,G,U+F.height-W),Z.lineTo(G,U+W),Z.quadraticCurveTo(G,U,G+W,U),Z.closePath(),Z.fill(),Z.stroke(),Z.font=F.font,Z.fillStyle=F.textColor,Z.textAlign="center",Z.textBaseline="middle",Z.fillText(F.text,G+F.width/2,U+F.height/2),{x:G,y:U,width:F.width,height:F.height}}function zZ(Z,$,K,Q,J,F){return Z>=K&&Z<=K+J&&$>=Q&&$<=Q+F}var X0={challenge:{activated:"Use all pieces!",completed:"+{bonusPoints} bonus points!"},multiplier:{message:"{multiplier}x MULTIPLIER!"},highScore:{newHighScore:"New High Score: {score}!"}};var SZ={en:X0},hZ="en";function e0(Z="en"){try{if(!SZ[Z])console.warn(`Translations for ${Z} not available, using English as fallback`),Z="en";hZ=Z,console.log(`Initialized translations for ${Z}`)}catch($){console.error("Error initializing translations:",$),hZ="en"}}function i(Z,$={}){let K=SZ[hZ]||SZ.en,Q=Z.split("."),J=K;for(let F of Q){if(J===void 0||J===null)return console.warn(`Translation key not found: ${Z}`),Z;J=J[F]}if(typeof J!=="string")return console.warn(`Translation key doesn't point to a string: ${Z}`),Z;return J.replace(/\{([^}]+)\}/g,(F,G)=>{return $[G]!==void 0?$[G].toString():F})}e0("en");class XZ{canvas;ctx;board;score;isChallengeMode=!1;challengeOutlineColor="#FFD700";challengeOutlineWidth=4;constructor(Z,$=0){this.canvas=Z,this.ctx=Z.getContext("2d"),this.score=$,this.board=new p,this.render()}setChallengeMode(Z){this.isChallengeMode=Z}render(){let Z=this.ctx,$=B.cellSize,K=B.gridSize*$;Z.fillStyle=B.backgroundColor,Z.fillRect(0,0,this.canvas.width,this.canvas.height),Z.strokeStyle=B.gridLineColor,Z.lineWidth=1;for(let U=0;U<=B.gridSize;U++)Z.beginPath(),Z.moveTo(0,U*$),Z.lineTo(this.canvas.width,U*$),Z.stroke(),Z.beginPath(),Z.moveTo(U*$,0),Z.lineTo(U*$,K),Z.stroke();for(let U=0;U<B.gridSize;U++)for(let W=0;W<B.gridSize;W++){let H=this.board.cells[U][W];if(H){Z.fillStyle=H,Z.strokeStyle="#3F3A33",Z.lineWidth=2;let _=W*$,q=U*$;Z.fillRect(_,q,$,$),Z.fillStyle=this.lightenColor(H,15),Z.beginPath(),Z.moveTo(_,q),Z.lineTo(_+$,q),Z.lineTo(_+$-4,q+4),Z.lineTo(_+4,q+4),Z.closePath(),Z.fill(),Z.fillStyle=this.darkenColor(H,15),Z.beginPath(),Z.moveTo(_+$,q),Z.lineTo(_+$,q+$),Z.lineTo(_+$-4,q+$-4),Z.lineTo(_+$-4,q+4),Z.closePath(),Z.fill(),Z.strokeRect(_,q,$,$)}}if(this.isChallengeMode){Z.beginPath(),Z.strokeStyle=this.challengeOutlineColor,Z.lineWidth=this.challengeOutlineWidth;let U=this.challengeOutlineWidth/2;Z.strokeRect(U,U,B.gridSize*$-this.challengeOutlineWidth,B.gridSize*$-this.challengeOutlineWidth)}Z.beginPath(),Z.strokeStyle=B.borderColor,Z.lineWidth=2,Z.moveTo(0,K),Z.lineTo(this.canvas.width,K),Z.stroke();let Q=K+20,J="Available Pieces";Z.font="16px Arial",Z.textAlign="center",Z.fillStyle="rgba(30, 28, 25, 0.7)";let F=Z.measureText(J).width+10,G=20;Z.fillRect(this.canvas.width/2-F/2,Q-G+4,F,G),Z.fillStyle=B.textColor,Z.fillText(J,this.canvas.width/2,Q)}lightenColor(Z,$){let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.min(Math.floor(Q*(1+$/100)),255),U=Math.min(Math.floor(J*(1+$/100)),255),W=Math.min(Math.floor(F*(1+$/100)),255);return`rgb(${G}, ${U}, ${W})`}darkenColor(Z,$){let K=Z.replace("#",""),Q=parseInt(K.substr(0,2),16),J=parseInt(K.substr(2,2),16),F=parseInt(K.substr(4,2),16),G=Math.max(Math.floor(Q*(1-$/100)),0),U=Math.max(Math.floor(J*(1-$/100)),0),W=Math.max(Math.floor(F*(1-$/100)),0);return`rgb(${G}, ${U}, ${W})`}canPlacePiece(Z,$,K){for(let Q=0;Q<Z.shape.length;Q++)for(let J=0;J<Z.shape[Q].length;J++)if(Z.shape[Q][J]){let F=$+J,G=K+Q;if(F<0||F>=B.gridSize||G<0||G>=B.gridSize)return!1;if(this.board.cells[G][F]!==null)return!1}return!0}placePiece(Z,$,K){if(!this.canPlacePiece(Z,$,K))return!1;let Q=0;for(let J=0;J<Z.shape.length;J++)for(let F=0;F<Z.shape[J].length;F++)if(Z.shape[J][F])this.board.cells[K+J][$+F]=Z.color,Q++;return this.score+=Q*15,w(this.score),this.render(),this.checkForCompleteLines(),!0}highlightValidPlacement(Z,$,K,Q){if(!Z)return;let J=B.cellSize,F=this.canPlacePiece(Z,$,K);Q.globalAlpha=0.3,Q.fillStyle=F?B.highlightColor:B.invalidColor;for(let G=0;G<Z.shape.length;G++)for(let U=0;U<Z.shape[G].length;U++)if(Z.shape[G][U]){let W=$*J+U*J,H=K*J+G*J;Q.fillRect(W,H,J,J)}Q.globalAlpha=1}checkForCompleteLines(){let Z=0,$=new Set;for(let K=0;K<B.gridSize;K++)if(this.board.cells[K].every((Q)=>Q!==null)){for(let Q=0;Q<B.gridSize;Q++)$.add(`${K},${Q}`);Z++}for(let K=0;K<B.gridSize;K++)if(this.board.cells.map((J)=>J[K]).every((J)=>J!==null)){for(let J=0;J<B.gridSize;J++)$.add(`${J},${K}`);Z++}if($.size>0){$.forEach((J)=>{let[F,G]=J.split(",").map(Number);this.board.cells[F][G]=null});let K=250,Q=Z>1?Z:1;if(this.score+=K*Z*Q,Z>1)this.showMultiLineBonus(Z);w(this.score),this.render()}return Z}showMultiLineBonus(Z){let $=i("multiplier.message",{multiplier:Z});document.dispatchEvent(new CustomEvent("game-status",{detail:{message:$,type:"bonus"},bubbles:!0,composed:!0}))}setCellState(Z,$,K){this.board.setCellState(Z,$,K)}setBoard(Z){this.board=Z,this.render()}clearGrid(){this.board.reset(),this.render()}getBoard(){return this.board}}class yZ{dbName="LastBlockDB";storeName="stats";dbVersion=1;db=null;statDefinitions=[{id:"score",name:"Score"},{id:"moveCount",name:"Moves"},{id:"challengesCompleted",name:"Challenges"},{id:"challengeBonus",name:"Challenge Bonus"},{id:"gamesPlayed",name:"Games Played"}];constructor(){this.initDB()}initDB(){return new Promise((Z,$)=>{if(this.db){Z(this.db);return}let K=indexedDB.open(this.dbName,this.dbVersion);K.onerror=(Q)=>{console.error("Error opening IndexedDB",Q),$("Error opening IndexedDB")},K.onsuccess=()=>{this.db=K.result,Z(this.db)},K.onupgradeneeded=(Q)=>{let J=Q.target.result;if(!J.objectStoreNames.contains(this.storeName)){let F=J.createObjectStore(this.storeName,{keyPath:["id","category"]});F.createIndex("category","category",{unique:!1}),F.createIndex("id","id",{unique:!1}),this.initializeDefaultStats(F)}}})}initializeDefaultStats(Z){this.statDefinitions.forEach(($)=>{Z.add({id:$.id,category:"current",name:$.name,value:0})}),this.statDefinitions.forEach(($)=>{Z.add({id:$.id,category:"lifetime",name:$.name,value:0})}),this.statDefinitions.forEach(($)=>{Z.add({id:$.id,category:"best",name:$.name,value:0})})}async getStats(Z){return await this.initDB(),new Promise(($,K)=>{if(!this.db){K("Database not initialized");return}let G=this.db.transaction([this.storeName],"readonly").objectStore(this.storeName).index("category").getAll(Z);G.onsuccess=()=>{$(G.result)},G.onerror=(U)=>{console.error(`Error getting ${Z} stats`,U),K(`Error getting ${Z} stats`)}})}async getStat(Z,$){return await this.initDB(),new Promise((K,Q)=>{if(!this.db){Q("Database not initialized");return}let G=this.db.transaction([this.storeName],"readonly").objectStore(this.storeName).get([$,Z]);G.onsuccess=()=>{if(G.result)K(G.result.value);else K(0)},G.onerror=(U)=>{console.error(`Error getting stat: ${$} in ${Z}`,U),Q(`Error getting stat: ${$} in ${Z}`)}})}async updateStat(Z,$,K){return await this.initDB(),new Promise((Q,J)=>{if(!this.db){J("Database not initialized");return}let G=this.db.transaction([this.storeName],"readwrite").objectStore(this.storeName),U=G.get([$,Z]);U.onsuccess=()=>{if(U.result){let W=U.result;W.value=K;let H=G.put(W);H.onsuccess=()=>{Q()},H.onerror=(_)=>{console.error(`Error updating stat: ${$} in ${Z}`,_),J(`Error updating stat: ${$} in ${Z}`)}}else{let W=this.statDefinitions.find((q)=>q.id===$);if(!W){J(`Unknown stat: ${$}`);return}let H={id:$,category:Z,name:W.name,value:K},_=G.add(H);_.onsuccess=()=>{Q()},_.onerror=(q)=>{console.error(`Error creating stat: ${$} in ${Z}`,q),J(`Error creating stat: ${$} in ${Z}`)}}},U.onerror=(W)=>{console.error(`Error reading stat: ${$} in ${Z}`,W),J(`Error reading stat: ${$} in ${Z}`)}})}async incrementStat(Z,$,K=1){return await this.initDB(),new Promise((Q,J)=>{if(!this.db){J("Database not initialized");return}let G=this.db.transaction([this.storeName],"readwrite").objectStore(this.storeName),U=G.get([$,Z]);U.onsuccess=()=>{if(U.result){let W=U.result;W.value+=K;let H=G.put(W);H.onsuccess=()=>{Q()},H.onerror=(_)=>{console.error(`Error incrementing stat: ${$} in ${Z}`,_),J(`Error incrementing stat: ${$} in ${Z}`)}}else{let W=this.statDefinitions.find((q)=>q.id===$);if(!W){J(`Unknown stat: ${$}`);return}let H={id:$,category:Z,name:W.name,value:K},_=G.add(H);_.onsuccess=()=>{Q()},_.onerror=(q)=>{console.error(`Error creating stat: ${$} in ${Z}`,q),J(`Error creating stat: ${$} in ${Z}`)}}},U.onerror=(W)=>{console.error(`Error reading stat: ${$} in ${Z}`,W),J(`Error reading stat: ${$} in ${Z}`)}})}async resetStats(Z){return await this.initDB(),new Promise(($,K)=>{if(!this.db){K("Database not initialized");return}let Q=this.db.transaction([this.storeName],"readwrite"),J=Q.objectStore(this.storeName),G=J.index("category").getAll(Z);G.onsuccess=()=>{G.result.forEach((W)=>{W.value=0,J.put(W)}),Q.oncomplete=()=>{$()},Q.onerror=(W)=>{console.error(`Error resetting ${Z} stats`,W),K(`Error resetting ${Z} stats`)}},G.onerror=(U)=>{console.error(`Error getting ${Z} stats for reset`,U),K(`Error getting ${Z} stats for reset`)}})}async updateBestStats(){let Z=await this.getStats("current"),$=await this.getStats("best"),K=Z.find((J)=>J.id==="score")?.value||0,Q=$.find((J)=>J.id==="score")?.value||0;if(K>Q)return await Promise.all(Z.map((J)=>this.updateStat("best",J.id,J.value))),!0;return!1}async recordGameComplete(){await this.incrementStat("lifetime","gamesPlayed");let Z=await this.getStats("current");return await Promise.all(Z.filter(($)=>$.id!=="gamesPlayed").map(($)=>this.incrementStat("lifetime",$.id,$.value))),this.updateBestStats()}async newGame(){return this.resetStats("current")}}class vZ{score=0;moveCount=0;isChallengeMode=!1;challengeModeInterval=10;challengeBonusPoints=300;challengesCompleted=0;challengeBonus=0;stats;constructor(){this.stats=new yZ,this.initGame()}async initGame(){this.reset(),await this.stats.newGame()}reset(){this.score=0,this.moveCount=0,this.isChallengeMode=!1,this.challengesCompleted=0,this.challengeBonus=0}incrementMoveCount(){return this.moveCount++,this.stats.updateStat("current","moveCount",this.moveCount),this.moveCount}shouldActivateChallengeMode(){return!this.isChallengeMode&&this.moveCount%this.challengeModeInterval===0&&this.moveCount>0}addChallengeBonus(){this.score+=this.challengeBonusPoints,this.challengeBonus+=this.challengeBonusPoints,this.challengesCompleted++,this.stats.updateStat("current","challengeBonus",this.challengeBonus),this.stats.updateStat("current","challengesCompleted",this.challengesCompleted),this.stats.updateStat("current","score",this.score)}updateScore(Z){this.score=Z,this.stats.updateStat("current","score",this.score)}async handleGameOver(){return await this.stats.recordGameComplete()}async getStats(Z){return await this.stats.getStats(Z)}}class l extends Y{messageQueue=[];enterDuration=300;visibleDuration=1800;exitDuration=300;isProcessingQueue=!1;static styles=C`
        :host {
            display: block;
            height: 40px;
            position: relative;
            overflow: hidden;
            flex: 1;
        }

        .messages-area {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        .message {
            position: absolute;
            left: 0;
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            font-size: 16px;
            opacity: 0;
            transform: translateY(100%);
            transition:
                transform 0.3s ease-out,
                opacity 0.3s ease;
            padding-right: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            display: flex;
            align-items: center;
            height: 40px;
        }

        .message.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .message.exiting {
            opacity: 0;
            transform: translateY(-100%);
        }

        .message.type-info {
            color: #ffffff;
        }

        .message.type-challenge {
            color: #ffd700; /* Gold color for challenges */
        }

        .message.type-bonus {
            color: #4caf50; /* Green color for bonuses */
        }

        .default-message {
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            font-size: 16px;
            color: #777; /* Brightened from #555 to #777 */
            opacity: 0.8; /* Increased from 0.7 to 0.8 for more visibility */
            padding-right: 10px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            height: 40px;
            transition: opacity 0.5s ease;
        }

        .default-message.hidden {
            opacity: 0;
        }
    `;constructor(){super();this.messages=[];this.showDefaultMessage=!0;document.addEventListener("game-status",this.onStatusEvent.bind(this))}onStatusEvent(Z){let{message:$,type:K="info"}=Z.detail;if(!$)return;this.showDefaultMessage=!1;let J={id:`status-${Date.now()}-${Math.floor(Math.random()*1000)}`,text:$,type:K,status:"entering"};if(this.messageQueue.push(J),!this.isProcessingQueue)this.processNextMessage()}processNextMessage(){if(this.messageQueue.length===0){this.isProcessingQueue=!1,setTimeout(()=>{if(this.messages=this.messages.filter(($)=>$.status!=="exiting"),this.messages.length===0)setTimeout(()=>{this.showDefaultMessage=!0},300)},this.exitDuration);return}this.isProcessingQueue=!0;let Z=this.messageQueue.shift();this.messages=[...this.messages,Z],setTimeout(()=>{this.updateMessageStatus(Z.id,"visible"),setTimeout(()=>{this.updateMessageStatus(Z.id,"exiting"),setTimeout(()=>{this.processNextMessage(),setTimeout(()=>{this.messages=this.messages.filter(($)=>$.id!==Z.id)},this.exitDuration)},100)},this.visibleDuration)},this.enterDuration)}updateMessageStatus(Z,$){this.messages=this.messages.map((K)=>{if(K.id===Z)return{...K,status:$};return K})}render(){return j`
            <div class="messages-area">
                ${this.messages.map((Z)=>j` <div class="message type-${Z.type} ${Z.status}">${Z.text}</div> `)}
                <div class="default-message ${this.showDefaultMessage?"":"hidden"}">lastblock</div>
            </div>
        `}static showMessage(Z,$="info"){document.dispatchEvent(new CustomEvent("game-status",{detail:{message:Z,type:$},bubbles:!0,composed:!0}))}}V([h()],l.prototype,"messages",void 0),V([h()],l.prototype,"showDefaultMessage",void 0),l=V([f("game-status")],l);var k=(Z)=>B.colors[Z%B.colors.length],GZ={rowColClear:{name:"Row & Column Clear Test",description:"Test clearing both a row and column simultaneously",boardState:Array(B.gridSize).fill("").map((Z,$)=>Array(B.gridSize).fill("").map((K,Q)=>{if($===5&&Q!==5)return k(0);if(Q===5&&$!==5)return k(1);return""})),availablePieces:[{shape:[[!0]],color:k(0)}]},multiRowClear:{name:"Multi-Row Clear Test",description:"Test clearing multiple rows simultaneously",boardState:Array(B.gridSize).fill("").map((Z,$)=>Array(B.gridSize).fill("").map((K,Q)=>{if($===3&&Q<B.gridSize-1)return k(0);if($===5&&Q<B.gridSize-1)return k(1);return""})),availablePieces:[{shape:[[!0],[!0]],color:k(0)}]},customPieces:{name:"Custom Test Pieces",description:"Empty board with custom test pieces",boardState:Array(B.gridSize).fill("").map(()=>Array(B.gridSize).fill("")),availablePieces:[{shape:[[!0]],color:k(0)},{shape:[[!0,!1],[!0,!0]],color:k(1)},{shape:[[!0,!0,!0],[!1,!0,!1]],color:k(0)}]},complexClears:{name:"Complex Clear Scenarios",description:"Complex test scenario with multiple potential line clears",boardState:Array(B.gridSize).fill("").map((Z,$)=>Array(B.gridSize).fill("").map((K,Q)=>{if($===2&&Q<B.gridSize-2)return k(0);if($===5&&Q>0&&Q<B.gridSize-1)return k(1);if(Q===2&&$<B.gridSize-2)return k(1);if(Q===5&&$>0&&$<B.gridSize-1)return k(0);return""})),availablePieces:[{shape:[[!0,!0],[!0,!1]],color:k(0)},{shape:[[!0,!0],[!0,!0]],color:k(1)},{shape:[[!0,!0,!0]],color:k(0)}]}};class mZ{isDragging=!1;activePiece=null;dragStartX=0;dragStartY=0;dragCurrentX=0;dragCurrentY=0;animationFrameId=null;availablePieces=[];isGameOver=!1;finalScore=0;hoveringPlayButton=!1;grid;mainCanvas;overlayCanvas;mainCtx;overlayCtx;cursorOffset=40;game;constructor(Z,$){this.mainCanvas=Z,this.overlayCanvas=$,this.mainCtx=this.mainCanvas.getContext("2d"),this.overlayCtx=this.overlayCanvas.getContext("2d"),this.game=new vZ;let K=B.gridSize*B.cellSize+B.pieceAreaHeight;this.mainCanvas.width=B.gridSize*B.cellSize,this.mainCanvas.height=K,this.overlayCanvas.width=B.gridSize*B.cellSize,this.overlayCanvas.height=K,this.grid=new XZ(this.mainCanvas,this.game.score),this.setupEventListeners(),document.addEventListener("request-score-update",this.onScoreUpdateRequest.bind(this))}initialize(){this.generateInitialPieces(),v(this.overlayCtx,this.availablePieces)}setupEventListeners(){this.overlayCanvas.addEventListener("mousedown",this.onCanvasMouseDown.bind(this)),this.overlayCanvas.addEventListener("touchstart",this.onCanvasTouchStart.bind(this),{passive:!1}),this.setupGameOverEvents(),document.getElementById("new-game-btn")?.addEventListener("click",()=>this.newGame())}generateInitialPieces(){for(let Z=0;Z<B.maxAvailablePieces;Z++)this.generateNewPiece()}generateNewPiece(){for(let Z=0;Z<B.maxAvailablePieces;Z++)if(!this.availablePieces[Z]||!this.availablePieces[Z].isAvailable){let $=new VZ(void 0,Z);if(Z<this.availablePieces.length)this.availablePieces[Z]=$;else this.availablePieces.push($);return}}findPieceAtPosition(Z,$){let K=this.overlayCanvas.width,Q=B.gridSize*B.cellSize;if($>Q){let J=Math.floor(Z/K*B.maxAvailablePieces),F=Math.max(0,Math.min(B.maxAvailablePieces-1,J));if(this.availablePieces[F]&&this.availablePieces[F].isAvailable)return this.availablePieces[F]}else for(let J=this.availablePieces.length-1;J>=0;J--){let F=this.availablePieces[J];if(F.isAvailable&&F.contains(Z,$))return F}return null}animateDrag(){if(this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces),this.isDragging&&this.activePiece){let Z=B.cellSize,$=this.dragCurrentX-this.dragStartX,K=this.dragCurrentY-this.dragStartY;if(this.activePiece.x+=$,this.activePiece.y+=K,this.dragStartX=this.dragCurrentX,this.dragStartY=this.dragCurrentY,this.activePiece.scaleFactor&&this.activePiece.scaleFactor<1){let _=this.activePiece.scaleFactor,q=this.activePiece.shape[0].length*Z*_,L=this.activePiece.shape.length*Z*_,N=this.activePiece.x+q/2,b=this.activePiece.y+L/2;this.activePiece.scaleFactor=1;let N0=this.activePiece.shape[0].length*Z,Y0=this.activePiece.shape.length*Z;this.activePiece.x=N-N0/2,this.activePiece.y=b-Y0/2}let Q=this.activePiece.shape[0].length,J=this.activePiece.shape.length,F=this.activePiece.x,G=this.activePiece.y,U=Math.floor((F+Z/2)/Z),W=Math.floor((G+Z/2)/Z),H=W>=0&&W+J<=B.gridSize&&U>=0&&U+Q<=B.gridSize;if(this.activePiece.render(this.overlayCtx),H)this.grid.highlightValidPlacement(this.activePiece,U,W,this.overlayCtx);this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this))}else if(this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}tryPlacePiece(Z,$){if(!this.activePiece)return;if(this.grid.placePiece(this.activePiece,Z,$)){if(this.activePiece.isAvailable=!1,this.game.updateScore(this.grid.score),w(this.game.score),this.game.incrementMoveCount(),this.game.shouldActivateChallengeMode())this.activateChallengeMode();if(this.game.isChallengeMode)this.checkChallengeCompletion();else this.generateNewPiece();this.checkGameOver()}else this.repositionAvailablePieces()}repositionAvailablePieces(){for(let Z=0;Z<this.availablePieces.length;Z++)if(this.availablePieces[Z].isAvailable){let $=B.gridSize*B.cellSize,K=this.availablePieces[Z].shape[0].length*B.cellSize,Q=this.availablePieces.filter((U)=>U.isAvailable).length,J=$/B.maxAvailablePieces;this.availablePieces[Z].x=J/2-K/2+Z*J;let F=B.gridSize*B.cellSize,G=this.availablePieces[Z].shape.length*B.cellSize;this.availablePieces[Z].y=F+B.pieceAreaHeight/2-G/2}}checkGameOver(){let Z=!1;for(let $ of this.availablePieces){if(!$.isAvailable)continue;for(let K=0;K<B.gridSize;K++)for(let Q=0;Q<B.gridSize;Q++)if(this.grid.canPlacePiece($,Q,K)){Z=!0;return}}if(!Z){if(this.isGameOver=!0,this.finalScore=this.game.score,this.game.handleGameOver().then(($)=>{if(V0(this.mainCtx,this.finalScore),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),FZ(this.overlayCtx,!1),$)l.showMessage(i("highScore.newHighScore",{score:this.finalScore}),"challenge")}),this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}}loadTestScenario(Z){if(!GZ[Z]){console.error(`Scenario "${Z}" not found.`);return}this.grid.clearGrid(),this.game.score=0;let $=GZ[Z],K=new p;$.boardState.forEach((Q,J)=>{Q.forEach((F,G)=>{if(F)K.setCellState(G,J,F)})}),this.grid.setBoard(K),this.availablePieces=[],$.availablePieces.forEach((Q,J)=>{if(J<B.maxAvailablePieces){let F=new VZ(Q.shape,J);F.color=Q.color,this.availablePieces.push(F)}});while(this.availablePieces.length<B.maxAvailablePieces)this.generateNewPiece();this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces),w(this.game.score)}async newGame(Z){await this.game.initGame(),this.isGameOver=!1,w(this.game.score),this.grid=new XZ(this.mainCanvas,this.game.score),this.availablePieces=[];for(let $=0;$<B.maxAvailablePieces;$++)this.generateNewPiece();if(Z)this.loadTestScenario(Z);else this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces)}setupGameOverEvents(){this.overlayCanvas.addEventListener("mousemove",this.onCanvasMouseMove.bind(this)),this.overlayCanvas.addEventListener("click",this.onCanvasClick.bind(this))}setInitialPiecePosition(Z,$,K){let Q=B.cellSize*(Z.scaleFactor||1),J=Z.shape[0].length*Q,F=Z.shape.length*Q;Z.x=$-J/2,Z.y=K-F-this.cursorOffset}onScoreUpdateRequest(){w(this.game.score)}onCanvasMouseMove(Z){if(!this.isGameOver)return;let $=this.overlayCanvas.getBoundingClientRect(),K=(Z.clientX-$.left)*(this.overlayCanvas.width/$.width),Q=(Z.clientY-$.top)*(this.overlayCanvas.height/$.height),J=FZ(this.overlayCtx,!1),F=zZ(K,Q,J.x,J.y,J.width,J.height);if(F!==this.hoveringPlayButton)this.hoveringPlayButton=F,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),FZ(this.overlayCtx,F)}onCanvasClick(Z){if(!this.isGameOver)return;let $=this.overlayCanvas.getBoundingClientRect(),K=(Z.clientX-$.left)*(this.overlayCanvas.width/$.width),Q=(Z.clientY-$.top)*(this.overlayCanvas.height/$.height),J=FZ(this.overlayCtx,!1);if(zZ(K,Q,J.x,J.y,J.width,J.height))this.newGame()}onCanvasMouseDown(Z){if(this.isGameOver)return;let $=this.overlayCanvas.getBoundingClientRect(),K=(Z.clientX-$.left)*(this.overlayCanvas.width/$.width),Q=(Z.clientY-$.top)*(this.overlayCanvas.height/$.height),J=this.findPieceAtPosition(K,Q);if(J){if(Z.preventDefault(),this.activePiece=J,this.isDragging=!0,this.dragStartX=K,this.dragStartY=Q,this.dragCurrentX=K,this.dragCurrentY=Q,this.setInitialPiecePosition(J,K,Q),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.addEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onDocumentMouseMove(Z){if(this.isDragging&&this.activePiece){let $=this.overlayCanvas.getBoundingClientRect();document.body.style.cursor="grabbing",this.dragCurrentX=(Z.clientX-$.left)*(this.overlayCanvas.width/$.width),this.dragCurrentY=(Z.clientY-$.top)*(this.overlayCanvas.height/$.height)}}onDocumentMouseUp(Z){if(this.isDragging&&this.activePiece){let $=B.cellSize,K=this.activePiece.shape[0].length,Q=this.activePiece.shape.length,J=this.activePiece.x,F=this.activePiece.y,G=Math.floor((J+$/2)/$),U=Math.floor((F+$/2)/$);if(U>=0&&U+Q<=B.gridSize&&G>=0&&G+K<=B.gridSize)this.tryPlacePiece(G,U);else this.repositionAvailablePieces();document.body.style.cursor="default",this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces),document.removeEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.removeEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onCanvasTouchStart(Z){if(Z.touches.length>0){let $=this.overlayCanvas.getBoundingClientRect(),K=Z.touches[0],Q=(K.clientX-$.left)*(this.overlayCanvas.width/$.width),J=(K.clientY-$.top)*(this.overlayCanvas.height/$.height),F=this.findPieceAtPosition(Q,J);if(F){if(Z.preventDefault(),this.activePiece=F,this.isDragging=!0,this.dragStartX=Q,this.dragStartY=J,this.dragCurrentX=Q,this.dragCurrentY=J,this.setInitialPiecePosition(F,Q,J),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("touchmove",this.onDocumentTouchMove.bind(this),{passive:!1}),document.addEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}}onDocumentTouchMove(Z){if(Z.touches.length>0&&this.isDragging&&this.activePiece){Z.preventDefault();let $=Z.touches[0],K=this.overlayCanvas.getBoundingClientRect();this.dragCurrentX=($.clientX-K.left)*(this.overlayCanvas.width/K.width),this.dragCurrentY=($.clientY-K.top)*(this.overlayCanvas.height/K.height)}}onDocumentTouchEnd(Z){if(this.isDragging&&this.activePiece){let $=B.cellSize,K=this.activePiece.shape[0].length,Q=this.activePiece.shape.length,J=this.activePiece.x,F=this.activePiece.y,G=Math.floor((J+$/2)/$),U=Math.floor((F+$/2)/$);if(U>=0&&U+Q<=B.gridSize&&G>=0&&G+K<=B.gridSize)this.tryPlacePiece(G,U);else this.repositionAvailablePieces();this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces),document.removeEventListener("touchmove",this.onDocumentTouchMove.bind(this)),document.removeEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}activateChallengeMode(){this.game.isChallengeMode=!0,this.grid.setChallengeMode(!0),this.grid.render(),l.showMessage(i("challenge.activated"),"challenge")}completeChallengeMode(){this.game.addChallengeBonus(),w(this.game.score),this.grid.score=this.game.score,this.game.isChallengeMode=!1,this.grid.setChallengeMode(!1),this.generateInitialPieces(),this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),v(this.overlayCtx,this.availablePieces),l.showMessage(i("challenge.completed",{bonusPoints:this.game.challengeBonusPoints}),"bonus")}checkChallengeCompletion(){if(this.availablePieces.filter(($)=>$.isAvailable).length===0)this.completeChallengeMode()}}class UZ extends Y{constructor(){super(...arguments);this.gameState=null}static styles=C`
        .test-scenarios-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
            gap: 10px;
        }

        select {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: white;
            font-family: inherit;
            font-size: 14px;
        }

        button {
            padding: 8px 12px;
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `;setGameState(Z){this.gameState=Z}handleLoadScenario(){if(!this.gameState)return;let $=(this.shadowRoot?.querySelector("#test-scenario-select")).value;if($)this.gameState.newGame($)}static isTestModeEnabled(){return new URLSearchParams(window.location.search).has("testmode")}render(){return j`
            <div class="test-scenarios-container">
                <select id="test-scenario-select">
                    <option value="">Select a test scenario</option>
                    ${Object.entries(GZ).map(([Z,$])=>j`<option value="${Z}">${$.name}</option>`)}
                </select>
                <button id="load-scenario-btn" @click=${this.handleLoadScenario}>Load Scenario</button>
            </div>
        `}}V([o({type:Object})],UZ.prototype,"gameState",void 0),UZ=V([f("test-mode-ui")],UZ);class uZ extends Y{static styles=C`
        :host {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color, #53493f);
            width: 100%;
        }

        .score-container {
            font-size: 16px; /* Updated to 16px to match status messages */
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            color: var(--text-color, #d4af91);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 15px;
        }

        .menu-button-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .menu-button {
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--text-color, #d4af91);
            font-size: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 15px 5px 5px;
            transition: transform 0.2s;
        }

        .menu-button:hover {
            transform: scale(1.1);
        }

        .header-content {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.5rem 0;
        }

        .score-value {
            color: #ffd700; /* Gold color for score */
            margin-left: 5px;
        }
    `;constructor(){super();this.score=0;document.addEventListener("score-updated",this.handleScoreUpdate.bind(this))}connectedCallback(){super.connectedCallback(),document.dispatchEvent(new CustomEvent("request-score-update"))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("score-updated",this.handleScoreUpdate.bind(this))}handleMenuClick(){let Z=new CustomEvent("toggle-info-screen",{bubbles:!0,composed:!0});this.dispatchEvent(Z)}handleScoreUpdate(Z){if(Z.detail&&typeof Z.detail.score==="number")this.score=Z.detail.score}getScoreElement(){return this.renderRoot.querySelector("#score")}render(){return j`
            <div class="header-content">
                <game-status></game-status>
                <div class="score-container">Score: <span id="score" class="score-value">${this.score}</span></div>
                <div class="menu-button-container">
                    <button class="menu-button" @click=${this.handleMenuClick} aria-label="Open Information">
                        &#9776;
                    </button>
                </div>
            </div>
        `}}V([o({type:Number})],uZ.prototype,"score",void 0),uZ=V([f("game-header")],uZ);class dZ extends Y{static styles=C`
        :host {
            display: block;
            width: 100%;
        }

        .info-container {
            background-color: var(--container-background, #2a2723);
            border: 1px solid var(--border-color, #53493f);
            border-radius: 8px;
            padding: 0;
            margin: 10px 0;
            color: var(--text-color, #d4af91);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            transition:
                max-height 0.3s ease-out,
                opacity 0.3s ease;
            opacity: 0;
            width: 100%;
        }

        .info-container.visible {
            max-height: 500px;
            opacity: 1;
            padding: 0;
        }

        .tabs {
            display: flex;
            border-bottom: 1px solid var(--border-color, #53493f);
        }

        .tab-button {
            background: transparent;
            border: none;
            color: var(--text-color, #d4af91);
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            opacity: 0.7;
            transition:
                opacity 0.2s,
                background-color 0.2s;
            flex: 1;
        }

        .tab-button:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .tab-button.active {
            opacity: 1;
            border-bottom: 2px solid var(--color-teal, #3d8c9e);
        }

        .tab-content {
            display: none;
            padding: 20px;
        }

        .tab-content.active {
            display: block;
        }

        h2 {
            color: var(--text-color, #d4af91);
            margin-top: 0;
            margin-bottom: 12px;
            border-bottom: 1px solid var(--border-color, #53493f);
            padding-bottom: 8px;
        }

        p {
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .close-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            transition: background-color 0.2s;
            font-weight: bold;
        }

        .close-button:hover {
            background-color: var(--button-hover, #d4af91);
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-group h3 {
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: normal;
        }

        .setting-option {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .setting-option input {
            margin-right: 8px;
        }

        .setting-option label {
            cursor: pointer;
        }

        .game-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
            transition: background-color 0.2s;
            font-weight: bold;
            width: 100%;
        }

        .game-button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `;constructor(){super();this.isVisible=!1;this.activeTab=0;document.addEventListener("toggle-info-screen",this.toggle.bind(this))}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}toggle(){this.isVisible=!this.isVisible}switchTab(Z){this.activeTab=Z}show(){this.isVisible=!0}hide(){this.isVisible=!1}renderSettingOption(Z,$,K,Q=!1){return j`
            <div class="setting-option">
                <input type="radio" id="${Z}-${$}" name="${Z}" value="${$}" ?checked=${Q} />
                <label for="${Z}-${$}">${K}</label>
            </div>
        `}handleNewGame(){let Z=new CustomEvent("new-game-requested",{bubbles:!0,composed:!0});this.dispatchEvent(Z),this.hide()}render(){return j`
            <div class="info-container ${this.isVisible?"visible":""}">
                <div class="tabs">
                    <button
                        class="tab-button ${this.activeTab===0?"active":""}"
                        @click=${()=>this.switchTab(0)}
                    >
                        How to Play
                    </button>
                    <button
                        class="tab-button ${this.activeTab===1?"active":""}"
                        @click=${()=>this.switchTab(1)}
                    >
                        Settings
                    </button>
                </div>

                <div class="tab-content ${this.activeTab===0?"active":""}">
                    <p>
                        Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points.
                        Game over when no more pieces can be placed.
                    </p>
                    <p>Clear multiple lines at once for a bigger bonus!</p>
                </div>

                <div class="tab-content ${this.activeTab===1?"active":""}">
                    <div class="setting-group">
                        <h3>Game</h3>
                        <button class="game-button" @click=${this.handleNewGame}>New Game</button>
                    </div>

                    <div class="setting-group">
                        <h3>Theme</h3>
                        ${this.renderSettingOption("theme","default","Default",!0)}
                        ${this.renderSettingOption("theme","dark","Dark")}
                    </div>

                    <div class="setting-group">
                        <h3>Sound</h3>
                        ${this.renderSettingOption("sound","on","On",!0)}
                        ${this.renderSettingOption("sound","off","Off")}
                    </div>
                </div>

                <button class="close-button" @click=${this.toggle}>Close</button>
            </div>
        `}}V([h()],dZ.prototype,"isVisible",void 0),V([h()],dZ.prototype,"activeTab",void 0),dZ=V([f("info-screen")],dZ);class gZ extends Y{constructor(){super(...arguments);this.game=null;this.isTestModeEnabled=UZ.isTestModeEnabled()}static styles=C`
        :host {
            display: contents;
        }

        .game-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .game-area {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
        }

        .canvas-container {
            position: relative;
            width: 400px;
            height: 550px;
        }

        canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `;connectedCallback(){super.connectedCallback(),console.log("connectedCallback"),this.addEventListener("new-game-requested",this.handleNewGame.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("new-game-requested",this.handleNewGame.bind(this))}firstUpdated(){if(this.game=new mZ(this.mainCanvas,this.overlayCanvas),this.game.initialize(),this.isTestModeEnabled){let Z=this.shadowRoot?.querySelector("test-mode-ui");if(Z&&this.game)Z.setGameState(this.game)}w(0)}handleNewGame(){if(this.game)this.game.newGame()}renderTestModeUI(){if(!this.isTestModeEnabled)return j``;return j` <test-mode-ui> </test-mode-ui> `}render(){return j`
            <game-header></game-header>

            <div id="test-mode-container">${this.renderTestModeUI()}</div>

            <info-screen></info-screen>

            <div class="game-container">
                <div class="game-area">
                    <div class="canvas-container">
                        <canvas id="main-canvas" width="400" height="550"></canvas>
                        <canvas id="overlay-canvas" width="400" height="550"></canvas>
                    </div>
                </div>
            </div>
        `}}V([h()],gZ.prototype,"game",void 0),V([h()],gZ.prototype,"isTestModeEnabled",void 0),V([bZ("#main-canvas")],gZ.prototype,"mainCanvas",void 0),V([bZ("#overlay-canvas")],gZ.prototype,"overlayCanvas",void 0),gZ=V([f("game-shell")],gZ);
