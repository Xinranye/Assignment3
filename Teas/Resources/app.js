
var win1 = Titanium.UI.createWindow({
		title: 'Select Color',
		backgroundColor: '#fff'
});


var Teas = ['#F5F5DC', '#FFE4B5', '#FFE4C4', '#D2B48C', '#C3B091', '#C3B091', '#926F5B', '#804000', '#654321', '#3D2B1F'];

allRows = [];
var theColours = Ti.UI.createTableView({});

for (var i=0; i<Teas.length; i++) {
	theRow = Ti.UI.createTableViewRow ({backgroundColor:
		Teas[i], height:50, TeaColour:Teas[i]});
		allRows.push(theRow);
}

theColours.setData(allRows);
win1.add(theColours);

function getVerdict(colour) {
	var indicator = colour.charAt (1);
	var msg;

	switch (indicator) {
		case 'F': msg = 'Milky'; break;
		case 'D': msg = 'Nice'; break;
		case 'C': msg = 'Perfect'; break;
		case '9': msg = 'A bit strong'; break;
		case '8': msg = 'Builders tea'; break;
		case '6': msg = 'Send it back'; break;
		case '3': msg = 'No milk here'; break;
	}
	return msg;
};

function showTeaVerdict (_args) {
	var teaVerdict = Ti.UI.createWindow({layout:'vertical'});
	
	teaVerdict.backgroundColor = _args;
	teaVerdict.msg = getVerdict(_args);
	var judgement = Ti.UI.createLabel
	({text:teaVerdict.msg, top:'50%'});
	var close = Ti.UI.createButton
	({title:'Choose again', top:'25%'});
	close.addEventListener('click', function(e)
		{teaVerdict.close();
		teaVerdict = null;
		});
		
	teaVerdict.add(judgement);
	teaVerdict.add(close);
	teaVerdict.open();
}

theColours.addEventListener ('click', function(e)
{showTeaVerdict(e.source.TeaColour);});




//	win2

var win2 = Titanium.UI.createWindow({
	backgroundColor:'#fff',
	fullscreen: true	
});
	
var options = Ti.UI.createView({layout:'vertical'});
var showCamera = Ti.UI.createButton({title: 'Show Camera'});
var thePhoto = Ti.UI.createImageView({height: '30%', width:'30%'});

options.add(showCamera);
options.add(thePhoto);
win2.add(options);

function showPhoto(_args){
	thePhoto.setImage(_args.media);
}

showCamera.addEventListener('click',function(e) {
	Ti.Media.showCamera({animated:true,
					autoHide: true,
					saveToPhotoGallery: true,
					showControls: true,
					mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
					success: function(e) {showPhoto(e);} ,
					error: function(e) {alert ('There was a problem problem accessing the camera');}
		});	
});

function addMenu(win2){
	var activity = win2.activity;

	activity.onCreateOptionsMenu = function(e){
  		var menu = e.menu;
  		var menuItem = menu.add({ 
  	 	title: "Camera", 
    	icon:  "KS_nav_views.png",
    	showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
  		});

	};
 win2.open();
}

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Teas Color',
    backgroundColor:'#f6d180',
    window:win1
});

tabGroup.addTab(tab1);
tabGroup.open();


/*I can use the simplest way: grouptab to connect the two windows.
  But I try to learn a new way： add a menu item. Obviously, I didn't figure out. 
  The original idea of mine is use the menu item to access windows2 which is the second component as you required.
  I feel I really get close to what I want, but I need more time. I will update my code if I figure out finally
  But now I just need to submit the homework : )
  */
