import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import checkPermission from '../utils';
import RegularCard from './RegularCard';
import Button from './Button';
import { modalClose } from '../../redux/actions';

import tableStyle from '../assets/tableStyle';
import GridItem from './GridItem';

const mapStateToProps = state => ({
  permissions: state.auth.permissions,
});

const mapDispatchToProps = dispatch => bindActionCreators({ modalClose }, dispatch);

class TableClass extends React.Component {
  render() {
    const {
      list,
      entity,
      classes,
      tableHeaderColor = '#f00',
      modalName,
      modalClose,
      fields,
      permissions,
      history,
    } = this.props;

    return (
      <GridItem md={12}>
        <RegularCard
          cardTitle={`Lista de ${entity}`}
          content={[
            list && list.length === 0 && `Não há ${entity} a ser exibido`,
            list != null && list.length > 0 && (
              <div className={classes.tableResponsive} key="0">
                <span style={{ textAlign: 'right', display: 'block' }}>
                  {list.length} registro(s) encontrado(s)
                </span>
                <Table className={classes.table}>
                  <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
                    <TableRow>
                      {fields.map((field, idx) => (
                        <TableCell
                          className={`${classes.tableCell} ${classes.tableHeadCell}`}
                          key={idx}
                        >
                          {field.title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map((item, idx) => (
                      <TableRow key={idx}>
                        {fields.map((field, idy) => (
                          <TableCell className={classes.tableCell} key={idy}>
                            {field.href && checkPermission(permissions, field.permission) && (
                              <Tooltip title={field.tooltip || ''}>
                                <a href={field.href(item)}>{field.value(item)}</a>
                              </Tooltip>
                            )}
                            {field.click && (
                              <Tooltip title={field.tooltip || ''}>
                                <a onClick={() => field.click(item)} style={{ cursor: 'pointer' }}>
                                  {field.value(item)}
                                </a>
                              </Tooltip>
                            )}
                            {!checkPermission(permissions, field.permission)
                              && !field.click
                              && field.value(item)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ),
          ]}
          footer={[
            <Button
              key="0"
              title="Retornar a tela anterior"
              size="sm"
              color="white"
              onClick={() => (modalName ? modalClose(modalName) : history.goBack())}
            >
              <ArrowBack /> Voltar
            </Button>,
          ]}
        />
      </GridItem>
    );
  }
}

const TableSimple = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(tableStyle)(TableClass));

export default TableSimple;
