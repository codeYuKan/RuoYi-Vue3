import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      id: '',
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      // 登录
      login(userInfo) {
        const username = userInfo.username.trim()
        const password = userInfo.password
        const code = userInfo.code
        const uuid = userInfo.uuid

        return new Promise((resolve, reject) => {
            setToken("123456")
              this.token = "123456"
              resolve()
          // login(username, password, code, uuid).then(res => {
          //   setToken(res.token)
          //   this.token = res.token
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
            const res = {
                "msg": "操作成功",
                "code": 200,
                "permissions": [
                    "*:*:*"
                ],
                "roles": [
                    "admin"
                ],
                "user": {
                    "createBy": "admin",
                    "createTime": "2023-04-23 16:11:38",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": "管理员",
                    "userId": 1,
                    "deptId": 103,
                    "userName": "admin",
                    "nickName": "若依",
                    "email": "ry@163.com",
                    "phonenumber": "15888888888",
                    "sex": "1",
                    "avatar": "",
                    "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
                    "status": "0",
                    "delFlag": "0",
                    "loginIp": "42.80.70.233",
                    "loginDate": "2024-04-30T15:27:49.000+08:00",
                    "dept": {
                        "createBy": null,
                        "createTime": null,
                        "updateBy": null,
                        "updateTime": null,
                        "remark": null,
                        "deptId": 103,
                        "parentId": 101,
                        "ancestors": "0,100,101",
                        "deptName": "研发部门",
                        "orderNum": 1,
                        "leader": "若依",
                        "phone": null,
                        "email": null,
                        "status": "0",
                        "delFlag": null,
                        "parentName": null,
                        "children": []
                    },
                    "roles": [
                        {
                            "createBy": null,
                            "createTime": null,
                            "updateBy": null,
                            "updateTime": null,
                            "remark": null,
                            "roleId": 1,
                            "roleName": "超级管理员",
                            "roleKey": "admin",
                            "roleSort": 1,
                            "dataScope": "1",
                            "menuCheckStrictly": false,
                            "deptCheckStrictly": false,
                            "status": "0",
                            "delFlag": null,
                            "flag": false,
                            "menuIds": null,
                            "deptIds": null,
                            "permissions": null,
                            "admin": true
                        }
                    ],
                    "roleIds": null,
                    "postIds": null,
                    "roleId": null,
                    "admin": true
                }
            }
            const user = res.user
            const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                this.roles = res.roles
                this.permissions = res.permissions
            } else {
                this.roles = ['ROLE_DEFAULT']
            }
            this.id = user.userId
            this.name = user.userName
            this.avatar = avatar
            resolve(res)


          // getInfo().then(res => {
          //   const user = res.user
          //   const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
          //
          //   if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //     this.roles = res.roles
          //     this.permissions = res.permissions
          //   } else {
          //     this.roles = ['ROLE_DEFAULT']
          //   }
          //   this.id = user.userId
          //   this.name = user.userName
          //   this.avatar = avatar
          //   resolve(res)
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          logout(this.token).then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
