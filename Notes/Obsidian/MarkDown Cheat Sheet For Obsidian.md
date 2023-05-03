---
tags: CheatSheet, Obsidian
date: 03-05-2023
type: Overview
summary: Documented some useful syntax for MD files.
---
## Text Formatting

#### Bold
**Here** ^c1e7de


#### Italics
*Here* ^8fdf44

#### Strikethrough
~~here~~

#### Highlight
==here==

#### Lists
- list 1
- list 2

* list 1
* list 2

+ list 1
+ list 2

1. list 1
2. list 2

- [ ] task 1
- [ ] task 2

## Linking and Aliases

#### Alias for links
[[MarkDown Cheat Sheet For Obsidian | This CheatSheet]]

#### Linking to Headers
[[MarkDown Cheat Sheet For Obsidian#Lists]]

With Alias:
[[MarkDown Cheat Sheet For Obsidian#Lists | Go to List]]

==This also works for headers not in the same page.==

#### Linking to Blocks
[[MarkDown Cheat Sheet For Obsidian#^c1e7de | Link to Bold text "here"]]

#### Linking to Websites
[obsidian](https://obsidian.md/)

#### Embed Links (from other pages)
![[_000 Work Bench#Work]]

## Footnotes
This is a footnote[^1]. Use a \[^number\].

Alternatively, we can do it inline. I think this is more efficient.
This is another footnote^[Definition of another footnote]

Footnote to a header^[[[MarkDown Cheat Sheet For Obsidian#Text Formatting | Text Formatting]]]

Footnote to a block^[[[MarkDown Cheat Sheet For Obsidian#^8fdf44|To Italics]]]






[^1]: Definition of a footnote.