!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";var i;const n=Symbol(),h=Symbol(),c=Symbol(),a=Symbol(),l=Symbol(),o=Symbol(),r=Symbol(),d=Symbol(),p=Symbol(),m=Symbol(),u=Symbol(),b=Symbol(),f=Symbol();class v extends HTMLElement{constructor(){super(),this[f]=((e,t,s=!0,i=!0)=>{var n=new CustomEvent(e,{cancelable:s,bubbles:i,detail:t});return this.dispatchEvent(n),n.defaultPrevented}),this[f]("created"),this.attachShadow({mode:"open"}),this[a]=document.createElement("input"),this[n]=document.createElement("div"),this[l]=document.createElement("div"),this[o]=document.createElement("ul"),this[r]=document.createElement("div"),this[d]=document.createElement("div"),this[p]=document.createElement("div"),this[m]=document.createElement("div"),this[u]=document.createElement("button"),this[b]=document.createElement("button")}get basePath(){return this[h]}set basePath(e){this[f]("basepathchange"),e?(/\/$/.test(e)||(e+="/"),this[h]=e):this[h]=""}get items(){return this[c]}set items(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){throw new Error("Cannot parse JSON in items attribute/property. "+e.message)}this[f]("beforechange")||(this[c]=e,this[f]("change"),this.render())}render(e){if(!this[f]("beforerender")){this[o].innerHTML="";var t=()=>{e.filter(function(e){return e.selected}).length===e.length?(this[p].className="pp-context-selection-controls-highlight",this[m].className=""):(this[p].className="",this[m].className="pp-context-selection-controls-highlight")};(e=e||this[c]||[]).forEach((e,s)=>{var i=document.createElement("li"),n=document.createElement("input");n.type="checkbox",n.className="pp-context-search-item-checkbox",i.className="pp-context-search-item-container",i.appendChild(n),i.appendChild(document.createTextNode(e.value)),n.checked=e.selected,n.addEventListener("change",()=>{e.selected=n.checked,t(),this[f]("change")}),this[f]("renderitem",{item:e,itemContainer:i,itemCheckbox:n})||this[o].appendChild(i)}),t(),this[f]("afterrender")}}changeSelection(e){(this[c]||[]).forEach(function(t){t.selected=e}),this.render(),this[f]("change")}selectAll(){this[f]("selectall")||this.changeSelection(!0)}deselect(){this[f]("deselect")||this.changeSelection(!1)}close(){this[f]("closing")||(this.parentNode&&this.parentNode.removeChild(this),this[f]("closed"))}ok(){this[f]("okpressed")||this.close()}cancel(){this[f]("cancelpressed")||this.close()}attributeChangedCallback(e,t,s){this[f]("attributechanged",{name:e,old:t,value:s})||e in this&&(this[e]=s)}connectedCallback(){this[a].addEventListener("keyup",e=>{this.render(this[c].filter(function(e){return new RegExp(this[a].value,"ig").test(e.value)}))}),this[a].type="text",this[a].setAttribute("placeholder","Search Locations"),this[l].appendChild(this[o]),this[r].appendChild(this[p]),this[r].appendChild(document.createTextNode("•")),this[r].appendChild(this[m]),this[d].appendChild(this[u]),this[d].appendChild(this[b]),this[p].addEventListener("click",()=>{this.selectAll()}),this[m].addEventListener("click",()=>{this.deselect()}),this[u].addEventListener("click",()=>{this.ok()}),this[b].addEventListener("click",()=>{this.cancel()}),this[f]("attached"),this[h]=this[h]||"",this[l].className="pp-context-search-list-box",this[r].className="pp-context-selection-controls",this[d].className="pp-context-okcancel-controls",this[u].className="pp-context-ok-button",this[b].className="pp-context-cancel-button",this[p].innerHTML="Select All",this[m].innerHTML="Deselect",this[u].innerHTML="OK",this[b].innerHTML="Cancel",this.hasAttribute("basePath")&&(this.basePath=this.getAttribute("basePath")),this.shadowRoot.innerHTML=`<style>@import "${this[h]}css/main.css";</style>`,this[n].className="pp-context-search",this.shadowRoot.appendChild(this[n]),this[n].appendChild(this[a]),this[n].appendChild(this[l]),this[n].appendChild(this[r]),this[n].appendChild(this[d]),this[f]("afterattached")}}customElements.define("pp-context-search",v),window.PPContextSearch=v,window.define&&(void 0===(i=function(){return v}.apply(t,[]))||(e.exports=i))}]);