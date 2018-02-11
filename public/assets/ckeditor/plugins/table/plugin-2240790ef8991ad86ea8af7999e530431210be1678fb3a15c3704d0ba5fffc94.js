CKEDITOR.plugins.add("table",{requires:"dialog",lang:"en",icons:"table",hidpi:!0,init:function(e){function t(e){return CKEDITOR.tools.extend(e||{},{contextSensitive:1,refresh:function(e,t){this.setState(t.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}if(!e.blockless){var n=e.lang.table;e.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];"+(e.plugins.dialogadvtab?"table"+e.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"]]})),e.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",t())),e.addCommand("tableDelete",t({exec:function(e){var t=e.elementPath().contains("table",1);if(t){var n=t.getParent(),a=e.editable();1!=n.getChildCount()||n.is("td","th")||n.equals(a)||(t=n),e=e.createRange(),e.moveToPosition(t,CKEDITOR.POSITION_BEFORE_START),t.remove(),e.select()}}})),e.ui.addButton&&e.ui.addButton("Table",{label:n.toolbar,command:"table",toolbar:"insert,30"}),CKEDITOR.dialog.add("table",this.path+"dialogs/table.js"),CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js"),e.addMenuItems&&e.addMenuItems({table:{label:n.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:n.deleteTable,command:"tableDelete",group:"table",order:1}}),e.on("doubleclick",function(e){e.data.element.is("table")&&(e.data.dialog="tableProperties")}),e.contextMenu&&e.contextMenu.addListener(function(){return{tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF}})}}});