(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{141:function(e,a,t){},143:function(e,a,t){},178:function(e,a,t){e.exports=t(315)},183:function(e,a,t){},184:function(e,a,t){},185:function(e,a,t){},189:function(e,a,t){},193:function(e,a,t){},216:function(e,a,t){},217:function(e,a,t){},218:function(e,a,t){},219:function(e,a,t){},220:function(e,a,t){},312:function(e,a,t){},313:function(e,a,t){},314:function(e,a,t){},315:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(12),l=t.n(c),o=(t(183),t(184),t(185),t(186),t(357)),i=Object(o.a)((function(e){return{app:{flexGrow:1,backgroundColor:"#f8f8f8"}}})),u=t(55),s=t(13),m=t(7),d=t(116),f=t(377),b=t(378),E=t(361),p=t(362),g=t(363),v=t(364),h=t(374),y=t(318);t(189);function N(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(u.b,{color:"inherit",to:"http://itdsoftware.com/"},"ITD Software")," ",(new Date).getFullYear(),".")}var S=t(26),j=t.n(S),O=t(46),x=t(70),C=t.n(x);t(193);function k(){var e=Object(n.useState)(!1),a=Object(m.a)(e,2),t=a[0];return{setLoading:a[1],Spinner:function(e){return r.a.createElement("div",{className:"Spinner"},e.children,t?r.a.createElement("div",{className:"overlay"},r.a.createElement("div",{className:"text"},r.a.createElement(C.a,null,"Loading..."))):null)}}}var D=Object(o.a)((function(e){return{papersurround:{position:"relative",margin:"auto",width:"500px"},paper:{marginTop:e.spacing(8),padding:"auto",display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(2),padding:e.spacing(1),backgroundColor:"#004064",width:"100px",height:"100px"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2),color:"white",background:"#004064"},error:{color:"red"},"@media (max-width: 1024px)":{form:{width:"100%"}}}}));function w(e){var a=D(),t=function(){var e=Object(n.useState)([]),a=Object(m.a)(e,2),t=a[0],r=a[1],c=k(),l=c.Spinner,o=c.setLoading;function i(e,a){return u.apply(this,arguments)}function u(){return(u=Object(O.a)(j.a.mark((function e(a,t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o(!0),n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({username:a,password:t})},fetch("api/login",n).then((function(e){return e.json()})).then((function(e){r(e),o(!1),e[0]&&e[0].id&&localStorage.setItem("id",e[0].id)})).catch((function(e){console.log(e),setTimeout(1e3),i(a,t)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{Spinner:l,data:t,login:i}}(),c=t.login,l=t.data,o=t.Spinner;function i(){var e=Object(n.useState)(""),t=Object(m.a)(e,2),o=t[0],i=t[1],u=Object(n.useState)(""),s=Object(m.a)(u,2),d=s[0],f=s[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:c.bind(this,o,d)},r.a.createElement(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,onChange:function(e){return i(e.target.value)}})),r.a.createElement("form",{onSubmit:c.bind(this,o,d)},r.a.createElement(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){return f(e.target.value)}})),r.a.createElement(y.a,{className:a.error},l.toString()),r.a.createElement(E.a,{type:"submit",fullWidth:!0,variant:"contained",className:a.submit,onClick:c.bind(this,o,d)},"Sign In"))}return Object(n.useEffect)((function(){console.log(l),l[0]&&l[0].id&&e.history.push("/reports")}),[l]),r.a.createElement("div",{className:"Login"},r.a.createElement(o,null,r.a.createElement(d.a,{className:a.papersurround},r.a.createElement(p.a,{component:"main",maxWidth:"xs",className:a.paper},r.a.createElement(g.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(f.a,{className:a.avatar},r.a.createElement("img",{className:"logo",src:"ITDlogo.jpg",alt:"logo"})),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement(i,null),r.a.createElement("form",{className:a.form,noValidate:!0},r.a.createElement(v.a,{container:!0},r.a.createElement(v.a,{item:!0,xs:!0})))),r.a.createElement(b.a,{mt:8},r.a.createElement(N,null))))))}var B=t(163),T=t.n(B),R=(t(216),t(379)),P=t(162),I=t.n(P);function F(e,a){var t=r.a.useState(e[0]?e[0]:"empty"),c=Object(m.a)(t,2),l=c[0],o=c[1];function i(a){return r.a.createElement(r.a.Fragment,null,e.map((function(e,a){return r.a.createElement(R.a,{className:"item","aria-haspopup":!0,key:a,onMouseDown:function(){o(e)}},e)})))}return Object(n.useEffect)((function(){"empty"===l&&e[0]&&o(e[0])}),[e]),{selected:l,Select:function(e){var a=Object(n.useRef)(null);return r.a.createElement("div",{className:"Select",ref:a},r.a.createElement("div",{className:"head"},r.a.createElement("div",{className:"text"},r.a.createElement(y.a,null,l,r.a.createElement(I.a,null))),r.a.createElement("div",null,r.a.createElement(d.a,{className:"Items"},r.a.createElement(i,null)))))}}}function A(e,a){var t=Object(n.useState)([]),r=Object(m.a)(t,2),c=r[0],l=r[1],o=k(),i=o.Spinner,u=o.setLoading;function s(){return d.apply(this,arguments)}function d(){return(d=Object(O.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:u(!0);try{fetch("".concat(e),a).then((function(e){return e.json()})).then((function(e){l(null!=e?e:[])})).catch((function(e){console.log(e),console.log("Reattempting Connection..."),setTimeout((function(){}),1e3),s()}))}catch(n){l([]),console.error(n)}case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){s()}),[e]),Object(n.useEffect)((function(){u(!1)}),[c]),{data:c,setData:l,fetchData:s,Spinner:i}}t(217);function V(){var e=function(){var e=A("api/databases").data,a=Object(n.useState)([]),t=Object(m.a)(a,2),r=t[0],c=t[1],l=F(r),o=l.Select,i=l.selected;return Object(n.useEffect)((function(){c(function(e){return e.map((function(e){return e.schema_name}))}(e))}),[e]),{Select:o,selected:i}}(),a=e.Select,t=e.selected,c=Object(n.useState)("itdepos"),l=Object(m.a)(c,2),o=l[0],i=l[1];return Object(n.useEffect)((function(){"empty"!==t&&i(t)}),[t]),{db:o,NavBar:function(){return r.a.createElement("div",{className:"NavBar"},r.a.createElement(T.a,{position:"fixed"},r.a.createElement("div",{className:"left"},r.a.createElement("img",{src:"ITDlogo.jpg",alt:"logo"}),r.a.createElement(C.a,{className:"text"},"Branch: "),r.a.createElement(a,null)),r.a.createElement("div",{className:"right"},r.a.createElement(u.b,{className:"link",to:"/"},r.a.createElement(C.a,null,"Logout")))))}}}var z=t(71),M=t(72),Q=t(50),L=t(31);function W(e){return e&&e.length}function J(e,a){return W(e)?e.map((function(e){return e[a]})):[0]}function H(e,a){return J(e,a).reduce((function(e,a){return e+a}))}function _(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];var r=JSON.parse(JSON.stringify(e));return W(r)?r.map((function(e){return t.map((function(a){return delete e[a]})),e})):[]}function q(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];return W(e)?e.map((function(e){var a={};return t.map((function(t){return Object.assign(a,Object(Q.a)({},t,e[t]))})),a})):[]}function Y(e,a){for(var t=arguments.length,n=new Array(t>2?t-2:0),r=2;r<t;r++)n[r-2]=arguments[r];var c=G(e,a),l=c.map((function(t){return K(e,a,t)})),o=function(e,t){return Object.keys(e).forEach((function(r){e[r]="number"!==typeof e[r]||r===a||n.includes(r)?e[r]:e[r]+t[r]})),e},i=(l=JSON.parse(JSON.stringify(l))).map((function(e){return e.reduce(o)}));return i}function G(e,a){var t=[];if(W(e)){var n=new Set;e.forEach((function(e){return n.add(e[a])})),n.forEach((function(e){return t.push(e)}))}return t}function K(e,a,t){return e.filter((function(e){return e[a]===t}))}var $=t(52),U=(t(218),t(164)),X=t.n(U);function Z(){var e=new Date;return e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)}function ee(e){var a=new Date(e);return a.getFullYear()+"-"+("0"+(a.getMonth()+1)).slice(-2)+"-"+("0"+a.getDate()).slice(-2)}function ae(){var e=Object(n.useState)({start:Z(),end:Z()}),a=Object(m.a)(e,2),t=a[0],c=a[1];function l(e){return r.a.createElement("div",{className:"datefield"},r.a.createElement("input",{type:"date",required:!0,defaultValue:e.defaultValue,onChange:e.handleChange}),r.a.createElement(X.a,{className:"icon"}))}return{startDate:t.start,endDate:t.end,Dates:function(e){return r.a.createElement("div",{className:"Dates"},r.a.createElement(l,{handleChange:function(e){return c(Object($.a)(Object($.a)({},t),{},{start:ee(e.currentTarget.value),end:t.end}))},defaultValue:t.start}),r.a.createElement("div",null,"-"),r.a.createElement(l,{handleChange:function(e){return c(Object($.a)(Object($.a)({},t),{},{start:t.start,end:ee(e.currentTarget.value)}))},defaultValue:t.end}))}}}t(219);var te=t(365);function ne(e){return r.a.createElement("div",{className:"HeaderBar"},r.a.createElement(te.a,null,e.children))}t(141);var re=t(369),ce=t(370),le=t(368),oe=t(367),ie=t(165),ue=t.n(ie);function se(e){return e&&e.length}function me(e){return W(e.data)?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"emptyMessage"},r.a.createElement(y.a,null,"Empty"))}var de=t(366),fe=t(380);function be(e){var a=e.order,t=e.orderBy,n=e.onRequestSort,c=r.a.useState([]),l=Object(m.a)(c,2),o=l[0],i=l[1],u=r.a.useState([]),s=Object(m.a)(u,2),d=s[0],f=s[1];return r.a.useEffect((function(){W(e.data)&&d!==e.data?(i(Object.keys(e.data[0]).map((function(a,t){return{id:t+1+"",numeric:"number"==typeof e.data[0][a],disablePadding:!1,label:a}}))),f(e.data)):i([])}),[e.data]),r.a.createElement(de.a,null,r.a.createElement(oe.a,null,o.map((function(e){return r.a.createElement(le.a,{key:e.id,align:"left",padding:e.disablePadding?"none":"default",sortDirection:t===e.id&&a,onClick:(c=e.id,function(e){n(e,c)})},r.a.createElement(fe.a,{active:t===e.id,direction:t===e.id?a:"asc"},e.label));var c}))))}var Ee=Object(o.a)((function(e){return{head:{backgroundColor:"blue"}}}));function pe(e){var a=Ee(),t=r.a.useState(!0),n=Object(m.a)(t,2),c=n[0],l=n[1],o=r.a.useState([]),i=Object(m.a)(o,2),u=i[0],s=i[1],d=r.a.useState("asc"),f=Object(m.a)(d,2),b=f[0],E=f[1],p=r.a.useState("calories"),g=Object(m.a)(p,2),v=g[0],h=g[1],y=r.a.useState(0),N=Object(m.a)(y,2),S=N[0],j=N[1],O=r.a.useState([]),x=Object(m.a)(O,2),C=x[0],k=x[1],D=r.a.useState(1),w=Object(m.a)(D,2),B=w[0],T=w[1];function R(){return c?r.a.createElement(ue.a,{onClick:function(){T(B+1)}}):r.a.createElement(r.a.Fragment,null)}return r.a.useEffect((function(){se(e.data)?(s(e.data),k(e.data.map((function(e){return Object.values(e).map((function(e,a){return"number"===typeof e&&(e=+Math.round(100*e)/100),r.a.createElement(le.a,{key:a,align:"left"},e)}))}))),l(!0)):(s([]),k([]),j(0),T(1))}),[e.data]),r.a.useEffect((function(){j(100*B),S>e.data.length&&l(!1),e.bufferCallback&&B>1&&e.bufferCallback()}),[B]),r.a.createElement("div",{className:"Table"},r.a.createElement(re.a,{stickyHeader:!0,"aria-labelledby":"tableTitle",size:"medium","aria-label":"enhanced table"},r.a.createElement(be,{className:a.head,order:b,orderBy:v,onRequestSort:function(a,t){var n="asc"===b;if(E(n?"desc":"asc"),h(t),e.sortCallback)e.sortCallback({by:a.currentTarget.textContent,order:n?"desc":"asc"});else{var c=a.currentTarget.firstChild.firstChild.data,l=u.sort(function(e,a){var t="asc"===a?-1:1;return function(a,n){return a[e]>n[e]?t:a[e]<n[e]?-t:0}}(c,b));k(l.map((function(e){return Object.values(e).map((function(e,a){return"number"===typeof e&&e%1!==0&&(e=e.toFixed(2)),r.a.createElement(le.a,{key:a,align:"left"},e)}))})))}},rowCount:C.length,data:u}),r.a.createElement(ce.a,{className:"tableBody"},C.map((function(e,a){return r.a.createElement(oe.a,{key:a,hover:!0,role:"checkbox",tabIndex:-1},C[a])})))),r.a.createElement(R,null),r.a.createElement(me,{data:e.data}))}function ge(){var e=Object(z.a)(["\ndisplay: flex;\nflex-direction: row;\njustify-content: space-between;\ntext-align: left;\nbackground-color:#004064;\ncolor: white;\n\n.MuiTypography-body1 {\n    font-size: 1em;\n    margin-left: 5px;\n    margin-right: 5px;\n}\n\n"]);return ge=function(){return e},e}function ve(){var e=Object(z.a)(["\n.MuiTypography-root{\ntext-align: left;\nfont-weight: bold;\ncolor: #004064;\nfont-size: 1.25em; \nmargin: 5px;\n}\n"]);return ve=function(){return e},e}function he(e){var a=Object(n.useState)([]),t=Object(m.a)(a,2),c=t[0],l=t[1],o=ae(),i=o.startDate,u=o.endDate,s=o.Dates,f=A("/api/salesByProduct/".concat(e.db,"/").concat(i,"/").concat(u)),b=f.data,E=f.Spinner,p=F(G(b,"Cashier")),g=p.selected,v=p.Select;function h(e,a){return function(e,a){return G(e,a).map((function(t){return K(e,a,t)}))}(function(e,a,t){return e.sort(function(e,a){var t="asc"===a?-1:1;return function(a,n){return a[e]>n[e]?t:a[e]<n[e]?-t:0}}(a,t))}(K(q(e,"Receipt","Product","Sales","Qty","Refund","Discount","TillDate","TillTime","Cashier"),"Cashier",a),"Receipt","desc"),"Receipt")}function N(){var e="00-00-00";return r.a.createElement(r.a.Fragment,null,c.map((function(a,t){return r.a.createElement("div",{key:t},(n=a[0].TillDate)===e?r.a.createElement(r.a.Fragment,null):(e=n,r.a.createElement(ye,null,r.a.createElement(y.a,null,n))),r.a.createElement(Ne,null,r.a.createElement(y.a,null,"Receipt "+a[0].Receipt),r.a.createElement(y.a,null,a[0].TillTime)),r.a.createElement(pe,{data:q(a,"Product","Qty","Sales")}));var n})))}return Object(n.useEffect)((function(){l(h(b,g))}),[b,g]),r.a.createElement("div",{className:"report"},r.a.createElement(E,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(s,null)),r.a.createElement("div",{className:"reportBody",id:"cashierHistory"},r.a.createElement(v,null),r.a.createElement(N,null)))))}var ye=M.a.div(ve()),Ne=M.a.div(ge());function Se(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=A("/api/expiry/".concat(e.db,"/").concat(t,"/").concat(n)),o=l.data,i=l.Spinner;return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(pe,{data:o})))))}function je(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=A("/api/priceoverride/".concat(e.db,"/").concat(t,"/").concat(n)),o=l.data,i=l.Spinner;return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(pe,{data:o})))))}function Oe(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=A("/api/refund/".concat(e.db,"/").concat(t,"/").concat(n)),o=l.data,i=l.Spinner;return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(pe,{data:o})))))}t(220);var xe=t(372),Ce=t(373),ke=(t(143),t(61));function De(e){if(W(e.chartData.datasets)){var a=e.chartData.datasets[0].backgroundColor,t=e.chartData.labels,n=a.map((function(e,n){return r.a.createElement("div",{key:n++,className:"legendItem"},r.a.createElement("span",{key:n++,className:"dot",style:{backgroundColor:e}}),r.a.createElement("label",{key:n++,className:"label"},t[a.indexOf(e)]))}));return r.a.createElement("div",{className:"Legend"},r.a.createElement("ul",null,n),r.a.createElement("div",{className:"cover-bar"}))}return r.a.createElement("div",null)}function we(e,a){return window.innerWidth>1024?e:a}function Be(e){if("number"===typeof e)return e;var a=Object(L.a)(e).map((function(e){return e.charCodeAt(0)}));return parseInt(a.join(""),10)}function Te(e){var a=["rgba(0,0,0, 0.6)","rgba(128,128,128, 0.6)","rgba(128,128,0, 0.6)","rgba(128,0,128, 0.6)","rgba(128,0,0, 0.6)","rgba(0,128,128, 0.6)","rgba(0,128,0, 0.6)","rgba(0,0,128, 0.6)","rgba(255,255,255, 0.6)","rgba(255,255,0, 0.6)","rgba(255,0,255, 0.6)","rgba(255,0,0, 0.6)","rgba(0,255,255, 0.6)","rgba(0,255,0, 0.6)","rgba(0,0,255, 0.6)","rgba(255,255,128, 0.6)","rgba(255,128,255, 0.6)","rgba(255,128,128, 0.6)","rgba(128,255,255, 0.6)","rgba(128,255,128, 0.6)","rgba(128,128,255, 0.6)","rgba(128,0,255, 0.6)","rgba(0,128,255, 0.6)","rgba(255,128,0, 0.6)","rgba(64,64,64, 0.6)","rgba(192,192,192, 0.6)","rgba(192,192,64, 0.6)","rgba(192,64,192, 0.6)","rgba(192,64,64, 0.6)","rgba(64,192,192, 0.6)","rgba(64,192,64, 0.6)","rgba(64,64,192, 0.6)","rgba(255,255,64, 0.6)","rgba(255,64,255, 0.6)","rgba(255,64,64, 0.6)","rgba(64,255,255, 0.6)","rgba(64,255,64, 0.6)","rgba(64,64,255, 0.6)","rgba(255,255,192, 0.6)","rgba(255,192,255, 0.6)","rgba(255,192,192, 0.6)","rgba(192,255,255, 0.6)","rgba(192,255,192, 0.6)","rgba(192,192,255, 0.6)","rgba(192,64,255, 0.6)","rgba(64,192,255, 0.6)","rgba(255,192,64, 0.6)","rgba(64,64,0, 0.6)","rgba(64,0,64, 0.6)","rgba(64,0,0, 0.6)","rgba(0,64,64, 0.6)","rgba(0,64,0, 0.6)","rgba(0,0,64, 0.6)","rgba(192,192,0, 0.6)","rgba(192,0,192, 0.6)","rgba(192,0,0, 0.6)","rgba(0,192,192, 0.6)","rgba(0,192,0, 0.6)","rgba(0,0,192, 0.6)","rgba(64,0,192, 0.6)","rgba(0,64,192, 0.6)","rgba(192,64,0, 0.6)","rgba(102,51,0, 0.6)","rgba(255,229,204, 0.6)","rgba(255,153,153, 0.6)"];return e.map((function(e){return a[a.length-e%a.length-1]}))}function Re(e){var a=Y(e.data,e.groupBy),t=J(a,e.values),n=J(a,e.groupBy),c=W(e.data)?n.map((function(e){return Be(e)})):[],l=function(e,a,t){return{labels:a,datasets:[{label:"Net Sales \xa3",data:e,backgroundColor:Te(t)}]}}(t,n,c),o=t.reduce((function(e,a){return e+a})),i=we(12,12);return W(l.datasets)?r.a.createElement("div",{className:"PieChart"},r.a.createElement("div",{className:"chart"},r.a.createElement(ke.b,{height:1,width:1,data:l,options:{layout:{},labels:{display:!1},legend:{display:!1,position:"top",align:"center",labels:{usePointStyle:!0,fontSize:24},fullWidth:!0},tooltips:{bodyFontSize:i,mode:"index",callbacks:{label:function(e,a){var t=a.labels[e.index];return t},afterLabel:function(e,a){var t=a.datasets[e.datasetIndex].data[e.index],n=a.datasets[e.datasetIndex].data[e.index]/o*100;return n=n.toFixed(2),Number.isInteger(t)?t+" ("+n+"%)":"\xa3 "+t.toFixed(2)+" ("+n+"%)"}},fontSize:24}}})),r.a.createElement(De,{chartData:l})):r.a.createElement("div",{className:"chart"},r.a.createElement(ke.b,{data:l}))}function Pe(e){var a=0,t=e.chartData.datasets.map((function(e){return e.backgroundColor})),n=e.chartData.datasets.map((function(e){return e.label})),c=t.map((function(e){return r.a.createElement("div",{key:a++,className:"legendItem"},r.a.createElement("span",{key:a++,className:"dot",style:{backgroundColor:e}}),r.a.createElement("label",{key:a++,className:"label"},n[t.indexOf(e)]))}));return r.a.createElement("div",{className:"Legend"},r.a.createElement("ul",null,c),r.a.createElement("div",{className:"cover-bar"}))}function Ie(e){var a=e.data,t=e.x,n=e.groupBy,c=e.values,l=function(e,a,t,n){var r=G(e,t),c=Te(r.map((function(e){return Be(e)}))),l=r.map((function(l,o){var i=c[o],u=a.map((function(a){var c=K(e,"TillHour",a),l=K(c,t,r[o]),i=J(l,n);return W(l)?i.reduce((function(e,a){return e+a})):0}));return{label:r[r.indexOf(l)],data:u,backgroundColor:i,datasetKeyProvider:o}}));return{labels:a,datasets:l}}(a,t,n,c),o=H(a,c),i=we(12,26);return void 0!==l.datasets?r.a.createElement("div",{className:"BarChart"},r.a.createElement("div",{className:"chart"},r.a.createElement(ke.a,{data:l,options:{scales:{xAxes:[{stacked:!0,ticks:{fontSize:i}}],yAxes:[{stacked:!0,ticks:{fontSize:i}}]},labels:{display:!1,fontSize:48},legend:{display:!1,position:"right",align:"center",labels:{usePointStyle:!0},fullWidth:!0},tooltips:{bodyFontSize:we(12,12),mode:"single",callbacks:{label:function(e,a){var t=a.datasets[e.datasetIndex],n=t.label;return t.data[e.index]>0?n:""},afterLabel:function(e,a){var t=a.datasets[e.datasetIndex],n=t.data[e.index],r=(t.data[e.index]/o*100).toFixed(2);return t.data[e.index]>0?Number.isInteger(n)?n+" ("+r+"%)":"\xa3 "+n.toFixed(2)+" ("+r+"%)":""}}}}})),r.a.createElement(Pe,{chartData:l})):r.a.createElement("div",{className:"chart"},r.a.createElement(ke.a,{data:l}))}t(312);var Fe=t(360),Ae=t(371),Ve=t(375),ze=t(376);function Me(e){return r.a.createElement("div",{className:"RadioButtons"},r.a.createElement(Fe.a,{component:"fieldset"},r.a.createElement(ze.a,{color:"#004064","aria-label":"gender",name:"gender1",value:e.value,onChange:e.handleChange},r.a.createElement(Ae.a,{color:"#004064",value:"Sales",control:r.a.createElement(Ve.a,null),label:"Sales"}),r.a.createElement(Ae.a,{color:"#004064",value:"Profit",control:r.a.createElement(Ve.a,null),label:"Profit"}),r.a.createElement(Ae.a,{color:"#004064",value:"Qty",control:r.a.createElement(Ve.a,null),label:"Quantity"}))))}function Qe(e){var a=ae(),t=a.startDate,c=a.endDate,l=a.Dates,o=F(["Category","Product","PriceMark","Cashier","Receipt"]),i=o.Select,u=o.selected,s=A("/api/salesByProduct/".concat(e.db,"/").concat(t,"/").concat(c)),f=s.data,b=s.Spinner,E=Object(n.useState)("Category"),p=Object(m.a)(E,2),g=p[0],v=p[1],h=Object(n.useState)(0),N=Object(m.a)(h,2),S=N[0],j=N[1],O=Object(n.useState)("Sales"),x=Object(m.a)(O,2),C=x[0],k=x[1],D=Object(n.useState)([]),w=Object(m.a)(D,2),B=w[0],T=w[1],R=Object(n.useState)("pie"),P=Object(m.a)(R,2),I=P[0],V=P[1],z=function(e){var a=Object(m.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)("a"),o=Object(m.a)(l,2),i=o[0],u=o[1];function s(){"a"===i?(u("b"),t.callBack()):(u("a"),c.callBack())}return{IconSwitch:function(){return r.a.createElement("button",{className:"IconSwitch",onClick:s},"a"===i?t.icon:c.icon)}}}([{icon:r.a.createElement(xe.a,null),callBack:V.bind(this,"bar")},{icon:r.a.createElement(Ce.a,null),callBack:V.bind(this,"pie")}]).IconSwitch;function M(){return r.a.createElement("div",{className:"sales"},r.a.createElement(i,null),r.a.createElement(Me,{handleChange:function(e){return k(e.target.value)},value:C}),r.a.createElement("h1",null,"Total: ","Qty"===C?S:"\xa3"+S.toFixed(2)))}function Q(e){var a=Array.from(Array(24).keys()).map((function(e){return("0"+e+":00").slice(-5)}));return"pie"===e.chart?r.a.createElement(Re,{data:f,groupBy:g,values:C}):r.a.createElement(Ie,{data:f,x:a,groupBy:g,values:C})}return Object(n.useEffect)((function(){T(function(e,a){var t=Y(e,a,"Id","CashierNum");switch(a){case"PriceMark":return q(t,"PriceMark","Sales","Cost","Discount","Refund","Profit","Qty");case"Cashier":return q(t,"Cashier","Sales","Cost","Discount","Refund","Profit","Qty");case"Product":return q(t,"Product","Id","Category","PriceMark","Sales","Cost","Discount","Refund","Profit","Qty");case"Category":return q(t,"Category","Sales","Cost","Discount","Refund","Profit","Qty");case"Receipt":return q(t,"Receipt","Cashier","TillDate","TillTime","Sales","Cost","Discount","DsctReason","Refund","Profit","Qty");default:return q(t,"Sales","Cost","Discount","Refund","Profit","Qty")}}(f,g)),j(H(f,C))}),[g,C,f]),Object(n.useEffect)((function(){v(u)}),[u]),r.a.createElement("div",{className:"salesBreakdown"},r.a.createElement(b,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement("div",{className:"left"},r.a.createElement(y.a,{className:"text",variant:"h6"}," ",e.header),r.a.createElement(l,null)),r.a.createElement("div",{className:"right"},r.a.createElement(z,null))),r.a.createElement("div",{className:"reportBody"},r.a.createElement(r.a.Fragment,null,r.a.createElement(M,null),r.a.createElement(Q,{chart:I})),r.a.createElement(pe,{data:B})))))}function Le(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=A("/api/staffhours/".concat(e.db,"/").concat(t,"/").concat(n)),o=l.data,i=l.Spinner;return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(pe,{data:o})))))}function We(e,a){var t=Object(n.useState)([]),r=Object(m.a)(t,2),c=r[0],l=r[1],o=Object(n.useState)(0),i=Object(m.a)(o,2),u=i[0],s=i[1],d=k(),f=d.Spinner,b=d.setLoading;function E(){return p.apply(this,arguments)}function p(){return(p=Object(O.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:b(!0),s(0),fetch("".concat(e,"/").concat(a,"/").concat(u)).then((function(e){return e.json()})).then((function(e){return l(e)})).catch((function(e){console.error(e),setTimeout(1e3),E()}));case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(){return v.apply(this,arguments)}function v(){return(v=Object(O.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:b(!0),fetch("".concat(e,"/").concat(a,"/").concat(u)).then((function(e){return e.json()})).then((function(e){return l([].concat(Object(L.a)(c),Object(L.a)(e)))})).catch((function(e){console.log(e),setTimeout(1e3),g()}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){g()}),[u]),Object(n.useEffect)((function(){E()}),[e]),Object(n.useEffect)((function(){b(!1)}),[c]),{data:c,getNextBuffer:function(){s(u+1)},Spinner:f}}function Je(){var e=Object(n.useState)({by:"id",order:"desc"}),a=Object(m.a)(e,2),t=a[0],c=a[1],l=Object(n.useContext)(Ye).db,o=We("api/nonscan/".concat(l,"/").concat(t.by,"/").concat(t.order),100),i=o.data,u=o.getNextBuffer,s=o.Spinner;return r.a.createElement(s,null,r.a.createElement(pe,{data:i,bufferCallback:u,sortCallback:c}))}function He(){var e=Object(n.useState)({by:"id",order:"desc"}),a=Object(m.a)(e,2),t=a[0],c=a[1],l=Object(n.useContext)(Ye).db,o=We("api/reorder/".concat(l,"/").concat(t.by,"/").concat(t.order),100),i=o.data,u=o.getNextBuffer,s=o.Spinner;return r.a.createElement(s,null,r.a.createElement(pe,{data:i,bufferCallback:u,sortCallback:c}))}function _e(){var e=Object(n.useState)({by:"id ",order:"desc"}),a=Object(m.a)(e,2),t=a[0],c=a[1],l=Object(n.useContext)(Ye).db,o=We("api/stock/".concat(l,"/").concat(t.by,"/").concat(t.order),100),i=o.data,u=o.getNextBuffer,s=o.Spinner;return r.a.createElement(s,null,r.a.createElement(pe,{data:i,bufferCallback:u,sortCallback:c}))}function qe(){var e=Object(n.useState)({by:"id",order:"desc"}),a=Object(m.a)(e,2),t=a[0],c=a[1],l=Object(n.useContext)(Ye).db,o=ae(),i=o.startDate,u=o.endDate,s=o.Dates,d=We("api/adjust/".concat(l,"/").concat(i,"/").concat(u,"/").concat(t.by,"/").concat(t.order),100),f=d.data,b=d.getNextBuffer,E=d.Spinner;return r.a.createElement(E,null,r.a.createElement(s,null),r.a.createElement(pe,{data:f,bufferCallback:b,sortCallback:c}))}var Ye=r.a.createContext({db:"itdepos"});function Ge(e){var a=F(["Stock","Reorder","Non Scan","Stock Adjust"]),t=a.selected,n=a.Select;function c(e){switch(t){case"Stock":return r.a.createElement(_e,null);case"Reorder":return r.a.createElement(He,null);case"Non Scan":return r.a.createElement(Je,null);case"Stock Adjust":return r.a.createElement(qe,null);default:return r.a.createElement(_e,null)}}return r.a.createElement("div",{className:"report"},r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(n,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(Ye.Provider,{value:{db:e.db}},r.a.createElement(c,{selected:t,db:e.db})))))}var Ke=t(170);t(313);function $e(){var e=Object(z.a)(["\n\ncolor: #004064;;\ntext-align:left;\nmargin-left: 1em;\nfont-size: 1em;\n\n"]);return $e=function(){return e},e}function Ue(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=(Object(Ke.a)(a,["startDate","endDate","Dates"]),A("/api/VAT/".concat(e.db,"/").concat(t,"/").concat(n))),o=l.data,i=l.Spinner,u=q(o,"VatRate","Receipt_No","Total_Sales","Quantity","Total_VAT","Nett"),s=Y(_(u,"Receipt_No"),"VatRate"),m=Y(_(u,"VatRate"),"Receipt_No");return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(Xe,null,"Total VAT"),r.a.createElement("div",{className:"total"}," ",r.a.createElement(pe,{data:s})),r.a.createElement(Xe,null,"VAT Receipts"),r.a.createElement(pe,{data:m})))))}var Xe=M.a.h1($e());function Ze(e){var a=ae(),t=a.startDate,n=a.endDate,c=a.Dates,l=A("/api/wastage/".concat(e.db,"/").concat(t,"/").concat(n)),o=l.data,i=l.Spinner;return r.a.createElement("div",{className:"report"},r.a.createElement(i,null,r.a.createElement(d.a,{className:"reportContainer"},r.a.createElement(ne,null,r.a.createElement(y.a,{className:"text",variant:"h6"},e.header),r.a.createElement(c,null)),r.a.createElement("div",{className:"reportBody"},r.a.createElement(pe,{data:o})))))}t(314);function ea(e){var a=V(),t=a.db,n=a.NavBar;return r.a.createElement("div",{className:"reportspage"},r.a.createElement(n,null),r.a.createElement("div",{className:"reports"},r.a.createElement(Qe,{header:"Sales Breakdown",db:t}),r.a.createElement(Ge,{id:"stock",header:"Stock",db:t}),r.a.createElement(he,{header:"Cashier History",db:t}),r.a.createElement(Ue,{header:"VAT",db:t}),r.a.createElement(je,{header:"Price Override Report",db:t}),r.a.createElement(Ze,{header:"Wastage",db:t}),r.a.createElement(Oe,{header:"Refund Report",db:t}),r.a.createElement(Le,{header:"Staff Hours",db:t}),r.a.createElement(Se,{header:"Expiry Dates",db:t})))}var aa=function(){var e=i();return document.body.style.zoom="1.0",r.a.createElement("div",{className:e.app},r.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/icon?family=Material+Icons"}),r.a.createElement("meta",{name:"viewport",content:"width=600, initial-scale=1 maximum-scale=1"}),r.a.createElement(u.a,null,r.a.createElement(s.a,{path:"/reports",exact:!0,render:function(e){return localStorage.id?r.a.createElement(ea,e):(e.history.goBack(),r.a.createElement(r.a.Fragment,null))}}),r.a.createElement(s.a,{path:"/",exact:!0,render:function(e){return r.a.createElement(w,e)}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(aa,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[178,1,2]]]);
//# sourceMappingURL=main.476187db.chunk.js.map