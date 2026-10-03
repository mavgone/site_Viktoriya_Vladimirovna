function saveAsExcel(id, fileName)
        {
			
            var table_text="<table border='2px'><tr>"; 
            var textRange; 
			var index=0; 
			var table = document.getElementById(id); 

            for(index = 0 ; index < table.rows.length ; index++) 
              {     
                    table_text=table_text+table.rows[index].innerHTML+"</tr>";
                    
              }

              table_text=table_text+"</table>"; 
              table_text= table_text.replace(/<a[^>]*>|<\/a>/g, ""); 
              table_text= table_text.replace(/<img[^>]*>/gi,"");  
              table_text= table_text.replace(/<input[^>]*>|<\/input>/gi, ""); 

              var userAgent = window.navigator.userAgent; 
              var msie = userAgent.indexOf("MSIE "); 
			  
			 if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      
              {
				  
			  if (typeof Blob !== "undefined") {
					
					table_text = [table_text];
                    var blob = new Blob(table_text);
                    window.navigator.msSaveBlob(blob, ''+fileName);
                }
				else{

                    textArea.document.open("text/html", "replace");
                    textArea.document.write(table_text);
                    textArea.document.close();
                    textArea.focus();
                    textArea.document.execCommand("SaveAs", true, fileName); 
     
				}
			  }

               else  

				   var a = document.createElement('a');
					
					var data_type = 'data:application/vnd.ms-excel';
					var table_div = document.getElementById(id);
					var table_html = table_div.outerHTML.replace(/ /g, '%20');
					table_html = table_html.replace(/<a[^>]*>|<\/a>/g, "");
					a.href = data_type + ', ' + table_html;

					a.download = ''+fileName;
        
					a.click();
              
      }
