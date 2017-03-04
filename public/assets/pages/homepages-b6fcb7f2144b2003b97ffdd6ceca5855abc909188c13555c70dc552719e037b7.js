(function(){var t,e;t=function(){function t(t){this.layout=t}return t.prototype.remove_submodule=function(t){return $(".module-sub[data-uuid="+t+"]").remove(),this.each_module(function(e){return function(n){return $.each(n.submodules,function(i,r){if(r.uuid===t)return n.submodules.splice(i,1),e.change_callback()})}}(this))},t.prototype.move_up_submodule=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.prev_path(n)),this.change_callback()},t.prototype.move_down_submodule=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.next_path(n)),this.change_callback()},t.prototype.append_submodule=function(t,e){return this.each_module(function(n){return function(i){if(i.uuid===t)return i.submodules.push(e),n.change_callback()}}(this))},t.prototype.append_row=function(t){return this.layout.push(t),this.change_callback()},t.prototype.remove_row=function(t){return $(".row[data-uuid="+t+"]").remove(),$.each(this.layout,function(e){return function(n,i){if(i.uuid===t)return e.layout.splice(n,1),e.change_callback()}}(this))},t.prototype.children_count=function(t){var e;return e=this.get_layout_element_by_path(t),e.modules?e.modules.length:e.submodules?e.submodules.length:0},t.prototype.prev_path=function(t){switch(t.length){case 1:return[t[0]-1];case 2:return 0===t[1]?[t[0]-1,this.children_count([t[0]-1])-1]:[t[0],t[1]-1];case 3:return[t[0],t[1],t[2]-1]}},t.prototype.next_path=function(t){var e;switch(t.length){case 1:return[t[0]+1];case 2:return e=this.children_count([t[0]]),t[1]===e-1?[t[0]+1,0]:[t[0],t[1]+1];case 3:return[t[0],t[1],t[2]+1]}},t.prototype.of_compatible_size=function(t,e){var n,i;return n=this.get_layout_element_by_path(t),i=this.get_layout_element_by_path(e),!n.cols||t[0]===e[0]||n.cols===i.cols},t.prototype.move_row_upward=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.prev_path(n)),this.change_callback()},t.prototype.move_row_downward=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.next_path(n)),this.change_callback()},t.prototype.move_module_leftward=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.prev_path(n)),this.change_callback()},t.prototype.move_module_rightward=function(t){var e,n,i;return i=this.get_layout_element(t),e=i[0],n=i[1],this.swap_paths(n,this.next_path(n)),this.change_callback()},t.prototype.get_element_by_uuid=function(t){return $("[data-uuid="+t+"]")},t.prototype.swap_elements=function(t,e){var n,i,r,o,a,s;return a=this.get_layout_element(t),n=a[0],r=a[1],s=this.get_layout_element(e),i=s[0],o=s[1],this.of_compatible_size(r,o)?(this.swap_layout_elements(t,e),this.swap_dom_elements(t,e)):void alert("You can only swap elements of compatible sizes. ")},t.prototype.swap_paths=function(t,e){var n,i;if(n=this.get_layout_element_by_path(t),i=this.get_layout_element_by_path(e),n&&i)return this.swap_elements(n.uuid,i.uuid)},t.prototype.get_layout_element=function(t){var e,n;return e=null,n=null,this.each_row(function(i,r){var o;if(i.uuid===t)return o=[i,r],e=o[0],n=o[1],o}),e?[e,n]:(this.each_module(function(i,r){var o;if(i.uuid===t)return o=[i,r],e=o[0],n=o[1],o}),e?[e,n]:(this.each_submodule(function(i,r){var o;if(i.uuid===t)return o=[i,r],e=o[0],n=o[1],o}),e?[e,n]:[null,null]))},t.prototype.set_layout_element=function(t,e){switch(t.length){case 1:return this.layout[t[0]]=e;case 2:return this.layout[t[0]].modules[t[1]]=e;case 3:return this.layout[t[0]].modules[t[1]].submodules[t[2]]=e}},t.prototype.get_layout_element_by_path=function(t){switch(t.length){case 1:return this.layout[t[0]];case 2:return this.layout[t[0]].modules[t[1]];case 3:return this.layout[t[0]].modules[t[1]].submodules[t[2]]}},t.prototype.swap_layout_elements=function(t,e){var n,i,r,o,a,s;if(a=this.get_layout_element(t),n=a[0],r=a[1],s=this.get_layout_element(e),i=s[0],o=s[1],r&&o)return this.set_layout_element(r,i),this.set_layout_element(o,n)},t.prototype.swap_dom_elements=function(t,e){var n,i,r;return n=this.get_element_by_uuid(t),i=this.get_element_by_uuid(e),r=n[0].outerHTML,n.replaceWith(i[0].outerHTML),i.replaceWith(r)},t.prototype.edit_submodule_field=function(t,e,n){return this.each_submodule(function(i){return function(r){if(r.uuid===t)return r[e]=n,i.change_callback()}}(this))},t.prototype.each_row=function(t){return $.each(this.layout,function(e,n){return t(n,[e])})},t.prototype.each_module=function(t){return this.each_row(function(e,n){return $.each(e.modules,function(e,i){return t(i,n.concat([e]))})})},t.prototype.each_submodule=function(t){return this.each_module(function(e,n){return $.each(e.submodules,function(e,i){return t(i,n.concat([e]))})})},t.prototype.on_change=function(t){return this.change_callback=t},t}(),jQuery.fn.toggleAttr=function(t){return this.each(function(){var e;e=$(this),e.attr(t)?e.removeAttr(t):e.attr(t,"true")})},e=function(){if($(".homepages_show").length>0)return window.homepage=new t(gon.layout),window.homepage.on_change(function(){return window.homepage_changed=!0}),$("#save_layout").click(function(){return $(window).unbind("beforeunload"),$("#save_layout_form input[name=layout]").val(JSON.stringify(window.homepage.layout)),$("#save_layout_form").submit(),!1}),$("#mark_publish_ready").click(function(){return confirm("Are you sure that you want to mark this layout as publish ready? ")&&($(window).unbind("beforeunload"),$("#mark_publish_ready_form input[name=layout]").val(JSON.stringify(window.homepage.layout)),$("#mark_publish_ready_form").submit()),!1}),$(".flash").length>0&&$(".master-editing-toolbar").css("opacity","1"),$(document).on("dblclick","*[data-editable]",function(){return $(this).toggleAttr("contenteditable")}),$(document).on("blur keyup paste input","*[data-editable]",function(){var t,e,n;return e=$(this).parents(".module-sub").data("uuid"),t=$(this).data("editable"),n=$(this).text(),$(this).html(n),window.homepage.edit_submodule_field(e,t,n)}),$(window).on("unload",function(){return console.log(window.homepage.layout)}),$(window).on("beforeunload",function(){return window.homepage_changed?"Layout has been changed yet not saved. Discard changes? ":void 0})},$(e)}).call(this);