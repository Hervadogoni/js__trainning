import { createElement } from "../function/dom.js"

export class Todolist {

    #todos = []
    #listElement = []

    constructor(todos){
        this.#todos = todos
    }

    appendTo(element){
        element.append(
            document.querySelector("#todo-layout").content.cloneNode(true)
        )
        this.#listElement = document.querySelector(".uList")
        for(let todo of this.#todos){
            const item = new TodoListItem(todo)
            this.#listElement.append(item.element)
        }
        element.querySelector("form").addEventListener("submit", e => this.#submit(e))
        element.querySelectorAll(".buttonList").forEach(button => button.addEventListener("click", e => this.#toggleFilter(e)))
    }

    #submit(e){
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get("title").toString().trim()
        if(title ===""){
            return
        }
        const todo = {
            id: new Date(),
            title,
            completed : false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()
    }

    #toggleFilter(e){
        e.preventDefault()
        const filter = e.target.getAttribute("data-filter")
        e.target.parentElement.querySelector(".active").classList.remove("active")
        e.target.classList.add("active")
        if(filter === "todo"){
            this.#listElement.classList.add("hide-completed")
            this.#listElement.classList.remove("hide-todo")
        }
        if(filter === "done"){
            this.#listElement.classList.add("hide-todo")
            this.#listElement.classList.remove("hide-completed")
        }
        if(filter === "All"){
            this.#listElement.classList.remove("hide-todo")
            this.#listElement.classList.remove("hide-completed")
        }
    }

}

class TodoListItem{
    #element
    constructor(todo){
        const li = createElement("li",{
            class : todo
        })
        this.#element = li

        const checkbox = createElement("input",{
            type:"checkbox",
            id : todo._id,
            checked : todo.completed ? "" : null
        })
        const label = createElement("label",{
            for : todo._id
        })
        label.innerText = todo.title
        const button = createElement("button", {
            class : "listButton"
        })
        button.innerText = "Delete"
        this.#element.append(checkbox)
        this.#element.append(label)
        this.#element.append(button)
        this.toggle(checkbox)

        button.addEventListener("click", (e) => this.remove(e))
        checkbox.addEventListener("click", e => this.toggle(e.currentTarget))

}

    get element (){
        return this.#element 
    }

    remove(e){
        e.preventDefault()
        this.#element.remove()
    }

    toggle(checkbox){
        if(checkbox.checked){
            this.#element.classList.add("is-completed")
        }
        else{
            this.#element.classList.remove("is-completed")
        }    
    }
}