!function(){CKEDITOR.dialog.add("link",function(e){var t,n,a=CKEDITOR.plugins.link,i=function(){var t=this.getDialog(),n=t.getContentElement("target","popupFeatures"),t=t.getContentElement("target","linkTargetName"),a=this.getValue();if(n&&t)switch(n=n.getElement(),n.hide(),t.setValue(""),a){case"frame":t.setLabel(e.lang.link.targetFrameName),t.getElement().show();break;case"popup":n.show(),t.setLabel(e.lang.link.targetPopupName),t.getElement().show();break;default:t.setValue(a),t.getElement().hide()}},o=function(e){e.target&&this.setValue(e.target[this.id]||"")},r=function(e){e.advanced&&this.setValue(e.advanced[this.id]||"")},l=function(e){e.target||(e.target={}),e.target[this.id]=this.getValue()||""},s=function(e){e.advanced||(e.advanced={}),e.advanced[this.id]=this.getValue()||""},d=e.lang.common,c=e.lang.link;return{title:c.title,minWidth:"moono-lisa"==(CKEDITOR.skinName||e.config.skin)?450:350,minHeight:240,contents:[{id:"info",label:c.info,title:c.info,elements:[{type:"text",id:"linkDisplayText",label:c.displayText,setup:function(){this.enable(),this.setValue(e.getSelection().getSelectedText()),t=this.getValue()},commit:function(e){e.linkText=this.isEnabled()?this.getValue():""}},{id:"linkType",type:"select",label:c.type,"default":"url",items:[[c.toUrl,"url"],[c.toAnchor,"anchor"],[c.toEmail,"email"]],onChange:function(){var t=this.getDialog(),n=["urlOptions","anchorOptions","emailOptions"],a=this.getValue(),i=t.definition.getContents("upload"),i=i&&i.hidden;for("url"==a?(e.config.linkShowTargetTab&&t.showPage("target"),i||t.showPage("upload")):(t.hidePage("target"),i||t.hidePage("upload")),i=0;i<n.length;i++){var o=t.getContentElement("info",n[i]);o&&(o=o.getElement().getParent().getParent(),n[i]==a+"Options"?o.show():o.hide())}t.layout()},setup:function(e){this.setValue(e.type||"url")},commit:function(e){e.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:d.protocol,"default":"http://",items:[["http://\u200e","http://"],["https://\u200e","https://"],["ftp://\u200e","ftp://"],["news://\u200e","news://"],[c.other,""]],setup:function(e){e.url&&this.setValue(e.url.protocol||"")},commit:function(e){e.url||(e.url={}),e.url.protocol=this.getValue()}},{type:"text",id:"url",label:d.url,required:!0,onLoad:function(){this.allowOnChange=!0},onKeyUp:function(){this.allowOnChange=!1;var e=this.getDialog().getContentElement("info","protocol"),t=this.getValue(),n=/^((javascript:)|[#\/\.\?])/i,a=/^(http|https|ftp|news):\/\/(?=.)/i.exec(t);a?(this.setValue(t.substr(a[0].length)),e.setValue(a[0].toLowerCase())):n.test(t)&&e.setValue(""),this.allowOnChange=!0},onChange:function(){this.allowOnChange&&this.onKeyUp()},validate:function(){var t=this.getDialog();return!(!t.getContentElement("info","linkType")||"url"==t.getValueOf("info","linkType"))||(!e.config.linkJavaScriptLinksAllowed&&/javascript\:/.test(this.getValue())?(alert(d.invalidValue),!1):!!this.getDialog().fakeObj||CKEDITOR.dialog.validate.notEmpty(c.noUrl).apply(this))},setup:function(e){this.allowOnChange=!1,e.url&&this.setValue(e.url.url),this.allowOnChange=!0},commit:function(e){this.onChange(),e.url||(e.url={}),e.url.url=this.getValue(),this.allowOnChange=!1}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().show()}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:d.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:c.selectAnchor,setup:function(){n=a.getEditorAnchors(e),this.getElement()[n&&n.length?"show":"hide"]()},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:c.anchorName,style:"width: 100%;",items:[[""]],setup:function(e){if(this.clear(),this.add(""),n)for(var t=0;t<n.length;t++)n[t].name&&this.add(n[t].name);e.anchor&&this.setValue(e.anchor.name),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.focus()},commit:function(e){e.anchor||(e.anchor={}),e.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:c.anchorId,style:"width: 100%;",items:[[""]],setup:function(e){if(this.clear(),this.add(""),n)for(var t=0;t<n.length;t++)n[t].id&&this.add(n[t].id);e.anchor&&this.setValue(e.anchor.id)},commit:function(e){e.anchor||(e.anchor={}),e.anchor.id=this.getValue()}}],setup:function(){this.getElement()[n&&n.length?"show":"hide"]()}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="note" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(c.noAnchors)+"</div>",focus:!0,setup:function(){this.getElement()[n&&n.length?"hide":"show"]()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:c.emailAddress,required:!0,validate:function(){var e=this.getDialog();return!e.getContentElement("info","linkType")||"email"!=e.getValueOf("info","linkType")||CKEDITOR.dialog.validate.notEmpty(c.noEmail).apply(this)},setup:function(e){e.email&&this.setValue(e.email.address),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.select()},commit:function(e){e.email||(e.email={}),e.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:c.emailSubject,setup:function(e){e.email&&this.setValue(e.email.subject)},commit:function(e){e.email||(e.email={}),e.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:c.emailBody,rows:3,"default":"",setup:function(e){e.email&&this.setValue(e.email.body)},commit:function(e){e.email||(e.email={}),e.email.body=this.getValue()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}}]},{id:"target",requiredContent:"a[target]",label:c.target,title:c.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:d.target,"default":"notSet",style:"width : 100%;",items:[[d.notSet,"notSet"],[c.targetFrame,"frame"],[c.targetPopup,"popup"],[d.targetNew,"_blank"],[d.targetTop,"_top"],[d.targetSelf,"_self"],[d.targetParent,"_parent"]],onChange:i,setup:function(e){e.target&&this.setValue(e.target.type||"notSet"),i.call(this)},commit:function(e){e.target||(e.target={}),e.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:c.targetFrameName,"default":"",setup:function(e){e.target&&this.setValue(e.target.name)},commit:function(e){e.target||(e.target={}),e.target.name=this.getValue().replace(/([^\x00-\x7F]|\s)/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:c.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:c.popupResizable,setup:o,commit:l},{type:"checkbox",id:"status",label:c.popupStatusBar,setup:o,commit:l}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:c.popupLocationBar,setup:o,commit:l},{type:"checkbox",id:"toolbar",label:c.popupToolbar,setup:o,commit:l}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:c.popupMenuBar,setup:o,commit:l},{type:"checkbox",id:"fullscreen",label:c.popupFullScreen,setup:o,commit:l}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:c.popupScrollBars,setup:o,commit:l},{type:"checkbox",id:"dependent",label:c.popupDependent,setup:o,commit:l}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:d.width,id:"width",setup:o,commit:l},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:c.popupLeft,id:"left",setup:o,commit:l}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:d.height,id:"height",setup:o,commit:l},{type:"text",labelLayout:"horizontal",label:c.popupTop,widths:["50%","50%"],id:"top",setup:o,commit:l}]}]}]}]},{id:"upload",label:c.upload,title:c.upload,hidden:!0,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:d.upload,style:"height:40px",size:29},{type:"fileButton",id:"uploadButton",label:d.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:c.advanced,title:c.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",requiredContent:"a[id]",label:c.id,setup:r,commit:s},{type:"select",id:"advLangDir",requiredContent:"a[dir]",label:c.langDir,"default":"",style:"width:110px",items:[[d.notSet,""],[c.langDirLTR,"ltr"],[c.langDirRTL,"rtl"]],setup:r,commit:s},{type:"text",id:"advAccessKey",requiredContent:"a[accesskey]",width:"80px",label:c.acccessKey,maxLength:1,setup:r,commit:s}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:c.name,id:"advName",requiredContent:"a[name]",setup:r,commit:s},{type:"text",label:c.langCode,id:"advLangCode",requiredContent:"a[lang]",width:"110px","default":"",setup:r,commit:s},{type:"text",label:c.tabIndex,id:"advTabIndex",requiredContent:"a[tabindex]",width:"80px",maxLength:5,setup:r,commit:s}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:c.advisoryTitle,requiredContent:"a[title]","default":"",id:"advTitle",setup:r,commit:s},{type:"text",label:c.advisoryContentType,requiredContent:"a[type]","default":"",id:"advContentType",setup:r,commit:s}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:c.cssClasses,requiredContent:"a(cke-xyz)","default":"",id:"advCSSClasses",setup:r,commit:s},{type:"text",label:c.charset,requiredContent:"a[charset]","default":"",id:"advCharset",setup:r,commit:s}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:c.rel,requiredContent:"a[rel]","default":"",id:"advRel",setup:r,commit:s},{type:"text",label:c.styles,requiredContent:"a{cke-xyz}","default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(e.lang.common.invalidInlineStyle),setup:r,commit:s}]},{type:"hbox",widths:["45%","55%"],children:[{type:"checkbox",id:"download",requiredContent:"a[download]",label:c.download,setup:function(e){void 0!==e.download&&this.setValue("checked","checked")},commit:function(e){this.getValue()&&(e.download=this.getValue())}}]}]}]}],onShow:function(){var e=this.getParentEditor(),t=e.getSelection(),n=t.getSelectedElement(),i=this.getContentElement("info","linkDisplayText").getElement().getParent().getParent(),o=null;(o=a.getSelectedLink(e))&&o.hasAttribute("href")?n||(t.selectElement(o),n=o):o=null,a.showDisplayTextForElement(n,e)?i.show():i.hide(),e=a.parseLinkAttributes(e,o),this._.selectedElement=o,this.setupContent(e)},onOk:function(){var n={};this.commitContent(n);var i=e.getSelection(),o=a.getLinkAttributes(e,n);if(this._.selectedElement){var r,l=this._.selectedElement,s=l.data("cke-saved-href"),d=l.getHtml();l.setAttributes(o.set),l.removeAttributes(o.removed),n.linkText&&t!=n.linkText?r=n.linkText:(s==d||"email"==n.type&&-1!=d.indexOf("@"))&&(r="email"==n.type?n.email.address:o.set["data-cke-saved-href"]),r&&(l.setText(r),i.selectElement(l)),delete this._.selectedElement}else{for(i=i.getRanges()[0],i.collapsed?(n=new CKEDITOR.dom.text(n.linkText||("email"==n.type?n.email.address:o.set["data-cke-saved-href"]),e.document),i.insertNode(n),i.selectNodeContents(n)):t!==n.linkText&&(n=new CKEDITOR.dom.text(n.linkText,e.document),i.shrink(CKEDITOR.SHRINK_TEXT),e.editable().extractHtmlFromRange(i),i.insertNode(n)),n=i._find("a"),l=0;l<n.length;l++)n[l].remove(!0);o=new CKEDITOR.style({element:"a",attributes:o.set}),o.type=CKEDITOR.STYLE_INLINE,o.applyToRange(i,e),i.select()}},onLoad:function(){e.config.linkShowAdvancedTab||this.hidePage("advanced"),e.config.linkShowTargetTab||this.hidePage("target")},onFocus:function(){var e=this.getContentElement("info","linkType");e&&"url"==e.getValue()&&(e=this.getContentElement("info","url"),e.select())}}})}();