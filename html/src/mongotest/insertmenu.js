var insertM = {
    "name": "form1",
    "id": "aperson",
    "lang": "es",
    "title": "Minghos",
    "script_up": [{
        "s": "js/frameworkm.js"
    }, {
        "s": "js/translation.js"
    }],
    "css": ["css/style1.css", "css/stylemenu.css"],
    "body": "<body ng-app='myApp' ng-controller='myCtrl'><h1><a href='#' onclick='f.openNav()'>☰</a> <img src='images/logo.png' width='15px'> &nbsp;Minghos</h1><hr/><div id='mySidenav' class='sidenav'><a href='javascript:void(0)' class='closebtn' onclick='f.closeNav()'>&times;</a> <div><a class='panel1_aperson' href='#' id='aperson'>{{persona}}</a></div><a href='#' onclick='f.closeNav()'>About</a><a href='#'>Services</a><a href='#'>Clients</a><a href='#'>Contact</a></div><div class='panel'><div id='panel1'></div><hr/><div id='main'></div></div><div class='mainPanel' id='mainPanel'><span id='menu'></span><span id='toolbar'></span><span id:'form1' style='float:right'></span></div></body>",
    "fields": [
	"{\"name\":\"document\", \"id\":\"document\", \"type\":\"text\", \"class\":\"formc\", \"label\":\"{{document}}\"}",	
	"{\"name\":\"documentype\", \"id\":\"documentype\", \"type\":\"select\", \"class\":\"formc\", \"label\":\"{{document}}\", \"options\":[{\"name\":\"CC\", \"value\":\"cedula\"}, {\"name\":\"TI\", \"value\":\"tarjetaidentidad\"}, {\"name\":\"PASS\", \"value\":\"pasaporte\"}]}",
	"{\"name\":\"name\", \"id\":\"name\", \"type\":\"text\", \"class\":\"formc\", \"label\":\"name\"}",
	"{\"name\":\"lastname\", \"id\":\"lastname\", \"type\":\"text\", \"class\":\"formc\", \"label\":\"lastname\"}",
	"{\"name\":\"address\", \"id\":\"address\", \"type\":\"text\", \"class\":\"formc\", \"label\":\"address\"}",
	"{\"name\":\"visibility\", \"id\":\"visibility\", \"type\":\"select\", \"class\":\"formcs\", \"label\":\"visibility\", \"options\":[{\"name\":\"compensar\", \"value\":\"compensar\"}, {\"name\":\"cruzblanca\", \"value\":\"cruzblanca\"}]}", "{\"name\":\"birthdate\", \"id\":\"birthdate\", \"type\":\"date\", \"class\":\"formcd\", \"label\":\"birthdate\", \"depends\":[\"document\"]}", "{\"name\":\"documentnumber\",\"id\":\"documentnumber\", \"type\":\"number\", \"class\":\"formc\", \"label\":\"documentnumber\"}"],
    "toolbar": "<input type='button' name='first' value='||<' id='||<' class='control'/><input type='button' name='previous' value='<<' id='<<'  class='control'/><input type='button' name='next' value='>>' id='>>'  class='control'/><input type='button' name='last' value='>||' id='>||' class='control'/><input type='button' name='first' value='>||*' id='>||*' class='control'/><input type='button' name='save' value='save' id='save' class='control'/><div id='txtsearch'><input type='text' class='formc' id='textsearch' name='textsearch'><input type='button' name='search' value='Search'></div>",
    "toolbar_c": "toolbar",
    "menu": "<ul><li><a href=\"#home\">Home</a></li><li><a href=\"#news\">News</a></li><li class=\"dropdown\"><a href=\"#\" class=\"dropbtn\">Dropdown</a><div class=\"dropdown-content\"><a href=\"#\">Link 1</a><a href=\"#\">Link 2</a><a href=\"#\">Link 3</a></div></li><li class=\"dropdown\"><a href=\"#\" class=\"dropbtn\">Dropdown</a><div class=\"dropdown-content\"><a href=\"#\">Link 1</a><a href=\"#\">Link 2</a><a href=\"#\">Link 3</a></div></li><li class=\"dropdown\"><a href=\"#\" class=\"dropbtn\">Dropdown</a><div class=\"dropdown-content\"><a href=\"#\">Link 1</a><a href=\"#\">Link 2</a><a href=\"#\">Link 3</a></div></li></ul>",
    "menu_c": "menu",
    "container": "mainPanel",
    "type": "form",
    "main_c": "main",
    "collection": "d_person",
    "script_do": [{
        "s": "js/controller.js"
    }, {
        "s": "js/loading.js"
    }, {
        "s": "js/system.js"
    }]
}
