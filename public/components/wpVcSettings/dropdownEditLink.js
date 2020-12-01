import { getService } from 'vc-cake'
const dataManager = getService('dataManager')
const localizations = dataManager.get('localizations')
const editLinkText = localizations && localizations.editThemeTemplate ? localizations.editThemeTemplate : '<a href="{editLink}" target="_blank">Edit</a> this {linkTitle} or <a href="{createLink}" target="_blank">create</a> a new one.'
const createLinkText = localizations && localizations.editThemeTemplate ? localizations.createThemeTemplate : '<a href="{createLink}" target="_blank">Create</a> a new {linkTitle}.'

const changeEditLink = (item) => {
  const selectedPageUrl = item.querySelector('option:checked').getAttribute('data-url')
  const linkTitle = item.closest('.vcv-ui-form-group').getAttribute('data-title')
  const actionsContainer = item.closest('.vcv-ui-form-group').closest('td').querySelector('.vcv-custom-page-templates-edit-link')
  actionsContainer.innerHTML = null

  if (item.value) {
    actionsContainer.insertAdjacentHTML('beforeend', editLinkText.replace('{editLink}', selectedPageUrl).replace('{linkTitle}', linkTitle).replace('{createLink}', 'post-new.php?post_type=vcv_headers&vcv-action=frontend&vcv-editor-type=vcv_headers'))
    actionsContainer.closest('tr').classList.add('vcv-field-expand')
  } else {
    actionsContainer.insertAdjacentHTML('beforeend', createLinkText.replace('{createLink}', selectedPageUrl).replace('{linkTitle}', linkTitle))
    actionsContainer.closest('tr').classList.add('vcv-field-expand')
  }
}

export const dropdownEditLink = () => {
  const templateDropdowns = document.querySelectorAll('select.vcv-edit-link-selector')
  const actionsContainer = '<div class="vcv-custom-page-templates-edit-link"></div>'

  for (let i = 0, len = templateDropdowns.length; i < len; i++) {
    const item = templateDropdowns[i]
    const dropdownContainer = item.closest('.vcv-ui-form-group').closest('td')
    dropdownContainer.insertAdjacentHTML('beforeend', actionsContainer)
    changeEditLink(item)

    item.addEventListener('change', function (item) {
      changeEditLink(item.target)
    }, false)
  }
}
