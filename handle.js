const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With" /* Headers允許的資訊*/,
  "Access-Control-Allow-Origin": "*" /*讓任何伺服器ID都可以造訪*/,
  "Access-Control-Allow-Methods":
    "PATCH, POST, GET,OPTIONS,DELETE" /*提供支援的方法*/,
  "Content-Type": "application/json" /*使用json格式去解析*/,
};

function error_JSON(res) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "FALSE",
      message: "欄位填寫錯誤，非JSON格式",
    })
  );
  res.end();
}
function error_title(res) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "FALSE",
      message: "填寫title_todo格式內容錯誤",
    })
  );
  res.end();
}

function error_route(res) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "FALSE",
      message: "路由設定錯誤",
    })
  );
  res.end();
}

function correctHandle(res) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: "success",
      message: "此為OPTIONS方法",
    })
  );
  res.end();
}
module.exports = {
  error_title,
  error_route,
  error_JSON,
  correctHandle,
  headers,
};
