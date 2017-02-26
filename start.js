 
var selectionItem ={
	"id": "TakeNote",
	"title": "TakeNote",
	"contexts": ["selection"]
};
chrome.contextMenus.create(selectionItem);

//Listener for context click
chrome.contextMenus.onClicked.addListener(function(data){
	if(data.menuItemId == "TakeNote" && data.selectionText){
		//var text = closeButton+'<li>'+ data.selectionText +'</li>';
		var text = data.selectionText;
		text = formatData(text);
		updateNotes(text.trim());
	}

});
function formatData(text){
	var capText = text.charAt(0).toUpperCase();
	capText = capText + text.substring(1);
	return capText;
}
//Update the storage element
function updateNotes(newNote){
	chrome.storage.sync.get({text:[]}, function(oldData){
		var notes = oldData.text;
		if(notes.length ==0){
			notes = [];
		}
		notes.push(newNote);
		// text = text + newNote
		 chrome.storage.sync.set({text: notes});
	});
	
}