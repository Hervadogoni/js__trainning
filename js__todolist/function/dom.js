export function createElement(tagName, attribut={}){
    const element = document.createElement(tagName)
    for(const[attr,value] of Object.entries(attribut)){
        if(value !== null)
        element.setAttribute(attr, value)
    }
    return element
}
