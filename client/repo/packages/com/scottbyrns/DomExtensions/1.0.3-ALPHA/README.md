# Dom Extensions

A javascript library for creating modular extentions to the DOM and injecting them at runtime.


## Attaching Extensions

```javascript

<button data-extension="event-trigger"
		data-outlets="document-editor"
		data-event="click"
		data-channel="button-clicked"
		data-message="save-button">
		
		Save Document
		
</button>		

```