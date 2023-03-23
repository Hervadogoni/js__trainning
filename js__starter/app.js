const createElementWithText = (tagName, content) => {
    const element = document.createElement(tagName)
    element.innerText = content
    return element 
}

const createList =(todo) => {
    const list = document.createElement("div")
    list.append(createElementWithText("h3", todo.title))
    list.append(createElementWithText("p", todo.completed))
    return list 
}

const main = async () => {
    const wrapper = document.querySelector("#display")
    const loader = document.createElement("p")
    loader.innerText = "Loading..."
    wrapper.append(loader)    
    try{
        const result = await fetch("http://localhost:5000/todo",{
            hearders : {
                Accept : "application/json"
            }
        })
        if(result.ok){
            const Lists = await result.json()
            loader.remove()
            for(const list of Lists){
                wrapper.append(createList(list))
            }
        }
    }
    catch(error){
        console.log(error)
        loader.innerText = "Something wrong, try later"
        loader.style.color = "red"
    }
}

main()