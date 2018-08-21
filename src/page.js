import React from 'react'
import words from '../words.json'
import expressions from '../expressions.json'

const MODES = {
  words,
  expressions
}

export default class Page extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'words',
      word: '',
      translate: '',
      rightTranslate: ''
    }
  }
  

  componentDidMount(){
    this.getWord()
  }

  getWord () {
    const source = MODES[this.state.mode]

    const randomWord = Math.floor(Math.random() * source.length)
    const randomLanguage = Math.floor(Math.random() * 2)
    this.setState({
      word: source[randomWord][randomLanguage],
      rightTranslate: source[randomWord][ randomLanguage === 0 ? 1 : 0 ]
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

      this.setState({ translate: '' })
      this.getWord()
    }
  }
  
  changeMode(mode) {
    this.setState({ mode, translate: '' }, () => this.getWord())
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
            className='p-4 m-4'
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              height: '30px',
              borderRadius: '10px'
          }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className='btn btn-primary m-1' disabled={this.state.mode === 'words'} onClick={() => this.changeMode('words')}>words</button>
        <button className='btn btn-primary m-1' disabled={this.state.mode === 'expressions'} onClick={() => this.changeMode('expressions')}>expressions</button>
        </div>
      </div>
    )
  }
}