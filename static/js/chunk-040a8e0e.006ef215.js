(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-040a8e0e"],{"14c3":function(t,e,r){var n=r("c6b6"),a=r("9263");t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var i=r.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},5319:function(t,e,r){"use strict";var n=r("d784"),a=r("825a"),i=r("7b0b"),u=r("50c4"),c=r("a691"),o=r("1d80"),l=r("8aa5"),s=r("14c3"),f=Math.max,d=Math.min,p=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g,b=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var v=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=n.REPLACE_KEEPS_$0,y=v?"$":"$0";return[function(r,n){var a=o(this),i=void 0==r?void 0:r[t];return void 0!==i?i.call(r,a,n):e.call(String(a),r,n)},function(t,n){if(!v&&m||"string"===typeof n&&-1===n.indexOf(y)){var i=r(e,t,this,n);if(i.done)return i.value}var o=a(t),p=String(this),h="function"===typeof n;h||(n=String(n));var g=o.global;if(g){var D=o.unicode;o.lastIndex=0}var x=[];while(1){var E=s(o,p);if(null===E)break;if(x.push(E),!g)break;var S=String(E[0]);""===S&&(o.lastIndex=l(p,u(o.lastIndex),D))}for(var w="",k=0,O=0;O<x.length;O++){E=x[O];for(var $=String(E[0]),R=f(d(c(E.index),p.length),0),P=[],j=1;j<E.length;j++)P.push(b(E[j]));var C=E.groups;if(h){var N=[$].concat(P,R,p);void 0!==C&&N.push(C);var q=String(n.apply(void 0,N))}else q=_($,p,R,P,C,n);R>=k&&(w+=p.slice(k,R)+q,k=R+$.length)}return w+p.slice(k)}];function _(t,r,n,a,u,c){var o=n+t.length,l=a.length,s=g;return void 0!==u&&(u=i(u),s=h),e.call(c,s,(function(e,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(o);case"<":c=u[i.slice(1,-1)];break;default:var s=+i;if(0===s)return e;if(s>l){var f=p(s/10);return 0===f?e:f<=l?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):e}c=a[s-1]}return void 0===c?"":c}))}}))},"7db0":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").find,i=r("44d2"),u=r("ae40"),c="find",o=!0,l=u(c);c in[]&&Array(1)[c]((function(){o=!1})),n({target:"Array",proto:!0,forced:o||!l},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(c)},"8aa5":function(t,e,r){"use strict";var n=r("6547").charAt;t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},bdfa:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-card",{staticClass:"w-100 rouned-3 mb-3"},[r("el-form",{attrs:{inline:"",model:t.queryData}},[r("div",{staticClass:"d-flex"},[r("el-form-item",{attrs:{label:"訂單 ID"}},[r("el-input",{attrs:{placeholder:"請輸入訂單 id"},model:{value:t.queryData.orderID,callback:function(e){t.$set(t.queryData,"orderID",e)},expression:"queryData.orderID"}})],1),r("el-form-item",{attrs:{label:"名稱"}},[r("el-input",{attrs:{placeholder:"請輸入商品名稱"},model:{value:t.queryData.title,callback:function(e){t.$set(t.queryData,"title",e)},expression:"queryData.title"}})],1)],1),r("div",{staticClass:"d-flex justify-content-between"},[r("div",[r("el-form-item",{attrs:{label:"訂購人電話"}},[r("el-input",{attrs:{placeholder:"請輸入訂購人電話"},model:{value:t.queryData.phoneNumber,callback:function(e){t.$set(t.queryData,"phoneNumber",e)},expression:"queryData.phoneNumber"}})],1),r("el-form-item",{attrs:{label:"狀態"}},[r("el-select",{attrs:{placeholder:"請選擇狀態"},model:{value:t.queryData.status,callback:function(e){t.$set(t.queryData,"status",e)},expression:"queryData.status"}},[r("el-option",{attrs:{label:"全部",value:""}}),t._l(t.orderStatusList,(function(t){return r("el-option",{key:t.key,attrs:{label:t.text,value:t.key}})}))],2)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){return t.fetchData(1,t.page.size)}}},[t._v("搜尋")])],1)],1)])],1),r("el-card",{staticClass:"w-100 rouned-3"},[r("div",{staticClass:"d-flex justify-content-between align-items-center mb-4"},[r("h5",{staticClass:"my-0"},[t._v("訂單列表")])]),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{align:"center",label:"訂單 ID",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.id)+" ")]}}])}),r("el-table-column",{attrs:{label:"商品名稱",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.title)+" ")]}}])}),r("el-table-column",{attrs:{label:"數量",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.number)+" ")]}}])}),r("el-table-column",{attrs:{label:"總價",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.totalPrice)+" 元 ")]}}])}),r("el-table-column",{attrs:{label:"訂購人姓名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.name)+" ")]}}])}),r("el-table-column",{attrs:{label:"訂購人電話",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.phoneNumber)+" ")]}}])}),r("el-table-column",{attrs:{label:"狀態",align:"center",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.showStatusText(e.row.status))+" ")]}}])}),r("el-table-column",{attrs:{label:"操作",width:"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"確認付款",placement:"top"}},[r("el-button",{attrs:{type:"text",size:"large",disabled:2!==Number(e.row.status)},on:{click:function(r){return t.changeOrderPaidStatus(e.row.id,2===e.row.status)}}},[r("i",{staticClass:"el-icon-s-claim fs-4"})])],1)]}}])})],1),r("div",{staticClass:"d-flex justify-content-end align-items-center mt-3"},[r("el-pagination",{attrs:{"current-page":t.page.current,"page-sizes":[10,30,50,100],"page-size":t.page.size,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"update:currentPage":function(e){return t.$set(t.page,"current",e)},"update:current-page":function(e){return t.$set(t.page,"current",e)},"current-change":function(e){return t.fetchData(e,t.page.size)},"size-change":function(e){return t.fetchData(1,e)}}})],1)],1)],1)},a=[],i=r("5530"),u=(r("e9c4"),r("d81d"),r("7db0"),r("d3b7"),r("99af"),r("fb6a"),r("ac1f"),r("5319"),r("a9e3"),r("f8b7")),c=r("2f62"),o={name:"OrderList",data:function(){return{list:[],listLoading:!0,page:{current:1,size:10,total:0},queryData:{status:"",title:"",phoneNumber:"",orderID:""},orderStatusList:[{key:1,text:"付款成功"},{key:2,text:"未付款"},{key:3,text:"核銷成功"},{key:4,text:"取消訂單"},{key:99,text:"訂單錯誤"}]}},computed:Object(i["a"])({},Object(c["b"])(["orderPage","orderQuery"])),created:function(){this.page=JSON.parse(JSON.stringify(this.orderPage)),this.queryData=JSON.parse(JSON.stringify(this.orderQuery));var t=this.page,e=t.current,r=t.size;this.fetchData(e,r)},beforeDestroy:function(){this.SET_ORDER_PAGE(this.page),this.SET_ORDER_QUERY(this.queryData)},methods:Object(i["a"])(Object(i["a"])({},Object(c["c"])("lists",["SET_ORDER_PAGE","SET_ORDER_QUERY"])),{},{fetchData:function(t,e){var r=this;this.listLoading=!0,Object(u["a"])(t,e,this.queryData).then((function(e){r.list=e.result.map((function(t){return t.isCheck=!1,t})),r.page.current=t,r.page.total=e.total,r.listLoading=!1})).catch((function(t){console.log(t)}))},changeOrderPaidStatus:function(t,e){var r=this;if(e){var n=this.list.find((function(e){return e.id===t})),a=n.title,i=n.uuid;this.$confirm("確定將訂單編號 ".concat(t,"，訂單 ").concat(a," 變更為已付款嗎？")).then((function(){Object(u["d"])(i).then((function(){r.$message({type:"success",message:"訂單付款成功"});var t=r.page,e=t.current,n=t.size;r.fetchData(e,n)})).catch((function(t){console.log(t)}))}))}},showDate:function(t){return t.replace("T"," ").slice(0,-3)},showStatusText:function(t){var e=Number(t);return this.orderStatusList.find((function(t){var r=t.key;return r===e})).text}})},l=o,s=r("2877"),f=Object(s["a"])(l,n,a,!1,null,"e48db0b8",null);e["default"]=f.exports},d784:function(t,e,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),i=r("b622"),u=r("9263"),c=r("9112"),o=i("species"),l=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s=function(){return"$0"==="a".replace(/./,"$0")}(),f=i("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),p=!a((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,f){var h=i(t),g=!a((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),b=g&&!a((function(){var e=!1,r=/a/;return"split"===t&&(r={},r.constructor={},r.constructor[o]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return e=!0,null},r[h](""),!e}));if(!g||!b||"replace"===t&&(!l||!s||d)||"split"===t&&!p){var v=/./[h],m=r(h,""[t],(function(t,e,r,n,a){return e.exec===u?g&&!a?{done:!0,value:v.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),y=m[0],_=m[1];n(String.prototype,t,y),n(RegExp.prototype,h,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}f&&c(RegExp.prototype[h],"sham",!0)}},e9c4:function(t,e,r){var n=r("23e7"),a=r("d066"),i=r("d039"),u=a("JSON","stringify"),c=/[\uD800-\uDFFF]/g,o=/^[\uD800-\uDBFF]$/,l=/^[\uDC00-\uDFFF]$/,s=function(t,e,r){var n=r.charAt(e-1),a=r.charAt(e+1);return o.test(t)&&!l.test(a)||l.test(t)&&!o.test(n)?"\\u"+t.charCodeAt(0).toString(16):t},f=i((function(){return'"\\udf06\\ud834"'!==u("\udf06\ud834")||'"\\udead"'!==u("\udead")}));u&&n({target:"JSON",stat:!0,forced:f},{stringify:function(t,e,r){var n=u.apply(null,arguments);return"string"==typeof n?n.replace(c,s):n}})},f8b7:function(t,e,r){"use strict";r.d(e,"c",(function(){return i})),r.d(e,"b",(function(){return u})),r.d(e,"a",(function(){return c})),r.d(e,"d",(function(){return o}));var n=r("5530"),a=r("b775");function i(t,e,r){return Object(a["a"])({url:"order/saleCount/",method:"post",data:Object(n["a"])({page:t,numberPerPage:e},r)})}function u(t){return Object(a["a"])({url:"order/saleDetail/",method:"post",data:t})}function c(t,e,r){return Object(a["a"])({url:"order/backend/list/",method:"post",data:Object(n["a"])({page:t,numberPerPage:e},r)})}function o(t){return Object(a["a"])({url:"order/".concat(t),method:"patch",data:{status:1}})}}}]);