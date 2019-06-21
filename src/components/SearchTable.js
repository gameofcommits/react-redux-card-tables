import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Search } from '@material-ui/icons';
import CustomInput from './CustomInput';
// import { searchUpdated } from '../../redux/actions';
import GridContainer from './GridContainer';
import tableStyle from '../assets/tableStyle';
import GridItem from './GridItem';
import Button from './Button';

const mapStateToProps = state => ({
  searchParams: state.search.searchParams,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    /* searchUpdated */
  },
  dispatch,
);

class SearchTable extends React.Component {
  render() {
    const {
      actionList, entity, searchParams, searchUpdated, classes, extraParams,
    } = this.props;
    const myParams = searchParams[entity] ? { ...searchParams[entity], ...extraParams } : {};

    return (
      <GridContainer key="1" justify="center">
        <GridItem md={12}>
          <CustomInput
            label={`Localizar ${entity}`}
            id={`localizar-${entity}`}
            value={myParams.term ? myParams.term : ''}
            onChange={(event) => {
              searchUpdated(
                {
                  ...myParams,
                  term: event.target.value,
                },
                entity,
              );
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                actionList({
                  ...myParams,
                  offset: 0,
                });
              }
            }}
          />
        </GridItem>
        <GridItem md={12} center>
          <Button
            onClick={() => {
              const myParams = { ...searchParams[entity], ...extraParams };
              actionList({
                ...myParams,
                offset: 0,
              });
            }}
            color="primary"
          >
            <Search className={classNames(classes.leftIcon, classes.iconSmall)} /> Localizar
          </Button>
        </GridItem>
      </GridContainer>
    );
  }

  shouldComponentUpdate(nextProps) {
    const { entity, searchParams: nextSearchParams } = nextProps;
    const { searchParams } = this.props;

    return JSON.stringify(nextSearchParams[entity]) !== JSON.stringify(searchParams[entity]);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(tableStyle)(SearchTable));
