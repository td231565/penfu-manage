(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f436192c"],{"0835":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"d-flex"},[t.fileList.length?i("div",{staticClass:"d-flex"},t._l(t.fileList,(function(e,o){return i("div",{key:e.uuid,staticClass:"upload-block avatar d-flex justify-content-center align-items-center position-relative me-3"},[i("img",{staticClass:"avatar position-absolute top-0 start-0",attrs:{src:e.link,alt:""}}),i("div",{staticClass:"avatar hide justify-content-center align-items-center position-absolute top-0 start-0",staticStyle:{"background-color":"rgba(0,0,0,0.6)"}},[i("i",{staticClass:"el-icon-zoom-in fs-5 me-2 cursor-pointer text-white-50",on:{click:function(i){return t.handlePictureCardPreview(e.url)}}}),i("i",{staticClass:"el-icon-delete fs-5 cursor-pointer text-white-50",on:{click:function(i){return t.handleRemove(e.url,o)}}})])])})),0):t._e(),t.fileList.length<t.countLimit?i("label",{staticClass:"avatar-uploader position-relative",attrs:{for:"image-uploader-"+t.inputId,tabindex:"0"}},[i("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),i("input",{staticClass:"el-upload__input",attrs:{id:"image-uploader-"+t.inputId,type:"file",name:"image-uploader",accept:".jpg, .jpeg, .png",disabled:t.fileList.length===t.countLimit},on:{change:t.beforeImageUpload}})]):t._e()]),i("p",{staticClass:"my-0"},[t._v("只能上傳 jpg/png，大小不超過 5MB，尺寸 1000px * 800px")]),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)},a=[],n=(i("caad"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("9861"),i("a434"),i("b0c0"),i("91b6")),r={name:"ImageUpload",props:{isMultiple:{type:Boolean,default:!1},fileList:{type:Array,required:!0}},data:function(){return{percentage:0,dialogVisible:!1,dialogImageUrl:""}},computed:{countLimit:function(){return this.isMultiple?3:1},inputId:function(){return(new Date).valueOf()}},methods:{beforeImageUpload:function(t){var e=this,i=t.target.files[0],o=["image/jpeg","image/jpg","image/png"].includes(i.type),a=5242880,n=i.size<a,r=this.fileList.length<this.countLimit;if(o)if(n)if(r){var s=new Image;s.onload=function(){var t=s.width,a=s.height;t>1e3||a>800?e.$message.error("圖片尺寸超過限制"):o&&n&&r&&e.uploadImage(i)},s.src=window.URL.createObjectURL(i)}else this.$message.error("圖片上限 ".concat(this.countLimit," 張"));else this.$message.error("圖片容量不能超過 5MB");else this.$message.error("圖片格式須為 jpg, jpeg, png")},handleRemove:function(t,e){this.fileList.splice(e,1)},handlePictureCardPreview:function(t){this.dialogImageUrl=t,this.dialogVisible=!0},uploadImage:function(t){var e=this,i=this.$loading({lock:!0,spinner:"el-icon-loading fs-1",background:"rgba(0, 0, 0, 0.7)"}),o=new FormData;o.append("image",t),Object(n["a"])(o).then((function(o){var a={name:t.name,link:o.image_link,category:e.isMultiple?"Content":"List",uuid:(new Date).valueOf()};e.fileList.length<e.countLimit&&e.fileList.push(a),i.close()})).catch((function(t){console.log(t),i.close()}))}}},s=r,c=(i("11ba"),i("2877")),l=Object(c["a"])(s,o,a,!1,null,null,null);e["a"]=l.exports},"095c":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("TinyEditor",{attrs:{"api-key":"mi512enaed3bnt81xitalewoqtf3nr5j0p9jlahxntts4m08",init:t.initOption},model:{value:t.editorContent,callback:function(e){t.editorContent=e},expression:"editorContent"}})},a=[],n=i("ca72"),r=i("91b6"),s={name:"Editor",components:{TinyEditor:n["a"]},props:{content:{type:String,default:""}},data:function(){return{editorContent:"",initOption:{height:300,menubar:!1,plugins:["advlist autolink lists link image charmap print preview anchor","searchreplace visualblocks code fullscreen","insertdatetime media table paste code help wordcount"],toolbar:"undo redo | fontselect fontsizeselect formatselect | bold italic forecolor backcolor |           alignleft aligncenter alignright alignjustify | image |           bullist numlist outdent indent | removeformat | code",images_upload_handler:this.uploadImage}}},watch:{editorContent:function(t){this.$emit("on-change",t)},content:{immediate:!0,handler:function(t){this.editorContent=t}}},methods:{uploadImage:function(t,e,i,o){var a=new FormData;a.append("image",t.blob(),t.filename()),Object(r["a"])(a).then((function(t){e(t.image_link)})).catch((function(t){console.log(t),i("image upload error")}))}}},c=s,l=i("2877"),u=Object(l["a"])(c,o,a,!1,null,null,null);e["a"]=u.exports},1107:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.isLoading,expression:"isLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"app-container"},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.formRules,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"商品名稱",prop:"title"}},[i("el-input",{attrs:{placeholder:"請輸入商品名稱"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"商品副標",prop:"subTitle"}},[i("el-input",{attrs:{placeholder:"請輸入商品副標"},model:{value:t.form.subTitle,callback:function(e){t.$set(t.form,"subTitle",e)},expression:"form.subTitle"}})],1),i("el-form-item",{attrs:{label:"商品類別",prop:"category"}},[i("el-select",{attrs:{placeholder:"請選擇"},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}},[i("el-option",{attrs:{label:"票券",value:"票券"}}),i("el-option",{attrs:{label:"伴手禮",value:"伴手禮"}})],1)],1),i("el-form-item",{attrs:{label:"商品清單圖片",prop:"listImage"}},[i("ImageUpload",{attrs:{"file-list":t.form.listImage}})],1),i("el-form-item",{attrs:{label:"商品內頁圖片",prop:"contentImage"}},[i("ImageUpload",{attrs:{"file-list":t.form.contentImage,"is-multiple":""}})],1),i("el-form-item",{attrs:{label:"內容描述",prop:"contentArticle"}},[i("Editor",{attrs:{content:t.form.contentArticle},on:{"on-change":function(e){return t.setInputValue("contentArticle",e)}}})],1),"伴手禮"===t.form.category?[i("el-form-item",{attrs:{label:"商品價格",prop:"price"}},[i("el-input-number",{attrs:{placeholder:"請輸入商品價格",min:1},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),i("el-form-item",{attrs:{label:"庫存",prop:"stock"}},[i("el-input-number",{attrs:{placeholder:"請輸入商品庫存",min:1},model:{value:t.stock,callback:function(e){t.stock=e},expression:"stock"}})],1)]:"票券"===t.form.category?[i("hr",{staticClass:"border-0 border-top border-gray my-5"}),i("div",{staticClass:"d-flex"},[i("el-calendar",{staticClass:"w-50",scopedSlots:t._u([{key:"dateCell",fn:function(e){e.date;var o=e.data;return[i("div",{staticClass:"w-100 h-100",on:{click:function(e){t.selectedDate=o.day}}},[i("p",{staticClass:"my-0 border rounded-pill p-1 text-center",class:{"border-info":o.isSelected}},[t._v(t._s(o.day.slice(-2)))]),t.hasStock(o.day)?i("i",{staticClass:"el-icon-s-ticket d-block text-center mt-2 text-success"}):t._e()])]}}])}),i("div",{staticClass:"ms-4"},[i("div",{staticClass:"d-flex justify-content-between align-items-center border-bottom border-gray mb-3"},[t.selectedDate?i("p",[t._v("票券日期"),i("span",{staticClass:"ms-2 fw-bold"},[t._v(t._s(t.selectedDate))])]):i("p",[t._v("請選擇左側日曆的日期")]),t.selectedDate?i("el-button",{staticClass:"fs-3",attrs:{type:"text",size:"mini",icon:"el-icon-circle-plus-outline",circle:""},on:{click:function(e){return t.addNewStock(t.selectedDate)}}}):t._e()],1),t.selectedDate?[i("div",{staticClass:"d-flex"},[i("span",{staticClass:"stock-col"},[t._v("時間")]),i("span",{staticClass:"stock-col ms-2"},[t._v("價格")]),i("span",{staticClass:"stock-col ms-2"},[t._v("庫存")])]),t._l(t.selectedTicketStock,(function(e){return i("div",{key:e.key,staticClass:"d-flex align-items-center"},[i("el-time-select",{staticClass:"stock-col",attrs:{"picker-options":{start:"06:30",step:"00:05",end:"22:30"},placeholder:"請選擇"},model:{value:e.time,callback:function(i){t.$set(e,"time",i)},expression:"item.time"}}),i("el-input",{staticClass:"stock-col ms-2",attrs:{type:"tel",min:1},model:{value:e.price,callback:function(i){t.$set(e,"price",i)},expression:"item.price"}}),i("el-input",{staticClass:"stock-col ms-2",attrs:{type:"tel",min:1},model:{value:e.stock,callback:function(i){t.$set(e,"stock",i)},expression:"item.stock"}}),i("el-button",{staticClass:"ms-2 fs-3",attrs:{type:"text",size:"mini",icon:"el-icon-remove-outline",circle:""},on:{click:function(i){return t.removeStock(e.key)}}})],1)}))]:t._e()],2)],1)]:t._e(),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.isCreate?"新增":"儲存"))]),i("el-button",{on:{click:t.gotoList}},[t._v("取消")])],1)],2)],1)},a=[],n=(i("4e82"),i("4de4"),i("d3b7"),i("159b"),i("d81d"),i("c740"),i("a434"),i("095c")),r=i("0835"),s=i("c4c8"),c={name:"ProductCreate",components:{Editor:n["a"],ImageUpload:r["a"]},data:function(){var t=function(t,e,i){if(console.log(e),0===e.length)return i(new Error("請上傳圖片"));i()};return{isLoading:!1,placeQuery:"",form:{title:"",subTitle:"",contentArticle:"",listImage:[],contentImage:[],status:0,price:0,category:"",ticketStock:[]},stock:1,formRules:{title:[{required:!0,message:"請輸入商品名稱",trigger:"blur"}],category:[{required:!0,message:"請選擇商品類別",trigger:"blur"}],contentArticle:[{required:!0,message:"請輸入內容描述",trigger:"blur"}],listImage:[{required:!0,validator:t,trigger:"blur"}],contentImage:[{required:!0,validator:t,trigger:"blur"}],price:[{required:!0,message:"請輸入商品價格",trigger:"blur"}]},selectedDate:"",isCreate:!1}},computed:{selectedTicketStock:function(){var t=this;return this.form.ticketStock.filter((function(e){var i=e.date;return i===t.selectedDate})).sort((function(t,e){return t.time-e.time}))}},created:function(){var t=this.$route.params.id;this.isCreate=!t,t&&this.getProductDetail(t)},methods:{getProductDetail:function(t){var e=this;this.isLoading=!0,Object(s["b"])(t).then((function(t){e.form=t.product,e.isLoading=!1})).catch((function(){e.isLoading=!1}))},onSubmit:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return t.$message.error("請確認必填欄位輸入完整"),!1;t.isLoading=!0;var i=t.isCreate?s["e"]:s["d"];"伴手禮"===t.form.category?t.form.ticketStock=[{date:"2999-12-31",time:"11:59",stock:parseInt(t.stock),price:parseInt(t.form.price)}]:(t.form.ticketStock.forEach((function(t){t.price=parseInt(t.price),t.stock=parseInt(t.stock)})),t.form.price=t.form.ticketStock.map((function(t){var e=t.price;return e})).sort()[0]);var o=t.$route.params.id;i(t.form,o).then((function(){t.$message({type:"success",message:"儲存成功"}),t.$router.push({name:"ProductList"})})).catch((function(){t.isLoading=!1}))}))},setInputValue:function(t,e){this.form[t]=e},addNewStock:function(t){this.form.ticketStock.push({date:t,time:"",stock:1,price:1,key:(new Date).valueOf()})},removeStock:function(t){var e=this.form.ticketStock.findIndex((function(e){return e.key===t}));this.form.ticketStock.splice(e,1)},hasStock:function(t){return this.form.ticketStock.filter((function(e){return e.date===t})).length>0},gotoList:function(){var t=this;this.$confirm("確定返回列表嗎？資料將不會儲存").then((function(){t.$router.push({name:"ProductList"})}))}}},l=c,u=(i("87a3"),i("2877")),d=Object(u["a"])(l,o,a,!1,null,"4f98ca38",null);e["default"]=d.exports},"11ba":function(t,e,i){"use strict";i("8810")},"4e82":function(t,e,i){"use strict";var o=i("23e7"),a=i("1c0b"),n=i("7b0b"),r=i("d039"),s=i("a640"),c=[],l=c.sort,u=r((function(){c.sort(void 0)})),d=r((function(){c.sort(null)})),m=s("sort"),f=u||!d||!m;o({target:"Array",proto:!0,forced:f},{sort:function(t){return void 0===t?l.call(n(this)):l.call(n(this),a(t))}})},5098:function(t,e,i){},"87a3":function(t,e,i){"use strict";i("5098")},8810:function(t,e,i){},"91b6":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var o=i("b775");function a(t){return Object(o["a"])({url:"upload/",method:"post",data:t,headers:{"Content-type":"multipart/form-data"}})}},c4c8:function(t,e,i){"use strict";i.d(e,"c",(function(){return n})),i.d(e,"b",(function(){return r})),i.d(e,"e",(function(){return s})),i.d(e,"d",(function(){return c})),i.d(e,"a",(function(){return l}));var o=i("5530"),a=i("b775");function n(t,e,i){return Object(a["a"])({url:"product/list/",method:"post",data:Object(o["a"])({page:t,numberPerPage:e},i)})}function r(t){return Object(a["a"])({url:"product/".concat(t),method:"get"})}function s(t){return Object(a["a"])({url:"product/",method:"post",data:t})}function c(t,e){return Object(a["a"])({url:"product/".concat(e),method:"patch",data:t})}function l(t){return Object(a["a"])({url:"product/",method:"delete",data:{id:t}})}},c740:function(t,e,i){"use strict";var o=i("23e7"),a=i("b727").findIndex,n=i("44d2"),r=i("ae40"),s="findIndex",c=!0,l=r(s);s in[]&&Array(1)[s]((function(){c=!1})),o({target:"Array",proto:!0,forced:c||!l},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n(s)}}]);