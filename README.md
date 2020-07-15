# Start

1) Start docker `yarn:build`
2) Open another terminal `yarn docker:db-hard-init`
3) Open `localhost:4000`

## Todo
1) Use env from .env file (eg PORTs) 

### Examples
```
query {
  todos(page: 0, rowsPerPage: 10, type: New) {
    totalCount
    data {
      id
      title
    }
  }
}
```

or 

```
query {
  todo(id: "VG9kbzox") {
    id
    title
    content
  }
}
```