import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connectStyle } from '@shoutem/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderBackButton } from '../components';
import { getRouteParams, createChildNavigators } from '../services';
import { ext } from '../const';
import { useSelector, useDispatch } from 'react-redux';
import { refreshNav } from '../redux/actions';

const TabBarStack = createBottomTabNavigator();
let showTabs = true;

function screenOptions(props) {
  const { isFirstScreen } = getRouteParams(props);

  const dispatch = useDispatch();

  /*

props.route.name.substr(0, 16) == 'shoutem.sub-navigation.CardList' ||
    props.route.name == 'shoutem.auth.MyProfileScreen'
  */

  if (props.route.name.substr(0, 16) == 'shoutem.products') {
    showTabs = false;
  } else {
    showTabs = true;
  }

  return {
    headerLeft: props => {
      if (isFirstScreen) {
        return null;
      }

      return <HeaderBackButton {...props} />;
    },
    headerTitleAlign: 'center',
  };
}

function Navigator({
  parentShortcut,
  hiddenShortcuts,
  decoratedScreens,
  style,
}) {
  const TabComponents = createChildNavigators(
    parentShortcut,
    TabBarStack,
    screenOptions,
    false,
    hiddenShortcuts,
    decoratedScreens,
  );

  const nav = useSelector(state => state);

  const [tabsStyle, setTabsStyle] = useState({});

  useEffect(() => {
    let temp = showTabs ? style.container : { display: 'none' };
    setTabsStyle(temp);
  }, [nav]);

  return (
    <TabBarStack.Navigator
      tabBarOptions={{
        activeTintColor: style.activeTintColor,
        inactiveTintColor: style.inactiveTintColor,
        activeBackgroundColor: style.activeBackgroundColor,
        inactiveBackgroundColor: style.inactiveBackgroundColor,
        style: tabsStyle,
      }}
    >
      {_.slice(TabComponents, 0, 5)}
    </TabBarStack.Navigator>
  );
}

Navigator.propTypes = {
  parentShortcut: PropTypes.object,
  hiddenShortcuts: PropTypes.array,
  decoratedScreens: PropTypes.object,
  style: PropTypes.object,
};

export const TabBarNavigator = connectStyle(ext('TabBar'))(Navigator);
