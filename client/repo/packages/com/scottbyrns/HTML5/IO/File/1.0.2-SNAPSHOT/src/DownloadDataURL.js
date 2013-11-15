com.scottbyrns.HTML5.IO.DownloadDataURL = function (fileName, dataURL) {
	
	function eventFire(el, etype){
	    if (el.fireEvent) {
	        (el.fireEvent('on' + etype));
	    } else {
	        var evObj = document.createEvent('Events');
	        evObj.initEvent(etype, true, false);
	        el.dispatchEvent(evObj);
	    }
	}
	
	var link = document.createElement("a");
	link.download = fileName;
	link.href = dataURL;
	eventFire(link, "click");
};



