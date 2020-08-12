// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => (
  <div>Hey {props.name}! Welcome to Clinical Trials!</div>
)

Hello.defaultProps = {
  name: 'John Smith'
}

Hello.propTypes = {
  name: PropTypes.string
}

// const pos = document.createElement('div')

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  <Hello />
);

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Hello />,
//     pos.setAttribute("class", "welcome-text"),
//     document.getElementById("results_main").appendChild(pos),
//   )
// })
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(element, document.getElementById('results-welcome-text'));
})