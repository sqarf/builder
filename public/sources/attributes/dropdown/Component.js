import React from 'react';
import Attribute from '../attribute';

export default class Component extends Attribute {
  componentWillMount() {
    let optionElements = [];
    let {values} = this.props.options;
    let {fieldKey} = this.props;

    for (let key in values) {
      let value = values[key].value;
      let label = values[key].label;
      optionElements.push(<option key={fieldKey+':'+key+':'+value} value={value}>{label}</option>);
    }

    this.selectChilds = optionElements;
  }

  render() {
    let {fieldKey} = this.props;
    let {value} = this.state;
    return (
      <select
        value={value}
        onChange={this.handleChange}
        className="vc_ui-form-dropdown"
      >
        {this.selectChilds}
      </select>
    );
  }
}
