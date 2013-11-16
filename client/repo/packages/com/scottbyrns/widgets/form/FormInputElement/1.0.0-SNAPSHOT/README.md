DOM-Extensions-Form-Input-Element
=================================

Form input element extension.


Handles



|Message|Channel|Effect|
| ------------- |:-------------:| -----:|
|{ name: "target-elements-name",  value: "new-value" }|form-input-change|Sets message.value to elements value.|
|{ name: "target-elements-name" }|focus-input-element|Focuses the element.|
|{ name: "target-elements-name" }|blur-input-element|Blurs the element.|

Broadcasts

|Message|Channel|
| ------------- |:-------------:|
|Elements name|form-input-focus|
|Elements name|form-input-blur|
|Elements name|form-input-change|
