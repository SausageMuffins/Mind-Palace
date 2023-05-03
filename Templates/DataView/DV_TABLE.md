```dataview
TABLE YAML_HEADER1 as ALIAS1, YAML_HEADER2
FROM TAG OR "Notes/FOLDER" OR outgoing([[_000 Work Bench]]) OR -TAG
WHERE file.name = "NAME" OR file.name != "NAME" OR contains(FIELD, "VALUE")
SORT file.name asc OR date asc
```