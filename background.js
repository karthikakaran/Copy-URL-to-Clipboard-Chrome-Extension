document.getElementById("activate").addEventListener('click', () => {
    this.close();
    function modifyDOM() {
	var textFields = document.getElementsByTagName('a');
	for(var i = 0; i < textFields.length; i++){
	    var element = document.createElement("Input");
            element.setAttribute("type", "button");
	    element.style.width = "15px"
	    element.style.height = "15px"
	    element.style.background="url('clipboard.png')";
	    element.class = textFields[i].href;
	    textFields[i].parentNode.insertBefore(element, textFields[i].nextSibling);
	    element.addEventListener('click', clickHandler);
	}
	
	function clickHandler(e) {
	        var text = e.srcElement.class;
		var aField = document.createElement("textarea");
		var div = e.srcElement.parentNode;
		div.appendChild(aField);
		aField.value = text;
		aField.select();
		try {
		    var successful = document.execCommand('copy');
		    if(successful) {
			aField.setAttribute("hidden", true);
		    }
		    var msg = successful ? 'successful' : 'unsuccessful';
		    console.log('Copying text command was ' + msg);
		} catch (err) {
		    console.log('Oops, unable to copy');
		}
    	}
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        //console.log('Popup script:')
        //console.log(results[0]);
    });
});
