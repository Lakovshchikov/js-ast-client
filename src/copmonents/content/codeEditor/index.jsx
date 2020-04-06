import React from "react";
import { inject } from "mobx-react"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import api from "api";
import Button from '@material-ui/core/Button';
import {
    withStyles,
} from '@material-ui/core/styles';
import "./style.scss";
import blue from '@material-ui/core/colors/blue';

const ColorButton = withStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: blue[400],
        '&:hover': {
            backgroundColor: blue[600],
        },
    },
}))(Button);

@inject('appStore')
class CodeEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            compileTextareaValue: "",
        }
    }

    handleInputTextChange = (e) => {
        this.setState({
            compileTextareaValue: e.target.value
        });
    }

    handleASTButtonClick = (e) => {
        const { compileTextareaValue } = this.state;
        const { appStore } = this.props;
        api.getAST(compileTextareaValue)
            .then(ast => {
                appStore.setAST(ast)
            })
            .catch(e => {
                console.error(e.message);
            })
    }

    handleLexemButtonClick = (e) => {
        const { appStore } = this.props;
        api.getLexem()
            .then(lexem => {
                appStore.setLexem(lexem)
            })
            .catch(e => {
                console.error(e.message);
            })
    }

    handlePrefixButtonClick = (e) => {
    }

    render() {
        const { compileTextareaValue } = this.state;
        return(
            <>
                <form className="compile_form">
                    <TextareaAutosize value={compileTextareaValue} onChange={event => {this.handleInputTextChange(event)}} rows={41}/>
                    <div className="controls_wrapper">
                        <ColorButton variant="contained" onClick={this.handleASTButtonClick}>
                            Получить AST
                        </ColorButton>
                        <ColorButton variant="contained" onClick={this.handleLexemButtonClick}>
                            Получить лексемы
                        </ColorButton>
                    </div>
                </form>
            </>
        )
    }
}

export default CodeEditor