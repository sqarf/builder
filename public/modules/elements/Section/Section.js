var React = require('react');
var Section = React.createClass({
    render: function() {
        return (<section className="vc-v-section" key={this.props.key}>{this.props.content}</section>);
    }
});
module.exports = Section;