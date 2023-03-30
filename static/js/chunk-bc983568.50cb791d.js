(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bc983568"],{"01c6":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-card",{staticClass:"w-100 rouned-3 mb-3"},[r("el-form",{attrs:{inline:"",model:t.queryData}},[r("div",{staticClass:"d-flex"},[r("el-form-item",{attrs:{label:"出租 ID"}},[r("el-input",{attrs:{placeholder:"請輸入出租 id"},model:{value:t.queryData.orderID,callback:function(e){t.$set(t.queryData,"orderID",e)},expression:"queryData.orderID"}})],1),r("el-form-item",{attrs:{label:"手機"}},[r("el-input",{attrs:{placeholder:"請輸入手機"},model:{value:t.queryData.phoneNumber,callback:function(e){t.$set(t.queryData,"phoneNumber",e)},expression:"queryData.phoneNumber"}})],1),r("el-form-item",{attrs:{label:"租借狀態"}},[r("el-select",{attrs:{placeholder:"請選擇類別"},model:{value:t.queryData.status,callback:function(e){t.$set(t.queryData,"status",e)},expression:"queryData.status"}},[r("el-option",{attrs:{label:"全部",value:""}}),r("el-option",{attrs:{label:"租借中",value:1}}),r("el-option",{attrs:{label:"已歸還",value:2}})],1)],1)],1),r("div",{staticClass:"d-flex justify-content-end"},[r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){return t.fetchData(1,t.page.size)}}},[t._v("搜尋")])],1)],1)])],1),r("el-card",{staticClass:"w-100 rouned-3"},[r("div",{staticClass:"d-flex justify-content-between align-items-center mb-4"},[r("h5",{staticClass:"my-0"},[t._v("租借列表")])]),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{label:"租車 ID",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.orderID)+" ")]}}])}),r("el-table-column",{attrs:{label:"車輛 ID",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.carID)+" ")]}}])}),r("el-table-column",{attrs:{label:"租借人手機",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.phoneNumber)+" ")]}}])}),r("el-table-column",{attrs:{label:"租借人名稱",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.name)+" ")]}}])}),r("el-table-column",{attrs:{label:"租借狀況",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(1===Number(e.row.status)?"租借中":"已歸還")+" ")]}}])}),r("el-table-column",{attrs:{label:"出租時間",width:"170",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("i",{staticClass:"el-icon-time"}),r("span",[t._v(t._s(t.showDate(e.row.rentTime)))])]}}])}),r("el-table-column",{attrs:{label:"操作",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"歸還",placement:"top"}},[r("el-button",{attrs:{type:"text",size:"large",disabled:2===Number(e.row.status)},on:{click:function(r){t.returnBike(e.row.orderID,2===Number(e.row.status))}}},[r("i",{staticClass:"el-icon-refresh-left"})])],1),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"查看合約",placement:"top"}},[r("el-button",{attrs:{type:"text",size:"large"},on:{click:function(r){return t.showContract(e.row.contractImage)}}},[r("i",{staticClass:"el-icon-s-order"})])],1)]}}])})],1),r("div",{staticClass:"d-flex justify-content-end align-items-center mt-3"},[r("el-pagination",{attrs:{"current-page":t.page.current,"page-sizes":[10,30,50,100],"page-size":t.page.size,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"update:currentPage":function(e){return t.$set(t.page,"current",e)},"update:current-page":function(e){return t.$set(t.page,"current",e)},"current-change":function(e){return t.fetchData(e,t.page.size)},"size-change":function(e){return t.fetchData(1,e)}}})],1)],1),r("el-dialog",{attrs:{visible:t.isShowContract,width:"70%",top:"15px","close-on-click-modal":!1},on:{"update:visible":function(e){t.isShowContract=e}}},[r("div",{staticClass:"d-flex justify-content-center"},[r("img",{attrs:{src:t.contractImageUrl,alt:""}})])])],1)},a=[],c=r("5530"),o=(r("e9c4"),r("fb6a"),r("ac1f"),r("5319"),r("2f62")),i=r("3de4"),u={name:"RentList",data:function(){return{list:[],listLoading:!0,isShowContract:!1,contractImageUrl:"",page:{current:1,size:10,total:0},queryData:{status:"",phoneNumber:"",orderID:""}}},computed:Object(c["a"])({},Object(o["b"])(["rentPage","rentQuery"])),created:function(){this.page=JSON.parse(JSON.stringify(this.rentPage)),this.queryData=JSON.parse(JSON.stringify(this.rentQuery));var t=this.page,e=t.current,r=t.size;this.fetchData(e,r)},beforeDestroy:function(){this.SET_RENT_PAGE(this.page),this.SET_RENT_QUERY(this.queryData)},methods:Object(c["a"])(Object(c["a"])({},Object(o["c"])("lists",["SET_RENT_PAGE","SET_RENT_QUERY"])),{},{fetchData:function(t,e){var r=this;this.listLoading=!0,Object(i["e"])(t,e,this.queryData).then((function(e){r.list=e.car,r.page.current=t,r.page.total=e.total,r.listLoading=!1})).catch((function(t){console.log(t)}))},returnBike:function(t,e){var r=this;e||this.$confirm("確定歸還此車輛嗎？","Warning",{confirmButtonText:"確定",cancelButtonText:"取消",type:"warning"}).then((function(){r.listLoading=!0,Object(i["j"])(t).then((function(){var t=r.page,e=t.current,n=t.size;r.fetchData(e,n),r.listLoading=!1,r.$message({type:"success",message:"歸還成功"})})).catch((function(){r.listLoading=!1}))}))},showDate:function(t){return t.replace("T"," ").slice(0,-3)},showContract:function(t){this.contractImageUrl=t,this.isShowContract=!0}})},l=u,s=r("2877"),d=Object(s["a"])(l,n,a,!1,null,"09c89790",null);e["default"]=d.exports},"14c3":function(t,e,r){var n=r("c6b6"),a=r("9263");t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var c=r.call(t,e);if("object"!==typeof c)throw TypeError("RegExp exec method returned something other than an Object or null");return c}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"3de4":function(t,e,r){"use strict";r.d(e,"e",(function(){return c})),r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return i})),r.d(e,"j",(function(){return u})),r.d(e,"h",(function(){return l})),r.d(e,"f",(function(){return s})),r.d(e,"a",(function(){return d})),r.d(e,"i",(function(){return f})),r.d(e,"g",(function(){return p})),r.d(e,"b",(function(){return g}));var n=r("5530"),a=r("b775");function c(t,e,r){return Object(a["a"])({url:"car/list/order_status/",method:"post",data:Object(n["a"])({page:t,numberPerPage:e},r)})}function o(t,e){return Object(a["a"])({url:"car/list/",method:"post",data:{page:t,numberPerPage:e}})}function i(){return Object(a["a"])({url:"locate/",method:"get"})}function u(t){return Object(a["a"])({url:"car_order/return/write_off/backend/",method:"post",data:{orderID:t}})}function l(t){return Object(a["a"])({url:"car/",method:"post",data:Object(n["a"])(Object(n["a"])({},t),{},{status:1})})}function s(t){var e=t.id,r=t.title,n=t.lastLocate,c=t.status,o=t.category;return Object(a["a"])({url:"car/".concat(e),method:"patch",data:{title:r,lastLocate:n,category:o,status:c}})}function d(t){return Object(a["a"])({url:"car/".concat(t),method:"delete"})}function f(t){var e=t.title,r=t.address,n=t.lng,c=t.lat;return Object(a["a"])({url:"locate/",method:"post",data:{title:e,address:r,lng:n,lat:c,status:1}})}function p(t){var e=t.id,r=t.title,n=t.address,c=t.lng,o=t.lat,i=t.status;return Object(a["a"])({url:"locate/".concat(e),method:"patch",data:{title:r,address:n,lng:c,lat:o,status:i}})}function g(t){return Object(a["a"])({url:"locate/".concat(t),method:"delete"})}},5319:function(t,e,r){"use strict";var n=r("d784"),a=r("825a"),c=r("7b0b"),o=r("50c4"),i=r("a691"),u=r("1d80"),l=r("8aa5"),s=r("14c3"),d=Math.max,f=Math.min,p=Math.floor,g=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,b=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var v=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=n.REPLACE_KEEPS_$0,y=v?"$":"$0";return[function(r,n){var a=u(this),c=void 0==r?void 0:r[t];return void 0!==c?c.call(r,a,n):e.call(String(a),r,n)},function(t,n){if(!v&&m||"string"===typeof n&&-1===n.indexOf(y)){var c=r(e,t,this,n);if(c.done)return c.value}var u=a(t),p=String(this),g="function"===typeof n;g||(n=String(n));var h=u.global;if(h){var D=u.unicode;u.lastIndex=0}var E=[];while(1){var x=s(u,p);if(null===x)break;if(E.push(x),!h)break;var w=String(x[0]);""===w&&(u.lastIndex=l(p,o(u.lastIndex),D))}for(var S="",j=0,O=0;O<E.length;O++){x=E[O];for(var C=String(x[0]),k=d(f(i(x.index),p.length),0),$=[],N=1;N<x.length;N++)$.push(b(x[N]));var I=x.groups;if(g){var T=[C].concat($,k,p);void 0!==I&&T.push(I);var R=String(n.apply(void 0,T))}else R=_(C,p,k,$,I,n);k>=j&&(S+=p.slice(j,k)+R,j=k+C.length)}return S+p.slice(j)}];function _(t,r,n,a,o,i){var u=n+t.length,l=a.length,s=h;return void 0!==o&&(o=c(o),s=g),e.call(i,s,(function(e,c){var i;switch(c.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(u);case"<":i=o[c.slice(1,-1)];break;default:var s=+c;if(0===s)return e;if(s>l){var d=p(s/10);return 0===d?e:d<=l?void 0===a[d-1]?c.charAt(1):a[d-1]+c.charAt(1):e}i=a[s-1]}return void 0===i?"":i}))}}))},"8aa5":function(t,e,r){"use strict";var n=r("6547").charAt;t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},d784:function(t,e,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),c=r("b622"),o=r("9263"),i=r("9112"),u=c("species"),l=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s=function(){return"$0"==="a".replace(/./,"$0")}(),d=c("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!a((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,d){var g=c(t),h=!a((function(){var e={};return e[g]=function(){return 7},7!=""[t](e)})),b=h&&!a((function(){var e=!1,r=/a/;return"split"===t&&(r={},r.constructor={},r.constructor[u]=function(){return r},r.flags="",r[g]=/./[g]),r.exec=function(){return e=!0,null},r[g](""),!e}));if(!h||!b||"replace"===t&&(!l||!s||f)||"split"===t&&!p){var v=/./[g],m=r(g,""[t],(function(t,e,r,n,a){return e.exec===o?h&&!a?{done:!0,value:v.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=m[0],_=m[1];n(String.prototype,t,y),n(RegExp.prototype,g,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}d&&i(RegExp.prototype[g],"sham",!0)}},e9c4:function(t,e,r){var n=r("23e7"),a=r("d066"),c=r("d039"),o=a("JSON","stringify"),i=/[\uD800-\uDFFF]/g,u=/^[\uD800-\uDBFF]$/,l=/^[\uDC00-\uDFFF]$/,s=function(t,e,r){var n=r.charAt(e-1),a=r.charAt(e+1);return u.test(t)&&!l.test(a)||l.test(t)&&!u.test(n)?"\\u"+t.charCodeAt(0).toString(16):t},d=c((function(){return'"\\udf06\\ud834"'!==o("\udf06\ud834")||'"\\udead"'!==o("\udead")}));o&&n({target:"JSON",stat:!0,forced:d},{stringify:function(t,e,r){var n=o.apply(null,arguments);return"string"==typeof n?n.replace(i,s):n}})}}]);