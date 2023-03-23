export async function fetchJSON(url, options={}){
    const headers = {headers : options }
    const result = fetch(url,headers)
    return result
}