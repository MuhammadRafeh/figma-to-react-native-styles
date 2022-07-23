import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

class App extends React.Component {
  state = {
    value: '',
    output: ''
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    const lines = this.state.value.split('\n');
    const requiredCss = lines.filter(line => line.indexOf(';') != -1);
    console.log(requiredCss)

    // var txt = "#div-name-1234-characteristic"
    var numb = this.state.value.match(/\d/g).join("");
    alert(numb)




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
      </>
    );
  }
}

export default App;