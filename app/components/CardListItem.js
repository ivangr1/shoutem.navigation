import React from 'react';
import { NavigationBaseItem } from './NavigationBaseItem';
import { FolderItemContainer } from './FolderItemContainer';
import { StyleSheet } from 'react-native';

/**
 * Do not connect to style. Style it trough List screen so dimension related style can be
 * used to calculate list dimensions.
 */
export default class CardListItem extends NavigationBaseItem {
  render() {
    const { style, styleName, showBackground } = this.props;

    const shortcutSettings = this.getShortcutLayoutSettings('cardList');
    const backgroundImageUrl = showBackground
      ? shortcutSettings.normalIconUrl
      : undefined;

    return (
      <FolderItemContainer
        onPress={this.onPress}
        style={mtstyles.card}
        styleName={styleName}
        backgroundImageUrl={backgroundImageUrl}
      >
        {this.renderText()}
      </FolderItemContainer>
    );
  }
}

const mtstyles = StyleSheet.create({
  card: {
    fontSize: 24,
    backgroundColor: 'black',
    height: 150,
    marginHorizontal: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
    padding: 0,
    flexBasis: 'auto',
    overflow: 'hidden',
  },
});
