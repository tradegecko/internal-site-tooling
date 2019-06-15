# Intent

Provide a way for javascript to interface with handlebars, in the same way that handlebars would interface with itself

# Problem

Handlebars does not have an api to splat properties, this means that either handlebars components have one option called `options`, and have to always put things into hashes and interface with the hash, which is very different to the way we code handlebars today, and future enhancements we want to add to handlebars like typing properties.

# Structure

Splat-Shims should be collocated.<br />
Splat-Shims only have one parameter called options, which contains the parameters<br />
Splat-Shims have a component that splats the properties, currently we built them manually but they can be automated. <br />
Splat-Shims should be inferred from component names

![Shim diagram](/images/patterns/splat-shim.png)
