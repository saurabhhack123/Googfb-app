var fbapp = function (){

/****************************************app code starts here*************************************************************************/      
      console.log("Googfb starts..");       <!--debugging -->  
     	var dom_data = document.getElementById('search').value;
     	console.log(dom_data);      <!--debugging -->
  
        
/***************************code for interacting fb api and fetching required data JSONP with no extra plugins *************************************************/


var oHead = document.getElementsByTagName('HEAD').item(0);
var oScript= document.createElement("script");
oScript.type = "text/javascript";

/*******************************facebook public search api**************************************************************************/
oScript.src="http://graph.facebook.com/search?q="+dom_data+"&type=page&callback="+"mycallback";

oHead.appendChild( oScript);

/*************************make callback global sice we are using inside another function********************************************/
window.mycallback = function(fbdata) {

console.log(fbdata);                    <!--debugging -->

console.log(fbdata.data[0].id);         <!--debugging -->

<!-- variables to store our concern data -->

var myname = '';
var URL = '';


<!--storing concer data for debugging purpose-->


  myname = fbdata.data[0].name;
  URL = "http://facebook.com/" + fbdata.data[0].id;         <!-- parsed url -->
	

console.log(myname);            <!--debugging-->
console.log(URL);               <!--debugging-->

var url_abtfetch = "http://graph.facebook.com/" + fbdata.data[0].id ;  <!-- to fetch about and other tag data from graph api-->

<!--HACK : Method to fetch Json Data as string for "about" tag(other info) which is found in "graph.facebook.com\id"         -->
function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


  var request = new makeHttpObject();
  request.open("GET", url_abtfetch, true);
  request.send(null);
  request.onreadystatechange = function() {
  if (request.readyState == 4)
  { 
        
        var str = request.responseText;
         
        console.log(str);        
        var abt = str.match(/"about"(.*),/);              /*regex hack wooohhhh!!!*/
        var likes = str.match(/"likes"(.*),/);
        var link = str.match(/"link"(.*),/);
        var talk_abt_cnt = str.match(/"talking_about_count"(.*),/);
        var cat = str.match(/"category"(.*),/);
        console.log(abt[0]);
        console.log(likes[0]);             <!--debugging -->
        console.log(link[0]);
        console.log(talk_abt_cnt[0]);
        console.log(cat[0]);
          
<!--Code for rendering html dom node dynamically -->
        
    

        console.log(".................Ultimate Hack for dyanamic rendering................................");
        
        var dom_node1=document.getElementById("abt");
        var node1=document.createTextNode(abt[0]); 
        dom_node1.appendChild(node1);

        
        var dom_node2 = document.createElement("img");
        dom_node2.src = 'more.png';
        dom_node2.setAttribute("height", "50");
        dom_node2.setAttribute("width", "50");
        document.getElementById("more").appendChild(dom_node2);

        var event_more= document.getElementById('more');
        event_more.onclick = function(){

        console.log("event is performing!!!!");
  
        var dom_node3=document.getElementById("likes");
        var node3=document.createTextNode(likes[0]); 
        dom_node3.appendChild(node3);
        
        var dom_node4=document.getElementById("talk");
        var node4=document.createTextNode(talk_abt_cnt[0]); 
        dom_node4.appendChild(node4);

        var dom_node5=document.getElementById("cat");
        var node5=document.createTextNode(cat[0]); 
        dom_node5.appendChild(node5);

        
        var dom_node6=document.getElementById("link");
        var node6=document.createTextNode(link[0]); 
        dom_node6.appendChild(node6);
        
        
        var dom_node7 = document.createElement("img");
        dom_node7.src = 'clear.png';
        dom_node7.setAttribute("height", "50");
        dom_node7.setAttribute("width", "50");
        document.getElementById("clear").appendChild(dom_node7);


        

        var eventclear = document.getElementById("clear");
        eventclear.onclick = function(){
          node1.remove(dom_node1);
          document.getElementById('more').remove(dom_node2);
          node3.remove(dom_node3);
          node4.remove(dom_node4);
          node5.remove(dom_node5);
          node6.remove(dom_node6);
          document.getElementById('clear').remove(dom_node7);
          console.log("sucessfull cleared memory!!!");
        }
                  

        }


  }
       
    };


 

 <!--request call ends -->


}   <!-- mycallback() ends here -->

}          <!--fbapp() ends here-->
/***************************************************************************************************************************************/



