(function(F,K){typeof exports=="object"&&typeof module<"u"?K(exports,require("dayjs"),require("vue")):typeof define=="function"&&define.amd?define(["exports","dayjs","vue"],K):(F=typeof globalThis<"u"?globalThis:F||self,K(F.VueGanttastic={},F.dayjs,F.Vue))})(this,function(F,K,e){"use strict";const I=(t=>t&&typeof t=="object"&&"default"in t?t:{default:t})(K);var J=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ke={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){var r="day";return function(a,y,m){var d=function(l){return l.add(4-l.isoWeekday(),r)},i=y.prototype;i.isoWeekYear=function(){return d(this).year()},i.isoWeek=function(l){if(!this.$utils().u(l))return this.add(7*(l-this.isoWeek()),r);var o,u,g,w,x=d(this),D=(o=this.isoWeekYear(),u=this.$u,g=(u?m.utc:m)().year(o).startOf("year"),w=4-g.isoWeekday(),g.isoWeekday()>4&&(w+=7),g.add(w,r));return x.diff(D,"week")+1},i.isoWeekday=function(l){return this.$utils().u(l)?this.day()||7:this.day(this.day()%7?l:l-7)};var s=i.startOf;i.startOf=function(l,o){var u=this.$utils(),g=!!u.u(o)||o;return u.p(l)==="isoweek"?g?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):s.bind(this)(l,o)}}})})(ke);const Qe=ke.exports;var Be={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){return function(r,a){a.prototype.isSameOrBefore=function(y,m){return this.isSame(y,m)||this.isBefore(y,m)}}})})(Be);const Ze=Be.exports;var Ee={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){return function(r,a){a.prototype.isSameOrAfter=function(y,m){return this.isSame(y,m)||this.isAfter(y,m)}}})})(Ee);const Ke=Ee.exports;var De={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){return function(r,a,y){a.prototype.isBetween=function(m,d,i,s){var l=y(m),o=y(d),u=(s=s||"()")[0]==="(",g=s[1]===")";return(u?this.isAfter(l,i):!this.isBefore(l,i))&&(g?this.isBefore(o,i):!this.isAfter(o,i))||(u?this.isBefore(l,i):!this.isAfter(l,i))&&(g?this.isAfter(o,i):!this.isBefore(o,i))}}})})(De);const Je=De.exports;var Se={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){var r="week",a="year";return function(y,m,d){var i=m.prototype;i.week=function(s){if(s===void 0&&(s=null),s!==null)return this.add(7*(s-this.week()),"day");var l=this.$locale().yearStart||1;if(this.month()===11&&this.date()>25){var o=d(this).startOf(a).add(1,a).date(l),u=d(this).endOf(r);if(o.isBefore(u))return 1}var g=d(this).startOf(a).date(l).startOf(r).subtract(1,"millisecond"),w=this.diff(g,r,!0);return w<0?d(this).startOf("week").week():Math.ceil(w)},i.weeks=function(s){return s===void 0&&(s=null),this.week(s)}}})})(Se);const et=Se.exports;var _e={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){return function(r,a){var y=a.prototype,m=y.format;y.format=function(d){var i=this,s=this.$locale();if(!this.isValid())return m.bind(this)(d);var l=this.$utils(),o=(d||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(u){switch(u){case"Q":return Math.ceil((i.$M+1)/3);case"Do":return s.ordinal(i.$D);case"gggg":return i.weekYear();case"GGGG":return i.isoWeekYear();case"wo":return s.ordinal(i.week(),"W");case"w":case"ww":return l.s(i.week(),u==="w"?1:2,"0");case"W":case"WW":return l.s(i.isoWeek(),u==="W"?1:2,"0");case"k":case"kk":return l.s(String(i.$H===0?24:i.$H),u==="k"?1:2,"0");case"X":return Math.floor(i.$d.getTime()/1e3);case"x":return i.$d.getTime();case"z":return"["+i.offsetName()+"]";case"zzz":return"["+i.offsetName("long")+"]";default:return u}});return m.bind(this)(o)}}})})(_e);const tt=_e.exports;var Te={exports:{}};(function(t,h){(function(r,a){t.exports=a()})(J,function(){var r={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},a=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,y=/\d/,m=/\d\d/,d=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,s={},l=function(c){return(c=+c)+(c>68?1900:2e3)},o=function(c){return function(k){this[c]=+k}},u=[/[+-]\d\d:?(\d\d)?|Z/,function(c){(this.zone||(this.zone={})).offset=function(k){if(!k||k==="Z")return 0;var B=k.match(/([+-]|\d\d)/g),b=60*B[1]+(+B[2]||0);return b===0?0:B[0]==="+"?-b:b}(c)}],g=function(c){var k=s[c];return k&&(k.indexOf?k:k.s.concat(k.f))},w=function(c,k){var B,b=s.meridiem;if(b){for(var T=1;T<=24;T+=1)if(c.indexOf(b(T,0,k))>-1){B=T>12;break}}else B=c===(k?"pm":"PM");return B},x={A:[i,function(c){this.afternoon=w(c,!1)}],a:[i,function(c){this.afternoon=w(c,!0)}],Q:[y,function(c){this.month=3*(c-1)+1}],S:[y,function(c){this.milliseconds=100*+c}],SS:[m,function(c){this.milliseconds=10*+c}],SSS:[/\d{3}/,function(c){this.milliseconds=+c}],s:[d,o("seconds")],ss:[d,o("seconds")],m:[d,o("minutes")],mm:[d,o("minutes")],H:[d,o("hours")],h:[d,o("hours")],HH:[d,o("hours")],hh:[d,o("hours")],D:[d,o("day")],DD:[m,o("day")],Do:[i,function(c){var k=s.ordinal,B=c.match(/\d+/);if(this.day=B[0],k)for(var b=1;b<=31;b+=1)k(b).replace(/\[|\]/g,"")===c&&(this.day=b)}],w:[d,o("week")],ww:[m,o("week")],M:[d,o("month")],MM:[m,o("month")],MMM:[i,function(c){var k=g("months"),B=(g("monthsShort")||k.map(function(b){return b.slice(0,3)})).indexOf(c)+1;if(B<1)throw new Error;this.month=B%12||B}],MMMM:[i,function(c){var k=g("months").indexOf(c)+1;if(k<1)throw new Error;this.month=k%12||k}],Y:[/[+-]?\d+/,o("year")],YY:[m,function(c){this.year=l(c)}],YYYY:[/\d{4}/,o("year")],Z:u,ZZ:u};function D(c){var k,B;k=c,B=s&&s.formats;for(var b=(c=k.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function($,O,R){var Y=R&&R.toUpperCase();return O||B[R]||r[R]||B[Y].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(A,P,L){return P||L.slice(1)})})).match(a),T=b.length,f=0;f<T;f+=1){var v=b[f],p=x[v],E=p&&p[0],S=p&&p[1];b[f]=S?{regex:E,parser:S}:v.replace(/^\[|\]$/g,"")}return function($){for(var O={},R=0,Y=0;R<T;R+=1){var A=b[R];if(typeof A=="string")Y+=A.length;else{var P=A.regex,L=A.parser,z=$.slice(Y),N=P.exec(z)[0];L.call(O,N),$=$.replace(N,"")}}return function(U){var te=U.afternoon;if(te!==void 0){var H=U.hours;te?H<12&&(U.hours+=12):H===12&&(U.hours=0),delete U.afternoon}}(O),O}}return function(c,k,B){B.p.customParseFormat=!0,c&&c.parseTwoDigitYear&&(l=c.parseTwoDigitYear);var b=k.prototype,T=b.parse;b.parse=function(f){var v=f.date,p=f.utc,E=f.args;this.$u=p;var S=E[1];if(typeof S=="string"){var $=E[2]===!0,O=E[3]===!0,R=$||O,Y=E[2];O&&(Y=E[2]),s=this.$locale(),!$&&Y&&(s=B.Ls[Y]),this.$d=function(z,N,U,te){try{if(["x","X"].indexOf(N)>-1)return new Date((N==="X"?1e3:1)*z);var H=D(N)(z),ne=H.year,ee=H.month,me=H.day,he=H.hours,ge=H.minutes,pe=H.seconds,ye=H.milliseconds,se=H.zone,le=H.week,re=new Date,Z=me||(ne||ee?1:re.getDate()),ce=ne||re.getFullYear(),oe=0;ne&&!ee||(oe=ee>0?ee-1:re.getMonth());var n,C=he||0,_=ge||0,M=pe||0,G=ye||0;return se?new Date(Date.UTC(ce,oe,Z,C,_,M,G+60*se.offset*1e3)):U?new Date(Date.UTC(ce,oe,Z,C,_,M,G)):(n=new Date(ce,oe,Z,C,_,M,G),le&&(n=te(n).week(le).toDate()),n)}catch{return new Date("")}}(v,S,p,B),this.init(),Y&&Y!==!0&&(this.$L=this.locale(Y).$L),R&&v!=this.format(S)&&(this.$d=new Date("")),s={}}else if(S instanceof Array)for(var A=S.length,P=1;P<=A;P+=1){E[1]=S[P-1];var L=B.apply(this,E);if(L.isValid()){this.$d=L.$d,this.$L=L.$L,this.init();break}P===A&&(this.$d=new Date(""))}else T.call(this,f)}}})})(Te);const nt=Te.exports,Ce=Symbol("CHART_ROWS_KEY"),Me=Symbol("CONFIG_KEY"),Oe=Symbol("EMIT_BAR_EVENT_KEY"),Le=Symbol("BAR_CONTAINER_KEY");function j(){const t=e.inject(Me);if(!t)throw Error("Failed to inject config!");return t}const Q="YYYY-MM-DD HH:mm";function ae(t=j()){const{chartStart:h,chartEnd:r,barStart:a,barEnd:y,dateFormat:m}=t,d=e.computed(()=>s(h.value)),i=e.computed(()=>s(r.value)),s=(o,u)=>{let g;if(u!==void 0&&typeof o!="string"&&!(o instanceof Date)&&(g=u==="start"?o[a.value]:o[y.value]),typeof o=="string")g=o;else if(o instanceof Date)return I.default(o);const w=m.value||Q;return I.default(g,w,!0)};return{chartStartDayjs:d,chartEndDayjs:i,toDayjs:s,format:(o,u)=>u===!1?o instanceof Date?o:I.default(o).toDate():(typeof o=="string"||o instanceof Date?s(o):o).format(u)}}function $e(){const{precision:t}=j(),{chartStartDayjs:h,chartEndDayjs:r}=ae(),a=e.computed(()=>{switch(t==null?void 0:t.value){case"hour":return"day";case"day":return"month";case"date":case"week":return"month";case"month":return"year";default:throw new Error("Precision prop incorrect. Must be one of the following: 'hour', 'day', 'date', 'week', 'month'")}}),y=e.computed(()=>{switch(t.value){case"date":return"day";case"week":return"isoWeek";default:return t.value}}),m={hour:"HH",date:"DD.MMM",day:"DD.MMM",week:"WW",month:"MMMM YYYY",year:"YYYY"};return{timeaxisUnits:e.computed(()=>{const i=[],s=[],l=r.value.diff(h.value,"minutes",!0),o=a.value,u=y.value;let g=h.value,w=h.value;for(;w.isSameOrBefore(r.value);){const x=w.endOf(u),c=x.isAfter(r.value)?r.value.diff(w,"minutes",!0)/l*100:x.diff(w,"minutes",!0)/l*100;s.push({label:w.format(m[t==null?void 0:t.value]),value:String(w),date:w.toDate(),width:String(c)+"%"}),w=x.add(1,u==="isoWeek"?"week":u).startOf(u)}for(;g.isSameOrBefore(r.value);){const x=g.endOf(o),c=x.isAfter(r.value)?r.value.diff(g,"minutes",!0)/l*100:x.diff(g,"minutes",!0)/l*100;i.push({label:g.format(m[o]),value:String(g),date:g.toDate(),width:String(c)+"%"}),g=x.add(1,o).startOf(o)}return{upperUnits:i,lowerUnits:s}})}}const rt={class:"g-grid-container"},ot=e.defineComponent({__name:"GGanttGrid",props:{highlightedUnits:{}},setup(t){const{colors:h}=j(),{timeaxisUnits:r}=$e();return(a,y)=>(e.openBlock(),e.createElementBlock("div",rt,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(r).lowerUnits,({label:m,value:d,width:i})=>{var s;return e.openBlock(),e.createElementBlock("div",{key:m,class:"g-grid-line",style:e.normalizeStyle({width:i,background:(s=t.highlightedUnits)!=null&&s.includes(Number(d))?e.unref(h).hoverHighlight:void 0})},null,4)}),128))]))}}),It="";function be(){const t=e.inject(Ce);if(!t)throw Error("Failed to inject getChartRows!");return t}const at={class:"g-label-column-rows"},it=e.defineComponent({__name:"GGanttLabelColumn",setup(t){const{font:h,colors:r,labelColumnTitle:a,rowHeight:y}=j(),m=be();return(d,i)=>(e.openBlock(),e.createElementBlock("div",{class:"g-label-column",style:e.normalizeStyle({fontFamily:e.unref(h),color:e.unref(r).text})},[e.renderSlot(d.$slots,"label-column-title",{},()=>[e.createElementVNode("div",{class:"g-label-column-header",style:e.normalizeStyle({background:e.unref(r).primary})},e.toDisplayString(e.unref(a)),5)]),e.createElementVNode("div",at,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(m)(),({label:s},l)=>(e.openBlock(),e.createElementBlock("div",{key:`${s}_${l}`,class:"g-label-column-row",style:e.normalizeStyle({background:l%2===0?e.unref(r).ternary:e.unref(r).quartenary,height:`${e.unref(y)}px`})},[e.renderSlot(d.$slots,"label-column-row",{label:s},()=>[e.createElementVNode("span",null,e.toDisplayString(s),1)])],4))),128))])],4))}}),zt="",st={class:"g-timeaxis"},lt={class:"g-timeunits-container"},ct={class:"g-timeunits-container"},dt=e.defineComponent({__name:"GGanttTimeaxis",setup(t){const{precision:h,colors:r}=j(),{timeaxisUnits:a}=$e();return(y,m)=>(e.openBlock(),e.createElementBlock("div",st,[e.createElementVNode("div",lt,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(a).upperUnits,({label:d,value:i,date:s,width:l},o)=>(e.openBlock(),e.createElementBlock("div",{key:d,class:"g-upper-timeunit",style:e.normalizeStyle({background:o%2===0?e.unref(r).primary:e.unref(r).secondary,color:e.unref(r).text,width:l})},[e.renderSlot(y.$slots,"upper-timeunit",{label:d,value:i,date:s},()=>[e.createTextVNode(e.toDisplayString(d),1)])],4))),128))]),e.createElementVNode("div",ct,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(a).lowerUnits,({label:d,value:i,date:s,width:l},o)=>(e.openBlock(),e.createElementBlock("div",{key:d,class:"g-timeunit",style:e.normalizeStyle({background:o%2===0?e.unref(r).ternary:e.unref(r).quartenary,color:e.unref(r).text,flexDirection:e.unref(h)==="hour"?"column":"row",alignItems:e.unref(h)==="hour"?"":"center",width:l})},[e.renderSlot(y.$slots,"timeunit",{label:d,value:i,date:s},()=>[e.createTextVNode(e.toDisplayString(d),1)]),e.unref(h)==="hour"?(e.openBlock(),e.createElementBlock("div",{key:0,class:"g-timeaxis-hour-pin",style:e.normalizeStyle({background:e.unref(r).text})},null,4)):e.createCommentVNode("",!0)],4))),128))])]))}}),Nt="",ut="cadetblue",ft=e.defineComponent({__name:"GGanttBarTooltip",props:{bar:{},modelValue:{type:Boolean}},setup(t){const h={hour:"HH:mm",day:"DD. MMM HH:mm",date:"DD. MMMM YYYY",month:"DD. MMMM YYYY",week:"DD. MMMM YYYY (WW)"},r=t,{bar:a}=e.toRefs(r),{precision:y,font:m,barStart:d,barEnd:i,rowHeight:s}=j(),l=e.ref("0px"),o=e.ref("0px");e.watch(()=>r.bar,async()=>{var f;await e.nextTick();const c=((f=a==null?void 0:a.value)==null?void 0:f.id)||"";if(!c)return;const k=document.getElementById(c),{top:B,left:b}=(k==null?void 0:k.getBoundingClientRect())||{top:0,left:0},T=Math.max(b,10);l.value=`${B+s.value-10}px`,o.value=`${T}px`},{deep:!0,immediate:!0});const u=e.computed(()=>{var c,k;return((k=(c=a==null?void 0:a.value)==null?void 0:c.style)==null?void 0:k.background)||ut}),{toDayjs:g}=ae(),w=e.computed(()=>{var c;return(c=a.value)==null?void 0:c[d.value]}),x=e.computed(()=>{var c;return(c=a.value)==null?void 0:c[i.value]}),D=e.computed(()=>{if(!(a!=null&&a.value))return"";const c=h[y.value],k=g(w.value).format(c),B=g(x.value).format(c);return`${k} \u2013 ${B}`});return(c,k)=>(e.openBlock(),e.createBlock(e.Teleport,{to:"body"},[e.createVNode(e.Transition,{name:"g-fade",mode:"out-in"},{default:e.withCtx(()=>[t.modelValue?(e.openBlock(),e.createElementBlock("div",{key:0,class:"g-gantt-tooltip",style:e.normalizeStyle({top:l.value,left:o.value,fontFamily:e.unref(m)})},[e.createElementVNode("div",{class:"g-gantt-tooltip-color-dot",style:e.normalizeStyle({background:u.value})},null,4),e.renderSlot(c.$slots,"default",{bar:e.unref(a),barStart:w.value,barEnd:x.value},()=>[e.createTextVNode(e.toDisplayString(D.value),1)])],4)):e.createCommentVNode("",!0)]),_:3})]))}}),Ft="";function ue(t=j()){const{dateFormat:h,chartSize:r}=t,{chartStartDayjs:a,chartEndDayjs:y,toDayjs:m,format:d}=ae(t),i=e.computed(()=>y.value.diff(a.value,"minutes"));return{mapTimeToPosition:o=>{const u=r.width.value||0,g=m(o).diff(a.value,"minutes",!0);return Math.ceil(g/i.value*u)},mapPositionToTime:o=>{const u=r.width.value||0,g=o/u*i.value;return d(a.value.add(g,"minutes"),h.value)}}}const mt=e.defineComponent({__name:"GGanttCurrentTime",setup(t){const{mapTimeToPosition:h}=ue(),r=e.ref(I.default()),{colors:a,dateFormat:y,currentTimeLabel:m}=j(),d=e.computed(()=>{const i=y.value||"YYYY-MM-DD HH:mm";return h(I.default(r.value,i).format(i))});return(i,s)=>(e.openBlock(),e.createElementBlock("div",{class:"g-grid-current-time",style:e.normalizeStyle({left:`${d.value}px`})},[e.createElementVNode("div",{class:"g-grid-current-time-marker",style:e.normalizeStyle({border:`1px dashed ${e.unref(a).markerCurrentTime}`})},null,4),e.createElementVNode("span",{class:"g-grid-current-time-text",style:e.normalizeStyle({color:e.unref(a).markerCurrentTime})},[e.renderSlot(i.$slots,"current-time-label",{},()=>[e.createTextVNode(e.toDisplayString(e.unref(m)),1)])],4)],4))}}),Ht="";var Ye;const ie=typeof window<"u";ie&&((Ye=window==null?void 0:window.navigator)==null?void 0:Ye.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function ht(t){return typeof t=="function"?t():e.unref(t)}function gt(t){return t}function pt(t){return e.getCurrentScope()?(e.onScopeDispose(t),!0):!1}function yt(t,h=!0){e.getCurrentInstance()?e.onMounted(t):h?t():e.nextTick(t)}function fe(t){var h;const r=ht(t);return(h=r==null?void 0:r.$el)!=null?h:r}const Ge=ie?window:void 0;ie&&window.document,ie&&window.navigator,ie&&window.location;function bt(t,h=!1){const r=e.ref(),a=()=>r.value=Boolean(t());return a(),yt(a,h),r}const we=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ve="__vueuse_ssr_handlers__";we[ve]=we[ve]||{},we[ve];var Re=Object.getOwnPropertySymbols,wt=Object.prototype.hasOwnProperty,vt=Object.prototype.propertyIsEnumerable,xt=(t,h)=>{var r={};for(var a in t)wt.call(t,a)&&h.indexOf(a)<0&&(r[a]=t[a]);if(t!=null&&Re)for(var a of Re(t))h.indexOf(a)<0&&vt.call(t,a)&&(r[a]=t[a]);return r};function kt(t,h,r={}){const a=r,{window:y=Ge}=a,m=xt(a,["window"]);let d;const i=bt(()=>y&&"ResizeObserver"in y),s=()=>{d&&(d.disconnect(),d=void 0)},l=e.watch(()=>fe(t),u=>{s(),i.value&&y&&u&&(d=new ResizeObserver(h),d.observe(u,m))},{immediate:!0,flush:"post"}),o=()=>{s(),l()};return pt(o),{isSupported:i,stop:o}}function Bt(t,h={width:0,height:0},r={}){const{window:a=Ge,box:y="content-box"}=r,m=e.computed(()=>{var s,l;return(l=(s=fe(t))==null?void 0:s.namespaceURI)==null?void 0:l.includes("svg")}),d=e.ref(h.width),i=e.ref(h.height);return kt(t,([s])=>{const l=y==="border-box"?s.borderBoxSize:y==="content-box"?s.contentBoxSize:s.devicePixelContentBoxSize;if(a&&m.value){const o=fe(t);if(o){const u=a.getComputedStyle(o);d.value=parseFloat(u.width),i.value=parseFloat(u.height)}}else if(l){const o=Array.isArray(l)?l:[l];d.value=o.reduce((u,{inlineSize:g})=>u+g,0),i.value=o.reduce((u,{blockSize:g})=>u+g,0)}else d.value=s.contentRect.width,i.value=s.contentRect.height},r),e.watch(()=>fe(t),s=>{d.value=s?h.width:0,i.value=s?h.height:0}),{width:d,height:i}}var Ie;(function(t){t.UP="UP",t.RIGHT="RIGHT",t.DOWN="DOWN",t.LEFT="LEFT",t.NONE="NONE"})(Ie||(Ie={}));var Et=Object.defineProperty,ze=Object.getOwnPropertySymbols,Dt=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable,Ne=(t,h,r)=>h in t?Et(t,h,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[h]=r,_t=(t,h)=>{for(var r in h||(h={}))Dt.call(h,r)&&Ne(t,r,h[r]);if(ze)for(var r of ze(h))St.call(h,r)&&Ne(t,r,h[r]);return t};_t({linear:gt},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]});const Fe={default:{primary:"#eeeeee",secondary:"#E0E0E0",ternary:"#F5F5F5",quartenary:"#ededed",hoverHighlight:"rgba(204, 216, 219, 0.5)",markerCurrentTime:"#000",text:"#404040",background:"white"},creamy:{primary:"#ffe8d9",secondary:"#fcdcc5",ternary:"#fff6f0",quartenary:"#f7ece6",hoverHighlight:"rgba(230, 221, 202, 0.5)",markerCurrentTime:"#000",text:"#542d05",background:"white"},crimson:{primary:"#a82039",secondary:"#c41238",ternary:"#db4f56",quartenary:"#ce5f64",hoverHighlight:"rgba(196, 141, 141, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"},dark:{primary:"#404040",secondary:"#303030",ternary:"#353535",quartenary:"#383838",hoverHighlight:"rgba(159, 160, 161, 0.5)",markerCurrentTime:"#fff",text:"white",background:"#525252",toast:"#1f1f1f"},flare:{primary:"#e08a38",secondary:"#e67912",ternary:"#5e5145",quartenary:"#665648",hoverHighlight:"rgba(196, 141, 141, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"},fuchsia:{primary:"#de1d5a",secondary:"#b50b41",ternary:"#ff7da6",quartenary:"#f2799f",hoverHighlight:"rgba(196, 141, 141, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"},grove:{primary:"#3d9960",secondary:"#288542",ternary:"#72b585",quartenary:"#65a577",hoverHighlight:"rgba(160, 219, 171, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"},"material-blue":{primary:"#0D47A1",secondary:"#1565C0",ternary:"#42a5f5",quartenary:"#409fed",hoverHighlight:"rgba(110, 165, 196, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"},sky:{primary:"#b5e3ff",secondary:"#a1d6f7",ternary:"#d6f7ff",quartenary:"#d0edf4",hoverHighlight:"rgba(193, 202, 214, 0.5)",markerCurrentTime:"#000",text:"#022c47",background:"white"},slumber:{primary:"#2a2f42",secondary:"#2f3447",ternary:"#35394d",quartenary:"#2c3044",hoverHighlight:"rgba(179, 162, 127, 0.5)",markerCurrentTime:"#fff",text:"#ffe0b3",background:"#38383b",toast:"#1f1f1f"},vue:{primary:"#258a5d",secondary:"#41B883",ternary:"#35495E",quartenary:"#2a3d51",hoverHighlight:"rgba(160, 219, 171, 0.5)",markerCurrentTime:"#000",text:"white",background:"white"}},Tt={class:"g-gantt-rows-container"},Ct=250,He=.05,Ve=10,Mt=250,Pe=e.defineComponent({__name:"GGanttChart",props:{chartStart:{},chartEnd:{},precision:{default:"day"},barStart:{},barEnd:{},currentTime:{type:Boolean},currentTimeLabel:{default:""},dateFormat:{type:[String,Boolean],default:Q},width:{default:"100%"},hideTimeaxis:{type:Boolean,default:!1},colorScheme:{default:"default"},grid:{type:Boolean,default:!1},pushOnOverlap:{type:Boolean,default:!1},noOverlap:{type:Boolean,default:!1},rowHeight:{default:40},highlightedUnits:{default:()=>[]},font:{default:"inherit"},labelColumnTitle:{default:""},labelColumnWidth:{default:"150px"}},emits:["click-bar","mousedown-bar","mouseup-bar","dblclick-bar","mouseenter-bar","mouseleave-bar","dragstart-bar","drag-bar","dragend-bar","contextmenu-bar","click-chart","dblclick-chart"],setup(t,{emit:h}){const r=t,a=h,{width:y,font:m,colorScheme:d}=e.toRefs(r),i=e.useSlots(),s=e.computed(()=>typeof d.value!="string"?d.value:Fe[d.value]||Fe.default),l=()=>{var _;const n=(_=i.default)==null?void 0:_.call(i),C=[];return n&&n.forEach(M=>{var G;if((G=M.props)!=null&&G.bars){const{label:X,bars:V}=M.props;C.push({label:X,bars:V})}else Array.isArray(M.children)&&M.children.forEach(X=>{var W;const V=X;if((W=V==null?void 0:V.props)!=null&&W.bars){const{label:q,bars:qe}=V.props;C.push({label:q,bars:qe})}})}),C},o=e.ref(!1),u=e.ref(!1),g=e.ref(void 0);let w;const x=n=>{w&&clearTimeout(w),w=setTimeout(()=>{o.value=!0},800),g.value=n},D=()=>{clearTimeout(w),o.value=!1};let c=null;const k=(n,C,_,M)=>{switch(n.type){case"click":c&&clearTimeout(c),c=setTimeout(()=>{a("click-bar",{bar:C,e:n,datetime:_}),c=null},Ct);break;case"mousedown":a("mousedown-bar",{bar:C,e:n,datetime:_});break;case"mouseup":a("mouseup-bar",{bar:C,e:n,datetime:_});break;case"dblclick":c&&(clearTimeout(c),c=null),a("dblclick-bar",{bar:C,e:n,datetime:_});break;case"mouseenter":x(C),a("mouseenter-bar",{bar:C,e:n});break;case"mouseleave":D(),a("mouseleave-bar",{bar:C,e:n});break;case"dragstart":u.value=!0,a("dragstart-bar",{bar:C,e:n});break;case"drag":a("drag-bar",{bar:C,e:n});break;case"dragend":u.value=!1,a("dragend-bar",{bar:C,e:n,movedBars:M});break;case"contextmenu":a("contextmenu-bar",{bar:C,e:n,datetime:_});break}},B=e.ref(null),b=Bt(B),T=e.ref(1),f=e.ref(!1),v=e.ref(0),p=e.ref(0),E=e.ref(!1);let S=null;const $=e.ref(0),O=e.ref(0),R=e.ref(!1),Y=e.computed(()=>{const n=r.dateFormat||Q;return r.chartStart instanceof Date?I.default(r.chartStart):typeof n=="string"?I.default(r.chartStart,n,!0):I.default(r.chartStart)}),A=e.computed(()=>{const n=r.dateFormat||Q;return r.chartEnd instanceof Date?I.default(r.chartEnd):typeof n=="string"?I.default(r.chartEnd,n,!0):I.default(r.chartEnd)}),P=e.computed(()=>A.value.diff(Y.value,"minute")),L=e.ref(0),z=e.computed(()=>P.value/T.value),N=e.computed(()=>Y.value.add(L.value,"minute")),U=e.computed(()=>N.value.add(z.value,"minute")),te=e.computed(()=>{const n=z.value/1440;return n<1?"hour":n<60?"day":n<365?"week":"month"}),H=n=>{if(n.ctrlKey||n.metaKey){n.preventDefault();const C=z.value*.02,_=n.deltaY>0?C:-C;L.value+=_}else{n.preventDefault();const C=n.deltaY>0?-.05:.05,_=Math.max(He,Math.min(Ve,T.value+C)),M=B.value;if(M){const G=M.getBoundingClientRect(),V=(n.clientX-G.left+M.scrollLeft)/(b.width.value||1),W=N.value.add(V*z.value,"minute");T.value=_;const q=P.value/_,Rt=W.diff(Y.value,"minute")-V*q;L.value=Rt}}},ne=n=>{n.target.closest(".g-gantt-bar")||E.value||(S&&clearTimeout(S),S=setTimeout(()=>{const _=B.value;if(!_)return;const M=_.getBoundingClientRect(),G=n.clientX-M.left,X=(b.width.value||1)/z.value,V=G/X,W=N.value.add(V,"minute"),q=r.chartStart instanceof Date?W.toDate():W.format(r.dateFormat||Q);a("click-chart",{e:n,datetime:q}),S=null},Mt))},ee=n=>{if(n.target.closest(".g-gantt-bar"))return;S&&(clearTimeout(S),S=null);const _=B.value;if(!_)return;const M=_.getBoundingClientRect(),G=n.clientX-M.left,X=(b.width.value||1)/z.value,V=G/X,W=N.value.add(V,"minute"),q=r.chartStart instanceof Date?W.toDate():W.format(r.dateFormat||Q);a("dblclick-chart",{e:n,datetime:q})},me=n=>{n.button!==0||n.target.closest(".g-gantt-bar")||(f.value=!0,E.value=!1,v.value=n.clientX,p.value=L.value,n.preventDefault())},he=n=>{if(!f.value||!B.value)return;const _=n.clientX-v.value;Math.abs(_)>3&&(E.value=!0);const M=(b.width.value||1)/z.value,G=-_/M;L.value=p.value+G},ge=()=>{f.value=!1},pe=()=>{f.value=!1},ye=n=>{const C=n[0].clientX-n[1].clientX,_=n[0].clientY-n[1].clientY;return Math.sqrt(C*C+_*_)},se=n=>(n[0].clientX+n[1].clientX)/2,le=n=>{n.target.closest(".g-gantt-bar")||(n.touches.length===2?(n.preventDefault(),R.value=!0,$.value=ye(n.touches),O.value=se(n.touches),p.value=L.value):n.touches.length===1&&(R.value=!0,v.value=n.touches[0].clientX,p.value=L.value))},re=n=>{if(!!R.value){if(n.touches.length===2){n.preventDefault();const C=ye(n.touches),_=se(n.touches),G=(C/$.value-1)*.5,X=Math.max(He,Math.min(Ve,T.value*(1+G))),V=_-O.value,W=(b.width.value||1)/z.value,q=-V/W;T.value=X,L.value=p.value+q,$.value=C,O.value=_,p.value=L.value}else if(n.touches.length===1){n.preventDefault();const C=n.touches[0].clientX-v.value,_=(b.width.value||1)/z.value,M=-C/_;L.value=p.value+M}}},Z=()=>{R.value=!1};e.onMounted(()=>{const n=B.value;n&&(n.addEventListener("wheel",H,{passive:!1}),n.addEventListener("mousedown",me),n.addEventListener("mousemove",he),n.addEventListener("mouseup",ge),n.addEventListener("mouseleave",pe),n.addEventListener("click",ne),n.addEventListener("dblclick",ee),n.addEventListener("touchstart",le,{passive:!1}),n.addEventListener("touchmove",re,{passive:!1}),n.addEventListener("touchend",Z),n.addEventListener("touchcancel",Z))}),e.onUnmounted(()=>{S&&(clearTimeout(S),S=null),c&&(clearTimeout(c),c=null);const n=B.value;n&&(n.removeEventListener("wheel",H),n.removeEventListener("mousedown",me),n.removeEventListener("mousemove",he),n.removeEventListener("mouseup",ge),n.removeEventListener("mouseleave",pe),n.removeEventListener("click",ne),n.removeEventListener("dblclick",ee),n.removeEventListener("touchstart",le),n.removeEventListener("touchmove",re),n.removeEventListener("touchend",Z),n.removeEventListener("touchcancel",Z))});const ce=e.computed(()=>{if(r.chartStart instanceof Date)return N.value.toDate();const n=r.dateFormat||Q;return typeof n=="string"?N.value.format(n):N.value.toDate()}),oe=e.computed(()=>{if(r.chartEnd instanceof Date)return U.value.toDate();const n=r.dateFormat||Q;return typeof n=="string"?U.value.format(n):U.value.toDate()});return e.provide(Ce,l),e.provide(Me,{...e.toRefs(r),precision:te,chartStart:ce,chartEnd:oe,colors:s,chartSize:b}),e.provide(Oe,k),(n,C)=>(e.openBlock(),e.createElementBlock("div",null,[e.createElementVNode("div",{class:e.normalizeClass([{"labels-in-column":!!t.labelColumnTitle}])},[t.labelColumnTitle?(e.openBlock(),e.createBlock(it,{key:0,style:e.normalizeStyle({width:t.labelColumnWidth})},{"label-column-title":e.withCtx(()=>[e.renderSlot(n.$slots,"label-column-title")]),"label-column-row":e.withCtx(({label:_})=>[e.renderSlot(n.$slots,"label-column-row",{label:_})]),_:3},8,["style"])):e.createCommentVNode("",!0),e.createElementVNode("div",{ref_key:"ganttChart",ref:B,class:e.normalizeClass(["g-gantt-chart",{"with-column":t.labelColumnTitle,"is-dragging":f.value}]),style:e.normalizeStyle({width:e.unref(y),background:s.value.background,fontFamily:e.unref(m)})},[t.hideTimeaxis?e.createCommentVNode("",!0):(e.openBlock(),e.createBlock(dt,{key:0},{"upper-timeunit":e.withCtx(({label:_,value:M,date:G})=>[e.renderSlot(n.$slots,"upper-timeunit",{label:_,value:M,date:G})]),timeunit:e.withCtx(({label:_,value:M,date:G})=>[e.renderSlot(n.$slots,"timeunit",{label:_,value:M,date:G})]),_:3})),t.grid?(e.openBlock(),e.createBlock(ot,{key:1,"highlighted-units":t.highlightedUnits},null,8,["highlighted-units"])):e.createCommentVNode("",!0),t.currentTime?(e.openBlock(),e.createBlock(mt,{key:2},{"current-time-label":e.withCtx(()=>[e.renderSlot(n.$slots,"current-time-label")]),_:3})):e.createCommentVNode("",!0),e.createElementVNode("div",Tt,[e.renderSlot(n.$slots,"default")])],6)],2),e.createVNode(ft,{"model-value":o.value||u.value,bar:g.value},{default:e.withCtx(()=>[e.renderSlot(n.$slots,"bar-tooltip",{bar:g.value})]),_:3},8,["model-value","bar"])]))}}),Pt="";function je(t,h=()=>null,r=()=>null,a=j()){const{barStart:y,barEnd:m,pushOnOverlap:d}=a,i=e.ref(!1);let s=0,l;const{mapPositionToTime:o}=ue(a),{toDayjs:u}=ae(a),g=b=>{const T=document.getElementById(t.id);if(!T)return;switch(s=b.clientX-(T.getBoundingClientRect().left||0),b.target.className){case"g-gantt-bar-handle-left":document.body.style.cursor="ew-resize",l=D;break;case"g-gantt-bar-handle-right":document.body.style.cursor="ew-resize",l=c;break;default:l=x}i.value=!0,window.addEventListener("mousemove",l),window.addEventListener("mouseup",B)},w=()=>{var f;const b=document.getElementById(t.id),T=(f=b==null?void 0:b.closest(".g-gantt-row-bars-container"))==null?void 0:f.getBoundingClientRect();return{barElement:b,barContainer:T}},x=b=>{const{barElement:T,barContainer:f}=w();if(!T||!f)return;const v=T.getBoundingClientRect().width,p=b.clientX-f.left-s,E=p+v;k(p,E)||(t[y.value]=o(p),t[m.value]=o(E),h(b,t))},D=b=>{const{barElement:T,barContainer:f}=w();if(!T||!f)return;const v=b.clientX-f.left,p=o(v);u(p).isSameOrAfter(u(t,"end"))||(t[y.value]=p,h(b,t))},c=b=>{const{barElement:T,barContainer:f}=w();if(!T||!f)return;const v=b.clientX-f.left,p=o(v);u(p).isSameOrBefore(u(t,"start"))||(t[m.value]=p,h(b,t))},k=(b,T)=>{if(!d.value)return!1;const f=t.dragLimitLeft,v=t.dragLimitRight;return b&&f!=null&&b<f||T&&v!=null&&T>v},B=b=>{i.value=!1,document.body.style.cursor="",window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",B),r(b,t)};return{isDragging:i,initDrag:g}}function Ae(){const t=e.inject(Oe);if(!t)throw Error("Failed to inject emitBarEvent!");return t}function Ot(){const t=j(),h=be(),r=Ae(),{pushOnOverlap:a,barStart:y,barEnd:m,noOverlap:d,dateFormat:i}=t,s=new Map,{toDayjs:l,format:o}=ae(),u=(f,v)=>{const{initDrag:p}=je(f,w,B,t);r({...v,type:"dragstart"},f),p(v),b(f)},g=(f,v)=>{const p=f.bundle;p!=null&&(h().forEach(E=>{E.bars.forEach(S=>{if(S.bundle===p){const $=S===f?B:()=>null,{initDrag:O}=je(S,w,$,t);O(v),b(S)}})}),r({...v,type:"dragstart"},f))},w=(f,v)=>{r({...f,type:"drag"},v),x(v)},x=f=>{if(!(a!=null&&a.value))return;let v=f,{overlapBar:p,overlapType:E}=D(v);for(;p;){b(p);const S=l(v[y.value]),$=l(v[m.value]),O=l(p[y.value]),R=l(p[m.value]);let Y;switch(E){case"left":Y=R.diff(S,"minutes",!0),p[m.value]=o(v[y.value],i.value),p[y.value]=o(O.subtract(Y,"minutes"),i.value);break;case"right":Y=$.diff(O,"minutes",!0),p[y.value]=o($,i.value),p[m.value]=o(R.add(Y,"minutes"),i.value);break;default:console.warn("Vue-Ganttastic: One bar is inside of the other one! This should never occur while push-on-overlap is active!");return}p&&(E==="left"||E==="right")&&c(p,Y,E),v=p,{overlapBar:p,overlapType:E}=D(p)}},D=f=>{var A,P;let v,p,E;const S=(P=(A=h().find(L=>L.bars.includes(f)))==null?void 0:A.bars)!=null?P:[],$=l(f[y.value]),O=l(f[m.value]);return{overlapBar:S.find(L=>{if(L===f)return!1;const z=l(L[y.value]),N=l(L[m.value]);return v=$.isBetween(z,N),p=O.isBetween(z,N),E=z.isBetween($,O)||N.isBetween($,O),v||p||E}),overlapType:v?"left":p?"right":E?"between":null}},c=(f,v,p)=>{b(f),f.bundle&&h().forEach(E=>{E.bars.forEach(S=>{S.bundle===f.bundle&&S!==f&&(b(S),k(S,v,p))})})},k=(f,v,p)=>{switch(p){case"left":f[y.value]=o(l(f,"start").subtract(v,"minutes"),i.value),f[m.value]=o(l(f,"end").subtract(v,"minutes"),i.value);break;case"right":f[y.value]=o(l(f,"start").add(v,"minutes"),i.value),f[m.value]=o(l(f,"end").add(v,"minutes"),i.value)}x(f)},B=(f,v)=>{T();const p={...f,type:"dragend"};r(p,v,void 0,new Map(s)),s.clear()},b=f=>{if(!s.has(f)){const v=f[y.value],p=f[m.value];s.set(f,{oldStart:v,oldEnd:p})}},T=()=>{if(a.value||!d.value)return;let f=!1;s.forEach((v,p)=>{const{overlapBar:E}=D(p);E!=null&&(f=!0)}),f&&s.forEach(({oldStart:v,oldEnd:p},E)=>{E[y.value]=v,E[m.value]=p})};return{initDragOfBar:u,initDragOfBundle:g}}function Lt(){const{pushOnOverlap:t}=j(),h=be(),r=d=>{const i=[];return d!=null&&h().forEach(s=>{s.bars.forEach(l=>{l.bundle===d&&i.push(l)})}),i},a=d=>{if(!t.value||d.pushOnOverlap===!1)return;for(const s of["left","right"]){const l=s,{gapDistanceSoFar:o,bundleBarsAndGapDist:u}=y(d,0,l);let g=o;const w=u;if(!w)continue;for(let D=0;D<w.length;D++){const c=w[D].bar,k=w[D].gapDistance;r(c.bundle).filter(b=>b!==c).forEach(b=>{const T=y(b,k,l),f=T.gapDistanceSoFar,v=T.bundleBarsAndGapDist;f!=null&&(!g||f<g)&&(g=f),v.forEach(p=>{w.find(E=>E.bar===p.bar)||w.push(p)})})}const x=document.getElementById(d.id);g!=null&&l==="left"?d.dragLimitLeft=x.offsetLeft-g:g!=null&&l==="right"&&(d.dragLimitRight=x.offsetLeft+x.offsetWidth+g)}r(d.bundle).forEach(s=>{s.dragLimitLeft=d.dragLimitLeft,s.dragLimitRight=d.dragLimitRight})},y=(d,i=0,s)=>{const l=d.bundle?[{bar:d,gapDistance:i}]:[];let o=d,u=m(o,s);if(s==="left")for(;u;){const g=document.getElementById(o.id),w=document.getElementById(u.id),x=w.offsetLeft+w.offsetWidth;if(i+=g.offsetLeft-x,u.immobile)return{gapDistanceSoFar:i,bundleBarsAndGapDist:l};u.bundle&&l.push({bar:u,gapDistance:i}),o=u,u=m(u,"left")}if(s==="right")for(;u;){const g=document.getElementById(o.id),w=document.getElementById(u.id),x=g.offsetLeft+g.offsetWidth;if(i+=w.offsetLeft-x,u.immobile)return{gapDistanceSoFar:i,bundleBarsAndGapDist:l};u.bundle&&l.push({bar:u,gapDistance:i}),o=u,u=m(u,"right")}return{gapDistanceSoFar:null,bundleBarsAndGapDist:l}},m=(d,i)=>{var u,g;const s=document.getElementById(d.id),l=(g=(u=h().find(w=>w.bars.includes(d)))==null?void 0:u.bars)!=null?g:[];let o=[];return i==="left"?o=l.filter(w=>{const x=document.getElementById(w.id);return x&&x.offsetLeft<s.offsetLeft&&w.pushOnOverlap!==!1}):o=l.filter(w=>{const x=document.getElementById(w.id);return x&&x.offsetLeft>s.offsetLeft&&w.pushOnOverlap!==!1}),o.length>0?o.reduce((w,x)=>{const D=document.getElementById(w.id),c=document.getElementById(x.id),k=Math.abs(D.offsetLeft-s.offsetLeft),B=Math.abs(c.offsetLeft-s.offsetLeft);return k<B?w:x},o[0]):null};return{setDragLimitsOfGanttBar:a}}const $t=["id"],Yt={class:"g-gantt-bar-label"},Gt=["innerHTML"],xe=e.defineComponent({__name:"GGanttBar",props:{bar:{}},setup(t){const h=t,r=Ae(),a=j(),{rowHeight:y}=a,{bar:m}=e.toRefs(h),{mapTimeToPosition:d,mapPositionToTime:i}=ue(),{initDragOfBar:s,initDragOfBundle:l}=Ot(),{setDragLimitsOfGanttBar:o}=Lt(),u=e.ref(!1);function g(E){h.bar.bundle!=null?l(m.value,E):s(m.value,E),u.value=!0}const w=()=>{o(m.value),!h.bar.immobile&&(window.addEventListener("mousemove",g,{once:!0}),window.addEventListener("mouseup",()=>{window.removeEventListener("mousemove",g),u.value=!1},{once:!0}))},x=e.inject(Le),D=E=>{var O;E.preventDefault(),E.type==="mousedown"&&w();const S=(O=x==null?void 0:x.value)==null?void 0:O.getBoundingClientRect();if(!S)return;const $=i(E.clientX-S.left);r(E,m.value,$)},{barStart:c,barEnd:k,width:B,chartStart:b,chartEnd:T,chartSize:f}=a,v=e.ref(0),p=e.ref(0);return e.onMounted(()=>{e.watch([m,B,b,T,f.width],()=>{v.value=d(m.value[c.value]),p.value=d(m.value[k.value])},{deep:!0,immediate:!0})}),(E,S)=>(e.openBlock(),e.createElementBlock("div",{id:e.unref(m).id,class:e.normalizeClass(["g-gantt-bar",e.unref(m).class||""]),style:e.normalizeStyle({...e.unref(m).style,position:"absolute",top:`${e.unref(y)*.1}px`,left:`${v.value}px`,width:`${p.value-v.value}px`,height:`${e.unref(y)*.8}px`,zIndex:u.value?3:2}),onMousedown:D,onClick:D,onDblclick:D,onMouseenter:D,onMouseleave:D,onContextmenu:D},[e.createElementVNode("div",Yt,[e.renderSlot(E.$slots,"default",{bar:e.unref(m)},()=>[e.createElementVNode("div",null,e.toDisplayString(e.unref(m).label||""),1),e.unref(m).html?(e.openBlock(),e.createElementBlock("div",{key:0,innerHTML:e.unref(m).html},null,8,Gt)):e.createCommentVNode("",!0)])]),e.unref(m).hasHandles?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[S[0]||(S[0]=e.createElementVNode("div",{class:"g-gantt-bar-handle-left"},null,-1)),S[1]||(S[1]=e.createElementVNode("div",{class:"g-gantt-bar-handle-right"},null,-1))],64)):e.createCommentVNode("",!0)],46,$t))}}),jt="",We=e.defineComponent({__name:"GGanttRow",props:{label:{},bars:{},highlightOnHover:{type:Boolean}},emits:["drop"],setup(t,{emit:h}){const r=t,a=h,{rowHeight:y,colors:m,labelColumnTitle:d}=j(),{highlightOnHover:i}=e.toRefs(r),s=e.ref(!1),l=e.computed(()=>({height:`${y.value}px`,background:(i==null?void 0:i.value)&&s.value?m.value.hoverHighlight:null})),{mapPositionToTime:o}=ue(),u=e.ref(null);e.provide(Le,u);const g=x=>{var B;const D=(B=u.value)==null?void 0:B.getBoundingClientRect();if(!D){console.error("Vue-Ganttastic: failed to find bar container element for row.");return}const c=x.clientX-D.left,k=o(c);a("drop",{e:x,datetime:k})},w=x=>!x||/^\s*$/.test(x);return(x,D)=>(e.openBlock(),e.createElementBlock("div",{class:"g-gantt-row",style:e.normalizeStyle(l.value),onDragover:D[0]||(D[0]=e.withModifiers(c=>s.value=!0,["prevent"])),onDragleave:D[1]||(D[1]=c=>s.value=!1),onDrop:D[2]||(D[2]=c=>g(c)),onMouseover:D[3]||(D[3]=c=>s.value=!0),onMouseleave:D[4]||(D[4]=c=>s.value=!1)},[!w(t.label)&&!e.unref(d)?(e.openBlock(),e.createElementBlock("div",{key:0,class:"g-gantt-row-label",style:e.normalizeStyle({background:e.unref(m).primary,color:e.unref(m).text})},[e.renderSlot(x.$slots,"label",{},()=>[e.createTextVNode(e.toDisplayString(t.label),1)])],4)):e.createCommentVNode("",!0),e.createElementVNode("div",e.mergeProps({ref_key:"barContainer",ref:u,class:"g-gantt-row-bars-container"},x.$attrs),[e.createVNode(e.TransitionGroup,{name:"bar-transition",tag:"div"},{default:e.withCtx(()=>[t.bars?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:0},e.renderList(t.bars,c=>(e.openBlock(),e.createBlock(xe,{key:c.id,bar:c},{default:e.withCtx(()=>[e.renderSlot(x.$slots,"bar-label",{bar:c})]),_:2},1032,["bar"]))),128)):e.createCommentVNode("",!0),e.renderSlot(x.$slots,"default")]),_:3})],16)],36))}}),At="";function Ue(){I.default.extend(Ze),I.default.extend(Ke),I.default.extend(Je),I.default.extend(nt),I.default.extend(et),I.default.extend(Qe),I.default.extend(tt)}const Xe={install(t,h){Ue(),t.component("GGanttChart",Pe),t.component("GGanttRow",We),t.component("GGanttBar",xe)}};F.GGanttBar=xe,F.GGanttChart=Pe,F.GGanttRow=We,F.default=Xe,F.extendDayjs=Ue,F.ganttastic=Xe,Object.defineProperties(F,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});function injectStyle(F,K="top"){if(!F||typeof document>"u")return;const e=document.head,de=document.createElement("style");K==="top"&&e.firstChild?e.insertBefore(de,e.firstChild):e.appendChild(de),de.appendChild(document.createTextNode(F))}injectStyle(`
.g-gantt-row {
  width: 100%;
  transition: background 0.4s;
  position: relative;
}
.g-gantt-row > .g-gantt-row-bars-container {
  position: relative;
  border-top: 1px solid #eaeaea;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
}
.g-gantt-row-label {
  position: absolute;
  top: 0;
  left: 0px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  height: 60%;
  min-height: 20px;
  font-size: 0.8em;
  font-weight: bold;
  border-bottom-right-radius: 6px;
  background: #f2f2f2;
  z-index: 3;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.6);
}
.bar-transition-leave-active,
.bar-transition-enter-active {
  transition: all 0.2s;
}
.bar-transition-enter-from,
.bar-transition-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
`,"top");injectStyle(`
.g-gantt-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  border-radius: 5px;
  cursor: grab;
}
.g-gantt-chart.is-dragging {
  cursor: grabbing;
}
.with-column {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.g-gantt-rows-container {
  position: relative;
}
.labels-in-column {
  display: flex;
  flex-direction: row;
}
`,"top");injectStyle(`
.g-gantt-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: cadetblue;
  overflow: hidden;
}
.g-gantt-bar-label {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 14px 0 14px; /* 14px is the width of the handle */
  display: flex;
  justify-content: center;
  align-items: center;
}
.g-gantt-bar-label > * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.g-gantt-bar-handle-left,
.g-gantt-bar-handle-right {
  position: absolute;
  width: 10px;
  height: 100%;
  background: white;
  opacity: 0.7;
  border-radius: 0px;
  cursor: ew-resize;
  top: 0;
}
.g-gantt-bar-handle-left {
  left: 0;
}
.g-gantt-bar-handle-right {
  right: 0;
}
.g-gantt-bar-label img {
  pointer-events: none;
}
`,"top");injectStyle(`
.g-grid-container {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.g-grid-line {
  width: 1px;
  height: 100%;
  border-left: 1px solid #eaeaea;
}
`,"top");injectStyle(`
.g-label-column {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(64, 64, 64);
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  font-size: 0.9em;
}
.g-label-column-header {
  width: 100%;
  height: 80px;
  min-height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
}
.g-label-column-rows {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 5px;
}
.g-label-column-row {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.1rem 0.3rem;
  overflow: hidden;
  white-space: normal;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.g-label-column-row:last-child {
  border-bottom-left-radius: 5px;
}
`,"top");injectStyle(`
.g-timeaxis {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 4;
  display: flex;
  flex-direction: column;
}
.g-timeunits-container {
  display: flex;
  width: 100%;
  height: 50%;
}
.g-timeunit {
  height: 100%;
  font-size: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.g-upper-timeunit {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.g-timeaxis-hour-pin {
  width: 1px;
  height: 10px;
}
`,"top");injectStyle(`
.g-gantt-tooltip {
  position: fixed;
  background: black;
  color: white;
  z-index: 4;
  font-size: 0.85em;
  padding: 5px;
  border-radius: 3px;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
.g-gantt-tooltip:before {
  content: "";
  position: absolute;
  top: 0;
  left: 10%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: black;
  border-top: 0;
  margin-left: -5px;
  margin-top: -5px;
}
.g-gantt-tooltip-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 4px;
}
.g-fade-enter-active,
.g-fade-leave-active {
  transition: opacity 0.3s ease;
}
.g-fade-enter-from,
.g-fade-leave-to {
  opacity: 0;
}
`,"top");injectStyle(`
.g-grid-current-time {
  position: absolute;
  height: 100%;
  display: flex;
  z-index: 5;
  pointer-events: none;
}
.g-grid-current-time-marker {
  width: 0px;
  height: calc(100% - 2px);
  display: flex;
}
.g-grid-current-time-text {
  font-size: x-small;
}
`,"top");
