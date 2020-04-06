class ApiWrapper {

    constructor() {

    }

    getAST(compileTextareaValue){
        return fetch('/compile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                src: compileTextareaValue,
            })
        })
            .then(res => res.json())
            .catch(e => {
                console.error(e.message)
            })
    }

    getLexem(){
        return fetch('/lexem', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .catch(e => {
                console.error(e.message)
            })
    }
}

const api = new ApiWrapper();
export default api;