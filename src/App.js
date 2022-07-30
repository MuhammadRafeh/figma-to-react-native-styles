import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { stylesReactNative } from './constants';

const reactNativeProperties = Object.keys(stylesReactNative);

const checkAndProvideProperties = (cssProp, reactNativeProp, value) => {
  let returnList = [];
  const values = value.split(' ');
  if ((cssProp === 'padding' || cssProp === 'margin') && values.length > 1) {
    if (values.length == 2) {
      returnList.push(
        `${cssProp}Vertical: ${parseFloat(values[0]) + ','}`,
        `${cssProp}Horizontal: ${parseFloat(values[1]) + ','}`
      )
    } else if (values.length == 3) {
      returnList.push(
        `${cssProp}Top: ${parseFloat(values[0]) + ','}`,
        `${cssProp}Horizontal: ${parseFloat(values[1]) + ','}`,
        `${cssProp}Bottom: ${parseFloat(values[2]) + ','}`
      )
    } else if (values.length === 4) {
      returnList.push(
        `${cssProp}Top: ${parseFloat(values[0]) + ','}`,
        `${cssProp}Right: ${parseFloat(values[1]) + ','}`,
        `${cssProp}Bottom: ${parseFloat(values[2]) + ','}`,
        `${cssProp}Left: ${parseFloat(values[3]) + ','}`
      )
    }
  } else if (cssProp === 'border' && values.length === 3) {
    returnList.push(
      `borderWidth: ${parseFloat(values[0]) + ','}`,
      `borderStyle: '${values[1]}',`,
      `borderColor: '${values[2]}',`
    )
  } else if (cssProp === 'background') {
    if (values.length === 1) { // here we have just background color
      returnList.push(
        `backgroundColor: '${values[0]}',`
      )
    } else { // Here we have gradient in background

    }
  }

  return returnList;
}

const copyToClipBoard = async copyMe => {
  let copyString = '';
  copyMe.forEach(element => {
    if (typeof (element) === 'string') {
      copyString += element + '\n';
    }
  })
  try {
    await navigator.clipboard.writeText(copyString);
    alert('Done')
  } catch (err) {
    alert('Failed')
  }
};

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
        const returnCss = checkAndProvideProperties(property, reactNativeProp, rightSide)
        returnCss.forEach(lineCss => reactNativeStyles.push(lineCss, <br />))
      } else { // Exists (Here we have to check if value contain space then it means we have to split it and do accordingly
        // like padding: 20px 40px its mean we'll converet this in paddingVertical: 20 and padding Horizontal: 40)
        let pureRightSide = `'${rightSide}'` + ',';
        if (/\d/.test(rightSide) && (stylesReactNative[reactNativeProp] === 1 || stylesReactNative[reactNativeProp] === 3)) {
          pureRightSide = parseFloat(rightSide) + ',';
          if (rightSide.split(' ').length > 1) {
            const returnCss = checkAndProvideProperties(property, reactNativeProp, rightSide);
            returnCss.forEach(lineCss => reactNativeStyles.push(lineCss, <br />))
            return;
          }
        } else if (stylesReactNative[reactNativeProp] === 1 && !(/\d/.test(rightSide))) { // the value should be mnbr and the property value does not have number
          return;
        }
        reactNativeStyles[reactNativeProp] = pureRightSide;
        const stringCSS = `${reactNativeProp}: ${pureRightSide}`;
        reactNativeStyles.push(stringCSS, <br />);
      }

    })
    reactNativeStyles.push('}')

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
{/*checking if the user has entered something or not, if yes then print the result else print nothing*/ }
        {
        this.state.value!==''?(
          <div>{
          this.state.output.length > 1 && (
            <button onClick={() => copyToClipBoard(this.state.output)}>
              Copy Text to clipboard
            </button>
          )
        }
        <p style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          {
            this.state.output.map(item => item)
          }
        </p></div>): null}
      </>
    );
  }
}

export default App;
