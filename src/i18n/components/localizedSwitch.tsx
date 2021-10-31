import React from 'react';
import { Switch, RouteProps } from 'react-router';
import { useIntl } from 'react-intl';

export const LocalizedSwitch: React.FC = ({ children }) => {

	// Inject params and formatMessage
	const { formatMessage, locale } = useIntl();

	/**
   *
   * @param path can be string, undefined or string array
   * @returns Localized string path or path array
   */
  const localizeRoutePath = (path?: string | string[]) => {
    switch (typeof path) {
      case 'undefined':
        return undefined;
      case 'object':
        return path.map((key) => `/${locale}` + formatMessage({ id: key }));
      default:
        const isFallbackRoute = path === '*';
        return isFallbackRoute
          ? path
          : `/${locale}` + formatMessage({ id: path });
    }
  }

  /**
   * Apply localization to all routes
   * Also checks if all children elements are <Route /> components
   */
  return (
    <Switch>
      {React.Children.map(children, (child) =>
        React.isValidElement<RouteProps>(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path),
            })
          : child
      )}
    </Switch>
  );
}