!function(){function e(e,t,n){t.is&&t.getCustomData("block_processed")||(t.is&&CKEDITOR.dom.element.setMarker(n,t,"block_processed",!0),e.push(t))}function t(t,n){function a(){this.foreach(function(e){/^(?!vbox|hbox)/.test(e.type)&&(e.setup||(e.setup=function(t){e.setValue(t.getAttribute(e.id)||"",1)}),e.commit||(e.commit=function(t){var n=this.getValue();"dir"==e.id&&t.getComputedStyle("direction")==n||(n?t.setAttribute(e.id,n):t.removeAttribute(e.id))}))})}var i=function(){var e=CKEDITOR.tools.extend({},CKEDITOR.dtd.$blockLimit);return t.config.div_wrapTable&&(delete e.td,delete e.th),e}(),o=CKEDITOR.dtd.div,r={},l=[];return{title:t.lang.div.title,minWidth:400,minHeight:165,contents:[{id:"info",label:t.lang.common.generalTab,title:t.lang.common.generalTab,elements:[{type:"hbox",widths:["50%","50%"],children:[{id:"elementStyle",type:"select",style:"width: 100%;",label:t.lang.div.styleSelectLabel,"default":"",items:[[t.lang.common.notSet,""]],onChange:function(){var e=["info:elementStyle","info:class","advanced:dir","advanced:style"],n=this.getDialog(),a=n._element&&n._element.clone()||new CKEDITOR.dom.element("div",t.document);this.commit(a,!0);for(var i,e=[].concat(e),o=e.length,r=0;r<o;r++)(i=n.getContentElement.apply(n,e[r].split(":")))&&i.setup&&i.setup(a,!0)},setup:function(e){for(var n in r)r[n].checkElementRemovable(e,!0,t)&&this.setValue(n,1)},commit:function(e){var n;(n=this.getValue())?r[n].applyToObject(e,t):e.removeAttribute("style")}},{id:"class",type:"text",requiredContent:"div(cke-xyz)",label:t.lang.common.cssClass,"default":""}]}]},{id:"advanced",label:t.lang.common.advancedTab,title:t.lang.common.advancedTab,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["50%","50%"],children:[{type:"text",id:"id",requiredContent:"div[id]",label:t.lang.common.id,"default":""},{type:"text",id:"lang",requiredContent:"div[lang]",label:t.lang.common.langCode,"default":""}]},{type:"hbox",children:[{type:"text",id:"style",requiredContent:"div{cke-xyz}",style:"width: 100%;",label:t.lang.common.cssStyle,"default":"",commit:function(e){e.setAttribute("style",this.getValue())}}]},{type:"hbox",children:[{type:"text",id:"title",requiredContent:"div[title]",style:"width: 100%;",label:t.lang.common.advisoryTitle,"default":""}]},{type:"select",id:"dir",requiredContent:"div[dir]",style:"width: 100%;",label:t.lang.common.langDir,"default":"",items:[[t.lang.common.notSet,""],[t.lang.common.langDirLtr,"ltr"],[t.lang.common.langDirRtl,"rtl"]]}]}]}],onLoad:function(){a.call(this);var e=this,n=this.getContentElement("info","elementStyle");t.getStylesSet(function(a){var i,o;if(a)for(var l=0;l<a.length;l++)o=a[l],o.element&&"div"==o.element&&(i=o.name,r[i]=o=new CKEDITOR.style(o),t.filter.check(o)&&(n.items.push([i,i]),n.add(i,i)));n[1<n.items.length?"enable":"disable"](),setTimeout(function(){e._element&&n.setup(e._element)},0)})},onShow:function(){"editdiv"==n&&this.setupContent(this._element=CKEDITOR.plugins.div.getSurroundDiv(t))},onOk:function(){if("editdiv"==n)l=[this._element];else{var a,r,s,d=[],c={},u=[],p=t.getSelection(),m=p.getRanges(),h=p.createBookmarks();for(r=0;r<m.length;r++)for(s=m[r].createIterator();a=s.getNextParagraph();)if(a.getName()in i&&!a.isReadOnly()){var g=a.getChildren();for(a=0;a<g.count();a++)e(u,g.getItem(a),c)}else{for(;!o[a.getName()]&&!a.equals(m[r].root);)a=a.getParent();e(u,a,c)}for(CKEDITOR.dom.element.clearAllMarkers(c),m=[],r=null,s=0;s<u.length;s++)a=u[s],g=t.elementPath(a).blockLimit,g.isReadOnly()&&(g=g.getParent()),t.config.div_wrapTable&&g.is(["td","th"])&&(g=t.elementPath(g.getParent()).blockLimit),g.equals(r)||(r=g,m.push([])),m[m.length-1].push(a);for(r=0;r<m.length;r++){for(g=m[r][0],u=g.getParent(),a=1;a<m[r].length;a++)u=u.getCommonAncestor(m[r][a]);for(s=new CKEDITOR.dom.element("div",t.document),a=0;a<m[r].length;a++){for(g=m[r][a];!g.getParent().equals(u);)g=g.getParent();m[r][a]=g}for(a=0;a<m[r].length;a++)g=m[r][a],g.getCustomData&&g.getCustomData("block_processed")||(g.is&&CKEDITOR.dom.element.setMarker(c,g,"block_processed",!0),a||s.insertBefore(g),s.append(g));CKEDITOR.dom.element.clearAllMarkers(c),d.push(s)}p.selectBookmarks(h),l=d}for(d=l.length,c=0;c<d;c++)this.commitContent(l[c]),!l[c].getAttribute("style")&&l[c].removeAttribute("style");this.hide()},onHide:function(){"editdiv"==n&&this._element.removeCustomData("elementStyle"),delete this._element}}}CKEDITOR.dialog.add("creatediv",function(e){return t(e,"creatediv")}),CKEDITOR.dialog.add("editdiv",function(e){return t(e,"editdiv")})}();