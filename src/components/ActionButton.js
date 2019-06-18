import React from 'react';

import { Tooltip } from '@material-ui/core';
import IconButtonCustom from './IconButtonCustom';
import checkPermission from '../utils';

import ButtonConfirm from './ButtonConfirm';

function ActionButton({ item, action, permissions }) {
  if (
    !checkPermission(permissions, action.permission)
    || (action.condition && typeof action.condition === 'function' && !action.condition(item))
  ) {
    return null;
  }

  if (action.confirm === true) {
    return <ButtonConfirm action={action} item={item} />;
  }

  if (action.href) {
    return (
      <Tooltip
        title={
          <span
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {action.title && typeof action.title === 'function'
              ? action.title(item)
              : action.title || ''}
          </span>
        }
      >
        <IconButtonCustom color={action.color} href={action.href(item)}>
          {action.icon && <action.icon />}
        </IconButtonCustom>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={
        <span
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            textTransform: 'uppercase',
          }}
        >
          {action.title && typeof action.title === 'function'
            ? action.title(item)
            : action.title || ''}
        </span>
      }
    >
      <IconButtonCustom color={action.color} onClick={() => action.click(item)}>
        {action.icon && <action.icon />}
      </IconButtonCustom>
    </Tooltip>
  );
}

export default ActionButton;
