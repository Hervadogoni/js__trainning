import { Todolist } from "./component/Todolist.js";
import { fetchJSON } from "./function/api.js";
import { createElement } from "./function/dom.js";




try{
    const result = await fetchJSON("http://localhost:5000/todo",{Accept : "application/json"})
    const todos = await result.json()
    console.log(todos)
    const todoList = new Todolist(todos)
    todoList.appendTo(document.querySelector("#todoList"))

}
catch(error){
    console.log(error)
    const alertElement = createElement("div",{
        class: "JSONalert"
    })
    alertElement.innerText = "Loading failed..."
    document.body.prepend(alertElement)
}