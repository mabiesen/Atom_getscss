# getscss

My first Atom extension!

When I write HTML, I typically name-space major elements with ids immediately and create a hierarchical SCSS file.  This project aims to take manual labor out of SCSS creation.

For example, say we have the following html:
```
<div id="outer">
	<div id="inner">
		<div id="innerinner1">
		</div>
		<div id="innerinner2">
	</div>
</div>
```

Use the extension to get the following:
```
#outer{
	#inner{
		#innerinner1{
		}
		#innerinner2{
		}
	}
}
```

## ToDo as of 4/9/2017

- [ ] Make extension workable for all Dom elements.  Currently only works with divs
- [ ] Prompt user for a directory where the SCSS should be saved.
- [x] Insure SCSS filenaming represents original html file name.
- [x] Change project to look for ids rather than classes. Because classes can be shared and multiple classes may be part of a dom element, ids offer more reliable scaffolding.
