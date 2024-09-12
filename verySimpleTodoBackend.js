const express = require("express");
const zod = require("zod");
const PORT = 3000;

const app = express();

errorCount = 0;
const todo1 = {
  Topic: "ESD",
  Task: "Create a project simulation",
  State: "Not Started",
};
const todo2 = {
  Topic: "DAA",
  Task: "Write Lab assignments",
  State: "Not Started",
};
const todo3 = {
  Topic: "CO",
  Task: "Create personal notes",
  State: "Started",
};
const todo4 = {
  Topic: "TMC",
  Task: "Attend lectures",
  State: "Completed",
};
const todos = [todo1, todo2, todo3, todo4];

function iterateTODOs(todos) {
  let pendingList = "";
  let completedList = "";

  for (let i = 0; i < todos.length; i++) {
    if(!(todos[i].State == "Completed")){
      pendingList += `${i + 1}. Topic: ${todos[i].Topic} | Task: ${todos[i].Task} | State: ${todos[i].State}.\n`;
    }else{
      completedList += `${i + 1}. Topic: ${todos[i].Topic} | Task: ${todos[i].Task} | State: ${todos[i].State}.\n`;
    }
  }
  return [pendingList, completedList];
}

function checkLoggedIn(req, res, next) {
  if (!(req.headers.username == "Kshitij" && req.headers.password == "pass")) {
    res.send("Failed Login! Retry.");
  } else {
    next();
  }
}

app.use(checkLoggedIn);
app.use(express.json());

app.get("/", function (req, res) {
  console.log("Logged In");
  const list_arr = iterateTODOs(todos);
  const list = `List of Pending Tasks :\n${list_arr[0]}\n\nList of Completed Tasks :\n${list_arr[1]}`
  res.send(list);
});

app.post("/add-todo", function (req, res) {
  const new_todo = req.body;
  if(!(new_todo.Topic == "" && new_todo.Task == "" && new_todo.Status == "")){
    todos.push(new_todo);
    res.status(200).send("Successfully added new ToDo item!");
  }else{
    res.status(400).send("Wrong / Incomplete data!");
  }
  
});

app.use(function(err,req,res,next){
  errorCount++;
  res.json({
    msg : "Kuch toh gadbad hai Daya."
  });
})
app.listen(PORT);
