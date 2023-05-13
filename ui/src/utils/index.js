import React from 'react'
import { toast } from 'react-toastify'

const toastifyTransaction = (_data, _cb) => {
  toast.success(
    <div>
      <a href={`https://gnosisscan.io//tx/${_data.hash}`} target="_blank" rel="noreferrer">
        Transaction
      </a>{' '}
      <span>broadcasted!</span>
    </div>
  )

  _data.wait(1).then(() => {
    toast.success(
      <div>
        <a href={`https://gnosisscan.io//tx/${_data.hash}`} target="_blank" rel="noreferrer">
          Transaction
        </a>{' '}
        <span>confirmed!</span>
      </div>
    )
    _cb?.()
  })
}

export { toastifyTransaction }
