import { Component } from "react";


export default class RenderClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            digit: 10
        }
    }

    componentDidMount = () => {
        this.myTimer = setInterval(() => {
            this.setState((prevState) => ({
                digti: prevState.digit + 1
            }));
        }, 1000)
    }

    componentWillUnmount = () => {

    }

    render() {
        const { digit } = this.state;

        return(
            <div className="RenderClass">
                
                Counter{digit}

            </div>
        )

        
    }
}