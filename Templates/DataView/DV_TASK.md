```dataview
TASK 
FROM TAG OR "Notes/FOLDER" OR outgoing([[_000 Work Bench]]) OR -TAG
WHERE file.name = "NAME" OR file.name != "NAME" OR contains(FIELD, "VALUE")
```