(this.webpackJsonpums=this.webpackJsonpums||[]).push([[22],{390:function(e,t,a){"use strict";var n=a(39),r=a(0),i=a.n(r),o=a(383),l=Object(o.a)((function(e){return{container:{backgroundColor:e.palette.primary.main,paddingBottom:20},Heading:{fontFamily:e.palette.text.fontFamily,color:"white",fontWeight:600,marginTop:20,paddingLeft:e.spacing(4)}}})),c=a(373),s=a(587),u=a(588),d=a(589),m=a(590),p=a(88),f=Object(o.a)((function(e){return{container:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:e.spacing(4)},leftItem:{display:"flex",alignItems:"center",justifyContent:"centers"},profile:{display:"flex",alignItems:"center"},dp:{width:40,marginRight:10},text:{fontFamily:e.palette.text.fontFamily,color:"white",fontSize:12,fontWeight:500},inputContainer:{width:230,backgroundColor:"#F7FAFC",paddingTop:10,paddingBottom:10,paddingRight:17,paddingLeft:17,borderRadius:20,fontFamily:e.palette.text.fontFamily,fontSize:12,boxShadow:"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"},icon:{width:17}}})),b=a(432),h=a(433);var E=function(){var e=f();return i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{className:e.container,spacing:3,item:!0,xs:12},i.a.createElement(u.a,null,i.a.createElement(d.a,{disableUnderline:!0,placeholder:"Seach",className:e.inputContainer,id:"input-with-icon-adornment",startAdornment:i.a.createElement(m.a,{position:"start"},i.a.createElement("img",{src:"./search.png",className:e.icon}))})),i.a.createElement("div",{className:e.leftItem},i.a.createElement(b.a,{style:{color:"white",marginRight:30,fontSize:22}}),i.a.createElement(h.a,{style:{color:"white",marginRight:20,fontSize:22}}),i.a.createElement("div",{className:e.profile},i.a.createElement("img",{className:e.dp,src:"https://lh3.googleusercontent.com/proxy/A0SgIeyzRR5nNbLMHhgr7WvKkQAjNv0X0Wsmdq_dGJEX_0XsZ5Mr5ZSYh_gIfHu6iEdTbP8nfRAxCUtXm-7s7W032uKZCHK_jbsF",alt:""}),i.a.createElement(p.a,{variant:"caption",className:e.text,display:"block"},"Jafeel Waheed")))))},g=a(45);t.a=function(e){var t=l(),a=Object(g.h)().pathname,o=Object(r.useState)(null),u=Object(n.a)(o,2),d=u[0],m=u[1];return Object(r.useEffect)((function(){if(a){var e=a.split("/")[1].split("-"),t="";e.map((function(e,a){t+=e+" "})),console.log(t),m(t)}}),[a]),i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,null),i.a.createElement(s.a,{container:!0,className:t.container},i.a.createElement(E,null),i.a.createElement(s.a,{item:!0,xs:12},i.a.createElement(p.a,{className:t.Heading,variant:"h5"},d)),e.children))}},391:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(0),r=a.n(n),i=a(116),o=function(e,t){return function(a){return function(n,o){return Object(i.b)(e,t),r.a.createElement(a,n)}}}},408:function(e,t,a){"use strict";var n=a(3),r=a(59),i=a(1),o=a(0),l=(a(5),a(8)),c=a(11),s=a(380),u=o.forwardRef((function(e,t){var a,r=e.classes,c=e.className,u=e.component,d=void 0===u?"li":u,m=e.disableGutters,p=void 0!==m&&m,f=e.ListItemClasses,b=e.role,h=void 0===b?"menuitem":b,E=e.selected,g=e.tabIndex,v=Object(n.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(a=void 0!==g?g:-1),o.createElement(s.a,Object(i.a)({button:!0,role:h,tabIndex:a,component:d,selected:E,disableGutters:p,classes:Object(i.a)({dense:r.dense},f),className:Object(l.a)(r.root,c,E&&r.selected,!p&&r.gutters),ref:t},v))}));t.a=Object(c.a)((function(e){return{root:Object(i.a)({},e.typography.body1,Object(r.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(i.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(u)},421:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return l})),a.d(t,"e",(function(){return c})),a.d(t,"d",(function(){return s}));var n=a(117),r=a.n(n),i="[UMS] GET EMPLOYEES [TEACHERS]",o="[UMS] GET COURSE [TEACHERS]",l=function(e){return function(t){return r.a.post("/api/teachers/InsertTeacher",e).then((function(e){return console.log(e),!e.data.error}))}},c=function(e,t,a){return function(n){var i={page:e||1,pageSizes:t||10,id:a||null};return r.a.post("/api/teachers/GetTeacher",i).then((function(e){e.data.error||n({type:o,payload:{table:e.data.data,size:e.data.totalPage}})}))}},s=function(e,t,a){return function(n){var o={page:e||1,pageSizes:t||1e3,id:a||null};return r.a.post("/api/employement/getData",o).then((function(e){if(!e.data.error)return n({type:i,payload:e.data.data})}))}}},436:function(e,t,a){"use strict";var n=a(1),r=a(3),i=a(0),o=(a(5),a(8)),l=a(589),c=a(459),s=a(470),u=a(471),d=a(588),m=a(460),p=a(466),f=a(11),b={standard:l.a,filled:c.a,outlined:s.a},h=i.forwardRef((function(e,t){var a=e.autoComplete,l=e.autoFocus,c=void 0!==l&&l,s=e.children,f=e.classes,h=e.className,E=e.color,g=void 0===E?"primary":E,v=e.defaultValue,y=e.disabled,O=void 0!==y&&y,j=e.error,x=void 0!==j&&j,I=e.FormHelperTextProps,w=e.fullWidth,C=void 0!==w&&w,N=e.helperText,S=e.hiddenLabel,F=e.id,T=e.InputLabelProps,P=e.inputProps,R=e.InputProps,L=e.inputRef,A=e.label,M=e.multiline,H=void 0!==M&&M,z=e.name,k=e.onBlur,W=e.onChange,D=e.onFocus,G=e.placeholder,_=e.required,q=void 0!==_&&_,B=e.rows,U=e.rowsMax,V=e.select,Y=void 0!==V&&V,J=e.SelectProps,X=e.type,K=e.value,Z=e.variant,Q=void 0===Z?"standard":Z,$=Object(r.a)(e,["autoComplete","autoFocus","children","classes","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","hiddenLabel","id","InputLabelProps","inputProps","InputProps","inputRef","label","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","rowsMax","select","SelectProps","type","value","variant"]);var ee={};"outlined"===Q&&(T&&"undefined"!==typeof T.shrink&&(ee.notched=T.shrink),A&&(ee.label=i.createElement(i.Fragment,null,A,q&&"\xa0*"))),Y&&(J&&J.native||(ee.id=void 0),ee["aria-describedby"]=void 0);var te=N&&F?"".concat(F,"-helper-text"):void 0,ae=A&&F?"".concat(F,"-label"):void 0,ne=b[Q],re=i.createElement(ne,Object(n.a)({"aria-describedby":te,autoComplete:a,autoFocus:c,defaultValue:v,fullWidth:C,multiline:H,name:z,rows:B,rowsMax:U,type:X,value:K,id:F,inputRef:L,onBlur:k,onChange:W,onFocus:D,placeholder:G,inputProps:P},ee,R));return i.createElement(d.a,Object(n.a)({className:Object(o.a)(f.root,h),disabled:O,error:x,fullWidth:C,hiddenLabel:S,ref:t,required:q,color:g,variant:Q},$),A&&i.createElement(u.a,Object(n.a)({htmlFor:F,id:ae},T),A),Y?i.createElement(p.a,Object(n.a)({"aria-describedby":te,id:F,labelId:ae,value:K,input:re},J),s):re,N&&i.createElement(m.a,Object(n.a)({id:te},I),N))}));t.a=Object(f.a)({root:{}},{name:"MuiTextField"})(h)},447:function(e,t,a){"use strict";var n=a(383),r=Object(n.a)((function(e){return{container:{padding:e.spacing(4)},formContainer:{width:"100%",padding:e.spacing(6)},formControl:{width:"100%"},InputLabel:{},InputContainer:{width:"100%",fontFamily:e.palette.text.fontFamily},radio:{width:"100px",marginTop:e.spacing(2),fontFamily:e.palette.text.fontFamily}}}));t.a=r},465:function(e,t,a){"use strict";var n=a(20),r=a(421),i={defaultValue:{},table:[],size:1,employee:[]};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.b:return Object(n.a)({},e,{table:t.payload.table,pageSize:t.payload.size});case r.a:return Object(n.a)({},e,{employee:t.payload});default:return Object(n.a)({},e)}}},610:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(447),o=a(20),l=a(39),c=a(411),s=a(19),u=a(587),d=a(376),m=a(588),p=a(471),f=a(466),b=a(408),h=a(460),E=a(436),g=a(591),v=a(437),y=a(421);var O=function(){var e=Object(s.c)(),t=Object(i.a)(),a=Object(n.useState)(!1),O=Object(l.a)(a,2),j=O[0],x=O[1],I=Object(n.useState)([]),w=Object(l.a)(I,2),C=w[0],N=w[1],S=Object(s.d)((function(e){return e.Teacher})),F=Object(c.b)({mode:"onBlur",reValidateMode:"onChange"}),T=F.register,P=F.handleSubmit,R=F.errors,L=F.reset,A=F.control;Object(n.useEffect)((function(){N(S.employee)}),[S]),Object(n.useEffect)((function(){e(y.d())}),[]);var M=function(e){return!(!R||!R[e])};return r.a.createElement(u.a,{xs:12},r.a.createElement(d.a,{evelation:3},r.a.createElement("form",{onSubmit:P((function(t){x(!0),e(y.c(Object(o.a)({},t))).then((function(e){e&&L(),x(!1)}))})),className:t.formContainer},r.a.createElement(u.a,{container:!0,justify:"space-between",spacing:3},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(m.a,{error:M("EMPLOYEE_ID"),className:t.formControl},r.a.createElement(p.a,{className:t.InputLabel,shrink:!0},"Employee"),r.a.createElement(c.a,{rules:{required:!0},control:A,name:"EMPLOYEE_ID",as:r.a.createElement(f.a,{inputRef:T({required:!0}),className:t.InputContainer},r.a.createElement(b.a,{disbled:!0},"Select Employee"),";",null===C||void 0===C?void 0:C.map((function(e,t){return r.a.createElement(b.a,{value:e.sID},"".concat(e.first_name," ").concat(e.last_name))})))}),r.a.createElement(h.a,null,M("EMPLOYEE_ID")&&"Employee is mandatory"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(m.a,{className:t.formControl},r.a.createElement(E.a,{name:"DESIGNATION",label:"Designation",placeholder:"Enter Course Name Here...",inputRef:T({required:!0}),helperText:M("DESIGNATION")&&"Designation is mandatory",error:M("DESIGNATION"),className:t.InputContainer,inputProps:{"aria-label":"weight"},InputLabelProps:{shrink:!0}}))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(m.a,{className:t.formControl},r.a.createElement(E.a,{name:"AOI",label:"Area Of Intreset",placeholder:"Enter Area Of Intreset Here...",inputRef:T({required:!0}),helperText:M("AOI")&&"Area Of Intreset is mandatory",error:M("AOI"),className:t.InputContainer,inputProps:{"aria-label":"weight"},InputLabelProps:{shrink:!0}}))),r.a.createElement(u.a,{xs:12},r.a.createElement(g.a,{style:{width:"100%",padding:"15px",marginTop:50,fontWeight:"bold"},type:"submit",color:"primary",variant:"contained"},!0===j?r.a.createElement(v.a,{size:14}):"Add Course"))))))},j=a(390),x=a(465),I=a(391);t.default=Object(I.a)("Teacher",x.a)((function(){Object(s.c)();var e=Object(i.a)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,null),r.a.createElement(u.a,{container:!0,spacing:3,className:e.container},r.a.createElement(O,null)))}))}}]);
//# sourceMappingURL=22.92f70384.chunk.js.map