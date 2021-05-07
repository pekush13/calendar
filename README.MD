# pekush calendar

example there: https://pekush13.github.io/pekush13/dist/index.html

## Include

```html
<html>
  <head>
    <link rel="stylesheet" href="./dist/src.ef9787cc.css" />
  </head>
  <body>
    <script src="./dist/src.fd01a3af.js"></script>
  </body>
</html>
```

## Usage

```javascript
pekushCalendar.new(date, options);
```

```html
<div id="calendar"></div>
<script>
  const calendar1 = pekushCalendar.new(new Date(), {
    select: new Date(),
  });
</script>
```

## Options

| Option   | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| range    | Date selection type (Range or Normal).                           |
| select   | Selected date (Does not work if option is installed range=true). |
| start    | Start date selected (Works if option is installed range=true).   |
| end      | End selected date (Works if option is installed range=true).     |
| onSelect | A handler that fires after picking a date                        |
