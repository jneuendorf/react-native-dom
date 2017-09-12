import React from 'react'
import ReactDOM from 'react-dom'

import {
    ActivityIndicator,
    Button,
    ScrollView,
    Text,
    View,
} from './components'
import {Platform} from './api'


class TogglingActivityIndicator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {animating: true}
    }

    toggle() {
        this.setState({animating: !this.state.animating})
    }

    componentDidMount() {
        setTimeout(() => {
            this.toggle()
        }, 1400)
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.toggle()
        }, 1400)
    }

    render() {
        return (
            <ActivityIndicator
                animating={this.state.animating}
                hidesWhenStopped={false}
            />
        )
    }
}


console.log("running on", Platform.OS, Platform.Version)
const onButtonPress = () => console.log("pressed a button")
const root = (
    <View>
        <Button title="button" onPress={onButtonPress}></Button>
        <Button title="button" onPress={onButtonPress} color="purple"></Button>
        <Button title="button" onPress={onButtonPress} disabled={true}></Button>
        <ScrollView
            contentContainerStyle={{borderWidth: 1, borderColor: "black", borderStyle: "solid"}}
            style={{width: 100, height: 100}}
            // scrollEnabled={false}
            onScroll={() => console.log('a')}
        >
            {Array.apply(null, Array(100)).map((e, i) => <Text key={i}>asdf</Text>)}
        </ScrollView>
        <ScrollView
            horizontal={true}
            contentContainerStyle={{borderWidth: 1, borderColor: "black", borderStyle: "solid"}}
            style={{width: 100, height: 30}}
            // onScroll={() => console.log('a')}
        >
            {Array.apply(null, Array(10)).map((e, i) => <Text key={i}>asdf</Text>)}
        </ScrollView>
        <ActivityIndicator style={{height: 50}} color="blue" />
        <ActivityIndicator size="large" color="purple" />
        <ActivityIndicator animating={false} hidesWhenStopped={true} />
        <ActivityIndicator animating={false} hidesWhenStopped={false} />
        <TogglingActivityIndicator />
    </View>
)

ReactDOM.render(
    root,
    document.querySelector("#root")
)
