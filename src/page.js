import React from 'react'
import words from '../words.json'

export default class Page extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      word: '',
      translate: '',
      rightTranslate: ''
    }
  }

  componentDidMount(){
    this.getWord()
  }

  getWord () {
    const randomWord = Math.floor(Math.random() * words.length)
    const randomLanguage = Math.floor(Math.random() * 2)
    this.setState({
      word: words[randomWord][randomLanguage],
      rightTranslate: words[randomWord][ randomLanguage === 0 ? 1 : 0 ]
    })
  }

  changeValue(value){
    const isCorrectValue = value === this.state.rightTranslate

    if (isCorrectValue){
      this.getWord()
    }

    this.setState({
      translate: isCorrectValue ? '' : value
    })
  }
  
  keyHandler(key) {
    if (key === 'Enter') {
      alert(this.state.rightTranslate)
      this.getWord()
    }
  }
  
  render (){
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Exercises for you upgrade your english skills</h1>
        <label style={{
          textAlign: 'center',
          color: 'green',
          marginTop: '50px',
          fontSize: '6rem',
          display: 'block'
        }}>
          {this.state.word}
        </label>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type='text'
            value={this.state.translate}
            onChange={e => this.changeValue(e.target.value)}
            onKeyUp={e => this.keyHandler(e.key)}
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              height: '30px',
              marginTop: '2rem',
              borderRadius: '10px',
              padding: '8px'
          }}/>
        </div>
      </div>
    )
  }
}