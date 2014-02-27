# DOM Extensions

Dom Extensions provide a way of attaching javascript to the DOM as an aspect of it's display to a user.

Each DOM Extension is predefined by the implementer within the extension template.

```

DOMExtension.addTemplate({

     name: "basic-navigation",
     model: {},
     inlets: {},
     outlets: {}
     constructor: function () {

     },
     reinit: function () {

     }

});

```

### Expressing Templates

```

<body>

    <header data-extension="basic-navigation" data-group="page-control">
        <button>First</button>
        <botton>Second</button>
    </header>

</body>

```

When the DOM scanner detects an element being inserted into the DOM with the [data-extension] attribute the value of the attribute is matched to the templates that have been added to the runtime. If the template does not exist the extension is deferred until the template is added.

When a template match is made the constructor of the template is called in a crafted execution context with various resources injected into its instance.

The model from the template can be referenced through this.model
The inlets and outlets likewise through this.inlets and this.outlets.

The data-group attribute is used to group DOM extensions by their communications relationships. If two widgets need to interact with each other they do so through a messaging layer attached to each instance of the DOM extension templates. The messaging layer can be broadcast into through this.sendMessage(message, channel). Each dom extension sharing the same data-group attribute value will receive the message broadcast during a sendMessage. If an inlet callback has been added to the template of a receiving widget the callback will be called with the message content as its argument.

Each message whether handled by an inlet or not will be received by this.inlets.handleMessage which can be overridden in the template of any extension. 

Each extension is also provided a reference to the element to which it is attached. This can be addressed through this.element.

At any point in your template that a callback needs to be registered and the scope will change during the execution of that callback you can simply reference an inlet directly through this.inlets.inletName and pass it as the callback. The scope of your constructor is bound to it automatically and no effort is required to ensure that "this" in your template will ALWAYS reference the CONSTRUCTOR of your template. :)


