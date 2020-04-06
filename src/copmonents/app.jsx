import React, { Component } from "react";
import { Provider } from 'mobx-react';
import AppStore from "store/AppStore"
import Grid from '@material-ui/core/Grid';
import HeaderComponent from "./header";
import ContentComponent from "./content";

export default class App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider
                appStore={AppStore}
            >
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12} className={"header_wrapper"}>
                        <HeaderComponent/>
                    </Grid>
                    <Grid item xs={12} className={"content_wrapper"}>
                        <ContentComponent/>
                    </Grid>
                </Grid>
            </Provider>
        )
    }
}