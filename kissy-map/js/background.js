var kissymods;

	chrome.tabs.onActivated.addListener(function(evt){
		kissymods=null;
	});

	chrome.runtime.onMessage.addListener (function (request, sender, sendResponse) {
		//接收来自content script
	    if (request.src == "kissyMap") {
			kissymods = JSON.parse(request.kissyMods);
	    }
		
		if (request.src == "kissyMap1") {
			kissymods = request.kissyMods;
		}
		
		//接收来自popup
	    if (request.src == "ready") {

	    	chrome.tabs.query({ active: true, highlighted: true }, function (tabs) {
	    		
  				chrome.tabs.sendMessage(tabs[0].id, {src: "ready"});
			});
	    	

			if (kissymods) {
				sendResponse({src: "ready", kissyMods: kissymods});
			} else {
				sendResponse({src: "noKISSY"});
			}
	    }
	});

