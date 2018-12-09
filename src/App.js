import React from 'react'
import Root from './Root';
import store from './store.js'
import {Provider} from 'react-redux'

export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}