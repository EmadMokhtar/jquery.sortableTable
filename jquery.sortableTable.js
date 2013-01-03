(function(a){a.fn.sortableTable=function(i){var e={image_base:null,theme:"default",allow_col_resize:false,rows_to_anchor:null,default_sort_order:"ASC"};var j={};var c=this;var f=c.find("tr:first-child");var g=new RegExp("([a-zA-Z,]|((\b)-(\b)))","g");var d=null;var h=null;var b=new Array("ASC","DESC");this.initSortableTable=function(){if(j.image_base==null){throw"SortableTable widget: no image base specified.";return}if(a.inArray(j.default_sort_order,b)==-1){throw"SortableTable widget: invalid default_sort_order option specified.";return}c.addClass("sortable-table");var o=f.find("th:first-child").height();f.find("th").each(function(q,s){var t=a(s);if(t.find("div.sort-direction-container").length==0){var r=a("<img />").attr({src:j.image_base+"/"+j.theme+"/Transparent.gif",width:"7",height:"4"});var p=a("<div></div>").addClass("sort-direction-container").css({height:o+"px"});if(!j.allow_col_resize){p.css({marginRight:"-7px"})}else{p.addClass("allow-col-resize")}p.append(r);t.append(p)}});var k=c.find("tr[data-level=3]");if(k.length>0){k.each(function(q,p){var s=a(p);var r=s.prevAll("tr[data-level=2]").eq(0);s.data("parent_row",r)})}var l=c.find("tr[data-level=2]");if(l.length>0){l.each(function(q,p){var s=a(p);var r=s.prevAll("tr[data-level=1]").eq(0);s.data("parent_row",r)})}var m=c.find("tr").not(":first-child");if(j.rows_to_anchor!=null){var n=m.not(j.rows_to_anchor);if(n.length==0){throw"SortableTable widget: 'rows_to_anchor' option excluded all possible rows to sort"}else{m=n}}m.each(function(q,p){var r=a(p);r.find("td").each(function(t,v){var s=a(v);var u=s.text();if(s.attr("data-sort-property")!=null&&r.attr(s.attr("data-sort-property"))!=null){u=r.attr(s.attr("data-sort-property"))}s.data("sort_value",u)})});c.data("sortable-table-options",j);c.on("click.sortableTable","tr th",this.sortTableByColumn)};this.destroy=function(){c.off("click.sortableTable");c.removeData("sortable-table-options");var k=c.find("tr").not(":first-child");k.removeData("parent_row");k.find("td").removeData("sort_value");f.find("th").removeAttr("data-sort-direction");f.find("th div.sort-direction-container").remove();c.removeClass("sortable-table")};this.sortTableByColumn=function(y){if(y.type=="click"){var p=a(this);var q=p.attr("data-sort-direction");var o=p.attr("data-sort-type");c.col_index_clicked=p.index();c.sort_type=(o!=null?o:null);p.siblings().removeAttr("data-sort-direction");p.siblings().find("img").css({backgroundImage:""});var s=j.default_sort_order;var v="";if(q!=null){if(q=="ASC"){s="DESC"}else{if(q=="DESC"){s="ASC"}}}if(s=="DESC"){v='url("'+j.image_base+"/"+j.theme+'/arrow-down.png")'}else{v='url("'+j.image_base+"/"+j.theme+'/arrow-up.png")'}p.attr("data-sort-direction",s).find("img").css({backgroundImage:v});var B=c.find("tr[data-level=1]");if(B.length==0){B=c.find("tr").not(":first-child")}var E=c.find("tr[data-level=2]");var m=c.find("tr[data-level=3]");if(j.rows_to_anchor!=null){var C=B.not(j.rows_to_anchor);if(B.length==0){throw"SortableTable widget: 'rows_to_anchor' option excluded all possible rows to sort"}else{B=C}E=E.not(j.rows_to_anchor);m=m.not(j.rows_to_anchor)}var t=_.sortBy(B,c.sortFunction);var l=_.sortBy(E,c.sortFunction);var r=_.sortBy(m,c.sortFunction);if(s=="ASC"){if(t.length>0){for(var z=t.length-1;z>=0;z--){var u=t[z];f.after(u)}}if(l.length>0){for(var x=l.length-1;x>=0;x--){var n=a(l[x]);var D=a(n.data("parent_row"));D.after(n)}}if(r.length>0){for(var w=r.length-1;w>=0;w--){var A=a(r[w]);var D=a(A.data("parent_row"));D.after(A)}}}else{if(t.length>0){a.each(t,function(G,k){var F=a(k);f.after(F)})}if(l.length>0){a.each(l,function(k,F){var H=a(F);var G=a(H.data("parent_row"));G.after(H)})}if(r.length>0){a.each(r,function(G,k){var F=a(k);var H=a(F.data("parent_row"));H.after(F)})}}}};this.sortFunction=function(q){var n=null;var k=c.col_index_clicked;var m=c.sort_type;var o=a(q).find("td").eq(k);while(o.length==0&&k>=0){k--;o=a(q).find("td").eq(k);var l=a(q).closest("table").find("tr").eq(0).find("th").eq(k);m=(l.attr("data-sort-type")!=undefined?l.attr("data-sort-type"):null)}var p=original_value=o.data("sort_value");p=p.replace(g,"");if(m!=null){if(m=="numeric"){n=isNaN(parseInt(p))?-(Number.MAX_VALUE):parseInt(p)}else{n=original_value.toLowerCase()}}else{n=isNaN(parseInt(p))?original_value.toLowerCase():parseInt(p)}return n};if(typeof i=="string"){j=c.data("sortable-table-options");if(i=="reinit"){this.destroy();this.initSortableTable()}}else{j=a.extend(e,i);this.initSortableTable()}return this}})(jQuery);