# Anselm

Anselm is a VSCode plugin that makes it easy to do extremely basic qualitative coding on field notes that are stored as Markdown.

Once you have installed the plugin you can higlight text and run the *Anselm: Code command* which will prompt you to enter a code, and ten will surround your highlighted text with a suitable &lt;mark&gt; element. You can run the command with **⌘-P** and then search for **Anselm**, or you can use the supplied keyboard shortcut **⌘-U ⌘-C** (you can also set your own shortcut if you like).

So for example, assume I have some this bit of text in my fieldnotes:

> Some heavy machinery, bulldozers mostly were also there. To the right was a cement
> structure with multiple large diagonal entrances. I missed the sign pointed to the
> right for Yard Waste and ended up on a road that led out of the facility. I thought
> about turning around but it was a one way road. There was another person in a truck
> at the exit who was watching people leave. I felt a bit like my movement through 
> the facility was controlled.

Anselm will let you quickly assign simple codes to pieces of the text:

> Some **&lt;mark class="technology"&gt;heavy machinery, bulldozers mostly were also there&lt;/mark&gt;**.
> To the right was a **&lt;mark class="architecture"&gt;cement structure with multiple large
> diagonal entrances&lt;/mark&gt;**. I missed the sign pointed to the right for Yard Waste and
> ended up on a road that led out of the facility. I thought about turning around but
> it was a one way road. **&lt;mark class="surveillance"&gt;There was another person in a truck
> at the exit who was watching people leave. I felt a bit like my movement through the
> facility was controlled.&lt;/mark&gt;**

When coding, Anselm will present you with a list of already used codes in your workspace. If you activate Anselm without highlighting text any selected codes will simply be inserted into the document. This can be helpful if you want to have multiple codes per selected document since you can position your cursor inside the &lt;mark&gt; element and add the code:

> Some **&lt;mark class="technology construction"&gt;heavy machinery, bulldozers mostly were also there&lt;/mark&gt;**.

## TODO

* Provide a view of codes and their associated text snippets.
* Provide a way of renaming existing codes.

