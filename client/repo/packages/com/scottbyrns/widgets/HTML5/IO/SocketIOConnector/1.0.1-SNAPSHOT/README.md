Socket-IO-Connector
===================

Live Widget for connection to socket.io


```html


<dataset data-widget="socket-io-connector"
         data-host="https://localhost"
         data-port="3000"
         data-secure="true">
         
</dataset>


```



A custom gobal variable name can be specified when creating a socket. This way you can use more than one instance of this widget.

```html


<dataset data-widget="socket-io-connector"
         data-host="https://localhost"
         data-port="3000"
         data-secure="true"
   data-namespace="mySocket">
         
</dataset>


```
