import OpenAPI from '../service/open-api'
import { downloadUrl } from '@/libs/http-api'
import BoyImg from '../assets/images/common/boy.png'
import GirtsImg from '../assets/images/common/girts.png'
import SexBoy from '../assets/original-images/man.png'
import SexGirts from '../assets/original-images/woman.png'
import { setBlockMemberInfo } from '../libs/block-util'
import UserAPI from '../service/user-api'
import EulerCookie from '@lemon/euler-app-h5/src/libs/euler-cookie'

export const initBlockMemberInfo = (nextFunc) => {
  OpenAPI.userInfoMember({}, res => {
    var userId = res.id
    var nickName = res.nickName
    var sex = res.sex
    var sexDisplay = ''
    var sexImg = ''
    var occupational = res.occupational
    var signature = res.signature
    var age = res.age
    var weight = res.weight
    var height = res.height
    var avatar = res.avatar
    if (res.avatar) {
      avatar = downloadUrl + res.avatar
    } else {
      if (sex === 'MAN') {
        avatar = BoyImg
      } else if (sex === 'WOMAN') {
        avatar = GirtsImg
      }
    }
    if (sex === 'MAN') {
      sexDisplay = '男'
      sexImg = SexBoy
    } else if (sex === 'WOMAN') {
      sexDisplay = '女'
      sexImg = SexGirts
    }
    var memberInfoJson = {
      userId: userId,
      nickName: nickName,
      sex: sex,
      sexDisplay: sexDisplay,
      sexImg: sexImg,
      occupational: occupational,
      signature: signature,
      age: age,
      weight: weight,
      height: height,
      avatar: avatar
    }
    setBlockMemberInfo(JSON.stringify(memberInfoJson))
    // console.log(memberInfoJson)
    // hasInitBlockMemberInfo()
    if (nextFunc) {
      nextFunc()
    }
  })
  // 是否购买计划卡
  UserAPI.isHaveCard({}, res => {
    EulerCookie.set('isHaveCard', res)
  })
  // 是否购买次卡
  UserAPI.isHaveTimeCard({}, res => {
    EulerCookie.set('isHaveTimeCard', res)
  })
}
