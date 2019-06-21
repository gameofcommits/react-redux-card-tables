import React from 'react';

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import checkPermission from '../utils';

import tableStyle from '../assets/tableStyle';

const TableComponent = ({
  list,
  entity,
  count,
  classes,
  tableHeaderColor,
  actions,
  fields,
  permissions,
  excludeId,
  rowColor,
}) => {
  if (!list) return null;
  const calcWidthButton = (length) => {
    if (length === 2) return 80;
    if (length === 3) return 120;
    if (length === 4) return 160;
    if (length === 5) return 200;
    return 0;
  };

  if (excludeId) list = list.filter(i => i.id !== excludeId);
  if (list.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>{`Não há ${entity} a ser exibido`}</div>
    );
  }

  return (
    <div className={classes.tableResponsive}>
      <span style={{ textAlign: 'right', display: 'block' }}>
        {count} registro(s) encontrado(s)
      </span>
      <Table className={classes.table}>
        <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
          <TableRow>
            {fields.map((field, idx) => (
              <TableCell
                className={`${classes.tableCell} ${classes.tableHeadCell}${
                  field.alignCenter ? ` ${classes.tableCellCenter}` : ''
                }`}
                key={idx}
              >
                {field.title}
              </TableCell>
            ))}
            {actions != null && (
              <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                &nbsp;
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => (
            <TableRow key={idx} style={{ backgroundColor: rowColor && rowColor(item) }}>
              {fields.map((field, idy) => (
                <TableCell
                  className={
                    classes.tableCell + (field.alignCenter ? ` ${classes.tableCellCenter}` : '')
                  }
                  key={idy}
                >
                  {field.click
                    && !field.tooltip
                    && console.log(
                      'Ao definir um evento de click, é necessário definir um tooltip para a exibição do link',
                    ) // eslint-disable-line
                  }
                  {(((field.permission && checkPermission(permissions, field.permission))
                    || !field.permission)
                    && field.tooltip && (
                      <Tooltip
                        classes={{ tooltip: classes.arrowPopper }}
                        title={
                          <span className={classes.fontTooltip}>
                            {field.tooltip && typeof field.tooltip === 'function'
                              ? field.tooltip(item)
                              : field.tooltip}
                          </span>
                        }
                      >
                        {(field.click && (
                          <span
                            onClick={() => field.click(item)}
                            style={{ cursor: 'pointer', color: '#64a9a4' }}
                          >
                            {field.value(item) || 'NÃO INFORMADO'}
                          </span>
                        )) || <span>{field.value(item) || 'NÃO INFORMADO'}</span>}
                      </Tooltip>
                  ))
                    || field.value(item)
                    || 'NÃO INFORMADO'}
                </TableCell>
              ))}
              {actions != null && (
                <TableCell
                  className={classes.tableCell}
                  numeric
                  style={{ minWidth: calcWidthButton(actions.length), paddingRight: 8 }}
                >
                  {actions.map((action, idz) => (
                    <ActionButton key={idz} {...{ action, permissions, item }} />
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

TableComponent.defaultProps = {
  tableHeaderColor: '#f00',
};

TableComponent.propTypes = {
  list: PropTypes.array.isRequired,
  entity: PropTypes.object,
  count: PropTypes.number,
  classes: PropTypes.object,
  tableHeaderColor: PropTypes.string,
  actions: PropTypes.array,
  fields: PropTypes.array.isRequired,
  permissions: PropTypes.array,
  excludeId: PropTypes.string,
  rowColor: PropTypes.string,
};

export default withStyles(tableStyle)(TableComponent);
