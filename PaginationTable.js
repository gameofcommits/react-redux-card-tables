import React from 'react'

import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import GridContainer from '../Grid/GridContainer'
import Pagination from '../Pagination/Pagination'
import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle'
import { bindActionCreators } from 'redux'
import { searchUpdated } from '../../redux/actions'

const mapStateToProps = state => ({
  searchParams: state.search.searchParams,
})

const mapDispatchToProps = dispatch => bindActionCreators({ searchUpdated }, dispatch)

class PaginationTable extends React.Component {
  render() {
    let { actionList, entity, searchParams, count, page, classes, extraParams, searchUpdated } = this.props
    let pageNumber = Array.from({ length: Math.ceil(count / 20) }, (v, i) => i + 1)
    const myParams = searchParams[entity] ? searchParams[entity] : {}

    if (!pageNumber || count <= 20) return null
    const pages = []
    if (page !== 0) {
      pages.push({
        text: 'ANTERIOR',
        onClick:
          page === 0
            ? null
            : () => {
              actionList({ ...myParams, ...extraParams, offset: (page - 1) * 20 })
              searchUpdated({ ...myParams, ...extraParams, offset: (page - 1) * 20 }, entity)
            },
        disabled: page === 0 ? true : false,
      })
    }

    pageNumber.map((pageNumber, idPage) => {
      if (idPage > page - 5 && idPage < page + 5) {
        pages.push({
          text: pageNumber,
          onClick:
            (page || 0) === idPage
              ? null
              : () => {
                actionList({ ...myParams, ...extraParams, offset: idPage * 20 })
                searchUpdated({ ...myParams, ...extraParams, offset: idPage * 20 }, entity)
              },
          active: (page || 0) === idPage,
        })
      }
      return pageNumber
    })

    if ((page + 1) * 20 < count) {
      pages.push({
        text: 'PRÓXIMO',
        onClick:
          (page + 1) * 20 >= count
            ? null
            : () => {
              actionList({ ...myParams, ...extraParams, offset: (page + 1) * 20 })
              searchUpdated({ ...myParams, ...extraParams, offset: (page + 1) * 20 }, entity)
            },
        disabled: (page + 1) * 20 >= count,
      })
    }

    return (
      pages &&
      pages.length > 0 && (
        <GridContainer justify="center" className={classes.marginPagination} key="3">
          <Pagination pages={pages} />
        </GridContainer>
      )
    )
  }

  shouldComponentUpdate(nextProps) {
    const { count: nextCount, page: nextPage } = nextProps
    const { count, page } = this.props

    return count !== nextCount || page !== nextPage
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(tableStyle)(PaginationTable))
