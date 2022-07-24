import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { stylesReactNative } from './constants';

const reactNativeProperties = Object.keys(stylesReactNative);

class App extends React.Component {
  state = {
    value: '',
    output: [] // We'll copy from it
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // alert('A name was submitted: ' + this.state.value);
    const lines = this.state.value.split('\n');
    const requiredCss = lines.filter(line => line.indexOf(';') != -1);
    console.log(requiredCss)

    const reactNativeStyles = ['{', <br />]

    requiredCss.forEach((css) => {
      const bothSides = css.split(':');
      const property = bothSides[0].trim().replace('-', '');
      const rightSide = bothSides[1].trim().replace(';', '');

      let reactNativeProp;
      const isExist = reactNativeProperties.findIndex(prop => {
        reactNativeProp = prop;
        return property === prop.toLowerCase();
      });

      if (isExist === -1) { //Does not Exists (Here we have to perform different steps)

      } else { // Exists (Here we have to check if value contain space then it means we have to split it and do accordingly
        // like padding: 20px 40px its mean we'll converet this in paddingVertical: 20 and padding Horizontal: 40)
        let pureRightSide = `'${rightSide}'` + ',';
        if (/\d/.test(rightSide) && (stylesReactNative[reactNativeProp] === 1 || stylesReactNative[reactNativeProp] === 3)) {
          pureRightSide = rightSide.match(/\d/g).join("") + ',';
        }
        reactNativeStyles[reactNativeProp] = pureRightSide;
        const stringCSS = `${reactNativeProp}: ${pureRightSide}`;
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


// input below lines in text input
// box-sizing: border-box;

// /* Auto layout */

// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 15px 20px;
// gap: 15px;

// position: absolute;
// width: 335px;
// height: 50px;
// left: 20px;
// top: 113px;

// /* Gray/800 */

// background: #1D2939;
// /* Gray/700 */

// border: 1px solid #344054;
// border-radius: 50px;
