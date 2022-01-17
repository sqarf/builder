import { notificationRemoved } from 'public/editor/stores/notifications/slice'
import React, { useEffect, useState } from 'react'
import store from 'public/editor/stores/store'
import { getService } from 'vc-cake'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

const NotificationItem = (props) => {
  const dataManager = getService('dataManager')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    return () => {
      store.dispatch(notificationRemoved(props.data.id))
    }
  }, [])

  const handleRemoveNotification = () => {
    store.dispatch(notificationRemoved(props.data.id))
  }

  const handleClickHideNotification = (e) => {
    setHidden(true)
    const element = ReactDOM.findDOMNode(e.target)
    element.addEventListener('transitionend', handleRemoveNotification)
  }

  const localizations = dataManager.get('localizations')

  if (!props.data.text) return null
  let textHtml
  let closeButton = ''
  const customProps = {}

  if (props.data.html) {
    textHtml = <div className='vcv-layout-notifications-text' dangerouslySetInnerHTML={{ __html: props.data.text }} />
  } else {
    textHtml = <div className='vcv-layout-notifications-text'>{props.data.text}</div>
  }

  if (props.data.showCloseButton) {
    const closeTitle = localizations ? localizations.close : 'Close'
    closeButton = (
      <div className='vcv-layout-notifications-close' title={closeTitle} onClick={handleClickHideNotification}>
        <i className='vcv-ui-icon vcv-ui-icon-close-thin' />
      </div>
    )
  } else {
    customProps.onClick = handleClickHideNotification
  }

  const type = props.data.type && ['default', 'success', 'warning', 'error'].indexOf(props.data.type) >= 0
    ? props.data.type
    : 'default'

  const classes = classNames({
    'vcv-layout-notifications-item': true,
    [`vcv-layout-notifications-type--${type}`]: true,
    'vcv-layout-notifications-type--disabled': hidden
  })

  return (
    <div className={classes} {...customProps}>
      {textHtml}
      {closeButton}
    </div>
  )
}

export default NotificationItem
