import "./styles.css";

const defaultCallback = (start, end) => console.log(start, end);

function createElement(tag, attrs) {
  const element = document.createElement(tag.toUpperCase());
  for (let name in attrs) {
    switch (name) {
      case "className":
        if (Array.isArray(attrs[name])) {
          for (let i in attrs[name]) {
            element.classList.add(attrs[name][i]);
          }
        } else {
          element.classList.add(attrs[name]);
        }

        break;
      case "children":
        for (let i in attrs[name]) {
          element.appendChild(attrs[name][i]);
        }
        break;
      case "text":
        element.innerText = attrs[name];
        break;
      case "html":
        element.innerHTML = attrs[name];
        break;
      case "on":
        for (let event in attrs[name]) {
          element.addEventListener(event, attrs[name][event]);
        }
        break;
      case "attrs":
        for (let attr in attrs[name]) {
          element.setAttribute(attr, attrs[name][attr]);
        }
        break;
      default:
        if (name in element) {
          element[name] = attrs[name];
          break;
        }
        element.setAttribute(name, attrs[name]);
    }
  }
  return element;
}

function getDateElement(date) {
  return createElement("div", {
    className: "date",
    children: [
      createElement("b", {
        text: addNull(date.getDate()),
      }),
    ],
    "data-date": date,
  });
}

function setDisableClass(element) {
  element.classList.add("disable");
  return element;
}

function addNull(nm) {
  return String(nm).length == 1 ? "0" + nm : String(nm);
}

function getFirstDays(date) {
  const secondDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const arDates = [];

  for (let i = 0; i < secondDate.getDay() - 1; i++) {
    arDates.push(
      new Date(
        lastMonthDate.getFullYear(),
        lastMonthDate.getMonth(),
        lastMonthDate.getDate() - i
      )
    );
  }
  return arDates.reverse();
}

function getLastDays(date) {
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const secondMonthDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  const arDates = [];
  let j = 1;
  for (let i = lastDate.getDay() + 1; i <= 7; i++) {
    arDates.push(
      new Date(secondMonthDate.getFullYear(), secondMonthDate.getMonth(), j++)
    );
  }
  return arDates;
}

function getDates(date) {
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const arDates = [];
  for (let i = 1; i <= lastDate.getDate(); i++) {
    arDates.push(new Date(lastDate.getFullYear(), lastDate.getMonth(), i));
  }
  return arDates;
}

function getDatesBlock(date) {
  const dates = [
    ...getFirstDays(date).map(getDateElement).map(setDisableClass),
    ...getDates(date).map(getDateElement),
    ...getLastDays(date).map(getDateElement).map(setDisableClass),
  ];

  const datesBlock = createElement("div", {
    className: "dates",
  });

  for (let i = 0; i < Math.ceil(dates.length / 7); i++) {
    const row = createElement("div", { className: "row" });
    for (let j = i * 7; j <= i * 7 + 6; j++) {
      if (dates[j]) {
        row.appendChild(dates[j]);
      }
    }
    datesBlock.appendChild(row);
  }
  return datesBlock;
}

