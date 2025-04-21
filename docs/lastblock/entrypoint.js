var K=function(A,B,Q,J){var F=arguments.length,G=F<3?B:J===null?J=Object.getOwnPropertyDescriptor(B,Q):J,Z;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")G=Reflect.decorate(A,B,Q,J);else for(var U=A.length-1;U>=0;U--)if(Z=A[U])G=(F<3?Z(G):F>3?Z(B,Q,G):Z(B,Q))||G;return F>3&&G&&Object.defineProperty(B,Q,G),G};var VA=globalThis,DA=VA.ShadowRoot&&(VA.ShadyCSS===void 0||VA.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_A=Symbol(),cA=new WeakMap;class wA{constructor(A,B,Q){if(this._$cssResult$=!0,Q!==_A)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=A,this._strings=B}get styleSheet(){let A=this._styleSheet,B=this._strings;if(DA&&A===void 0){let Q=B!==void 0&&B.length===1;if(Q)A=cA.get(B);if(A===void 0){if((this._styleSheet=A=new CSSStyleSheet).replaceSync(this.cssText),Q)cA.set(B,A)}}return A}toString(){return this.cssText}}var E4=(A)=>{if(A._$cssResult$===!0)return A.cssText;else if(typeof A==="number")return A;else throw new Error(`Value passed to 'css' function must be a 'css' function result: ${A}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},T4=(A)=>new wA(typeof A==="string"?A:String(A),void 0,_A),X=(A,...B)=>{let Q=A.length===1?A[0]:B.reduce((J,F,G)=>J+E4(F)+A[G+1],A[0]);return new wA(Q,A,_A)},sA=(A,B)=>{if(DA)A.adoptedStyleSheets=B.map((Q)=>Q instanceof CSSStyleSheet?Q:Q.styleSheet);else for(let Q of B){let J=document.createElement("style"),F=VA.litNonce;if(F!==void 0)J.setAttribute("nonce",F);J.textContent=Q.cssText,A.appendChild(J)}},k4=(A)=>{let B="";for(let Q of A.cssRules)B+=Q.cssText;return T4(B)},XA=DA?(A)=>A:(A)=>A instanceof CSSStyleSheet?k4(A):A;var{is:R4,defineProperty:j4,getOwnPropertyDescriptor:oA,getOwnPropertyNames:L4,getOwnPropertySymbols:C4,getPrototypeOf:iA}=Object,P4=!1,E=globalThis;if(P4)E.customElements??=customElements;var k=!0,z,rA=E.trustedTypes,z4=rA?rA.emptyScript:"",aA=k?E.reactiveElementPolyfillSupportDevMode:E.reactiveElementPolyfillSupport;if(k)E.litIssuedWarnings??=new Set,z=(A,B)=>{if(B+=` See https://lit.dev/msg/${A} for more information.`,!E.litIssuedWarnings.has(B)&&!E.litIssuedWarnings.has(A))console.warn(B),E.litIssuedWarnings.add(B)},queueMicrotask(()=>{if(z("dev-mode","Lit is in dev mode. Not recommended for production!"),E.ShadyDOM?.inUse&&aA===void 0)z("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});var f4=k?(A)=>{if(!E.emitLitDebugLogEvents)return;E.dispatchEvent(new CustomEvent("lit-debug",{detail:A}))}:void 0,c=(A,B)=>A,a={toAttribute(A,B){switch(B){case Boolean:A=A?z4:null;break;case Object:case Array:A=A==null?A:JSON.stringify(A);break}return A},fromAttribute(A,B){let Q=A;switch(B){case Boolean:Q=A!==null;break;case Number:Q=A===null?null:Number(A);break;case Object:case Array:try{Q=JSON.parse(A)}catch(J){Q=null}break}return Q}},HA=(A,B)=>!R4(A,B),nA={attribute:!0,type:String,converter:a,reflect:!1,useDefault:!1,hasChanged:HA};Symbol.metadata??=Symbol("metadata");E.litPropertyMetadata??=new WeakMap;class R extends HTMLElement{static addInitializer(A){this.__prepare(),(this._initializers??=[]).push(A)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(A,B=nA){if(B.state)B.attribute=!1;if(this.__prepare(),this.prototype.hasOwnProperty(A))B=Object.create(B),B.wrapped=!0;if(this.elementProperties.set(A,B),!B.noAccessor){let Q=k?Symbol.for(`${String(A)} (@property() cache)`):Symbol(),J=this.getPropertyDescriptor(A,Q,B);if(J!==void 0)j4(this.prototype,A,J)}}static getPropertyDescriptor(A,B,Q){let{get:J,set:F}=oA(this.prototype,A)??{get(){return this[B]},set(G){this[B]=G}};if(k&&J==null){if("value"in(oA(this.prototype,A)??{}))throw new Error(`Field ${JSON.stringify(String(A))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);z("reactive-property-without-getter",`Field ${JSON.stringify(String(A))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:J,set(G){let Z=J?.call(this);F?.call(this,G),this.requestUpdate(A,Z,Q)},configurable:!0,enumerable:!0}}static getPropertyOptions(A){return this.elementProperties.get(A)??nA}static __prepare(){if(this.hasOwnProperty(c("elementProperties",this)))return;let A=iA(this);if(A.finalize(),A._initializers!==void 0)this._initializers=[...A._initializers];this.elementProperties=new Map(A.elementProperties)}static finalize(){if(this.hasOwnProperty(c("finalized",this)))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(c("properties",this))){let B=this.properties,Q=[...L4(B),...C4(B)];for(let J of Q)this.createProperty(J,B[J])}let A=this[Symbol.metadata];if(A!==null){let B=litPropertyMetadata.get(A);if(B!==void 0)for(let[Q,J]of B)this.elementProperties.set(Q,J)}this.__attributeToPropertyMap=new Map;for(let[B,Q]of this.elementProperties){let J=this.__attributeNameForProperty(B,Q);if(J!==void 0)this.__attributeToPropertyMap.set(J,B)}if(this.elementStyles=this.finalizeStyles(this.styles),k){if(this.hasOwnProperty("createProperty"))z("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");if(this.hasOwnProperty("getPropertyDescriptor"))z("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}}static finalizeStyles(A){let B=[];if(Array.isArray(A)){let Q=new Set(A.flat(1/0).reverse());for(let J of Q)B.unshift(XA(J))}else if(A!==void 0)B.push(XA(A));return B}static __attributeNameForProperty(A,B){let Q=B.attribute;return Q===!1?void 0:typeof Q==="string"?Q:typeof A==="string"?A.toLowerCase():void 0}constructor(){super();this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise((A)=>this.enableUpdating=A),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach((A)=>A(this))}addController(A){if((this.__controllers??=new Set).add(A),this.renderRoot!==void 0&&this.isConnected)A.hostConnected?.()}removeController(A){this.__controllers?.delete(A)}__saveInstanceProperties(){let A=new Map,B=this.constructor.elementProperties;for(let Q of B.keys())if(this.hasOwnProperty(Q))A.set(Q,this[Q]),delete this[Q];if(A.size>0)this.__instanceProperties=A}createRenderRoot(){let A=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return sA(A,this.constructor.elementStyles),A}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach((A)=>A.hostConnected?.())}enableUpdating(A){}disconnectedCallback(){this.__controllers?.forEach((A)=>A.hostDisconnected?.())}attributeChangedCallback(A,B,Q){this._$attributeToProperty(A,Q)}__propertyToAttribute(A,B){let J=this.constructor.elementProperties.get(A),F=this.constructor.__attributeNameForProperty(A,J);if(F!==void 0&&J.reflect===!0){let Z=(J.converter?.toAttribute!==void 0?J.converter:a).toAttribute(B,J.type);if(k&&this.constructor.enabledWarnings.includes("migration")&&Z===void 0)z("undefined-attribute-value",`The attribute value for the ${A} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);if(this.__reflectingProperty=A,Z==null)this.removeAttribute(F);else this.setAttribute(F,Z);this.__reflectingProperty=null}}_$attributeToProperty(A,B){let Q=this.constructor,J=Q.__attributeToPropertyMap.get(A);if(J!==void 0&&this.__reflectingProperty!==J){let F=Q.getPropertyOptions(J),G=typeof F.converter==="function"?{fromAttribute:F.converter}:F.converter?.fromAttribute!==void 0?F.converter:a;this.__reflectingProperty=J,this[J]=G.fromAttribute(B,F.type)??this.__defaultValues?.get(J)??null,this.__reflectingProperty=null}}requestUpdate(A,B,Q){if(A!==void 0){if(k&&A instanceof Event)z("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");let J=this.constructor,F=this[A];if(Q??=J.getPropertyOptions(A),(Q.hasChanged??HA)(F,B)||Q.useDefault&&Q.reflect&&F===this.__defaultValues?.get(A)&&!this.hasAttribute(J.__attributeNameForProperty(A,Q)))this._$changeProperty(A,B,Q);else return}if(this.isUpdatePending===!1)this.__updatePromise=this.__enqueueUpdate()}_$changeProperty(A,B,{useDefault:Q,reflect:J,wrapped:F},G){if(Q&&!(this.__defaultValues??=new Map).has(A)){if(this.__defaultValues.set(A,G??B??this[A]),F!==!0||G!==void 0)return}if(!this._$changedProperties.has(A)){if(!this.hasUpdated&&!Q)B=void 0;this._$changedProperties.set(A,B)}if(J===!0&&this.__reflectingProperty!==A)(this.__reflectingProperties??=new Set).add(A)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(B){Promise.reject(B)}let A=this.scheduleUpdate();if(A!=null)await A;return!this.isUpdatePending}scheduleUpdate(){let A=this.performUpdate();if(k&&this.constructor.enabledWarnings.includes("async-perform-update")&&typeof A?.then==="function")z("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);return A}performUpdate(){if(!this.isUpdatePending)return;if(f4?.({kind:"update"}),!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),k){let F=[...this.constructor.elementProperties.keys()].filter((G)=>this.hasOwnProperty(G)&&(G in iA(this)));if(F.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${F.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(let[J,F]of this.__instanceProperties)this[J]=F;this.__instanceProperties=void 0}let Q=this.constructor.elementProperties;if(Q.size>0)for(let[J,F]of Q){let{wrapped:G}=F,Z=this[J];if(G===!0&&!this._$changedProperties.has(J)&&Z!==void 0)this._$changeProperty(J,void 0,F,Z)}}let A=!1,B=this._$changedProperties;try{if(A=this.shouldUpdate(B),A)this.willUpdate(B),this.__controllers?.forEach((Q)=>Q.hostUpdate?.()),this.update(B);else this.__markUpdated()}catch(Q){throw A=!1,this.__markUpdated(),Q}if(A)this._$didUpdate(B)}willUpdate(A){}_$didUpdate(A){if(this.__controllers?.forEach((B)=>B.hostUpdated?.()),!this.hasUpdated)this.hasUpdated=!0,this.firstUpdated(A);if(this.updated(A),k&&this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update"))z("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(A){return!0}update(A){this.__reflectingProperties&&=this.__reflectingProperties.forEach((B)=>this.__propertyToAttribute(B,this[B])),this.__markUpdated()}updated(A){}firstUpdated(A){}}R.elementStyles=[];R.shadowRootOptions={mode:"open"};R[c("elementProperties",R)]=new Map;R[c("finalized",R)]=new Map;aA?.({ReactiveElement:R});if(k){R.enabledWarnings=["change-in-update","async-perform-update"];let A=function(B){if(!B.hasOwnProperty(c("enabledWarnings",B)))B.enabledWarnings=B.enabledWarnings.slice()};R.enableWarning=function(B){if(A(this),!this.enabledWarnings.includes(B))this.enabledWarnings.push(B)},R.disableWarning=function(B){A(this);let Q=this.enabledWarnings.indexOf(B);if(Q>=0)this.enabledWarnings.splice(Q,1)}}(E.reactiveElementVersions??=[]).push("2.1.0");if(k&&E.reactiveElementVersions.length>1)queueMicrotask(()=>{z("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var j=globalThis,N=(A)=>{if(!j.emitLitDebugLogEvents)return;j.dispatchEvent(new CustomEvent("lit-debug",{detail:A}))},b4=0,AA;j.litIssuedWarnings??=new Set,AA=(A,B)=>{if(B+=A?` See https://lit.dev/msg/${A} for more information.`:"",!j.litIssuedWarnings.has(B)&&!j.litIssuedWarnings.has(A))console.warn(B),j.litIssuedWarnings.add(B)},queueMicrotask(()=>{AA("dev-mode","Lit is in dev mode. Not recommended for production!")});var f=j.ShadyDOM?.inUse&&j.ShadyDOM?.noPatch===!0?j.ShadyDOM.wrap:(A)=>A,MA=j.trustedTypes,tA=MA?MA.createPolicy("lit-html",{createHTML:(A)=>A}):void 0,S4=(A)=>A,KA=(A,B,Q)=>S4,h4=(A)=>{if(d!==KA)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");d=A},y4=()=>{d=KA},jA=(A,B,Q)=>{return d(A,B,Q)},G4="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,Z4="?"+h,v4=`<${Z4}>`,x=document,BA=()=>x.createComment(""),QA=(A)=>A===null||typeof A!="object"&&typeof A!="function",LA=Array.isArray,m4=(A)=>LA(A)||typeof A?.[Symbol.iterator]==="function",EA=`[ 	
\f\r]`,u4=`[^ 	
\f\r"'\`<>=]`,x4=`[^\\s"'>=/]`,t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,eA=1,TA=2,g4=3,A4=/-->/g,B4=/>/g,v=new RegExp(`>|${EA}(?:(${x4}+)(${EA}*=${EA}*(?:${u4}|("|')|))|$)`,"g"),d4=0,Q4=1,p4=2,J4=3,kA=/'/g,RA=/"/g,U4=/^(?:script|style|textarea|title)$/i,l4=1,NA=2,qA=3,CA=1,IA=2,c4=3,s4=4,o4=5,PA=6,i4=7,zA=(A)=>(B,...Q)=>{if(B.some((J)=>J===void 0))console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`);if(Q.some((J)=>J?._$litStatic$))AA("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);return{["_$litType$"]:A,strings:B,values:Q}},D=zA(l4),HB=zA(NA),MB=zA(qA),g=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),F4=new WeakMap,u=x.createTreeWalker(x,129),d=KA;function W4(A,B){if(!LA(A)||!A.hasOwnProperty("raw")){let Q="invalid template strings array";throw Q=`
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
`),new Error(Q)}return tA!==void 0?tA.createHTML(B):B}var r4=(A,B)=>{let Q=A.length-1,J=[],F=B===NA?"<svg>":B===qA?"<math>":"",G,Z=t;for(let W=0;W<Q;W++){let V=A[W],M=-1,I,C=0,_;while(C<V.length){if(Z.lastIndex=C,_=Z.exec(V),_===null)break;if(C=Z.lastIndex,Z===t){if(_[eA]==="!--")Z=A4;else if(_[eA]!==void 0)Z=B4;else if(_[TA]!==void 0){if(U4.test(_[TA]))G=new RegExp(`</${_[TA]}`,"g");Z=v}else if(_[g4]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else if(Z===v)if(_[d4]===">")Z=G??t,M=-1;else if(_[Q4]===void 0)M=-2;else M=Z.lastIndex-_[p4].length,I=_[Q4],Z=_[J4]===void 0?v:_[J4]==='"'?RA:kA;else if(Z===RA||Z===kA)Z=v;else if(Z===A4||Z===B4)Z=t;else Z=v,G=void 0}console.assert(M===-1||Z===v||Z===kA||Z===RA,"unexpected parse state B");let S=Z===v&&A[W+1].startsWith("/>")?" ":"";F+=Z===t?V+v4:M>=0?(J.push(I),V.slice(0,M)+G4+V.slice(M))+h+S:V+h+(M===-2?W:S)}let U=F+(A[Q]||"<?>")+(B===NA?"</svg>":B===qA?"</math>":"");return[W4(A,U),J]};class JA{constructor({strings:A,["_$litType$"]:B},Q){this.parts=[];let J,F=0,G=0,Z=A.length-1,U=this.parts,[W,V]=r4(A,B);if(this.el=JA.createElement(W,Q),u.currentNode=this.el.content,B===NA||B===qA){let M=this.el.content.firstChild;M.replaceWith(...M.childNodes)}while((J=u.nextNode())!==null&&U.length<Z){if(J.nodeType===1){{let M=J.localName;if(/^(?:textarea|template)$/i.test(M)&&J.innerHTML.includes(h)){let I=`Expressions are not supported inside \`${M}\` elements. See https://lit.dev/msg/expression-in-${M} for more information.`;if(M==="template")throw new Error(I);else AA("",I)}}if(J.hasAttributes()){for(let M of J.getAttributeNames())if(M.endsWith(G4)){let I=V[G++],_=J.getAttribute(M).split(h),S=/([.?@])?(.*)/.exec(I);U.push({type:CA,index:F,name:S[2],strings:_,ctor:S[1]==="."?V4:S[1]==="?"?H4:S[1]==="@"?M4:GA}),J.removeAttribute(M)}else if(M.startsWith(h))U.push({type:PA,index:F}),J.removeAttribute(M)}if(U4.test(J.tagName)){let M=J.textContent.split(h),I=M.length-1;if(I>0){J.textContent=MA?MA.emptyScript:"";for(let C=0;C<I;C++)J.append(M[C],BA()),u.nextNode(),U.push({type:IA,index:++F});J.append(M[I],BA())}}}else if(J.nodeType===8)if(J.data===Z4)U.push({type:IA,index:F});else{let I=-1;while((I=J.data.indexOf(h,I+1))!==-1)U.push({type:i4,index:F}),I+=h.length-1}F++}if(V.length!==G)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+A.join("${...}")+"`");N&&N({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:A})}static createElement(A,B){let Q=x.createElement("template");return Q.innerHTML=A,Q}}function s(A,B,Q=A,J){if(B===g)return B;let F=J!==void 0?Q.__directives?.[J]:Q.__directive,G=QA(B)?void 0:B._$litDirective$;if(F?.constructor!==G){if(F?._$notifyDirectiveConnectionChanged?.(!1),G===void 0)F=void 0;else F=new G(A),F._$initialize(A,Q,J);if(J!==void 0)(Q.__directives??=[])[J]=F;else Q.__directive=F}if(F!==void 0)B=s(A,F._$resolve(A,B.values),F,J);return B}class $4{constructor(A,B){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=A,this._$parent=B}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(A){let{el:{content:B},parts:Q}=this._$template,J=(A?.creationScope??x).importNode(B,!0);u.currentNode=J;let F=u.nextNode(),G=0,Z=0,U=Q[0];while(U!==void 0){if(G===U.index){let W;if(U.type===IA)W=new FA(F,F.nextSibling,this,A);else if(U.type===CA)W=new U.ctor(F,U.name,U.strings,this,A);else if(U.type===PA)W=new N4(F,this,A);this._$parts.push(W),U=Q[++Z]}if(G!==U?.index)F=u.nextNode(),G++}return u.currentNode=x,J}_update(A){let B=0;for(let Q of this._$parts){if(Q!==void 0)if(N&&N({kind:"set part",part:Q,value:A[B],valueIndex:B,values:A,templateInstance:this}),Q.strings!==void 0)Q._$setValue(A,Q,B),B+=Q.strings.length-2;else Q._$setValue(A[B]);B++}}}class FA{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(A,B,Q,J){this.type=IA,this._$committedValue=O,this._$disconnectableChildren=void 0,this._$startNode=A,this._$endNode=B,this._$parent=Q,this.options=J,this.__isConnected=J?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let A=f(this._$startNode).parentNode,B=this._$parent;if(B!==void 0&&A?.nodeType===11)A=B.parentNode;return A}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(A,B=this){if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(A=s(this,A,B),QA(A)){if(A===O||A==null||A===""){if(this._$committedValue!==O)N&&N({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear();this._$committedValue=O}else if(A!==this._$committedValue&&A!==g)this._commitText(A)}else if(A._$litType$!==void 0)this._commitTemplateResult(A);else if(A.nodeType!==void 0){if(this.options?.host===A){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",A,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(A)}else if(m4(A))this._commitIterable(A);else this._commitText(A)}_insert(A){return f(f(this._$startNode).parentNode).insertBefore(A,this._$endNode)}_commitNode(A){if(this._$committedValue!==A){if(this._$clear(),d!==KA){let B=this._$startNode.parentNode?.nodeName;if(B==="STYLE"||B==="SCRIPT"){let Q="Forbidden";if(B==="STYLE")Q="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.";else Q="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.";throw new Error(Q)}}N&&N({kind:"commit node",start:this._$startNode,parent:this._$parent,value:A,options:this.options}),this._$committedValue=this._insert(A)}}_commitText(A){if(this._$committedValue!==O&&QA(this._$committedValue)){let B=f(this._$startNode).nextSibling;if(this._textSanitizer===void 0)this._textSanitizer=jA(B,"data","property");A=this._textSanitizer(A),N&&N({kind:"commit text",node:B,value:A,options:this.options}),B.data=A}else{let B=x.createTextNode("");if(this._commitNode(B),this._textSanitizer===void 0)this._textSanitizer=jA(B,"data","property");A=this._textSanitizer(A),N&&N({kind:"commit text",node:B,value:A,options:this.options}),B.data=A}this._$committedValue=A}_commitTemplateResult(A){let{values:B,["_$litType$"]:Q}=A,J=typeof Q==="number"?this._$getTemplate(A):(Q.el===void 0&&(Q.el=JA.createElement(W4(Q.h,Q.h[0]),this.options)),Q);if(this._$committedValue?._$template===J)N&&N({kind:"template updating",template:J,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:B}),this._$committedValue._update(B);else{let F=new $4(J,this),G=F._clone(this.options);N&&N({kind:"template instantiated",template:J,instance:F,parts:F._$parts,options:this.options,fragment:G,values:B}),F._update(B),N&&N({kind:"template instantiated and updated",template:J,instance:F,parts:F._$parts,options:this.options,fragment:G,values:B}),this._commitNode(G),this._$committedValue=F}}_$getTemplate(A){let B=F4.get(A.strings);if(B===void 0)F4.set(A.strings,B=new JA(A));return B}_commitIterable(A){if(!LA(this._$committedValue))this._$committedValue=[],this._$clear();let B=this._$committedValue,Q=0,J;for(let F of A){if(Q===B.length)B.push(J=new FA(this._insert(BA()),this._insert(BA()),this,this.options));else J=B[Q];J._$setValue(F),Q++}if(Q<B.length)this._$clear(J&&f(J._$endNode).nextSibling,Q),B.length=Q}_$clear(A=f(this._$startNode).nextSibling,B){this._$notifyConnectionChanged?.(!1,!0,B);while(A&&A!==this._$endNode){let Q=f(A).nextSibling;f(A).remove(),A=Q}}setConnected(A){if(this._$parent===void 0)this.__isConnected=A,this._$notifyConnectionChanged?.(A);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class GA{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(A,B,Q,J,F){if(this.type=CA,this._$committedValue=O,this._$disconnectableChildren=void 0,this.element=A,this.name=B,this._$parent=J,this.options=F,Q.length>2||Q[0]!==""||Q[1]!=="")this._$committedValue=new Array(Q.length-1).fill(new String),this.strings=Q;else this._$committedValue=O;this._sanitizer=void 0}_$setValue(A,B=this,Q,J){let F=this.strings,G=!1;if(F===void 0){if(A=s(this,A,B,0),G=!QA(A)||A!==this._$committedValue&&A!==g,G)this._$committedValue=A}else{let Z=A;A=F[0];let U,W;for(U=0;U<F.length-1;U++){if(W=s(this,Z[Q+U],B,U),W===g)W=this._$committedValue[U];if(G||=!QA(W)||W!==this._$committedValue[U],W===O)A=O;else if(A!==O)A+=(W??"")+F[U+1];this._$committedValue[U]=W}}if(G&&!J)this._commitValue(A)}_commitValue(A){if(A===O)f(this.element).removeAttribute(this.name);else{if(this._sanitizer===void 0)this._sanitizer=d(this.element,this.name,"attribute");A=this._sanitizer(A??""),N&&N({kind:"commit attribute",element:this.element,name:this.name,value:A,options:this.options}),f(this.element).setAttribute(this.name,A??"")}}}class V4 extends GA{constructor(){super(...arguments);this.type=c4}_commitValue(A){if(this._sanitizer===void 0)this._sanitizer=d(this.element,this.name,"property");A=this._sanitizer(A),N&&N({kind:"commit property",element:this.element,name:this.name,value:A,options:this.options}),this.element[this.name]=A===O?void 0:A}}class H4 extends GA{constructor(){super(...arguments);this.type=s4}_commitValue(A){N&&N({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(A&&A!==O),options:this.options}),f(this.element).toggleAttribute(this.name,!!A&&A!==O)}}class M4 extends GA{constructor(A,B,Q,J,F){super(A,B,Q,J,F);if(this.type=o4,this.strings!==void 0)throw new Error(`A \`<${A.localName}>\` has a \`@${B}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(A,B=this){if(A=s(this,A,B,0)??O,A===g)return;let Q=this._$committedValue,J=A===O&&Q!==O||A.capture!==Q.capture||A.once!==Q.once||A.passive!==Q.passive,F=A!==O&&(Q===O||J);if(N&&N({kind:"commit event listener",element:this.element,name:this.name,value:A,options:this.options,removeListener:J,addListener:F,oldListener:Q}),J)this.element.removeEventListener(this.name,this,Q);if(F)this.element.addEventListener(this.name,this,A);this._$committedValue=A}handleEvent(A){if(typeof this._$committedValue==="function")this._$committedValue.call(this.options?.host??this.element,A);else this._$committedValue.handleEvent(A)}}class N4{constructor(A,B,Q){this.element=A,this.type=PA,this._$disconnectableChildren=void 0,this._$parent=B,this.options=Q}get _$isConnected(){return this._$parent._$isConnected}_$setValue(A){N&&N({kind:"commit to element binding",element:this.element,value:A,options:this.options}),s(this,A)}}var n4=j.litHtmlPolyfillSupportDevMode;n4?.(JA,FA);(j.litHtmlVersions??=[]).push("3.3.0");if(j.litHtmlVersions.length>1)queueMicrotask(()=>{AA("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var e=(A,B,Q)=>{if(B==null)throw new TypeError(`The container to render into may not be ${B}`);let J=b4++,F=Q?.renderBefore??B,G=F._$litPart$;if(N&&N({kind:"begin render",id:J,value:A,container:B,options:Q,part:G}),G===void 0){let Z=Q?.renderBefore??null;F._$litPart$=G=new FA(B.insertBefore(BA(),Z),Z,void 0,Q??{})}return G._$setValue(A),N&&N({kind:"end render",id:J,value:A,container:B,options:Q,part:G}),G};e.setSanitizer=h4,e.createSanitizer=jA,e._testOnlyClearSanitizerFactoryDoNotCallOrElse=y4;var a4=(A,B)=>A,fA=!0,y=globalThis,q4;if(fA)y.litIssuedWarnings??=new Set,q4=(A,B)=>{if(B+=` See https://lit.dev/msg/${A} for more information.`,!y.litIssuedWarnings.has(B)&&!y.litIssuedWarnings.has(A))console.warn(B),y.litIssuedWarnings.add(B)};class Y extends R{constructor(){super(...arguments);this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){let A=super.createRenderRoot();return this.renderOptions.renderBefore??=A.firstChild,A}update(A){let B=this.render();if(!this.hasUpdated)this.renderOptions.isConnected=this.isConnected;super.update(A),this.__childPart=e(B,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return g}}Y._$litElement$=!0;Y[a4("finalized",Y)]=!0;y.litElementHydrateSupport?.({LitElement:Y});var t4=fA?y.litElementPolyfillSupportDevMode:y.litElementPolyfillSupport;t4?.({LitElement:Y});(y.litElementVersions??=[]).push("4.2.0");if(fA&&y.litElementVersions.length>1)queueMicrotask(()=>{q4("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var T=(A)=>(B,Q)=>{if(Q!==void 0)Q.addInitializer(()=>{customElements.define(A,B)});else customElements.define(A,B)};var I4=!0,K4;if(I4)globalThis.litIssuedWarnings??=new Set,K4=(A,B)=>{if(B+=` See https://lit.dev/msg/${A} for more information.`,!globalThis.litIssuedWarnings.has(B)&&!globalThis.litIssuedWarnings.has(A))console.warn(B),globalThis.litIssuedWarnings.add(B)};var e4=(A,B,Q)=>{let J=B.hasOwnProperty(Q);return B.constructor.createProperty(Q,A),J?Object.getOwnPropertyDescriptor(B,Q):void 0},AB={attribute:!0,type:String,converter:a,reflect:!1,hasChanged:HA},BB=(A=AB,B,Q)=>{let{kind:J,metadata:F}=Q;if(I4&&F==null)K4("missing-class-metadata",`The class ${B} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let G=globalThis.litPropertyMetadata.get(F);if(G===void 0)globalThis.litPropertyMetadata.set(F,G=new Map);if(J==="setter")A=Object.create(A),A.wrapped=!0;if(G.set(Q.name,A),J==="accessor"){let{name:Z}=Q;return{set(U){let W=B.get.call(this);B.set.call(this,U),this.requestUpdate(Z,W,A)},init(U){if(U!==void 0)this._$changeProperty(Z,void 0,A,U);return U}}}else if(J==="setter"){let{name:Z}=Q;return function(U){let W=this[Z];B.call(this,U),this.requestUpdate(Z,W,A)}}throw new Error(`Unsupported decorator location: ${J}`)};function o(A){return(B,Q)=>{return typeof Q==="object"?BB(A,B,Q):e4(A,B,Q)}}function P(A){return o({...A,state:!0,attribute:!1})}var p=(A,B,Q)=>{if(Q.configurable=!0,Q.enumerable=!0,Reflect.decorate&&typeof B!=="object")Object.defineProperty(A,B,Q);return Q};var bA=!0,Y4;if(bA)globalThis.litIssuedWarnings??=new Set,Y4=(A,B)=>{if(B+=A?` See https://lit.dev/msg/${A} for more information.`:"",!globalThis.litIssuedWarnings.has(B)&&!globalThis.litIssuedWarnings.has(A))console.warn(B),globalThis.litIssuedWarnings.add(B)};function SA(A,B){return(Q,J,F)=>{let G=(Z)=>{let U=Z.renderRoot?.querySelector(A)??null;if(bA&&U===null&&B&&!Z.hasUpdated){let W=typeof J==="object"?J.name:J;Y4("",`@query'd field ${JSON.stringify(String(W))} with the 'cache' flag set for selector '${A}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`)}return U};if(B){let{get:Z,set:U}=typeof J==="object"?Q:F??(()=>{let W=bA?Symbol(`${String(J)} (@query() cache)`):Symbol();return{get(){return this[W]},set(V){this[W]=V}}})();return p(Q,J,{get(){let W=Z.call(this);if(W===void 0){if(W=G(this),W!==null||this.hasUpdated)U.call(this,W)}return W}})}else return p(Q,J,{get(){return G(this)}})}}var i=new Map;document.addEventListener("theme-change",()=>{i.clear()});var L={get:(A)=>{let B=A.startsWith("--")?A:`--${A}`;if(i.has(B))return i.get(B);let Q=getComputedStyle(document.documentElement).getPropertyValue(B).trim();return i.set(B,Q),Q},set:(A,B)=>{let Q=A.startsWith("--")?A:`--${A}`;document.documentElement.style.setProperty(Q,B),i.set(Q,B)},clearCache:()=>{i.clear()},hexToRgb:(A)=>{if(A=A.replace(/^#/,""),A.length===3)A=A.split("").map((Q)=>Q+Q).join("");let B=parseInt(A,16);return{r:B>>16&255,g:B>>8&255,b:B&255}},lightenColor:(A,B)=>{let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.min(Math.floor(J*(1+B/100)),255),U=Math.min(Math.floor(F*(1+B/100)),255),W=Math.min(Math.floor(G*(1+B/100)),255);return`rgb(${Z}, ${U}, ${W})`},darkenColor:(A,B)=>{let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.max(Math.floor(J*(1-B/100)),0),U=Math.max(Math.floor(F*(1-B/100)),0),W=Math.max(Math.floor(G*(1-B/100)),0);return`rgb(${Z}, ${U}, ${W})`},isLightColor:(A)=>{let B=A.replace("#",""),Q=parseInt(B.substr(0,2),16),J=parseInt(B.substr(2,2),16),F=parseInt(B.substr(4,2),16);return(Q*299+J*587+F*114)/1000>125}};document.addEventListener("theme-changed",(A)=>{let B=A.detail;L.clearCache(),document.dispatchEvent(new CustomEvent("on-theme-change",{bubbles:!0,composed:!0}))});var $={gridSize:10,cellSize:40,get colors(){return[L.get("color-teal"),L.get("color-light-brown")]},get highlightColor(){return L.get("highlight-color")},get invalidColor(){return L.get("invalid-color")},pieceAreaHeight:150,pieceSize:80,pieceMargin:20,maxAvailablePieces:3,gameOverButton:{width:200,height:60,get color(){return L.get("button-background")},get hoverColor(){return L.get("button-hover")},get textColor(){return L.get("button-text")},font:"20px Arial",text:"Play Again"},get backgroundColor(){return L.get("background-color")},get gridLineColor(){return L.get("grid-line-color")},get textColor(){return L.get("text-color")},get borderColor(){return L.get("border-color")}};var O4={sprites:[{name:"bar_horizontal",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3YoQ3DQBBE0Svrijg+6LgbGHwuYSVLbiHADbg8g9BAK7l1vvTJwicN2rK9ztSVhwDkSFdtvbYOwAB8K2Dsx+TpLwD69Tz0KQAGYAA7AAEQAAEIAAEgABiAATQAAiAAJ4DIBBjfevsIQMzWABAAAsABwAAMwAAEQAAqgAAQADoAAzCADYAA6F7AzOnhAOWpAogpAIvXxev7yFjJDrgAbSSXU+MNzG4AAAAASUVORK5CYII=",width:64,height:64},{name:"bar_vertical",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtUlEQVR4nO3SIQ4CMRBG4T1KzzCnWYXpIWoIqhdYQ/Ifo4JkFL62ktMgsCSYkrbwkmfGTOZLZnvccruf120bfkHrAnDZcqUYUgwABEBdAbXEyfO/APjo9/B3ARAAASgAHIAvBKjf3JYAGAADEAAIgAA0AA7AARgAA2AABEAABKACcAAOwAAYAAMgAAWAhgL6VgEYAAMQAQiAAOgTYOb8xwG+TgmATQE48n7k/TWs2Ha9nJYGPAE8JNqZF2N1EgAAAABJRU5ErkJggg==",width:64,height:64},{name:"square",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO3VsQnDMBRFUQ2kGVS91ju8Ady4MH8DZwV5g4zpIm2KQKJEUi7c5jeCAw+Uzvtt6NIkAIeGqyy5LBlAAIiPAo66dZ7/AuBfz8PPAhAAAkAFYAAG4DcBX/hlDUCvP9RiHgYgAAIgAAEgAAQAAzAAAxAAARCAABAAKgADMAAD2BplAGoxj0YzKwAEQAAygAAQAM75AEfHeXKAx6kAUBeAdfe6+3GMWBodcAHNrhouLPIaHAAAAABJRU5ErkJggg==",width:64,height:64},{name:"l_shape",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq0lEQVR4nO3ZoRHEIBCFYTqijfXpIB6HiltLE9inrgM0bUWcPckEyP0zv1n5zTy3oX/K1oWXAOS2XemI6YgAHIAPBbSaF09/AdDseehXAByAA6gABEDrANqz2gbAABiADMABOAAHIAACkAAYAAMQAVQADqADEAABMAAGwOYAhn/vBCA/tgrNnRAAAxABOAAH0AEIgMYCVk4vB2ifEgBbAlCus1zn99ixsDvgBuQf386hUTvvAAAAAElFTkSuQmCC",width:64,height:64},{name:"t_shape",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAArElEQVR4nO3Yuw3DMAxFUY3kPd4Err1DOi9AeAP1ggfwYK9w+hRp0zkfUbnAbVgekIAAlfuxpa4MAnAoXXWe6jwBCADxVsDZbp3nvwD41+fhVwEIAAGgATAAA/BFwBdeWQPQJ5beywkZgAEYgAAIABswAAMoAARAAA4AASAAGIABGIAACIAAtNG/1w3AAAxAAASADbhbwNlxHhzgPFUA6gKwr8u+Ls8hYyU74AHWib5t2RtEWQAAAABJRU5ErkJggg==",width:64,height:64},{name:"z_shape",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA2ElEQVR4nO3YMQrCQBSE4bRp3l1yiwiTA9gabOIBtskBjHiMOcX28VyitoKNMrtxYCBs93+wsJDmNl/W03U91rqm6vr1AXh+GKhuU9tNbWdAGBBfBeQ+FT7+BYDq68F3MyAMCAN6A2gASwDkX75QNCBp7wYNSKWl0wBo02kAtOk0ANp0GgBtOg2ANp0GQJtOA6BNpwHQptMAaNNpALTpNADadBoAbToNwNZ+7ubaAVQsGwADYEAyIAwIA+IToORx4wDWs8kAFAFYhvG8G1+HGtcs+8MyVAy4AzL4VTjdSF8RAAAAAElFTkSuQmCC",width:64,height:64},{name:"single",base64:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAACoElEQVR4nO3XyW7iQBAA0Pwin5JDpJwacEggBDAxGRZj/8FIxuC2u9tLL94uOcwnjYyVyRwmSpzgYJiW6oJkkF9TVV118fP510nHxZkAgAVPLlqXV63LKwmwJMA6KMAUecMD/BcAcOz0AP8KCbAkwJIAIQFAAoAEAAmAEgAlANYFaG/c3g4NoD9C4RhFIxTeu/7tDnc2btMB7Y3bd8iU0AWN1zwzRFb+msGzJU00n927/lcYZq0AxfYmOFrSxBS5ztMfoXj0mUrolNBZwBc0MUSms3RKWG+HGgdQbG9KmMGzNc80nw2gr9he++WwO0VS4REK51FsinwW8NsdbhCgs3FVQg2RrVg6QmHX9t568tbBs4AbIpsFXNmipgCGbqCzVOfpgxf+OfW34maLSsMER+0mABTbewqFKfIpoR8s0DuHLGmyoEnVRKoFMID+mqdLmtw5H32btgVVHBkiG6Pw+IAJjkyRaz6r1B/7DtFZOgt4pW8dHtDZuFrATZFXPUtl682jeBHFlUr58IDuvgAMkQ29oBKgY7tPoVjSpNKdUAfAPW1AZ+NqPvt0Cs2PnkJfLGLt6EVctlGdVW6jk30bHTWhjXZtb7ZvRJUvsijuNeEiAxa8d/0VS3VWZZTglW8xUOswN8HRmmcrlrwzzO2wth+ENJ8pbz8GvhlQJpJK6LoYp9PH13H6VdjboXKcLt4+4J9bCcxaF5qu7Y1QuCgXGvay0GCqEqoVC03x6iuWqpjeVB+kwTcAyvZy52AV03kU6yw1RLFVGqL4WxY0nhLWh6S5KyX4i6FsUd8hQzd48MKhFwyg39uid+sbNARQX5gSACUASkAuAZYEWBJgSQCQACABrXMGmA0OcOYAcDrRkgDYCMD1WL0eq+WHU4yLUwf8Bl4TbTpXeygiAAAAAElFTkSuQmCC",width:64,height:64}]};class H{name;color;static spritesLoaded=!1;static sprites={};static spriteImages={};constructor(A,B){this.name=A,this.color=B}static async loadSprites(){if(this.spritesLoaded)return;try{O4.sprites.forEach((B)=>{if(this.sprites[B.name]=B,B.base64){let Q=new Image;Q.src=`data:image/png;base64,${B.base64}`,this.spriteImages[B.name]=Q}}),this.spritesLoaded=!0}catch(A){console.error("Error loading sprites:",A)}}getSpriteName(){switch(this.getPrimaryShapeType()){case"BarHorizontal":return"bar_horizontal";case"BarVertical":return"bar_vertical";case"Square":return"square";case"L":return"l_shape";case"T":return"t_shape";case"Z":return"z_shape";case"Single":return"single";default:return"square"}}async drawSymbolOnBlock(A,B,Q,J){await H.loadSprites();let F=this.getSpriteName(),G=H.spriteImages[F];if(G&&G.complete){A.drawImage(G,B,Q,J,J);return}this.drawFallbackSymbol(A,B,Q,J)}drawFallbackSymbol(A,B,Q,J){let F=J*0.1,G=J*0.33,Z=J-G*2,W=this.isLightColor(this.color)?this.darkenColor(this.color,30):this.lightenColor(this.color,30);A.strokeStyle=W,A.fillStyle=W,A.lineWidth=1.5,A.strokeRect(B+F,Q+F,J-F*2,J-F*2),this.drawSquareDotsAround(A,B,Q,J,F,W),this.drawCenteredShapeSymbol(A,B,Q,J,G,W)}drawSquareDotsAround(A,B,Q,J,F,G){A.fillStyle=G;let Z=J*0.05,U=J/5,W=F/2;for(let V=0;V<5;V++)A.fillRect(B+F+V*U,Q+F-W,Z,Z);for(let V=0;V<5;V++)A.fillRect(B+F+V*U,Q+J-F-W,Z,Z);for(let V=0;V<5;V++)A.fillRect(B+F-W,Q+F+V*U,Z,Z);for(let V=0;V<5;V++)A.fillRect(B+J-F-W,Q+F+V*U,Z,Z)}drawCenteredShapeSymbol(A,B,Q,J,F,G){let Z=B+F,U=Q+F,W=J-F*2;switch(A.fillStyle=G,A.strokeStyle=G,A.lineWidth=2,this.getPrimaryShapeType()){case"BarHorizontal":A.beginPath(),A.moveTo(Z,U+W/2),A.lineTo(Z+W,U+W/2),A.stroke();break;case"BarVertical":A.beginPath(),A.moveTo(Z+W/2,U),A.lineTo(Z+W/2,U+W),A.stroke();break;case"Square":A.strokeRect(Z,U,W,W);break;case"L":A.beginPath(),A.moveTo(Z+W*0.3,U),A.lineTo(Z+W*0.3,U+W*0.7),A.lineTo(Z+W,U+W*0.7),A.stroke();break;case"T":A.beginPath(),A.moveTo(Z,U+W*0.3),A.lineTo(Z+W,U+W*0.3),A.moveTo(Z+W/2,U+W*0.3),A.lineTo(Z+W/2,U+W),A.stroke();break;case"Z":A.beginPath(),A.moveTo(Z,U+W*0.3),A.lineTo(Z+W,U+W*0.3),A.lineTo(Z,U+W*0.7),A.lineTo(Z+W,U+W*0.7),A.stroke();break;case"Single":A.beginPath(),A.arc(Z+W/2,U+W/2,W/3,0,Math.PI*2),A.fill();break;default:A.beginPath(),A.arc(Z+W/2,U+W/2,W/3,0,Math.PI*2),A.stroke()}}getPrimaryShapeType(){if(this.name.includes("Line")&&!this.name.includes("Vertical")||this.name.includes("Bar")&&!this.name.includes("Vertical"))return"BarHorizontal";if(this.name.includes("Vertical"))return"BarVertical";if(this.name.includes("Square"))return"Square";if(this.name.includes("LShape")||this.name==="SmallL"||this.name.includes("SmallL"))return"L";if(this.name.includes("TShape"))return"T";if(this.name.includes("ZShape"))return"Z";if(this.name==="Single")return"Single";return"Unknown"}lightenColor(A,B){let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.min(Math.floor(J*(1+B/100)),255),U=Math.min(Math.floor(F*(1+B/100)),255),W=Math.min(Math.floor(G*(1+B/100)),255);return`rgb(${Z}, ${U}, ${W})`}darkenColor(A,B){let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.max(Math.floor(J*(1-B/100)),0),U=Math.max(Math.floor(F*(1-B/100)),0),W=Math.max(Math.floor(G*(1-B/100)),0);return`rgb(${Z}, ${U}, ${W})`}isLightColor(A){let B=A.replace("#",""),Q=parseInt(B.substr(0,2),16),J=parseInt(B.substr(2,2),16),F=parseInt(B.substr(4,2),16);return(Q*299+J*587+F*114)/1000>125}static kinds=new Map;static kindsByType=new Map;static getByName(A){if(!this.kinds.has(A)){let Q=new H(A,"#000000").getPrimaryShapeType();if(this.kindsByType.has(Q))return this.kindsByType.get(Q);throw new Error(`ShapeKind ${A} not found`)}return this.kinds.get(A)}static register(A,B,Q=!1){let J=new H(A,B);if(this.kinds.set(A,J),Q)this.kindsByType.set(J.getPrimaryShapeType(),J);return J}static getByColor(A){for(let B of this.kinds.values())if(B.color===A)return B;return}static initialize(){if(this.kinds.size>0)return;this.register("Line","#A45A3E",!0),this.register("LineVertical","#A45A3E",!0),this.register("Square2x2","#D2B48C",!0),this.register("TShape","#4E8975",!0),this.register("LShape","#707C74",!0),this.register("ZShape","#A74F45",!0),this.register("Single","#4AB3A0",!0),this.register("Line2","#A45A3E"),this.register("Line3","#A45A3E"),this.register("Line5","#A45A3E"),this.register("LineVertical2","#A45A3E"),this.register("LineVertical3","#A45A3E"),this.register("LineVertical5","#A45A3E"),this.register("Square3x3","#D2B48C"),this.register("TShapeFlipped","#4E8975"),this.register("TShapeRight","#4E8975"),this.register("TShapeLeft","#4E8975"),this.register("LShapeRight","#707C74"),this.register("LShapeUpside","#707C74"),this.register("LShapeLeft","#707C74"),this.register("SmallL","#707C74"),this.register("SmallLRight","#707C74"),this.register("SmallLUpside","#707C74"),this.register("SmallLLeft","#707C74"),this.register("ZShapeReflected","#A74F45"),this.register("ZShapeVertical","#A74F45"),this.register("ZShapeVerticalReflected","#A74F45"),this.loadSprites()}}H.initialize();class q{name;pattern;kind;frequency;constructor(A,B,Q,J=1){this.name=A,this.pattern=B,this.kind=Q,this.frequency=Math.max(0,Math.min(1,J))}get color(){return this.kind.color}static shapes=[new q("Line5",[[!0,!0,!0,!0,!0]],H.getByName("Line5"),0.2),new q("LineVertical5",[[!0],[!0],[!0],[!0],[!0]],H.getByName("LineVertical5"),0.2),new q("Line",[[!0,!0,!0,!0]],H.getByName("Line"),0.2),new q("LineVertical",[[!0],[!0],[!0],[!0]],H.getByName("LineVertical"),0.2),new q("Line3",[[!0,!0,!0]],H.getByName("Line3"),0.2),new q("LineVertical3",[[!0],[!0],[!0]],H.getByName("LineVertical3"),0.2),new q("Line2",[[!0,!0]],H.getByName("Line2"),0.2),new q("LineVertical2",[[!0],[!0]],H.getByName("LineVertical2"),0.2),new q("Square2x2",[[!0,!0],[!0,!0]],H.getByName("Square2x2"),0.7),new q("Square3x3",[[!0,!0,!0],[!0,!0,!0],[!0,!0,!0]],H.getByName("Square3x3"),0.3),new q("TShape",[[!1,!0,!1],[!0,!0,!0]],H.getByName("TShape"),0.25),new q("TShapeFlipped",[[!0,!0,!0],[!1,!0,!1]],H.getByName("TShapeFlipped"),0.25),new q("TShapeRight",[[!1,!0],[!0,!0],[!1,!0]],H.getByName("TShapeRight"),0.25),new q("TShapeLeft",[[!0,!1],[!0,!0],[!0,!1]],H.getByName("TShapeLeft"),0.25),new q("LShape",[[!0,!1],[!0,!1],[!0,!0]],H.getByName("LShape"),0.25),new q("LShapeRight",[[!0,!0,!0],[!0,!1,!1]],H.getByName("LShapeRight"),0.25),new q("LShapeUpside",[[!0,!0],[!1,!0],[!1,!0]],H.getByName("LShapeUpside"),0.25),new q("LShapeLeft",[[!1,!1,!0],[!0,!0,!0]],H.getByName("LShapeLeft"),0.25),new q("ZShape",[[!0,!0,!1],[!1,!0,!0]],H.getByName("ZShape"),0.25),new q("ZShapeReflected",[[!1,!0,!0],[!0,!0,!1]],H.getByName("ZShapeReflected"),0.25),new q("ZShapeVertical",[[!1,!0],[!0,!0],[!0,!1]],H.getByName("ZShapeVertical"),0.25),new q("ZShapeVerticalReflected",[[!0,!1],[!0,!0],[!1,!0]],H.getByName("ZShapeVerticalReflected"),0.25),new q("SmallL",[[!0,!1],[!0,!0]],H.getByName("SmallL"),0.25),new q("SmallLRight",[[!0,!0],[!0,!1]],H.getByName("SmallLRight"),0.25),new q("SmallLUpside",[[!0,!0],[!1,!0]],H.getByName("SmallLUpside"),0.25),new q("SmallLLeft",[[!1,!0],[!0,!0]],H.getByName("SmallLLeft"),0.25),new q("Single",[[!0]],H.getByName("Single"),1)];static all(){return[...this.shapes]}static random(){let A=this.shapes.reduce((Q,J)=>Q+J.frequency,0),B=Math.random()*A;for(let Q of this.shapes)if(B-=Q.frequency,B<=0)return Q;return this.shapes[0]}static byName(A){return this.shapes.find((B)=>B.name===A)}static randomPattern(){return this.random().pattern}}class YA{shape;shapeKind;x;y;isAvailable;shapeName;scaleFactor;constructor(A,B,Q){if(this.x=0,this.y=0,this.isAvailable=!0,A)if(this.shape=A,this.shapeName="custom",Q)this.shapeKind=H.getByColor(Q)||new H("custom",Q);else{let J=$.colors[Math.floor(Math.random()*$.colors.length)];this.shapeKind=new H("custom",J)}else{let J=q.random();this.shape=J.pattern,this.shapeName=J.name,this.shapeKind=J.kind}if(B!==void 0){let J=$.gridSize*$.cellSize,F=this.shape[0].length,G=this.shape.length,Z=4,U=F>4?4/F:1,W=$.cellSize*U,V=F*W,M=G*W,I=J/$.maxAvailablePieces;this.x=I/2-V/2+B*I;let C=$.gridSize*$.cellSize;this.y=C+$.pieceAreaHeight/2-M/2,this.scaleFactor=U}}get color(){return this.shapeKind.color}generateRandomShape(){return q.randomPattern()}contains(A,B){let Q=$.cellSize*(this.scaleFactor||1),J=this.x,F=this.x+this.shape[0].length*Q,G=this.y,Z=this.y+this.shape.length*Q;if(A>=J&&A<F&&B>=G&&B<Z){let U=Math.floor((A-this.x)/Q),W=Math.floor((B-this.y)/Q);if(U>=0&&U<this.shape[0].length&&W>=0&&W<this.shape.length)return this.shape[W][U]}return!1}render(A){let B=$.cellSize*(this.scaleFactor||1);for(let Q=0;Q<this.shape.length;Q++)for(let J=0;J<this.shape[Q].length;J++)if(this.shape[Q][J]){let F=this.x+J*B,G=this.y+Q*B;this.drawBlockWithEffect(A,F,G,B)}}drawBlockWithEffect(A,B,Q,J){A.fillStyle=this.color,A.fillRect(B,Q,J,J),A.fillStyle=this.lightenColor(this.color,15),A.beginPath(),A.moveTo(B,Q),A.lineTo(B+J,Q),A.lineTo(B+J-4,Q+4),A.lineTo(B+4,Q+4),A.closePath(),A.fill(),A.fillStyle=this.darkenColor(this.color,15),A.beginPath(),A.moveTo(B+J,Q),A.lineTo(B+J,Q+J),A.lineTo(B+J-4,Q+J-4),A.lineTo(B+J-4,Q+4),A.closePath(),A.fill(),A.fillStyle=this.darkenColor(this.color,25),A.beginPath(),A.moveTo(B,Q+J),A.lineTo(B+J,Q+J),A.lineTo(B+J-4,Q+J-4),A.lineTo(B+4,Q+J-4),A.closePath(),A.fill(),A.fillStyle=this.lightenColor(this.color,5),A.beginPath(),A.moveTo(B,Q),A.lineTo(B,Q+J),A.lineTo(B+4,Q+J-4),A.lineTo(B+4,Q+4),A.closePath(),A.fill(),A.strokeStyle="#3F3A33",A.lineWidth=1,A.strokeRect(B,Q,J,J),this.shapeKind.drawSymbolOnBlock(A,B,Q,J)}lightenColor(A,B){let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.min(Math.floor(J*(1+B/100)),255),U=Math.min(Math.floor(F*(1+B/100)),255),W=Math.min(Math.floor(G*(1+B/100)),255);return`rgb(${Z}, ${U}, ${W})`}darkenColor(A,B){let Q=A.replace("#",""),J=parseInt(Q.substr(0,2),16),F=parseInt(Q.substr(2,2),16),G=parseInt(Q.substr(4,2),16),Z=Math.max(Math.floor(J*(1-B/100)),0),U=Math.max(Math.floor(F*(1-B/100)),0),W=Math.max(Math.floor(G*(1-B/100)),0);return`rgb(${Z}, ${U}, ${W})`}isLightColor(A){let B=A.replace("#",""),Q=parseInt(B.substr(0,2),16),J=parseInt(B.substr(2,2),16),F=parseInt(B.substr(4,2),16);return(Q*299+J*587+F*114)/1000>125}}class r{cells;constructor(){this.cells=Array($.gridSize).fill(null).map(()=>Array($.gridSize).fill(null))}reset(){for(let A=0;A<$.gridSize;A++)for(let B=0;B<$.gridSize;B++)this.cells[A][B]=null}setCellState(A,B,Q){if(A<0||A>=$.gridSize||B<0||B>=$.gridSize){console.error("Invalid cell coordinates:",A,B);return}if(Q===null)this.cells[B][A]=null;else{let J=H.getByColor(Q)||new H("custom",Q);this.cells[B][A]=J}}getCellColor(A,B){if(A<0||A>=$.gridSize||B<0||B>=$.gridSize)return null;return this.cells[B][A]?.color||null}countFilledCells(){let A=0;for(let B=0;B<$.gridSize;B++)for(let Q=0;Q<$.gridSize;Q++)if(this.cells[B][Q]!==null)A++;return A}clone(){let A=new r;for(let B=0;B<$.gridSize;B++)for(let Q=0;Q<$.gridSize;Q++){let J=this.cells[B][Q];if(J){let F=J.color;A.setCellState(Q,B,F)}}return A}}function b(A){document.dispatchEvent(new CustomEvent("score-updated",{detail:{score:A},bubbles:!0,composed:!0}))}function m(A,B){for(let Q=0;Q<B.length;Q++)if(B[Q].isAvailable)B[Q].render(A)}function D4(A,B){let Q=A.canvas.width,J=A.canvas.height;A.clearRect(0,0,Q,J),A.fillStyle="rgba(0, 0, 0, 0.8)",A.fillRect(0,0,Q,J),A.font="bold 40px Arial",A.fillStyle="#FFFFFF",A.textAlign="center",A.textBaseline="middle",A.fillText("GAME OVER",Q/2,J/3),A.font="30px Arial",A.fillText(`Score: ${B}`,Q/2,J/2)}function ZA(A,B){let J=A.canvas.width,F=$.gridSize*$.cellSize,G=$.gameOverButton,Z=(J-G.width)/2,U=F*0.65;A.fillStyle=B?G.hoverColor:G.color,A.strokeStyle="rgba(0, 0, 0, 0.3)",A.lineWidth=2;let W=8;return A.beginPath(),A.moveTo(Z+W,U),A.lineTo(Z+G.width-W,U),A.quadraticCurveTo(Z+G.width,U,Z+G.width,U+W),A.lineTo(Z+G.width,U+G.height-W),A.quadraticCurveTo(Z+G.width,U+G.height,Z+G.width-W,U+G.height),A.lineTo(Z+W,U+G.height),A.quadraticCurveTo(Z,U+G.height,Z,U+G.height-W),A.lineTo(Z,U+W),A.quadraticCurveTo(Z,U,Z+W,U),A.closePath(),A.fill(),A.stroke(),A.font=G.font,A.fillStyle=G.textColor,A.textAlign="center",A.textBaseline="middle",A.fillText(G.text,Z+G.width/2,U+G.height/2),{x:Z,y:U,width:G.width,height:G.height}}function hA(A,B,Q,J,F,G){return A>=Q&&A<=Q+F&&B>=J&&B<=J+G}var _4={challenge:{activated:"Use all pieces!",completed:"+{bonusPoints} bonus points!"},multiplier:{message:"{multiplier}x multiplier!"},highScore:{newHighScore:"New High Score: {score}!"}};var yA={en:_4},vA="en";function FB(A="en"){try{if(!yA[A])console.warn(`Translations for ${A} not available, using English as fallback`),A="en";vA=A}catch(B){console.error("Error initializing translations:",B),vA="en"}}function n(A,B={}){let Q=yA[vA]||yA.en,J=A.split("."),F=Q;for(let G of J){if(F===void 0||F===null)return console.warn(`Translation key not found: ${A}`),A;F=F[G]}if(typeof F!=="string")return console.warn(`Translation key doesn't point to a string: ${A}`),A;return F.replace(/\{([^}]+)\}/g,(G,Z)=>{return B[Z]!==void 0?B[Z].toString():G})}FB("en");H.initialize();class OA{canvas;ctx;board;score;isChallengeMode=!1;challengeOutlineColor="#FFD700";challengeOutlineWidth=4;constructor(A,B=0){this.canvas=A,this.ctx=A.getContext("2d"),this.score=B,this.board=new r,this.addEventListeners(),this.render()}addEventListeners(){document.addEventListener("on-theme-change",(A)=>{this.render()})}setChallengeMode(A){this.isChallengeMode=A}render(){let A=this.ctx,B=$.cellSize,Q=$.gridSize*B;A.fillStyle=$.backgroundColor,A.fillRect(0,0,this.canvas.width,this.canvas.height),A.strokeStyle=$.gridLineColor,A.lineWidth=1;for(let J=0;J<=$.gridSize;J++)A.beginPath(),A.moveTo(0,J*B),A.lineTo(this.canvas.width,J*B),A.stroke(),A.beginPath(),A.moveTo(J*B,0),A.lineTo(J*B,Q),A.stroke();for(let J=0;J<$.gridSize;J++)for(let F=0;F<$.gridSize;F++){let G=this.board.cells[J][F];if(G)this.drawBlockWithPattern(F,J,G)}if(this.isChallengeMode){A.beginPath(),A.strokeStyle=this.challengeOutlineColor,A.lineWidth=this.challengeOutlineWidth;let J=this.challengeOutlineWidth/2;A.strokeRect(J,J,$.gridSize*B-this.challengeOutlineWidth,$.gridSize*B-this.challengeOutlineWidth)}A.beginPath(),A.strokeStyle=$.borderColor,A.lineWidth=2,A.moveTo(0,Q),A.lineTo(this.canvas.width,Q),A.stroke()}drawBlockWithPattern(A,B,Q){let J=this.ctx,F=$.cellSize,G=A*F,Z=B*F;J.fillStyle=Q.color,J.fillRect(G,Z,F,F),J.fillStyle=Q.lightenColor(Q.color,15),J.beginPath(),J.moveTo(G,Z),J.lineTo(G+F,Z),J.lineTo(G+F-4,Z+4),J.lineTo(G+4,Z+4),J.closePath(),J.fill(),J.fillStyle=Q.darkenColor(Q.color,15),J.beginPath(),J.moveTo(G+F,Z),J.lineTo(G+F,Z+F),J.lineTo(G+F-4,Z+F-4),J.lineTo(G+F-4,Z+4),J.closePath(),J.fill(),J.fillStyle=Q.darkenColor(Q.color,25),J.beginPath(),J.moveTo(G,Z+F),J.lineTo(G+F,Z+F),J.lineTo(G+F-4,Z+F-4),J.lineTo(G+4,Z+F-4),J.closePath(),J.fill(),J.fillStyle=Q.lightenColor(Q.color,5),J.beginPath(),J.moveTo(G,Z),J.lineTo(G,Z+F),J.lineTo(G+4,Z+F-4),J.lineTo(G+4,Z+4),J.closePath(),J.fill(),J.strokeStyle="#3F3A33",J.lineWidth=2,J.strokeRect(G,Z,F,F),Q.drawSymbolOnBlock(J,G,Z,F)}canPlacePiece(A,B,Q){for(let J=0;J<A.shape.length;J++)for(let F=0;F<A.shape[J].length;F++)if(A.shape[J][F]){let G=B+F,Z=Q+J;if(G<0||G>=$.gridSize||Z<0||Z>=$.gridSize)return!1;if(this.board.cells[Z][G]!==null)return!1}return!0}placePiece(A,B,Q){if(!this.canPlacePiece(A,B,Q))return!1;let J=0;for(let F=0;F<A.shape.length;F++)for(let G=0;G<A.shape[F].length;G++)if(A.shape[F][G])this.board.cells[Q+F][B+G]=A.shapeKind,J++;return this.score+=J*15,b(this.score),this.checkForCompleteLines(),this.render(),!0}highlightValidPlacement(A,B,Q,J){if(!A)return;let F=$.cellSize,G=this.canPlacePiece(A,B,Q);J.globalAlpha=0.3,J.fillStyle=G?$.highlightColor:$.invalidColor;for(let Z=0;Z<A.shape.length;Z++)for(let U=0;U<A.shape[Z].length;U++)if(A.shape[Z][U]){let W=B*F+U*F,V=Q*F+Z*F;J.fillRect(W,V,F,F)}J.globalAlpha=1}checkForCompleteLines(){let A=0,B=new Set;for(let Q=0;Q<$.gridSize;Q++)if(this.board.cells[Q].every((J)=>J!==null)){for(let J=0;J<$.gridSize;J++)B.add(`${Q},${J}`);A++}for(let Q=0;Q<$.gridSize;Q++)if(this.board.cells.map((F)=>F[Q]).every((F)=>F!==null)){for(let F=0;F<$.gridSize;F++)B.add(`${F},${Q}`);A++}if(B.size>0){B.forEach((F)=>{let[G,Z]=F.split(",").map(Number);this.board.cells[G][Z]=null});let Q=250,J=A>1?A:1;if(this.score+=Q*A*J,A>1)this.showMultiLineBonus(A);b(this.score),this.render()}return A}showMultiLineBonus(A){let B=n("multiplier.message",{multiplier:A});document.dispatchEvent(new CustomEvent("game-status",{detail:{message:B,type:"bonus"},bubbles:!0,composed:!0}))}setCellState(A,B,Q){this.board.setCellState(A,B,Q)}setBoard(A){this.board=A,this.render()}clearGrid(){this.board.reset(),this.render()}getBoard(){return this.board}}class UA{dbName="LastBlockDB";storeName="stats";dbVersion=1;db=null;statDefinitions=[{id:"score",name:"Score"},{id:"moveCount",name:"Moves"},{id:"challengesCompleted",name:"Challenges"},{id:"challengeBonus",name:"Challenge Bonus"},{id:"gamesPlayed",name:"Games Played"}];constructor(){this.initDB()}initDB(){return new Promise((A,B)=>{if(this.db){A(this.db);return}let Q=indexedDB.open(this.dbName,this.dbVersion);Q.onerror=(J)=>{console.error("Error opening IndexedDB",J),B("Error opening IndexedDB")},Q.onsuccess=()=>{this.db=Q.result,A(this.db)},Q.onupgradeneeded=(J)=>{let F=J.target.result;if(!F.objectStoreNames.contains(this.storeName)){let G=F.createObjectStore(this.storeName,{keyPath:["id","category"]});G.createIndex("category","category",{unique:!1}),G.createIndex("id","id",{unique:!1}),this.initializeDefaultStats(G)}}})}initializeDefaultStats(A){this.statDefinitions.forEach((B)=>{A.add({id:B.id,category:"current",name:B.name,value:0})}),this.statDefinitions.forEach((B)=>{A.add({id:B.id,category:"lifetime",name:B.name,value:0})}),this.statDefinitions.forEach((B)=>{A.add({id:B.id,category:"best",name:B.name,value:0})})}async getStats(A){return await this.initDB(),new Promise((B,Q)=>{if(!this.db){Q("Database not initialized");return}let Z=this.db.transaction([this.storeName],"readonly").objectStore(this.storeName).index("category").getAll(A);Z.onsuccess=()=>{B(Z.result)},Z.onerror=(U)=>{console.error(`Error getting ${A} stats`,U),Q(`Error getting ${A} stats`)}})}async getStat(A,B){return await this.initDB(),new Promise((Q,J)=>{if(!this.db){J("Database not initialized");return}let Z=this.db.transaction([this.storeName],"readonly").objectStore(this.storeName).get([B,A]);Z.onsuccess=()=>{if(Z.result)Q(Z.result.value);else Q(0)},Z.onerror=(U)=>{console.error(`Error getting stat: ${B} in ${A}`,U),J(`Error getting stat: ${B} in ${A}`)}})}async updateStat(A,B,Q){return await this.initDB(),new Promise((J,F)=>{if(!this.db){F("Database not initialized");return}let Z=this.db.transaction([this.storeName],"readwrite").objectStore(this.storeName),U=Z.get([B,A]);U.onsuccess=()=>{if(U.result){let W=U.result;W.value=Q;let V=Z.put(W);V.onsuccess=()=>{J()},V.onerror=(M)=>{console.error(`Error updating stat: ${B} in ${A}`,M),F(`Error updating stat: ${B} in ${A}`)}}else{let W=this.statDefinitions.find((I)=>I.id===B);if(!W){F(`Unknown stat: ${B}`);return}let V={id:B,category:A,name:W.name,value:Q},M=Z.add(V);M.onsuccess=()=>{J()},M.onerror=(I)=>{console.error(`Error creating stat: ${B} in ${A}`,I),F(`Error creating stat: ${B} in ${A}`)}}},U.onerror=(W)=>{console.error(`Error reading stat: ${B} in ${A}`,W),F(`Error reading stat: ${B} in ${A}`)}})}async incrementStat(A,B,Q=1){return await this.initDB(),new Promise((J,F)=>{if(!this.db){F("Database not initialized");return}let Z=this.db.transaction([this.storeName],"readwrite").objectStore(this.storeName),U=Z.get([B,A]);U.onsuccess=()=>{if(U.result){let W=U.result;W.value+=Q;let V=Z.put(W);V.onsuccess=()=>{J()},V.onerror=(M)=>{console.error(`Error incrementing stat: ${B} in ${A}`,M),F(`Error incrementing stat: ${B} in ${A}`)}}else{let W=this.statDefinitions.find((I)=>I.id===B);if(!W){F(`Unknown stat: ${B}`);return}let V={id:B,category:A,name:W.name,value:Q},M=Z.add(V);M.onsuccess=()=>{J()},M.onerror=(I)=>{console.error(`Error creating stat: ${B} in ${A}`,I),F(`Error creating stat: ${B} in ${A}`)}}},U.onerror=(W)=>{console.error(`Error reading stat: ${B} in ${A}`,W),F(`Error reading stat: ${B} in ${A}`)}})}async resetStats(A){return await this.initDB(),new Promise((B,Q)=>{if(!this.db){Q("Database not initialized");return}let J=this.db.transaction([this.storeName],"readwrite"),F=J.objectStore(this.storeName),Z=F.index("category").getAll(A);Z.onsuccess=()=>{Z.result.forEach((W)=>{W.value=0,F.put(W)}),J.oncomplete=()=>{B()},J.onerror=(W)=>{console.error(`Error resetting ${A} stats`,W),Q(`Error resetting ${A} stats`)}},Z.onerror=(U)=>{console.error(`Error getting ${A} stats for reset`,U),Q(`Error getting ${A} stats for reset`)}})}async updateBestStats(){let A=await this.getStats("current"),B=await this.getStats("best"),Q=A.find((F)=>F.id==="score")?.value||0,J=B.find((F)=>F.id==="score")?.value||0;if(Q>J)return await Promise.all(A.map((F)=>this.updateStat("best",F.id,F.value))),!0;return!1}async recordGameComplete(){await this.incrementStat("lifetime","gamesPlayed");let A=await this.getStats("current");return await Promise.all(A.filter((B)=>B.id!=="gamesPlayed").map((B)=>this.incrementStat("lifetime",B.id,B.value))),this.updateBestStats()}async newGame(){return this.resetStats("current")}}class mA{score=0;moveCount=0;isChallengeMode=!1;challengeModeInterval=10;challengeBonusPoints=300;challengesCompleted=0;challengeBonus=0;stats;constructor(){this.stats=new UA,this.initGame()}async initGame(){this.reset(),await this.stats.newGame()}reset(){this.score=0,this.moveCount=0,this.isChallengeMode=!1,this.challengesCompleted=0,this.challengeBonus=0}incrementMoveCount(){return this.moveCount++,this.stats.updateStat("current","moveCount",this.moveCount),this.moveCount}shouldActivateChallengeMode(){return!this.isChallengeMode&&this.moveCount%this.challengeModeInterval===0&&this.moveCount>0}addChallengeBonus(){this.score+=this.challengeBonusPoints,this.challengeBonus+=this.challengeBonusPoints,this.challengesCompleted++,this.stats.updateStat("current","challengeBonus",this.challengeBonus),this.stats.updateStat("current","challengesCompleted",this.challengesCompleted),this.stats.updateStat("current","score",this.score)}updateScore(A){this.score=A,this.stats.updateStat("current","score",this.score)}async handleGameOver(){return await this.stats.recordGameComplete()}async getStats(A){return await this.stats.getStats(A)}}class l extends Y{messageQueue=[];enterDuration=300;visibleDuration=1800;exitDuration=300;isProcessingQueue=!1;static styles=X`
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
    `;constructor(){super();this.messages=[];this.showDefaultMessage=!0;document.addEventListener("game-status",this.onStatusEvent.bind(this))}onStatusEvent(A){let{message:B,type:Q="info"}=A.detail;if(!B)return;this.showDefaultMessage=!1;let F={id:`status-${Date.now()}-${Math.floor(Math.random()*1000)}`,text:B,type:Q,status:"entering"};if(this.messageQueue.push(F),!this.isProcessingQueue)this.processNextMessage()}processNextMessage(){if(this.messageQueue.length===0){this.isProcessingQueue=!1,setTimeout(()=>{if(this.messages=this.messages.filter((B)=>B.status!=="exiting"),this.messages.length===0)setTimeout(()=>{this.showDefaultMessage=!0},300)},this.exitDuration);return}this.isProcessingQueue=!0;let A=this.messageQueue.shift();this.messages=[...this.messages,A],setTimeout(()=>{this.updateMessageStatus(A.id,"visible"),setTimeout(()=>{this.updateMessageStatus(A.id,"exiting"),setTimeout(()=>{this.processNextMessage(),setTimeout(()=>{this.messages=this.messages.filter((B)=>B.id!==A.id)},this.exitDuration)},100)},this.visibleDuration)},this.enterDuration)}updateMessageStatus(A,B){this.messages=this.messages.map((Q)=>{if(Q.id===A)return{...Q,status:B};return Q})}render(){return D`
            <div class="messages-area">
                ${this.messages.map((A)=>D` <div class="message type-${A.type} ${A.status}">${A.text}</div> `)}
                <div class="default-message ${this.showDefaultMessage?"":"hidden"}">lastblock</div>
            </div>
        `}static showMessage(A,B="info"){document.dispatchEvent(new CustomEvent("game-status",{detail:{message:A,type:B},bubbles:!0,composed:!0}))}}K([P()],l.prototype,"messages",void 0),K([P()],l.prototype,"showDefaultMessage",void 0),l=K([T("game-status")],l);var w=(A)=>$.colors[A%$.colors.length],WA={rowColClear:{name:"Row & Column Clear Test",description:"Test clearing both a row and column simultaneously",boardState:Array($.gridSize).fill("").map((A,B)=>Array($.gridSize).fill("").map((Q,J)=>{if(B===5&&J!==5)return w(0);if(J===5&&B!==5)return w(1);return""})),availablePieces:[{shape:[[!0]],color:w(0)}]},multiRowClear:{name:"Multi-Row Clear Test",description:"Test clearing multiple rows simultaneously",boardState:Array($.gridSize).fill("").map((A,B)=>Array($.gridSize).fill("").map((Q,J)=>{if(B===3&&J<$.gridSize-1)return w(0);if(B===5&&J<$.gridSize-1)return w(1);return""})),availablePieces:[{shape:[[!0],[!0]],color:w(0)}]},customPieces:{name:"Custom Test Pieces",description:"Empty board with custom test pieces",boardState:Array($.gridSize).fill("").map(()=>Array($.gridSize).fill("")),availablePieces:[{shape:[[!0]],color:w(0)},{shape:[[!0,!1],[!0,!0]],color:w(1)},{shape:[[!0,!0,!0],[!1,!0,!1]],color:w(0)}]},complexClears:{name:"Complex Clear Scenarios",description:"Complex test scenario with multiple potential line clears",boardState:Array($.gridSize).fill("").map((A,B)=>Array($.gridSize).fill("").map((Q,J)=>{if(B===2&&J<$.gridSize-2)return w(0);if(B===5&&J>0&&J<$.gridSize-1)return w(1);if(J===2&&B<$.gridSize-2)return w(1);if(J===5&&B>0&&B<$.gridSize-1)return w(0);return""})),availablePieces:[{shape:[[!0,!0],[!0,!1]],color:w(0)},{shape:[[!0,!0],[!0,!0]],color:w(1)},{shape:[[!0,!0,!0]],color:w(0)}]}};class uA{isDragging=!1;activePiece=null;dragStartX=0;dragStartY=0;dragCurrentX=0;dragCurrentY=0;animationFrameId=null;availablePieces=[];isGameOver=!1;finalScore=0;hoveringPlayButton=!1;grid;mainCanvas;overlayCanvas;mainCtx;overlayCtx;cursorOffset=40;game;constructor(A,B){this.mainCanvas=A,this.overlayCanvas=B,this.mainCtx=this.mainCanvas.getContext("2d"),this.overlayCtx=this.overlayCanvas.getContext("2d"),this.game=new mA;let Q=$.gridSize*$.cellSize+$.pieceAreaHeight;this.mainCanvas.width=$.gridSize*$.cellSize,this.mainCanvas.height=Q,this.overlayCanvas.width=$.gridSize*$.cellSize,this.overlayCanvas.height=Q,this.grid=new OA(this.mainCanvas,this.game.score),this.setupEventListeners(),document.addEventListener("request-score-update",this.onScoreUpdateRequest.bind(this))}initialize(){this.generateInitialPieces(),m(this.overlayCtx,this.availablePieces)}setupEventListeners(){this.overlayCanvas.addEventListener("mousedown",this.onCanvasMouseDown.bind(this)),this.overlayCanvas.addEventListener("touchstart",this.onCanvasTouchStart.bind(this),{passive:!1}),this.setupGameOverEvents(),document.getElementById("new-game-btn")?.addEventListener("click",()=>this.newGame())}generateInitialPieces(){for(let A=0;A<$.maxAvailablePieces;A++)this.generateNewPiece()}generateNewPiece(){for(let A=0;A<$.maxAvailablePieces;A++)if(!this.availablePieces[A]||!this.availablePieces[A].isAvailable){let B=new YA(void 0,A);if(A<this.availablePieces.length)this.availablePieces[A]=B;else this.availablePieces.push(B);return}}findPieceAtPosition(A,B){let Q=this.overlayCanvas.width,J=$.gridSize*$.cellSize;if(B>J){let F=Math.floor(A/Q*$.maxAvailablePieces),G=Math.max(0,Math.min($.maxAvailablePieces-1,F));if(this.availablePieces[G]&&this.availablePieces[G].isAvailable)return this.availablePieces[G]}else for(let F=this.availablePieces.length-1;F>=0;F--){let G=this.availablePieces[F];if(G.isAvailable&&G.contains(A,B))return G}return null}animateDrag(){if(this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces),this.isDragging&&this.activePiece){let A=$.cellSize,B=this.dragCurrentX-this.dragStartX,Q=this.dragCurrentY-this.dragStartY;if(this.activePiece.x+=B,this.activePiece.y+=Q,this.dragStartX=this.dragCurrentX,this.dragStartY=this.dragCurrentY,this.activePiece.scaleFactor&&this.activePiece.scaleFactor<1){let M=this.activePiece.scaleFactor,I=this.activePiece.shape[0].length*A*M,C=this.activePiece.shape.length*A*M,_=this.activePiece.x+I/2,S=this.activePiece.y+C/2;this.activePiece.scaleFactor=1;let w4=this.activePiece.shape[0].length*A,X4=this.activePiece.shape.length*A;this.activePiece.x=_-w4/2,this.activePiece.y=S-X4/2}let J=this.activePiece.shape[0].length,F=this.activePiece.shape.length,G=this.activePiece.x,Z=this.activePiece.y,U=Math.floor((G+A/2)/A),W=Math.floor((Z+A/2)/A),V=W>=0&&W+F<=$.gridSize&&U>=0&&U+J<=$.gridSize;if(this.activePiece.render(this.overlayCtx),V)this.grid.highlightValidPlacement(this.activePiece,U,W,this.overlayCtx);this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this))}else if(this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}tryPlacePiece(A,B){if(!this.activePiece)return;if(this.grid.placePiece(this.activePiece,A,B)){if(this.activePiece.isAvailable=!1,this.game.updateScore(this.grid.score),b(this.game.score),this.game.incrementMoveCount(),this.game.shouldActivateChallengeMode())this.activateChallengeMode();if(this.game.isChallengeMode)this.checkChallengeCompletion();else this.generateNewPiece();this.checkGameOver()}else this.repositionAvailablePieces()}repositionAvailablePieces(){for(let A=0;A<this.availablePieces.length;A++)if(this.availablePieces[A].isAvailable){let B=$.gridSize*$.cellSize,Q=this.availablePieces[A].shape[0].length*$.cellSize,J=this.availablePieces.filter((U)=>U.isAvailable).length,F=B/$.maxAvailablePieces;this.availablePieces[A].x=F/2-Q/2+A*F;let G=$.gridSize*$.cellSize,Z=this.availablePieces[A].shape.length*$.cellSize;this.availablePieces[A].y=G+$.pieceAreaHeight/2-Z/2}}checkGameOver(){let A=!1;for(let B of this.availablePieces){if(!B.isAvailable)continue;for(let Q=0;Q<$.gridSize;Q++)for(let J=0;J<$.gridSize;J++)if(this.grid.canPlacePiece(B,J,Q)){A=!0;return}}if(!A){if(this.isGameOver=!0,this.finalScore=this.game.score,this.game.handleGameOver().then((B)=>{if(D4(this.mainCtx,this.finalScore),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),ZA(this.overlayCtx,!1),B)l.showMessage(n("highScore.newHighScore",{score:this.finalScore}),"challenge")}),this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}}loadTestScenario(A){if(!WA[A]){console.error(`Scenario "${A}" not found.`);return}this.grid.clearGrid(),this.game.score=0;let B=WA[A],Q=new r;B.boardState.forEach((J,F)=>{J.forEach((G,Z)=>{if(G)Q.setCellState(Z,F,G)})}),this.grid.setBoard(Q),this.availablePieces=[],B.availablePieces.forEach((J,F)=>{if(F<$.maxAvailablePieces){let G=new YA(J.shape,F);G.color=J.color,this.availablePieces.push(G)}});while(this.availablePieces.length<$.maxAvailablePieces)this.generateNewPiece();this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces),b(this.game.score)}async newGame(A){await this.game.initGame(),this.isGameOver=!1,b(this.game.score),this.grid=new OA(this.mainCanvas,this.game.score),this.availablePieces=[];for(let B=0;B<$.maxAvailablePieces;B++)this.generateNewPiece();if(A)this.loadTestScenario(A);else this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces)}setupGameOverEvents(){this.overlayCanvas.addEventListener("mousemove",this.onCanvasMouseMove.bind(this)),this.overlayCanvas.addEventListener("click",this.onCanvasClick.bind(this))}setInitialPiecePosition(A,B,Q){let J=$.cellSize*(A.scaleFactor||1),F=A.shape[0].length*J,G=A.shape.length*J;A.x=B-F/2,A.y=Q-G-this.cursorOffset}onScoreUpdateRequest(){b(this.game.score)}onCanvasMouseMove(A){if(!this.isGameOver)return;let B=this.overlayCanvas.getBoundingClientRect(),Q=(A.clientX-B.left)*(this.overlayCanvas.width/B.width),J=(A.clientY-B.top)*(this.overlayCanvas.height/B.height),F=ZA(this.overlayCtx,!1),G=hA(Q,J,F.x,F.y,F.width,F.height);if(G!==this.hoveringPlayButton)this.hoveringPlayButton=G,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),ZA(this.overlayCtx,G)}onCanvasClick(A){if(!this.isGameOver)return;let B=this.overlayCanvas.getBoundingClientRect(),Q=(A.clientX-B.left)*(this.overlayCanvas.width/B.width),J=(A.clientY-B.top)*(this.overlayCanvas.height/B.height),F=ZA(this.overlayCtx,!1);if(hA(Q,J,F.x,F.y,F.width,F.height))this.newGame()}onCanvasMouseDown(A){if(this.isGameOver)return;let B=this.overlayCanvas.getBoundingClientRect(),Q=(A.clientX-B.left)*(this.overlayCanvas.width/B.width),J=(A.clientY-B.top)*(this.overlayCanvas.height/B.height),F=this.findPieceAtPosition(Q,J);if(F){if(A.preventDefault(),this.activePiece=F,this.isDragging=!0,this.dragStartX=Q,this.dragStartY=J,this.dragCurrentX=Q,this.dragCurrentY=J,this.setInitialPiecePosition(F,Q,J),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.addEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onDocumentMouseMove(A){if(this.isDragging&&this.activePiece){let B=this.overlayCanvas.getBoundingClientRect();document.body.style.cursor="grabbing",this.dragCurrentX=(A.clientX-B.left)*(this.overlayCanvas.width/B.width),this.dragCurrentY=(A.clientY-B.top)*(this.overlayCanvas.height/B.height)}}onDocumentMouseUp(A){if(this.isDragging&&this.activePiece){let B=$.cellSize,Q=this.activePiece.shape[0].length,J=this.activePiece.shape.length,F=this.activePiece.x,G=this.activePiece.y,Z=Math.floor((F+B/2)/B),U=Math.floor((G+B/2)/B);if(U>=0&&U+J<=$.gridSize&&Z>=0&&Z+Q<=$.gridSize)this.tryPlacePiece(Z,U);else this.repositionAvailablePieces();document.body.style.cursor="default",this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces),document.removeEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.removeEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onCanvasTouchStart(A){if(A.touches.length>0){let B=this.overlayCanvas.getBoundingClientRect(),Q=A.touches[0],J=(Q.clientX-B.left)*(this.overlayCanvas.width/B.width),F=(Q.clientY-B.top)*(this.overlayCanvas.height/B.height),G=this.findPieceAtPosition(J,F);if(G){if(A.preventDefault(),this.activePiece=G,this.isDragging=!0,this.dragStartX=J,this.dragStartY=F,this.dragCurrentX=J,this.dragCurrentY=F,this.setInitialPiecePosition(G,J,F),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("touchmove",this.onDocumentTouchMove.bind(this),{passive:!1}),document.addEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}}onDocumentTouchMove(A){if(A.touches.length>0&&this.isDragging&&this.activePiece){A.preventDefault();let B=A.touches[0],Q=this.overlayCanvas.getBoundingClientRect();this.dragCurrentX=(B.clientX-Q.left)*(this.overlayCanvas.width/Q.width),this.dragCurrentY=(B.clientY-Q.top)*(this.overlayCanvas.height/Q.height)}}onDocumentTouchEnd(A){if(this.isDragging&&this.activePiece){let B=$.cellSize,Q=this.activePiece.shape[0].length,J=this.activePiece.shape.length,F=this.activePiece.x,G=this.activePiece.y,Z=Math.floor((F+B/2)/B),U=Math.floor((G+B/2)/B);if(U>=0&&U+J<=$.gridSize&&Z>=0&&Z+Q<=$.gridSize)this.tryPlacePiece(Z,U);else this.repositionAvailablePieces();this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces),document.removeEventListener("touchmove",this.onDocumentTouchMove.bind(this)),document.removeEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}activateChallengeMode(){this.game.isChallengeMode=!0,this.grid.setChallengeMode(!0),this.grid.render(),l.showMessage(n("challenge.activated"),"challenge")}completeChallengeMode(){this.game.addChallengeBonus(),b(this.game.score),this.grid.score=this.game.score,this.game.isChallengeMode=!1,this.grid.setChallengeMode(!1),this.generateInitialPieces(),this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),m(this.overlayCtx,this.availablePieces),l.showMessage(n("challenge.completed",{bonusPoints:this.game.challengeBonusPoints}),"bonus")}checkChallengeCompletion(){if(this.availablePieces.filter((B)=>B.isAvailable).length===0)this.completeChallengeMode()}}class $A extends Y{constructor(){super(...arguments);this.gameState=null}static styles=X`
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
    `;setGameState(A){this.gameState=A}handleLoadScenario(){if(!this.gameState)return;let B=(this.shadowRoot?.querySelector("#test-scenario-select")).value;if(B)this.gameState.newGame(B)}static isTestModeEnabled(){return new URLSearchParams(window.location.search).has("testmode")}render(){return D`
            <div class="test-scenarios-container">
                <select id="test-scenario-select">
                    <option value="">Select a test scenario</option>
                    ${Object.entries(WA).map(([A,B])=>D`<option value="${A}">${B.name}</option>`)}
                </select>
                <button id="load-scenario-btn" @click=${this.handleLoadScenario}>Load Scenario</button>
            </div>
        `}}K([o({type:Object})],$A.prototype,"gameState",void 0),$A=K([T("test-mode-ui")],$A);class xA extends Y{static styles=X`
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
    `;constructor(){super();this.score=0;document.addEventListener("score-updated",this.handleScoreUpdate.bind(this))}connectedCallback(){super.connectedCallback(),document.dispatchEvent(new CustomEvent("request-score-update"))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("score-updated",this.handleScoreUpdate.bind(this))}handleMenuClick(){let A=new CustomEvent("toggle-info-screen",{bubbles:!0,composed:!0});this.dispatchEvent(A)}handleScoreUpdate(A){if(A.detail&&typeof A.detail.score==="number")this.score=A.detail.score}getScoreElement(){return this.renderRoot.querySelector("#score")}render(){return D`
            <div class="header-content">
                <game-status></game-status>
                <div class="score-container">Score: <span id="score" class="score-value">${this.score}</span></div>
                <div class="menu-button-container">
                    <button class="menu-button" @click=${this.handleMenuClick} aria-label="Open Information">
                        &#9776;
                    </button>
                </div>
            </div>
        `}}K([o({type:Number})],xA.prototype,"score",void 0),xA=K([T("game-header")],xA);class gA extends Y{static styles=X`
        :host {
            display: block;
            width: 100%;
        }

        p {
            margin-bottom: 12px;
            line-height: 1.5;
            color: var(--text-color, #d4af91);
        }
    `;render(){return D`
            <div class="instructions-content">
                <p>
                    Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points. Game
                    over when no more pieces can be placed.
                </p>
                <p>Clear multiple lines at once for a bigger bonus!</p>
            </div>
        `}}gA=K([T("info-instructions")],gA);class dA extends Y{constructor(){super(...arguments);this.highScore=0;this.activeTheme="system"}stats=new UA;static styles=X`
        :host {
            display: block;
            width: 100%;
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-group h3 {
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: normal;
            color: var(--text-color, #d4af91);
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
            color: var(--text-color, #d4af91);
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

        .high-score {
            background-color: rgba(61, 140, 158, 0.2);
            border-radius: 4px;
            padding: 12px;
            margin-top: 12px;
            text-align: center;
        }

        .high-score h3 {
            color: var(--color-teal, #3d8c9e);
            margin: 0 0 8px 0;
        }

        .score-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--text-color, #d4af91);
        }
    `;connectedCallback(){super.connectedCallback(),this.loadHighScore(),this.loadThemePreference()}async loadHighScore(){try{this.highScore=await this.stats.getStat("best","score"),this.requestUpdate()}catch(A){console.error("Error loading high score:",A)}}loadThemePreference(){let A=localStorage.getItem("theme-preference");if(A)this.activeTheme=A;else this.activeTheme="system";this.applyTheme(this.activeTheme)}applyTheme(A){document.dispatchEvent(new CustomEvent("theme-change",{bubbles:!0,composed:!0,detail:{theme:A}})),document.documentElement.classList.remove("theme-light","theme-dark","theme-system"),document.documentElement.classList.add(`theme-${A}`),localStorage.setItem("theme-preference",A),this.activeTheme=A,document.dispatchEvent(new CustomEvent("theme-changed",{bubbles:!0,composed:!0,detail:{theme:A}}))}renderSettingOption(A,B,Q,J=!1){return D`
            <div class="setting-option">
                <input
                    type="radio"
                    id="${A}-${B}"
                    name="${A}"
                    value="${B}"
                    ?checked=${J}
                    @change=${()=>this.handleThemeChange(B)}
                />
                <label for="${A}-${B}">${Q}</label>
            </div>
        `}handleThemeChange(A){this.applyTheme(A)}handleNewGame(){let A=new CustomEvent("new-game-requested",{bubbles:!0,composed:!0});this.dispatchEvent(A)}render(){return D`
            <div class="settings-content">
                <div class="setting-group">
                    <h3>Game</h3>
                    <button class="game-button" @click=${this.handleNewGame}>New Game</button>

                    <div class="high-score">
                        <h3>High Score</h3>
                        <div class="score-value">${this.highScore.toLocaleString()}</div>
                    </div>
                </div>

                <div class="setting-group">
                    <h3>Theme</h3>
                    ${this.renderSettingOption("theme","system","System Default",this.activeTheme==="system")}
                    ${this.renderSettingOption("theme","light","Light",this.activeTheme==="light")}
                    ${this.renderSettingOption("theme","dark","Dark",this.activeTheme==="dark")}
                </div>

                <div class="setting-group">
                    <h3>Sound</h3>
                    ${this.renderSettingOption("sound","on","On",!0)}
                    ${this.renderSettingOption("sound","off","Off")}
                </div>
            </div>
        `}}K([P()],dA.prototype,"highScore",void 0),K([P()],dA.prototype,"activeTheme",void 0),dA=K([T("info-settings")],dA);class pA extends Y{static styles=X`
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

        .close-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 0 20px 20px;
            transition: background-color 0.2s;
            font-weight: bold;
        }

        .close-button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `;constructor(){super();this.isVisible=!1;this.activeTab=0;document.addEventListener("toggle-info-screen",this.toggle.bind(this))}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}toggle(){this.isVisible=!this.isVisible}switchTab(A){this.activeTab=A}show(){this.isVisible=!0}hide(){this.isVisible=!1}render(){return D`
            <div class="info-container ${this.isVisible?"visible":""}">
                <div class="tabs">
                    <button
                        class="tab-button ${this.activeTab===0?"active":""}"
                        @click=${()=>this.switchTab(0)}
                    >
                        Settings
                    </button>
                    <button
                        class="tab-button ${this.activeTab===1?"active":""}"
                        @click=${()=>this.switchTab(1)}
                    >
                        How to Play
                    </button>
                </div>

                <div class="tab-content ${this.activeTab===0?"active":""}">
                    <info-settings></info-settings>
                </div>

                <div class="tab-content ${this.activeTab===1?"active":""}">
                    <info-instructions></info-instructions>
                </div>

                <button class="close-button" @click=${this.toggle}>Close</button>
            </div>
        `}}K([P()],pA.prototype,"isVisible",void 0),K([P()],pA.prototype,"activeTab",void 0),pA=K([T("info-screen")],pA);class lA extends Y{constructor(){super(...arguments);this.game=null;this.isTestModeEnabled=$A.isTestModeEnabled()}static styles=X`
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
    `;connectedCallback(){super.connectedCallback(),this.addEventListener("new-game-requested",this.handleNewGame.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("new-game-requested",this.handleNewGame.bind(this))}firstUpdated(){if(this.game=new uA(this.mainCanvas,this.overlayCanvas),this.game.initialize(),this.isTestModeEnabled){let A=this.shadowRoot?.querySelector("test-mode-ui");if(A&&this.game)A.setGameState(this.game)}b(0)}handleNewGame(){if(this.game)this.game.newGame()}renderTestModeUI(){if(!this.isTestModeEnabled)return D``;return D` <test-mode-ui> </test-mode-ui> `}render(){return D`
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
        `}}K([P()],lA.prototype,"game",void 0),K([P()],lA.prototype,"isTestModeEnabled",void 0),K([SA("#main-canvas")],lA.prototype,"mainCanvas",void 0),K([SA("#overlay-canvas")],lA.prototype,"overlayCanvas",void 0),lA=K([T("game-shell")],lA);
