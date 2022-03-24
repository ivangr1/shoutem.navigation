import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { resolveIconSource } from 'shoutem.theme/helpers/resolveIconSource';
import { TouchableOpacity, ImageBackground } from '@shoutem/ui';

/**
 * Used to set Folder item background.
 * Wraps Folder children with Image if Folder item has background.
 */
export function FolderItemContainer(props) {
  const { children, backgroundImageUrl, style } = props;
  const touchableOpacityProps = _.omit(props, [
    'children',
    'backgroundImageUrl',
  ]);
  delete touchableOpacityProps.style.backgroundImage;

  const backgroundImageComponent = backgroundImageUrl && (
    <ImageBackground
      styleName="fill-parent" // style.backgroundImage,
      style={[{ width: '100%', flex: 1 }]}
      source={resolveIconSource(backgroundImageUrl)}
    />
  );

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={{
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {backgroundImageComponent}
      {children}
    </TouchableOpacity>
  );
}

FolderItemContainer.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  onPress: PropTypes.func,
  styleName: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  shortcutSettings: PropTypes.object,
};

FolderItemContainer.defaultProps = {
  shortcutSettings: {},
};
