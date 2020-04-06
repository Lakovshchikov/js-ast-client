import React from "react";
import Typography from '@material-ui/core/Typography';
import "./style.scss";

const HeaderComponent = function() {

    return (
        <header className="app_header">
            <Typography variant="h3">Js to AST</Typography>
        </header>
    )
}

export default HeaderComponent;