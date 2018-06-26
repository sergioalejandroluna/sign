import React from 'react'
import DocTable from './containers/DocTable'
const SearchResults = (props) => {
  let search = props.location.search.split('?q=').pop()

  return (
    <div>
      <DocTable fetch='all' q={search} rowsPerPage={10}/>
    </div>
  )
}
export default SearchResults