const arrow = `<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.14001 0.787354L1.16001 5.14485L6.14001 9.50235" stroke="black" stroke-width="1.55625" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

function getWeekDays(locale) {
  let date = new Date(Date.UTC(2012, 11, 10, 3, 0, 0));
  const weekDays = [];
  for (let i = 0; i <= 6; i++) {
    weekDays.push(date.toLocaleString(locale, { weekday: "short" }));
    date.setDate(date.getDate() + 1);
  }
  return weekDays;
}

function getDate(date) {
  return date
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
    : false;
}

function setSelectDate(content, selectDate) {
  selectDate = getDate(selectDate);
  if (!selectDate) {
    return;
  }
  const dates = content.querySelector(".dates").querySelectorAll(".date");
  for (const element of dates) {
    element.classList.remove("select");
    const date = new Date(element.getAttribute("data-date"));
    if (date.valueOf() == selectDate.valueOf()) {
      element.classList.add("select");
    }
  }
}

function setSelectDateRange(content, start, end) {
  [start, end] = [getDate(start), getDate(end)];
  if (!start && !end) {
    return;
  }

  const dates = content.querySelector(".dates").querySelectorAll(".date");
  for (const element of dates) {
    element.classList.remove("path");
    element.classList.remove("select-start");
    element.classList.remove("select-end");

    const date = new Date(element.getAttribute("data-date"));
    if (start && end) {
      if (date >= start && date <= end) {
        element.classList.add("path");
      }
    }

    if (start && date.valueOf() == start.valueOf()) {
      element.classList.add("select-start");
    }

    if (end && date.valueOf() == end.valueOf()) {
      element.classList.add("select-end");
    }
  }
}

function getRangeElement(content) {
  return [
    content.querySelector(".dates").querySelector(".select-start") || false,
    content.querySelector(".dates").querySelector(".select-end") || false,
  ];
}

function getRangeDate(content) {
  const [startElement, endElement] = getRangeElement(content);
  return [
    startElement ? new Date(startElement.getAttribute("data-date")) : false,
    endElement ? new Date(endElement.getAttribute("data-date")) : false,
  ];
}

function removeActive(content) {
  const dates = content.querySelector(".dates").querySelectorAll(".date");
  for (const element of dates) {
    element.classList.remove("active");
  }
}

function onRangeSelect(content, ev, options) {
  const { onSelect = defaultCallback } = options;
  let { start, end } = options;
  const target = ev.currentTarget;
  const date = new Date(target.getAttribute("data-date"));

  const setDate = (start, end) => {
    options.start = start;
    options.end = end;
    setSelectDateRange(content, start, end);
  };

  if (start && end) {
    if (![start.valueOf(), end.valueOf()].includes(date.valueOf())) {
      if (date.valueOf() < start.valueOf()) {
        setDate(date, end);
      } else if (date.valueOf() > end.valueOf()) {
        setDate(start, date);
      } else {
        const [_, endElement] = getRangeElement(content);
        if (endElement && endElement.classList.contains("active")) {
          setDate(start, date);
        } else {
          setDate(date, end);
        }
      }
    }
    onSelect(...getRangeDate(content));
    removeActive(content);
    target.classList.add("active");
  } else if (start || end) {
    const selectDate = start || end;
    if (date.valueOf() != selectDate.valueOf()) {
      if (selectDate.valueOf() > date.valueOf()) {
        setDate(date, selectDate);
      } else {
        setDate(selectDate, date);
      }
    }
    onSelect(...getRangeDate(content));
    removeActive(content);
    target.classList.add("active");
  }
}

function rangeSelect(content, options) {
  const dates = content.querySelector(".dates").querySelectorAll(".date");
  for (const element of dates) {
    element.addEventListener(
      "click",
      (ev) => onRangeSelect(content, ev, options),
      true
    );
  }
}

function registerSelect(content, options) {
  const dates = content.querySelector(".dates").querySelectorAll(".date");
  for (const element of dates) {
    element.addEventListener(
      "click",
      (ev) => {
        const target = ev.currentTarget;
        const { onSelect = defaultCallback } = options;
        options.select = new Date(target.getAttribute("data-date"));
        setSelectDate(content, options.select);
        onSelect(options.select);
      },
      true
    );
  }
}

function getRawCalendar(date, options) {
  const { locale = window.navigator.language } = options;
  const month = date.toLocaleString(locale, {
    month: "long",
  });

  const weekDays = getWeekDays(locale);

  const header = createElement("div", {
    className: "header",
    children: [
      createElement("div", {
        classList: "caption",
        children: [
          createElement("span", {
            children: [
              createElement("h3", {
                text: month,
                on: {
                  click: (ev) => {
                    ev.stopPropagation();
                    ev.target.classList.add("focus");
                  },
                },
              }),
              createElement("ul", {
                className: "select",
                children: Array(12)
                  .fill(0)
                  .map((_, i) =>
                    createElement("li", {
                      children: [
                        createElement("a", {
                          href: i,
                          text: new Date(
                            date.getFullYear(),
                            i,
                            date.getDate()
                          ).toLocaleString(locale, {
                            month: "long",
                          }),
                          on: {
                            click: (...attr) => {
                              const [ev] = attr;
                              ev.preventDefault();
                              options.onSelectMonth(...attr);
                            },
                          },
                        }),
                      ],
                    })
                  ),
              }),
            ],
          }),

          createElement("p", {
            text: date.getFullYear(),
            contenteditable: true,
            on: {
              keyup: options.onInputYear,
            },
          }),
        ],
      }),
      createElement("div", {
        className: "input",
        children: [
          createElement("button", {
            className: ["btn", "arrow", "left"],
            html: arrow,
            on: {
              click: options.onPrev,
            },
          }),
          createElement("button", {
            className: ["btn", "arrow", "right"],
            html: arrow,
            on: {
              click: options.onNext,
            },
          }),
        ],
      }),
    ],
  });

  const weekBlock = createElement("div", {
    className: "weeks",
    children: weekDays.map((week) =>
      createElement("div", {
        className: "item",
        text: week,
      })
    ),
  });

  const content = createElement("div", {
    className: "content",
    children: [weekBlock, getDatesBlock(date)],
  });

  if (options.range) {
    setSelectDateRange(content, options.start, options.end);
    rangeSelect(content, options);
  } else {
    setSelectDate(content, options.select);
    registerSelect(content, options);
  }

  return createElement("div", {
    className: "wrap",
    children: [header, content],
  });
}

function addMonth(date, month) {
  const nmMonth = date.getMonth() + month;
  date.setMonth(nmMonth);
  return date;
}

function getCalendar(date, options) {
  const container = createElement("div", {
    className: "pekush-calendar",
  });
  options.onPrev = () => {
    const usageDate = addMonth(date, -1);
    container.innerHTML = "";
    container.appendChild(getRawCalendar(usageDate, options));
  };

  options.onNext = () => {
    const usageDate = addMonth(date, 1);
    container.innerHTML = "";
    container.appendChild(getRawCalendar(usageDate, options));
  };

  options.onInputYear = (ev) => {
    const value = ev.target.innerText;
    if (/^((19|20)[0-9]{2}){1}$/.test(value)) {
      date.setYear(value);
      container.innerHTML = "";
      container.appendChild(getRawCalendar(date, options));
    }
  };

  options.onSelectMonth = (ev) => {
    date.setMonth(ev.target.getAttribute("href"));
    container.innerHTML = "";
    container.appendChild(getRawCalendar(date, options));
  };

  container.appendChild(getRawCalendar(date, options));

  document.addEventListener("click", () => {
    const h3 = container.querySelector(".header h3.focus");
    if (container.querySelector(".header h3.focus")) {
      h3.classList.remove("focus");
    }
  });

  return container;
}

window.pekushCalendar = {
  new: getCalendar,
};
