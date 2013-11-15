JDM-Data-Source
===============

A live widget for connecting to the JDM Repo and providing access to it's artifact data.


```html


<dataset data-widget="repo-data-source"
         data-group="consuming-group"
		 data-server="localhost:3000">

</dataset>


```


### Handled Messages

|Message|Channel|Description|
|:-----------|------------:|:------------:|
|get-artifact-data|Anonymous Function|Calls the anonymous function in the channel with an array of all known artifacts in the repo as the only argument of the channel callback.|
|download-repo-data|N/A|Initiate a download of the artifact repository.|
|Artifact object with groupId, artifactId, and version|get-version|Get the full artifact identified in the messaged artifact and broadcast it on the show-version channel.|
