CKEDITOR.plugins.colordialog={requires:"dialog",lang:"en",init:function(e){var t=new CKEDITOR.dialogCommand("colordialog");t.editorFocus=!1,e.addCommand("colordialog",t),CKEDITOR.dialog.add("colordialog",this.path+"dialogs/colordialog.js"),e.getColorFromDialog=function(t,n){var o=function(e){this.removeListener("ok",o),this.removeListener("cancel",o),e="ok"==e.name?this.getValueOf("picker","selectedColor"):null,t.call(n,e)},a=function(e){e.on("ok",o),e.on("cancel",o)};e.execCommand("colordialog"),e._.storedDialogs&&e._.storedDialogs.colordialog?a(e._.storedDialogs.colordialog):CKEDITOR.on("dialogDefinition",function(e){if("colordialog"==e.data.name){var t=e.data.definition;e.removeListener(),t.onLoad=CKEDITOR.tools.override(t.onLoad,function(e){return function(){a(this),t.onLoad=e,"function"==typeof e&&e.call(this)}})}})}}},CKEDITOR.plugins.add("colordialog",CKEDITOR.plugins.colordialog);