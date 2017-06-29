var currentTab;

function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    replacement: "Message from the add-on!"
  });
}


function translate(){
    browser.tabs.executeScript({
      file: "content.js"
    });
    
    var querying = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    querying.then(messageTab);


}

/*
var gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (command of commands) {
    console.log(command);
  }
});
*/

browser.browserAction.onClicked.addListener(translate);

browser.commands.onCommand.addListener((command) => {
    //console.log("onCommand event received for message: ", command);
    if(command=='translate-layout') {
	console.log("Translating ... ", command);
	translate();
    }
});
