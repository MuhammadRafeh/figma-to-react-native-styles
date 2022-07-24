import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { stylesReactNative } from './constants';

const reactNativeProperties = Object.keys(stylesReactNative);

class App extends React.Component {
  state = {
    value: '',
    output: []
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    // alert('A name was submitted: ' + this.state.value);
    const lines = this.state.value.split('\n');
    const requiredCss = lines.filter(line => line.indexOf(';') != -1);
    console.log(requiredCss)

    const reactNativeStyles = ['{', <br />]

    requiredCss.forEach((css) => {
      const bothSides = css.split(':');
      const property = bothSides[0].trim().replace('-', '');
      const rightSide = bothSides[1].trim().replace(';', ',');

      let reactNativeProp;
      const isExist = reactNativeProperties.findIndex(prop => {
        reactNativeProp = prop;
        return property === prop.toLowerCase();
      });

      if (isExist === -1) { //Does not Exists

      } else { // Exists
        reactNativeStyles[reactNativeProp] = rightSide;
        const stringCSS = `${reactNativeProp}: ${rightSide}`;
        console.log(stringCSS, 'adsasd')
        reactNativeStyles.push(stringCSS);
        reactNativeStyles.push(<br />);
      }

    })
    reactNativeStyles.push('}')

    // var txt = "#div-name-1234-characteristic"
    // var numb = this.state.value.match(/\d/g).join("");
    // alert(numb)
    this.setState({
      output: reactNativeStyles
    })



    event.preventDefault();
  }

  render() {
    return (
      <>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Figma Style to React Native</h1>
        <form onSubmit={this.handleSubmit} style={{ justifyContent: 'space-around', display: 'flex' }}>
          <TextareaAutosize
            style={{ width: '60%' }}
            rows={1}
            ref={c => (this.textarea = c)}
            typeof="string" value={this.state.value} onChange={this.handleChange} inputMode={'text'} />
          <input type="submit" value="Convert" style={{ backgroundColor: 'silver', height: 50 }} />
        </form>
        <p style={{ width: '50%', display: 'flex', backgroundColor: 'green', justifyContent: 'center' }}>
          {
            this.state.output.map(item => item)
          }
        </p>
      </>
    );
  }
}

export default App;