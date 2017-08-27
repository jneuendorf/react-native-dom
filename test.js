import React from 'react'
import ReactDOM from 'react-dom'

import {
    Button,
} from './components'
import Platform from './Platform'


console.log("running on", Platform.OS, Platform.Version);

const onButtonPress = () => console.log("pressed a button")


export class Root extends React.Component {
    render() {
        return (
            <div>
                <Button title="button" onPress={onButtonPress}></Button>
                <Button title="button" onPress={onButtonPress} color="purple"></Button>
                <Button title="button" onPress={onButtonPress} disabled={true}></Button>
            </div>
        )
    }
}

ReactDOM.render(
    <Root></Root>,
    document.querySelector("#root")
)
