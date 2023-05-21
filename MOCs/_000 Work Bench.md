
## Work
##### Active
```dataview
LIST 
FROM #MOC 
WHERE contains(type, "Active")
SORT file.name asc
```

##### Non-Active
```dataview
LIST 
FROM #MOC 
WHERE !contains(type, "Active") AND file.name != "MOC YAML" AND !contains(type, "SideProject")
SORT file.name asc
```

#### Side Projects
```dataview
LIST 
FROM #MOC 
WHERE contains(type, "SideProject")
SORT file.name asc
```


---

## Todoist

```todoist
name: Today's Tasks
filter: "today"
sorting: 
   - date
   - priority
group: true
```

---

```todoist
name: Incoming Tasks
filter: "(next 7 days) & !no time"
sorting: 
   - date
   - priority
group: true
```

---

```todoist
name: Happenings!
filter: "no time"
sorting: 
   - date
group: true
```


---

## Personal Website

#### Blog Posts
```dataview
TABLE date as Date, summary as Description
FROM #Blog 
WHERE contains(type, "BlogPost")
SORT date asc
```

#### Website Pages
```dataview
TABLE date as Date, summary as Description
FROM #Blog 
WHERE contains(type, "BlogPage")
SORT date asc
```