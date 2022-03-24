import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectStyle } from '@shoutem/theme';
import { CARD_LIST } from '../const';
import { isTabBarNavigation } from '../redux';
import CardListItem from './CardListItem';
import FolderBase from './FolderBase';
import { View, Text } from 'react-native';
import { emptyCart } from '../../../shoutem.products/app/actions/actions';

const HEIGHT_RATIO_STYLE_KEY = 'heights';

class CardList extends FolderBase {
  // itemText value when there is no text
  static NO_TEXT = 'noText';

  static propTypes = {
    ...FolderBase.propTypes,
    // Text position; Also defines if there shouldn't be text.
    itemText: PropTypes.string,
    // Gutter size key
    itemGutter: PropTypes.string,
    // Used to calculate item height
    cardHeight: PropTypes.string,
    // Is item full screen width
    isFullWidth: PropTypes.bool,
    textSize: PropTypes.string,
  };

  resolvePageProps() {
    const { style } = this.props;
    const { itemGutter, isFullWidth } = this.getScreenSettings();
    const {
      dimensions: { height },
    } = this.state;
    const styleName = `${itemGutter}-gutter ${isFullWidth ? 'full-width' : ''}`;

    return {
      style: {
        minHeight: height,
        ...style.page,
      },
      styleName,
    };
  }

  activeCategory = text => {
    this.setState({
      activeCategory: text.id,
    });
    const { dispatch } = this.props;
    dispatch(emptyCart());
  };

  renderRow(shortcut, index) {
    const {
      itemText,
      backgroundImagesEnabled,
      cardHeight,
      itemGutter,
      textSize,
    } = this.getScreenSettings();
    const { style } = this.props;
    const styleName = `${itemText} ${itemGutter}-gutter`;
    const {
      dimensions: { width },
    } = this.state;
    const cardItemStyle = {
      item: {
        marginHorizontal: 20,
        marginVertical: 0,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
        backgroundSize: 'cover',
        overflow: 'hidden',
      },
      text: {
        fontSize: 24,
        color: 'white',
        fontWeight: '500',
      },
    };

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: 30,
          paddingBottom: 0,
          overflow: 'hidden',
          borderRadius: 4,
          paddingHorizontal: 20,
        }}
      >
        <CardListItem
          key={`item_${index}`}
          showText={itemText !== CardList.NO_TEXT}
          shortcut={shortcut}
          onPress={itemText => {
            this.itemPressed(itemText);
            this.activeCategory(itemText);
          }}
          style={cardItemStyle}
          styleName={styleName}
          showBackground={backgroundImagesEnabled}
        />
        {index == 1 && <View style={{ height: 50 }}></View>}
      </View>
    );
  }
}

const mapPropsToStyleNames = styleNames => {
  return styleNames;
};

const mapStateToProps = state => {
  return {
    isTabBar: isTabBarNavigation(state),
  };
};

export default connect(mapStateToProps)(
  connectStyle(CARD_LIST, undefined, mapPropsToStyleNames)(CardList),
);
