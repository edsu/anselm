# Anselm

Anselm is a VSCode plugin that makes it easy to do extremely basic qualitative coding on field notes that are stored as Markdown.

Once you have installed the plugin you can higlight text and run the *Anslem: Code command* which will prompt you to enter a code, and then will surround your highlighted text with a suitable &lt;mark&gt; element.

So for example, assume I have some this bit of text in my fieldnotes:

> Some heavy machinery, bulldozers mostly were also there. To the right was a cement
> structure with multiple large diagonal entrances. I missed the sign pointed to the
> right for Yard Waste and ended up on a road that led out of the facility. I thought
> about turning around but it was a one way road. There was another person in a truck
> at the exit who was watching people leave. I felt a bit like my movement through 
> the facility was controlled.

Anselm will let you quickly (faster if you assign a keyboard shortcut) assign simple codes to pieces of the text:

> Some **&lt;mark class="technology"&gt;heavy machinery, bulldozers mostly were also there&lt;/mark&gt;**.
> To the right was a **&lt;mark class="architecture"&gt;cement structure with multiple large
> diagonal entrances&lt;/mark&gt;**. I missed the sign pointed to the right for Yard Waste and
> ended up on a road that led out of the facility. I thought about turning around but
> it was a one way road. **&lt;mark class="surveillance"&gt;There was another person in a truck
> at the exit who was watching people leave. I felt a bit like my movement through the
> facility was controlled.&lt;/mark&gt;**

## TODO

* Look in all workspace documents for codes.
* Create a code view of codes and their associated text snippets.

### 0.2.1

Added autocomplete for codes in the current document.

### 0.0.1

Initial release.
