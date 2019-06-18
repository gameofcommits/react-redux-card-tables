import React from 'react';

import {
  Add, Delete, Create, ArrowBack,
} from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { withStyles, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import RegularCard from './RegularCard';
import Button from './Button';
import { modalClose } from '../../redux/actions';
import DataTable from './DataTable';

import PaginationTable from './PaginationTable';
import SearchTable from './SearchTable';
import tableStyle from '../assets/tableStyle';
import GridItem from './GridItem';

const mapStateToProps = state => ({
  searchParams: state.search.searchParams,
  permissions: state.auth.permissions,
});

const mapDispatchToProps = dispatch => bindActionCreators({ modalClose }, dispatch);

class CardTableClass extends React.Component {
  render() {
    const { modalName, grid = { md: 12 } } = this.props;
    if (modalName || grid === false) return this.renderRegularCard();
    return <GridItem {...grid}>{this.renderRegularCard()}</GridItem>;
  }

  renderRegularCard() {
    const {
      list,
      search,
      entity,
      links,
      classes,
      match,
      url,
      tableHeaderColor = '#f00',
      count,
      actionList,
      extraParams,
      page,
      footer,
      modalName,
      modalClose,
      searchParams,
      getButton,
      isSmartCard,
      fields,
      excludeId,
      permissions,
      rowColor,
      cardTitle,
      expansion,
      history,
    } = this.props;

    const actions = this.getActions();
    return (
      <RegularCard
        expansion={expansion}
        getButton={
          modalName && searchParams && Object.keys(searchParams).length > 0 ? getButton : null
        }
        modalName={modalName}
        modalClose={modalClose}
        cardTitle={cardTitle || `Lista de ${entity}`}
        cardHeaderAction={
          links && (
            <GridItem md={12}>
              {links.map((link, idl) => (
                <Tooltip
                  title={
                    <span
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {link.title ? link.title : `Adicionar ${entity}`}
                    </span>
                  }
                  key={idl}
                >
                  <Button
                    onClick={
                      link.onClick ? link.onClick : () => history.push(`${match.url || url}/novo`)
                    }
                    size="sm"
                    color={link.color || 'white'}
                    simple
                  >
                    {link.icon && (
                      <link.icon
                        className={classes.iconSmall}
                        style={{ marginRight: 5, marginBottom: 2 }}
                      />
                    )}
                    {!link.icon && <Add className={classes.iconSmall} />}
                    {link.label && link.label}
                  </Button>
                </Tooltip>
              ))}
            </GridItem>
          )
        }
        content={[
          typeof search === 'undefined' && (
            <SearchTable
              actionList={actionList}
              entity={entity}
              extraParams={extraParams}
              key="0"
            />
          ),
          typeof search === 'object' && search,
          <DataTable
            key="1"
            {...{
              rowColor,
              excludeId,
              list,
              entity,
              count,
              classes,
              tableHeaderColor,
              actions,
              isSmartCard,
              fields,
              permissions,
            }}
          />,
          <PaginationTable
            actionList={actionList}
            entity={entity}
            count={count}
            page={page}
            key="2"
            extraParams={extraParams}
          />,
        ]}
        footer={[
          footer && (
            <Button
              key="0"
              title="Retornar a tela anterior"
              size="sm"
              color="white"
              onClick={() => (modalName ? modalClose(modalName) : history.goBack())}
            >
              <ArrowBack /> Voltar
            </Button>
          ),
        ]}
      />
    );
  }

  componentDidMount() {
    const {
      searchOnMount = true, actionList, searchParams, entity, extraParams,
    } = this.props;

    if (actionList && searchOnMount) {
      let myParams = { ...searchParams[entity], ...extraParams };
      if (!myParams) {
        myParams = {};
      }
      actionList({ offset: 0, ...myParams });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { list: nextList } = nextProps;
    const { list } = this.props;

    return (list === null && nextList) || JSON.stringify(list) !== JSON.stringify(nextList);
  }

  componentWillUnmount() {
    this.props.actionClear && this.props.actionClear();
  }

  getActions() {
    let { actions, extraActions, isSmartCard } = this.props;

    if (isSmartCard) return actions;
    if (actions === false) {
      actions = null;
    } else if (actions === undefined) {
      actions = this.defaultActions();
    }
    if (extraActions) {
      actions = extraActions.concat(actions);
    }

    return actions;
  }

  defaultActions() {
    const actions = [
      {
        color: 'primary',
        title: 'Editar registro',
        icon: Create,
        permission: `${this.props.permissionPrefix}_EDITAR`,
        click: item => history.push(`${this.props.location.pathname}/${item.id}`),
      },
    ];

    if (this.props.actionDelete) {
      actions.push({
        color: 'danger',
        title: 'Excluir registro',
        icon: Delete,
        permission: `${this.props.permissionPrefix}_EXCLUIR`,
        confirm: true,
        click: this.props.actionDelete,
      });
    }

    return actions;
  }
}

export const CardTable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(tableStyle)(CardTableClass));
