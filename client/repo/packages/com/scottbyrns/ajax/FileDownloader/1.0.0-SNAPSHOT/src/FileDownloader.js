com.scottbyrns.ajax.FileDownloader.FileDownloader = {
	
	download: function (file, callback) {
		
	    var req = new XMLHttpRequest();
	    req.open('GET', file, false);
	    req.onreadystatechange = function(callback){
			return function () {
		        if (req.readyState == 4) {
					callback((req.responseText));
		        }
			};
	    }(callback);
	    req.send(null);
	}
	
};