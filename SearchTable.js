import React from 'react'
import GridItem from '../Grid/GridItem'
import classNames from 'classnames'
import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle'
import GridContainer from '../Grid/GridContainer'
import { CustomInput, Button } from '..'
import { bindActionCreators } from 'redux'
import { searchUpdated } from '../../redux/actions'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { Search } from '@material-ui/icons'

const mapStateToProps = state => ({
  searchParams: state.search.searchParams,
})

const mapDispatchToProps = dispatch => bindActionCreators({ searchUpdated }, dispatch)

class SearchTable extends React.Component {
  render() {
    let { actionList, entity, searchParams, searchUpdated, classes, extraParams } = this.props
    const myParams = searchParams[entity] ? { ...searchParams[entity], ...extraParams } : {}

    return (
      <GridContainer key="1" justify="center">
        <GridItem md={12}>
          <CustomInput
            label={`Localizar ${entity}`}
            id={`localizar-${entity}`}
            value={myParams.term ? myParams.term : ''}
            onChange={event => {
              searchUpdated(
                {
                  ...myParams,
                  term: event.target.value,
                },
                entity
              )
            }}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                actionList({
                  ...myParams,
                  offset: 0,
                })
              }
            }}
          />
        </GridItem>
        <GridItem md={12} center>
          <Button
            onClick={() => {
              let myParams = { ...searchParams[entity], ...extraParams }
              actionList({
                ...myParams,
                offset: 0,
              })
            }}
            color="primary"
          >
            <Search className={classNames(classes.leftIcon, classes.iconSmall)} /> Localizar
          </Button>
        </GridItem>
      </GridContainer>
    )
  }

  shouldComponentUpdate(nextProps) {
    const { entity, searchParams: nextSearchParams } = nextProps
    const { searchParams } = this.props

    return JSON.stringify(nextSearchParams[entity]) !== JSON.stringify(searchParams[entity])
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(tableStyle)(SearchTable))
