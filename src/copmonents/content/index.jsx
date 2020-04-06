import React from "react";
import Grid from '@material-ui/core/Grid';
import CodeEditor from "./codeEditor";
import ReactJson from "react-json-view";
import {inject, observer} from "mobx-react";

@inject('appStore')
@observer
class ContentComponent extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const { appStore } = this.props;
        return (
            <Grid container direction="row" spacing={3} className="app_workspace">
                <Grid item xs={4}>
                    <CodeEditor/>
                </Grid>
                <Grid item xs={4} className="workspace_ast-wrapper">
                    {
                        appStore.AST !== null &&  <ReactJson src={appStore.AST}/>
                    }
                </Grid>
                <Grid item xs={4} className="workspace_lexem-wrapper">
                    {
                        appStore.Lexem !== null &&  <ReactJson src={appStore.Lexem}/>
                    }
                </Grid>
            </Grid>
        )
    }


}

export default ContentComponent;