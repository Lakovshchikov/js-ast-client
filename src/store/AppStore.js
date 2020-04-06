import { observable, action } from "mobx";

class AppStore {
    @observable ast = null;
    @observable lexem = null;

    constructor() {
    }

    get AST(){
        return this.ast;
    }

    get Lexem(){
        return this.lexem
    }

    @action
    setAST(ast) {
        this.ast = ast;
    }

    @action
    setLexem(lexem){
        this.lexem = lexem;
    }

}

const store = new AppStore();
export default store;