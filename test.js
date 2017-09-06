import React from 'react'
import ReactDOM from 'react-dom'

import {
    Button,
    ScrollView,
    Text,
    View,
} from './components'
import Platform from './Platform'


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
    </View>
)

ReactDOM.render(
    root,
    document.querySelector("#root"),
    function() {
        const children = root.props.children
        const scrollView = children[3]
        console.log(scrollView);
        console.log(scrollView.scrollTo);
    }
)
