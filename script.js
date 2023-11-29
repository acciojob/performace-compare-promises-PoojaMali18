// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];
function fetchData(url) {
  return fetch(url).then((response) => response.json());
}

function measureTimeTaken(promiseFunction) {
  const startTime = performance.now();
  return promiseFunction()
    .then(() => {
      const endTime = performance.now();
      return endTime - startTime;
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      return -1; // Return -1 to indicate an error
    });
}

const outputAll = document.getElementById("output-all");
const outputAny = document.getElementById("output-any");

const promiseAllTime = measureTimeTaken(() => Promise.all(apiUrls.map((url) => fetchData(url))));
const promiseAnyTime = measureTimeTaken(() => Promise.any(apiUrls.map((url) => fetchData(url))));

Promise.all([promiseAllTime, promiseAnyTime])
  .then((times) => {
    outputAll.innerText = `${times[0].toFixed(2)} ms`;
    outputAny.innerText = `${times[1].toFixed(2)} ms`;
  })
  .catch((error) => {
    console.error("Error occurred:", error);
    outputAll.innerText = "Error";
    outputAny.innerText = "Error";
  });
