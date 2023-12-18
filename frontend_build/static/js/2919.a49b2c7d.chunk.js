"use strict";(self.webpackChunkvishwatel=self.webpackChunkvishwatel||[]).push([[2919],{2919:(e,t,n)=>{n.r(t),n.d(t,{default:()=>z});var o=n(72791),c=n(81694),a=n.n(c),l=n(70635),r=n(71929),i=n(84107),s=n(52832);const d={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},m=o.createContext({});var p=n(85501),b=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n};function u(e,t,n){const c=o.useMemo((()=>{return t||(e=n,(0,p.Z)(e).map((e=>Object.assign({},null===e||void 0===e?void 0:e.props))));var e}),[t,n]);return o.useMemo((()=>c.map((t=>{var{span:n}=t,o=b(t,["span"]);return Object.assign(Object.assign({},o),{span:"number"===typeof n?n:(0,l.m9)(e,n)})}))),[c,e])}function g(e,t,n){let o=e,c=!1;return(void 0===n||n>t)&&(o=Object.assign(Object.assign({},e),{span:t}),c=void 0!==n),[o,c]}const f=(e,t)=>{const[n,c]=(0,o.useMemo)((()=>function(e,t){const n=[];let o=[],c=t,a=!1;return e.filter((e=>e)).forEach(((l,r)=>{const i=null===l||void 0===l?void 0:l.span,s=i||1;if(r===e.length-1){const[e,t]=g(l,c,i);return a=a||t,o.push(e),void n.push(o)}if(s<c)c-=s,o.push(l);else{const[e,r]=g(l,c,s);a=a||r,o.push(e),n.push(o),c=t,o=[]}})),[n,a]}(t,e)),[t,e]);return n},h=e=>{let{children:t}=e;return t};function y(e){return void 0!==e&&null!==e}const x=e=>{const{itemPrefixCls:t,component:n,span:c,className:l,style:r,labelStyle:i,contentStyle:s,bordered:d,label:m,content:p,colon:b}=e,u=n;return d?o.createElement(u,{className:a()({["".concat(t,"-item-label")]:y(m),["".concat(t,"-item-content")]:y(p)},l),style:r,colSpan:c},y(m)&&o.createElement("span",{style:i},m),y(p)&&o.createElement("span",{style:s},p)):o.createElement(u,{className:a()("".concat(t,"-item"),l),style:r,colSpan:c},o.createElement("div",{className:"".concat(t,"-item-container")},(m||0===m)&&o.createElement("span",{className:a()("".concat(t,"-item-label"),{["".concat(t,"-item-no-colon")]:!b}),style:i},m),(p||0===p)&&o.createElement("span",{className:a()("".concat(t,"-item-content")),style:s},p)))};function v(e,t,n){let{colon:c,prefixCls:a,bordered:l}=t,{component:r,type:i,showLabel:s,showContent:d,labelStyle:m,contentStyle:p}=n;return e.map(((e,t)=>{let{label:n,children:b,prefixCls:u=a,className:g,style:f,labelStyle:h,contentStyle:y,span:v=1,key:w}=e;return"string"===typeof r?o.createElement(x,{key:"".concat(i,"-").concat(w||t),className:g,style:f,labelStyle:Object.assign(Object.assign({},m),h),contentStyle:Object.assign(Object.assign({},p),y),span:v,colon:c,component:r,itemPrefixCls:u,bordered:l,label:s?n:null,content:d?b:null}):[o.createElement(x,{key:"label-".concat(w||t),className:g,style:Object.assign(Object.assign(Object.assign({},m),f),h),span:1,colon:c,component:r[0],itemPrefixCls:u,bordered:l,label:n}),o.createElement(x,{key:"content-".concat(w||t),className:g,style:Object.assign(Object.assign(Object.assign({},p),f),y),span:2*v-1,component:r[1],itemPrefixCls:u,bordered:l,content:b})]}))}const w=e=>{const t=o.useContext(m),{prefixCls:n,vertical:c,row:a,index:l,bordered:r}=e;return c?o.createElement(o.Fragment,null,o.createElement("tr",{key:"label-".concat(l),className:"".concat(n,"-row")},v(a,e,Object.assign({component:"th",type:"label",showLabel:!0},t))),o.createElement("tr",{key:"content-".concat(l),className:"".concat(n,"-row")},v(a,e,Object.assign({component:"td",type:"content",showContent:!0},t)))):o.createElement("tr",{key:l,className:"".concat(n,"-row")},v(a,e,Object.assign({component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))};var O=n(67521),S=n(55564),j=n(89922);const E=e=>{const{componentCls:t,labelBg:n}=e;return{["&".concat(t,"-bordered")]:{["> ".concat(t,"-view")]:{border:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"> table":{tableLayout:"auto",borderCollapse:"collapse"},["".concat(t,"-row")]:{borderBottom:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderBottom:"none"},["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat(e.padding,"px ").concat(e.paddingLG,"px"),borderInlineEnd:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderInlineEnd:"none"}},["> ".concat(t,"-item-label")]:{color:e.colorTextSecondary,backgroundColor:n,"&::after":{display:"none"}}}},["&".concat(t,"-middle")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat(e.paddingSM,"px ").concat(e.paddingLG,"px")}}},["&".concat(t,"-small")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat(e.paddingXS,"px ").concat(e.padding,"px")}}}}}},C=e=>{const{componentCls:t,extraColor:n,itemPaddingBottom:o,colonMarginRight:c,colonMarginLeft:a,titleMarginBottom:l}=e;return{[t]:Object.assign(Object.assign(Object.assign({},(0,O.Wf)(e)),E(e)),{"&-rtl":{direction:"rtl"},["".concat(t,"-header")]:{display:"flex",alignItems:"center",marginBottom:l},["".concat(t,"-title")]:Object.assign(Object.assign({},O.vS),{flex:"auto",color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}),["".concat(t,"-extra")]:{marginInlineStart:"auto",color:n,fontSize:e.fontSize},["".concat(t,"-view")]:{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed"}},["".concat(t,"-row")]:{"> th, > td":{paddingBottom:o},"&:last-child":{borderBottom:"none"}},["".concat(t,"-item-label")]:{color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:"".concat(a,"px ").concat(c,"px")},["&".concat(t,"-item-no-colon::after")]:{content:'""'}},["".concat(t,"-item-no-label")]:{"&::after":{margin:0,content:'""'}},["".concat(t,"-item-content")]:{display:"table-cell",flex:1,color:e.contentColor,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"},["".concat(t,"-item")]:{paddingBottom:0,verticalAlign:"top","&-container":{display:"flex",["".concat(t,"-item-label")]:{display:"inline-flex",alignItems:"baseline"},["".concat(t,"-item-content")]:{display:"inline-flex",alignItems:"baseline"}}},"&-middle":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingSM}}},"&-small":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingXS}}}})}},M=(0,S.Z)("Descriptions",(e=>{const t=(0,j.TS)(e,{});return[C(t)]}),(e=>({labelBg:e.colorFillAlter,titleColor:e.colorText,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,contentColor:e.colorText,extraColor:e.colorText})));var N=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n};const k=e=>{const{prefixCls:t,title:n,extra:c,column:p,colon:b=!0,bordered:g,layout:h,children:y,className:x,rootClassName:v,style:O,size:S,labelStyle:j,contentStyle:E,items:C}=e,k=N(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle","items"]),{getPrefixCls:L,direction:P,descriptions:z}=o.useContext(r.E_),B=L("descriptions",t),Z=(0,s.Z)(),H=o.useMemo((()=>{var e;return"number"===typeof p?p:null!==(e=(0,l.m9)(Z,Object.assign(Object.assign({},d),p)))&&void 0!==e?e:3}),[Z,p]),I=u(Z,C,y),T=(0,i.Z)(S),X=f(H,I),[W,G]=M(B),R=o.useMemo((()=>({labelStyle:j,contentStyle:E})),[j,E]);return W(o.createElement(m.Provider,{value:R},o.createElement("div",Object.assign({className:a()(B,null===z||void 0===z?void 0:z.className,{["".concat(B,"-").concat(T)]:T&&"default"!==T,["".concat(B,"-bordered")]:!!g,["".concat(B,"-rtl")]:"rtl"===P},x,v,G),style:Object.assign(Object.assign({},null===z||void 0===z?void 0:z.style),O)},k),(n||c)&&o.createElement("div",{className:"".concat(B,"-header")},n&&o.createElement("div",{className:"".concat(B,"-title")},n),c&&o.createElement("div",{className:"".concat(B,"-extra")},c)),o.createElement("div",{className:"".concat(B,"-view")},o.createElement("table",null,o.createElement("tbody",null,X.map(((e,t)=>o.createElement(w,{key:t,index:t,colon:b,prefixCls:B,vertical:"vertical"===h,bordered:g,row:e})))))))))};k.Item=h;const L=k;var P=n(80184);const z=function(e){let{children:t,...n}=e;return(0,P.jsx)(L,{...n,children:t})}},19581:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(72791);function c(){const[,e]=o.useReducer((e=>e+1),0);return e}},70635:(e,t,n)=>{n.d(t,{ZP:()=>i,c4:()=>a,m9:()=>s});var o=n(72791),c=n(66875);const a=["xxl","xl","lg","md","sm","xs"],l=e=>({xs:"(max-width: ".concat(e.screenXSMax,"px)"),sm:"(min-width: ".concat(e.screenSM,"px)"),md:"(min-width: ".concat(e.screenMD,"px)"),lg:"(min-width: ".concat(e.screenLG,"px)"),xl:"(min-width: ".concat(e.screenXL,"px)"),xxl:"(min-width: ".concat(e.screenXXL,"px)")}),r=e=>{const t=e,n=[].concat(a).reverse();return n.forEach(((e,o)=>{const c=e.toUpperCase(),a="screen".concat(c,"Min"),l="screen".concat(c);if(!(t[a]<=t[l]))throw new Error("".concat(a,"<=").concat(l," fails : !(").concat(t[a],"<=").concat(t[l],")"));if(o<n.length-1){const e="screen".concat(c,"Max");if(!(t[l]<=t[e]))throw new Error("".concat(l,"<=").concat(e," fails : !(").concat(t[l],"<=").concat(t[e],")"));const a=n[o+1].toUpperCase(),r="screen".concat(a,"Min");if(!(t[e]<=t[r]))throw new Error("".concat(e,"<=").concat(r," fails : !(").concat(t[e],"<=").concat(t[r],")"))}})),e};function i(){const[,e]=(0,c.Z)(),t=l(r(e));return o.useMemo((()=>{const e=new Map;let n=-1,o={};return{matchHandlers:{},dispatch:t=>(o=t,e.forEach((e=>e(o))),e.size>=1),subscribe(t){return e.size||this.register(),n+=1,e.set(n,t),t(o),n},unsubscribe(t){e.delete(t),e.size||this.unregister()},unregister(){Object.keys(t).forEach((e=>{const n=t[e],o=this.matchHandlers[n];null===o||void 0===o||o.mql.removeListener(null===o||void 0===o?void 0:o.listener)})),e.clear()},register(){Object.keys(t).forEach((e=>{const n=t[e],c=t=>{let{matches:n}=t;this.dispatch(Object.assign(Object.assign({},o),{[e]:n}))},a=window.matchMedia(n);a.addListener(c),this.matchHandlers[n]={mql:a,listener:c},c(a)}))},responsiveMap:t}}),[e])}const s=(e,t)=>{if(t&&"object"===typeof t)for(let n=0;n<a.length;n++){const o=a[n];if(e[o]&&void 0!==t[o])return t[o]}}},1815:(e,t,n)=>{n.d(t,{Z:()=>l,q:()=>a});var o=n(72791);const c=o.createContext(void 0),a=e=>{let{children:t,size:n}=e;const a=o.useContext(c);return o.createElement(c.Provider,{value:n||a},t)},l=c},84107:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(72791),c=n(1815);const a=e=>{const t=o.useContext(c.Z);return o.useMemo((()=>e?"string"===typeof e?null!==e&&void 0!==e?e:t:e instanceof Function?e(t):t:t),[e,t])}},52832:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(72791),c=n(71605),a=n(19581),l=n(70635);const r=function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];const t=(0,o.useRef)({}),n=(0,a.Z)(),r=(0,l.ZP)();return(0,c.Z)((()=>{const o=r.subscribe((o=>{t.current=o,e&&n()}));return()=>r.unsubscribe(o)}),[]),t.current}},85501:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(72791),c=n(73873);function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];return o.Children.forEach(e,(function(e){(void 0!==e&&null!==e||t.keepEmpty)&&(Array.isArray(e)?n=n.concat(a(e)):(0,c.isFragment)(e)&&e.props?n=n.concat(a(e.props.children,t)):n.push(e))})),n}}}]);
//# sourceMappingURL=2919.a49b2c7d.chunk.js.map