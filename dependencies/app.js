ApplicationManager.setup(function () {

	
	
});

ApplicationManager.whenApplicationIsReadyToStart(function () {
	
	var repoList = PackageManager.getRepositoryMap().src.packages;
	
	var navigationList = new com.scottbyrns.Elements.List.DynamicList("navigation");
	
	for (var i = 0, len = repoList.length; i < len; i += 1) {
		navigationList.addListItem(
			com.scottbyrns.Elements.List.ListItem.createListItem(JSON.stringify(repoList[i]))
		)
	}

});

ApplicationManager.start();
setTimeout(ApplicationManager.doStart, 1000);