import React, { Component } from 'react';
import cx from 'classnames';
import './Tab.css';

export default class Tab extends Component {
    render() {
        const {
            userInfo,
            tabContent
        } = this.props;

        return (
            <div
                className={cx("tab-content", { ['tab-content-active']: tabContent.isActive })}
                title={tabContent.label}
            >
                {tabContent.label}
                <span className="count">{userInfo[tabContent.value] || 0}</span>
            </div>
        )
    }
}
