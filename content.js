function messageProcessor(request, sender, sendResponse) {
    var sel, range;

    //console.log("ooooooooo:" ,document.activeElement.value);

    //console.log(window.getSelection());
    if (window.getSelection &&  window.getSelection().anchorNode ) {
	console.log("qqqqqqq %o",window.getSelection());
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode("TEST"));
        }
    } else if (document.selection && document.selection.createRange) {
	console.log("ewwwwwww");

        range = document.selection.createRange();
        range.text = "TEST";
    } else{
        var curElement = document.activeElement;
	console.log("element: ",curElement.tagName);
	if(curElement.tagName == "INPUT" || curElement.tagName === "TEXTAREA") {
            if(typeof curElement.selectionStart == 'number' && typeof curElement.selectionEnd == 'number') {

		var start = curElement.selectionStart;
		var end = curElement.selectionEnd;

		var selectedText = curElement.value.slice(start, end);
		var before = curElement.value.slice(0, start);
		var after = curElement.value.slice(end);

		var text = before + 'TEST' + after;
		curElement.value = text;
	    }else{
		curElement.value = "TEST";
	    }
	}
    }
    
}
 
browser.runtime.onMessage.addListener(messageProcessor);
