import React from "react"


export class Text extends React.Component {
    render() {
        const {children, ...props} = this.props
        return (
            <div {...props}>{children}</div>
        )
    }
}
