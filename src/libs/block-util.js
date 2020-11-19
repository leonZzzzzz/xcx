import EulerCookie from '@lemon/euler-app-h5/src/libs/euler-cookie'

export const BLOCK_MEMBER_INFO = 'BLOCK-MEMBER-INFO'

export const INIT_BLOCK_MEMBER_INFO = 'INIT-BLOCK-MEMBER-INFO'

export const setBlockMemberInfo = (blockMemberInfo) => {
  EulerCookie.set(BLOCK_MEMBER_INFO, blockMemberInfo)
}

export const getBlockMemberInfo = () => {
  const blockMemberInfo = EulerCookie.get(BLOCK_MEMBER_INFO)
  if (blockMemberInfo) return blockMemberInfo
  else return false
}

export const clearInitBlockMemberInfo = () => {
  EulerCookie.remove(BLOCK_MEMBER_INFO)
  EulerCookie.remove(INIT_BLOCK_MEMBER_INFO)
}

export const hasInitBlockMemberInfo = () => {
  EulerCookie.set(INIT_BLOCK_MEMBER_INFO, 'true')
}

export const removeInitBlockMemberInfo = () => {
  EulerCookie.remove(INIT_BLOCK_MEMBER_INFO)
}

export const getInitBlockMemberInfo = () => {
  const init = EulerCookie.get(INIT_BLOCK_MEMBER_INFO)
  if (init === 'true') return true
  else return false
}
