import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import test from 'tape'
import sinon from 'sinon'

import { contains } from 'ramda'

import { mount, render, shallow } from 'enzyme'

import jsdom from 'node-jsdom'

const DEFAULT_HTML = '<html><body></body></html>'

global.document = jsdom.jsdom(DEFAULT_HTML)
global.window = document.defaultView
global.navigator = window.navigator

import App from '../src/components/app.jsx'
import Board from '../src/components/board.jsx'
import Square from '../src/components/square.jsx'

test('App mount', (t) => {
  const wrapper = mount(<App/>)

  wrapper.find(Square).at(4).simulate('click')
  wrapper.find(Square).at(3).simulate('click')
  wrapper.find(Square).at(0).simulate('click')

  console.log(wrapper.state().games[0].moves)

  t.end()
})
