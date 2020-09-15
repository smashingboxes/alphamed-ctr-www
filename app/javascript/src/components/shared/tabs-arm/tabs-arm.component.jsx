import React from 'react';
import { Tabs } from 'antd';

import './tabs-arm.styles.scss';

const { TabPane } = Tabs;

const initialPanes = [
  {
    title: 'Arm',
    key: '1',
    closable: false,
    disabled: true
  },
  { title: 'Phase I', key: '2', closable: true, disabled: false },
  { title: 'Phase II', key: '3', closable: true, disabled: false }
];

class TabsArm extends React.Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[1].key,
    panes: initialPanes
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      key: activeKey
    });
    this.setState({
      panes: newPanes,
      activeKey
    });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey
    });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        type='editable-card'
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {panes.map((pane) => (
          <TabPane
            tab={pane.title}
            key={pane.key}
            disabled={pane.disabled}
            closable={pane.closable}
          >
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default TabsArm;
