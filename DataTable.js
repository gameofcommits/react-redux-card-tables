import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { checkPermission } from '../../utils'
import { ActionButton } from './ActionButton'
import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle.jsx'

const TableComponent = ({
  list: listData,
  entity,
  count,
  classes,
  tableHeaderColor = '#f00',
  actions,
  fields,
  permissions,
  excludeId,
  rowColor,
}) => {
  let list = listData
  if (list && excludeId) list = listData.filter(i => i.id !== excludeId)
  if (list && list.length === 0)
    return <div style={{ textAlign: 'center', marginTop: 40 }}>{`Não há ${entity} a ser exibido`}</div>
  return (
    list != null &&
    list.length > 0 && (
      <div className={classes.tableResponsive}>
        <span style={{ textAlign: 'right', display: 'block' }}>{count} registro(s) encontrado(s)</span>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow>
              {fields.map((field, idx) => (
                <TableCell
                  className={
                    classes.tableCell +
                    ' ' +
                    classes.tableHeadCell +
                    (field.alignCenter ? ' ' + classes.tableCellCenter : '')
                  }
                  key={idx}
                >
                  {field.title}
                </TableCell>
              ))}
              {actions != null && (
                <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell}>&nbsp;</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, idx) => (
              <TableRow key={idx} style={{ backgroundColor: rowColor && rowColor(item) }}>
                {fields.map((field, idy) => (
                  <TableCell
                    className={classes.tableCell + (field.alignCenter ? ' ' + classes.tableCellCenter : '')}
                    key={idy}
                  >
                    {field.click &&
                      !field.tooltip &&
                      console.log(
                        'Ao definir um evento de click, é necessário definir um tooltip para a exibição do link'
                      ) // eslint-disable-line
                    }
                    {(((field.permission && checkPermission(permissions, field.permission)) || !field.permission) &&
                      field.tooltip && (
                        <Tooltip
                          classes={{ tooltip: classes.arrowPopper }}
                          title={
                            <span className={classes.fontTooltip}>
                              {field.tooltip
                                ? typeof field.tooltip === 'function'
                                  ? field.tooltip(item) || 'NÃO INFORMADO'
                                  : field.tooltip || 'NÃO INFORMADO'
                                : ''}
                            </span>
                          }
                        >
                          {(field.click && (
                            <span onClick={() => field.click(item)} style={{ cursor: 'pointer', color: '#64a9a4' }}>
                              {field.value(item) || 'NÃO INFORMADO'}
                            </span>
                          )) || <span>{field.value(item) || 'NÃO INFORMADO'}</span>}
                        </Tooltip>
                      )) ||
                      field.value(item) ||
                      'NÃO INFORMADO'}
                  </TableCell>
                ))}
                {actions != null && (
                  <TableCell
                    className={classes.tableCell}
                    numeric
                    style={{ minWidth: calcWidthButton(actions.length), paddingRight: 8 }}
                  >
                    {actions.map((action, idz) => {
                      return <ActionButton key={idz} {...{ action, permissions, item }} />
                    })}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  )
}
const calcWidthButton = length => {
  if (length === 2) return 80
  if (length === 3) return 120
  if (length === 4) return 160
  if (length === 5) return 200
  return 0
}
export const DataTable = withStyles(tableStyle)(TableComponent)
