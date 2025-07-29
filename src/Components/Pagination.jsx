import PropTypes from 'prop-types'

import '../Styles/components/pagination.css'

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className='pagination'>
      <button
        className='btn btn-pagination'
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >Previous</button>

      <span>Page {page} of {totalPages}</span>

      <button
        className='btn btn-pagination'
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >Next</button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination 