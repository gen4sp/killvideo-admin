(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1156:function(e,t,o){var content=o(1170);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(53).default)("21af60ba",content,!0,{sourceMap:!1})},1160:function(e,t,o){"use strict";var l=o(1151),n=o.n(l),r={email:null,admin:null},c={components:{},props:["visible","user"],data:function(){return{form:n.a.clone(r),labelCol:{span:6},wrapperCol:{span:14},rules:{title:[{required:!0,message:"Please input a title",trigger:"blur"}],visibility:[{required:!0,message:"Please select a visibility",trigger:"change"}],aeUrl:[{required:!0,message:"Please pick a file",trigger:"change"}],jsonUrl:[{required:!0,message:"Please pick a file",trigger:"change"}],coverUrl:[{required:!0,message:"Please pick a file",trigger:"change"}],previewUrl:[{required:!0,message:"Please pick a file",trigger:"change"}]}}},computed:{},watch:{visible:function(e){this.resetForm(),e&&this.user&&(this.form.email=this.user.email,this.form.admin=""+this.user.admin),console.log("zz",e,this.user,this.form)}},methods:{prepareFormData:function(){var e={};return e.email=this.form.email,e.admin="true"===this.form.admin,this.user.id&&(e.id=this.user.id),e},handleOk:function(e){this.onSubmit()},handleCancel:function(e){this.$emit("onClose")},onSubmit:function(){var e=this;console.log(" == ",this.form),this.$refs.ruleForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;var o=e.prepareFormData();console.log("pf",o),e.$emit("onClose",o)}))},resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()}}},d=o(38),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("a-modal",{attrs:{visible:e.visible,title:"Edit user","ok-text":"Save"},on:{ok:e.handleOk,cancel:e.handleCancel}},[o("a-form-model",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[o("a-form-model-item",{ref:"email",attrs:{label:"Email",prop:"email"}},[o("a-input",{attrs:{placeholder:"Title"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),o("a-form-model-item",{ref:"admin",attrs:{label:"Role",prop:"admin"}},[o("div",{staticStyle:{display:"flex"}},[o("a-select",{staticStyle:{width:"120px"},model:{value:e.form.admin,callback:function(t){e.$set(e.form,"admin",t)},expression:"form.admin"}},[o("a-select-option",{attrs:{value:"true"}},[e._v("\n            Admin\n          ")]),e._v(" "),o("a-select-option",{attrs:{value:"false"}},[e._v("\n            User\n          ")])],1)],1)])],1)],1)}),[],!1,null,null,null);t.a=component.exports},1169:function(e,t,o){"use strict";var l=o(1156);o.n(l).a},1170:function(e,t,o){(t=o(52)(!1)).push([e.i,".poster{width:100px;height:100px;background-size:cover;background-position:50%}",""]),e.exports=t},1180:function(e,t,o){"use strict";o.r(t);var l=o(1151),n=o.n(l),r=o(1160),c=[{dataIndex:"id",key:"id",width:140},{title:"email",dataIndex:"email",key:"email"},{title:"admin",dataIndex:"admin",key:"admin",scopedSlots:{customRender:"checkbox"}},{title:"Action",key:"action",scopedSlots:{customRender:"action"},width:190}],d={components:{EditUser:r.a},middleware:"authguard",data:function(){return{loading:!1,selectedUser:null,editUserModalShown:!1,users:[],columns:c}},mounted:function(){this.fetch()},methods:{deleteUser:function(data){var e=this;console.log(" >> ",data),this.$api.apiCall({method:"DELETE",url:"/users/".concat(data.id)}).then((function(data){console.log("del",data),e.closeEditUser(),e.fetch()}))},EditUserModalOnCloseHandle:function(data){var e=this;console.log(" O ",data),data?data.id?this.$api.apiCall({method:"PATCH",url:"/users/".concat(data.id),data:n.a.omit(data,"id")}).then((function(data){console.log("td edit",data),e.closeEditUser(),e.fetch()})):this.$api.apiCall({method:"POST",url:"/users/",data:data}).then((function(data){console.log("td creatre ",data),e.closeEditUser()})):this.closeEditUser()},closeEditUser:function(){this.selectedUser=null,this.editUserModalShown=!1},openEditUser:function(e){this.selectedUser=e,this.editUserModalShown=!0,console.log("sfs",e)},fetch:function(){var e=this;return this.loading=!0,this.$api.apiCall({method:"GET",url:"/users/"}).then((function(data){console.log("td ",data),e.loading=!1,e.users=data.data}))}}},m=(o(1169),o(38)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("a-table",{attrs:{columns:e.columns,"data-source":e.users,loading:e.loading,"row-key":"id"},scopedSlots:e._u([{key:"name",fn:function(text){return o("a",{},[e._v(e._s(text))])}},{key:"img",fn:function(text){return o("span",{},[o("div",{staticClass:"poster",style:{backgroundImage:"url('http://cdn.killvideo.tv/"+text.split("\\").join("\\\\")+"')"}})])}},{key:"checkbox",fn:function(e){return o("span",{},[o("a-checkbox",{attrs:{"default-checked":Boolean(e),disabled:""}})],1)}},{key:"action",fn:function(t){return o("span",{},[o("a",{on:{click:function(o){return e.openEditUser(t)}}},[e._v("Edit")]),e._v(" "),o("a-divider",{attrs:{type:"vertical"}}),e._v(" "),o("a-dropdown",[o("a",{staticClass:"ant-dropdown-link"},[e._v(" More actions "),o("a-icon",{attrs:{type:"down"}})],1),e._v(" "),o("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[o("a-menu-item",[o("a",{attrs:{href:"javascript:;"},on:{click:function(o){return e.deleteUser(t)}}},[e._v("Delete")])])],1)],1)],1)}}])}),e._v(" "),o("EditUser",{attrs:{user:e.selectedUser,visible:e.editUserModalShown},on:{onClose:e.EditUserModalOnCloseHandle}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);