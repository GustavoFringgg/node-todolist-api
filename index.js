const http = require("http");
const { v4: uuidv4 } = require("uuid");
const handle = require("./handle");
const { json } = require("stream/consumers");
const { syncBuiltinESMExports } = require("module");
const todos = []; //儲存所有todo列表

const reqlistener = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, handle.headers);
    res.write(
      JSON.stringify({
        status: "GET-SUCCESS",
        data: todos,
      })
    );
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title_todo;
        if (title != undefined) {
          const new_todo = {
            title: title,
            todo_id: uuidv4(),
          };
          todos.push(new_todo);
          res.writeHead(200, handle.headers);
          res.write(
            JSON.stringify({
              status: "POST-SUCCESS",
              data: todos,
            })
          );
          res.end();
        } else {
          handle.error_title(res);
        }
      } catch (error) {
        handle.error_JSON(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "DELETE") {
    todos.length = 0;
    res.writeHead(200, handle.headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
        message: "delete all data",
      })
    );
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    const index = todos.findIndex((element) => element.todo_id == id);
    if (index != -1) {
      todos.splice(index, 1);
      res.writeHead(200, handle.headers);
      res.write(
        JSON.stringify({
          status: "success",
          message: "刪除單筆成功",
        })
      );
      res.end();
    } else {
      handle.error_route(res);
    }
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title_todo;
        const id = req.url.split("/").pop();
        const index = todos.findIndex((element) => element.todo_id == id);

        if (todo != undefined && index != -1) {
          todos[index].title = todo;
          res.writeHead(200, handle.headers);
          res.write(
            JSON.stringify({
              status: "update success",
              data: todos,
            })
          );
          res.end();
        } else {
          handle.error_route(res);
        }
      } catch {
        handle.error_JSON(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "OPTIONS") {
    handle.correctHandle(res);
  } else {
    handle.error_route(res);
  }
};
const server = http.createServer(reqlistener);

server.listen(process.env.PORT || 3005);
console.log("server get");
