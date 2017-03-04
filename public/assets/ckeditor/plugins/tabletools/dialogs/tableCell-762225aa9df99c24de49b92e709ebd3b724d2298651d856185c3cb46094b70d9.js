CKEDITOR.dialog.add("cellProperties",function(e){function t(e){return function(t){for(var a=e(t[0]),n=1;n<t.length;n++)if(e(t[n])!==a){a=null;break}"undefined"!=typeof a&&(this.setValue(a),CKEDITOR.env.gecko&&"select"==this.type&&!a&&(this.getInputElement().$.selectedIndex=-1))}}function a(e){if(e=l.exec(e.getStyle("width")||e.getAttribute("width")))return e[2]}var n=e.lang.table,i=n.cell,o=e.lang.common,r=CKEDITOR.dialog.validate,l=/^(\d+(?:\.\d+)?)(px|%)$/,s={type:"html",html:"&nbsp;"},c="rtl"==e.lang.dir,d=e.plugins.colordialog;return{title:i.title,minWidth:CKEDITOR.env.ie&&CKEDITOR.env.quirks?450:410,minHeight:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?230:220,contents:[{id:"info",label:i.title,accessKey:"I",elements:[{type:"hbox",widths:["40%","5%","40%"],children:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["70%","30%"],children:[{type:"text",id:"width",width:"100px",label:o.width,validate:r.number(i.invalidWidth),onLoad:function(){var e=this.getDialog().getContentElement("info","widthType").getElement(),t=this.getInputElement(),a=t.getAttribute("aria-labelledby");t.setAttribute("aria-labelledby",[a,e.$.id].join(" "))},setup:t(function(e){var t=parseInt(e.getAttribute("width"),10);return e=parseInt(e.getStyle("width"),10),isNaN(e)?isNaN(t)?"":t:e}),commit:function(e){var t=parseInt(this.getValue(),10),n=this.getDialog().getValueOf("info","widthType")||a(e);isNaN(t)?e.removeStyle("width"):e.setStyle("width",t+n),e.removeAttribute("width")},"default":""},{type:"select",id:"widthType",label:e.lang.table.widthUnit,labelStyle:"visibility:hidden","default":"px",items:[[n.widthPx,"px"],[n.widthPc,"%"]],setup:t(a)}]},{type:"hbox",widths:["70%","30%"],children:[{type:"text",id:"height",label:o.height,width:"100px","default":"",validate:r.number(i.invalidHeight),onLoad:function(){var e=this.getDialog().getContentElement("info","htmlHeightType").getElement(),t=this.getInputElement(),a=t.getAttribute("aria-labelledby");t.setAttribute("aria-labelledby",[a,e.$.id].join(" "))},setup:t(function(e){var t=parseInt(e.getAttribute("height"),10);return e=parseInt(e.getStyle("height"),10),isNaN(e)?isNaN(t)?"":t:e}),commit:function(e){var t=parseInt(this.getValue(),10);isNaN(t)?e.removeStyle("height"):e.setStyle("height",CKEDITOR.tools.cssLength(t)),e.removeAttribute("height")}},{id:"htmlHeightType",type:"html",html:"<br />"+n.widthPx}]},s,{type:"select",id:"wordWrap",label:i.wordWrap,"default":"yes",items:[[i.yes,"yes"],[i.no,"no"]],setup:t(function(e){var t=e.getAttribute("noWrap");if("nowrap"==e.getStyle("white-space")||t)return"no"}),commit:function(e){"no"==this.getValue()?e.setStyle("white-space","nowrap"):e.removeStyle("white-space"),e.removeAttribute("noWrap")}},s,{type:"select",id:"hAlign",label:i.hAlign,"default":"",items:[[o.notSet,""],[o.alignLeft,"left"],[o.alignCenter,"center"],[o.alignRight,"right"],[o.alignJustify,"justify"]],setup:t(function(e){var t=e.getAttribute("align");return e.getStyle("text-align")||t||""}),commit:function(e){var t=this.getValue();t?e.setStyle("text-align",t):e.removeStyle("text-align"),e.removeAttribute("align")}},{type:"select",id:"vAlign",label:i.vAlign,"default":"",items:[[o.notSet,""],[o.alignTop,"top"],[o.alignMiddle,"middle"],[o.alignBottom,"bottom"],[i.alignBaseline,"baseline"]],setup:t(function(e){var t=e.getAttribute("vAlign");switch(e=e.getStyle("vertical-align")){case"top":case"middle":case"bottom":case"baseline":break;default:e=""}return e||t||""}),commit:function(e){var t=this.getValue();t?e.setStyle("vertical-align",t):e.removeStyle("vertical-align"),e.removeAttribute("vAlign")}}]},s,{type:"vbox",padding:0,children:[{type:"select",id:"cellType",label:i.cellType,"default":"td",items:[[i.data,"td"],[i.header,"th"]],setup:t(function(e){return e.getName()}),commit:function(e){e.renameNode(this.getValue())}},s,{type:"text",id:"rowSpan",label:i.rowSpan,"default":"",validate:r.integer(i.invalidRowSpan),setup:t(function(e){if((e=parseInt(e.getAttribute("rowSpan"),10))&&1!=e)return e}),commit:function(e){var t=parseInt(this.getValue(),10);t&&1!=t?e.setAttribute("rowSpan",this.getValue()):e.removeAttribute("rowSpan")}},{type:"text",id:"colSpan",label:i.colSpan,"default":"",validate:r.integer(i.invalidColSpan),setup:t(function(e){if((e=parseInt(e.getAttribute("colSpan"),10))&&1!=e)return e}),commit:function(e){var t=parseInt(this.getValue(),10);t&&1!=t?e.setAttribute("colSpan",this.getValue()):e.removeAttribute("colSpan")}},s,{type:"hbox",padding:0,widths:["60%","40%"],children:[{type:"text",id:"bgColor",label:i.bgColor,"default":"",setup:t(function(e){var t=e.getAttribute("bgColor");return e.getStyle("background-color")||t}),commit:function(e){this.getValue()?e.setStyle("background-color",this.getValue()):e.removeStyle("background-color"),e.removeAttribute("bgColor")}},d?{type:"button",id:"bgColorChoose","class":"colorChooser",label:i.chooseColor,onLoad:function(){this.getElement().getParent().setStyle("vertical-align","bottom")},onClick:function(){e.getColorFromDialog(function(e){e&&this.getDialog().getContentElement("info","bgColor").setValue(e),this.focus()},this)}}:s]},s,{type:"hbox",padding:0,widths:["60%","40%"],children:[{type:"text",id:"borderColor",label:i.borderColor,"default":"",setup:t(function(e){var t=e.getAttribute("borderColor");return e.getStyle("border-color")||t}),commit:function(e){this.getValue()?e.setStyle("border-color",this.getValue()):e.removeStyle("border-color"),e.removeAttribute("borderColor")}},d?{type:"button",id:"borderColorChoose","class":"colorChooser",label:i.chooseColor,style:(c?"margin-right":"margin-left")+": 10px",onLoad:function(){this.getElement().getParent().setStyle("vertical-align","bottom")},onClick:function(){e.getColorFromDialog(function(e){e&&this.getDialog().getContentElement("info","borderColor").setValue(e),this.focus()},this)}}:s]}]}]}]}],onShow:function(){this.cells=CKEDITOR.plugins.tabletools.getSelectedCells(this._.editor.getSelection()),this.setupContent(this.cells)},onOk:function(){for(var e=this._.editor.getSelection(),t=e.createBookmarks(),a=this.cells,n=0;n<a.length;n++)this.commitContent(a[n]);this._.editor.forceNextSelectionCheck(),e.selectBookmarks(t),this._.editor.selectionChange()},onLoad:function(){var e={};this.foreach(function(t){t.setup&&t.commit&&(t.setup=CKEDITOR.tools.override(t.setup,function(a){return function(){a.apply(this,arguments),e[t.id]=t.getValue()}}),t.commit=CKEDITOR.tools.override(t.commit,function(a){return function(){e[t.id]!==t.getValue()&&a.apply(this,arguments)}}))})}}});