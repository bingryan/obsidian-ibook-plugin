# example

plugins you might like:
- [Highlightr-Plugin](https://github.com/chetachiezikeuzor/Highlightr-Plugin): makes color-coded highlighting much easier

## default template

```
---
tags:
- ibook/
---

# ๐ Book: {{library.ZSORTTITLE}}

**Author**:: {{library.ZAUTHOR}}

**LANGUAGE**:: {{library.ZLANGUAGE}}

{{#if library.ZBOOKDESCRIPTION}}
---
# ๐งพ Description
	{{{library.ZBOOKDESCRIPTION}}}
{{/if}}

---
# ๐ How I Discovered IT

{{#group annotation by="ZFUTUREPROOFING5"}}
- ๐{{value}}
	{{#each items}}
	{{#if ZANNOTATIONSELECTEDTEXT}}
	- ๐ฏ{{ZANNOTATIONSELECTEDTEXT}}
	{{/if}}
		{{#if ZANNOTATIONNOTE}}
		- โ๏ธ{{ZANNOTATIONNOTE}}
		{{/if}}
	{{/each}}
{{/group}}
```

If you installed the [Highlightr plugin](https://github.com/chetachiezikeuzor/Highlightr-Plugin), you can use:

```
---
tags:
- ibook/
---

# ๐ Book: {{library.ZSORTTITLE}}

**Author**:: {{library.ZAUTHOR}}

**LANGUAGE**:: {{library.ZLANGUAGE}}

{{#if library.ZBOOKDESCRIPTION}}
---
# ๐งพ Description
	{{{library.ZBOOKDESCRIPTION}}}
{{/if}}

---
# ๐ How I Discovered IT

{{#group annotation by="ZFUTUREPROOFING5"}}
- ๐{{value}}
	{{#each items}}
	{{#if ZANNOTATIONSELECTEDTEXT}}
	- ๐ฏ<mark class="hltr-orange">{{ZANNOTATIONSELECTEDTEXT}}</mark>
	{{/if}}
		{{#if ZANNOTATIONNOTE}}
		- โ๏ธ<mark class="hltr-purple">{{ZANNOTATIONNOTE}}</mark>
		{{/if}}
	{{/each}}
{{/group}}
```


![](images/screenshot-2.png)


## old default template

```
---
tags:
- ibook/
---

# ๐ Book: {{library.ZSORTTITLE}}

**Author**:: {{library.ZAUTHOR}}

**LANGUAGE**:: {{library.ZLANGUAGE}}

{{#if library.ZBOOKDESCRIPTION}}
---
# ๐งพ Description
	{{{library.ZBOOKDESCRIPTION}}}
{{/if}}

---
# ๐ How I Discovered IT

{{#each annotation}}
{{#if this.ZFUTUREPROOFING5}}
- ๐{{this.ZFUTUREPROOFING5}}
{{/if}}
	{{#if this.ZANNOTATIONSELECTEDTEXT}}
	- ๐ฏ{{this.ZANNOTATIONSELECTEDTEXT}}
	{{/if}}
		{{#if this.ZANNOTATIONNOTE}}
		- โ๏ธ{{this.ZANNOTATIONNOTE}}
		{{/if}}
{{/each}}
```
![](images/screenshot-1.png)
