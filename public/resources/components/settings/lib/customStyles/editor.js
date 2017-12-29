import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/css'
import 'brace/theme/github'
export default class StyleEditor extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    editorLabel: PropTypes.string,
    activeIndex: PropTypes.number,
    aceId: PropTypes.string,
    value: PropTypes.string,
    updater: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (value) {
    this.props.updater(this.props.name, value)
  }
  render () {
    let controlClass = classNames({
      'vcv-ui-style-editor': true,
      'vcv-ui-state--active': (this.props.index === this.props.activeIndex)
    })
    return (
      <div className={controlClass}>
        <div className='vcv-ui-style-ace-container'>
          <AceEditor
            width='100%'
            height='50vh'
            mode='css'
            theme='github'
            tabSize={2}
            name={this.props.aceId}
            editorProps={{$blockScrolling: true}}
            showPrintMargin={false}
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
        <p className='vcv-ui-form-helper'>{this.props.editorLabel}</p>
      </div>
    )
  }
}
