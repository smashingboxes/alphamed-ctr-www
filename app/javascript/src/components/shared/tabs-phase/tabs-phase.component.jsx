import React from 'react';
import { Tabs } from 'antd';

import './tabs-phase.styles.scss';

import TabsArm from '../tabs-arm/tabs-arm.component';

const { TabPane } = Tabs;

const initialPanes = [
  {
    title: 'Phase',
    key: '1',
    closable: false,
    disabled: true
  },
  {
    title: 'Phase I',
    key: '2',
    closable: false,
    disabled: false,
    content: <TabsArm />
  }
];

class TabsPhase extends React.Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[1].key,
    panes: initialPanes
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs type='card' activeKey={activeKey}>
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

export default TabsPhase;
