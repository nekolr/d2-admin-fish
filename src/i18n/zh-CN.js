const t = {}

t.loading = '加载中...'

t.brand = {}
t.brand.lg = 'D2Admin Fish'
t.brand.mini = 'Fish'

t.add = '新增'
t.delete = '删除'
t.deleteBatch = '删除'
t.update = '修改'
t.query = '查询'
t.export = '导出'
t.handle = '操作'
t.confirm = '确定'
t.cancel = '取消'
t.logout = '退出'

t.prompt = {}
t.prompt.title = '提示'
t.prompt.info = '确定进行[{handle}]操作?'
t.prompt.success = '操作成功'
t.prompt.failed = '操作失败'
t.prompt.deleteBatch = '请选择删除项'
t.prompt.logout = '注销当前账户吗?'

t.message = {}
t.message.logoutCancel = '放弃注销用户'

t.validate = {}
t.validate.required = '必填项不能为空'
t.validate.format = '{attr}格式错误'

t.upload = {}
t.upload.text = '将文件拖到此处，或<em>点击上传</em>'
t.upload.tip = '只支持{format}格式文件！'
t.upload.button = '点击上传'

t.datePicker = {}
t.datePicker.range = '至'
t.datePicker.start = '开始日期'
t.datePicker.end = '结束日期'

t.fullscreen = {}
t.fullscreen.prompt = '您的浏览器不支持此操作'

t.updatePassword = {}
t.updatePassword.title = '修改密码'
t.updatePassword.username = '账号'
t.updatePassword.password = '原密码'
t.updatePassword.newPassword = '新密码'
t.updatePassword.comfirmPassword = '确认密码'
t.updatePassword.validate = {}
t.updatePassword.validate.comfirmPassword = '确认密码与新密码输入不一致'

t.theme = {}
t.theme.d2 = 'D2Admin 经典'
t.theme.violet = '紫罗兰'
t.theme.line = '简约线条'
t.theme.star = '繁星'
t.theme.tomorrowNightBlue = 'Tomorrow Night Blue'
t.theme.list = {}
t.theme.list.button = '使用'
t.theme.list.buttonActive = '已激活'

t.layout = {}
t.layout.hello = '你好'
t.layout.logout = '注销'
t.layout.updatePassword = '修改密码'
t.layout.tooltip = {}
t.layout.tooltip.fullscreen = '全屏'
t.layout.tooltip.fullscreenActive = '退出全屏'
t.layout.tooltip.theme = '主题'
t.layout.tooltip.search = '搜索'
t.layout.search = {}
t.layout.search.placeholder = '搜索页面'
t.layout.search.tip1 = '您可以使用快捷键'
t.layout.search.tip2 = '唤醒搜索面板，按'
t.layout.search.tip3 = '关闭。'

t.layoutTab = {}
t.layoutTab.index = '首页'
t.layoutTab.noName = '未命名'

t.contentTabs = {}
t.contentTabs.closeCurrent = '关闭当前标签页'
t.contentTabs.closeOther = '关闭其它标签页'
t.contentTabs.closeAll = '关闭全部标签页'

/* 页面 */
t.notFound = {}
t.notFound.desc = '抱歉！您访问的页面<em>失联</em>啦...'
t.notFound.back = '上一页'
t.notFound.home = '首页'

t.login = {}
t.login.language = '语言'
t.login.motto = '时间是一切财富中最宝贵的财富'
t.login.form = {}
t.login.form.placeholderUsername = '用户名'
t.login.form.placeholderPassword = '密码'
t.login.form.placeholderCaptcha = '验证码'
t.login.form.textSubmitButton = '登录'
t.login.form.textForget = '忘记密码'
t.login.form.textSignUp = '注册用户'
t.login.footer = {}
t.login.footer.buttonHelp = '帮助'
t.login.footer.buttonPrivacy = '隐私'
t.login.footer.buttonClause = '条款'
t.login.copyright = {}
t.login.copyright.p1 = 'Copyright'
t.login.copyright.p2 = '2018 D2 Projects 开源组织出品'
t.login.copyright.p3 = '@FairyEver'
t.login.ruleMessage = {}
t.login.ruleMessage.username = '请输入用户名'
t.login.ruleMessage.password = '请输入密码'
t.login.ruleMessage.captcha = '请输入验证码'

t.home = {}
t.home.sysInfo = {}
t.home.sysInfo.name = '系统名称'
t.home.sysInfo.nameVal = 'renren-security【企业版】'
t.home.sysInfo.version = '版本信息'
t.home.sysInfo.versionVal = process.env.VUE_APP_VERSION
t.home.sysInfo.osName = '操作系统'
t.home.sysInfo.osVersion = '系统版本'
t.home.sysInfo.osArch = '系统架构'
t.home.sysInfo.processors = 'CPU核数'
t.home.sysInfo.totalPhysical = '系统内存'
t.home.sysInfo.freePhysical = '剩余内存'
t.home.sysInfo.memoryRate = '内存使用'
t.home.sysInfo.userLanguage = '系统语言'
t.home.sysInfo.jvmName = 'JVM信息'
t.home.sysInfo.javaVersion = 'JVM版本'
t.home.sysInfo.javaHome = 'JAVA_HOME'
t.home.sysInfo.userDir = '工作目录'
t.home.sysInfo.javaTotalMemory = 'JVM占用内存'
t.home.sysInfo.javaFreeMemory = 'JVM空闲内存'
t.home.sysInfo.javaMaxMemory = 'JVM最大内存'
t.home.sysInfo.userName = '当前用户'
t.home.sysInfo.systemCpuLoad = 'CPU负载'
t.home.sysInfo.userTimezone = '系统时区'

/* 模块 */
t.model = {}
t.model.name = '名称'
t.model.key = '标识'
t.model.version = '版本'
t.model.createTime = '创建时间'
t.model.lastUpdateTime = '更新时间'
t.model.design = '在线设计'
t.model.deploy = '部署'
t.model.description = '描述'

t.dept = {}
t.dept.name = '名称'
t.dept.parentName = '上级部门'
t.dept.sort = '排序'
t.dept.parentNameDefault = '一级部门'

t.logError = {}
t.logError.requestUri = '请求URI'
t.logError.requestMethod = '请求方式'
t.logError.requestParams = '请求参数'
t.logError.ip = '操作IP'
t.logError.userAgent = '用户代理'
t.logError.createDate = '创建时间'
t.logError.errorInfo = '异常信息'

t.logLogin = {}
t.logLogin.creatorName = '用户名'
t.logLogin.status = '状态'
t.logLogin.status0 = '失败'
t.logLogin.status1 = '成功'
t.logLogin.status2 = '账号已锁定'
t.logLogin.operation = '操作类型'
t.logLogin.operation0 = '登录'
t.logLogin.operation1 = '退出'
t.logLogin.ip = '操作IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = '创建时间'

t.logOperation = {}
t.logOperation.status = '状态'
t.logOperation.status0 = '失败'
t.logOperation.status1 = '成功'
t.logOperation.creatorName = '用户名'
t.logOperation.operation = '用户操作'
t.logOperation.requestUri = '请求URI'
t.logOperation.requestMethod = '请求方式'
t.logOperation.requestParams = '请求参数'
t.logOperation.requestTime = '请求时长'
t.logOperation.ip = '操作IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = '创建时间'

t.menu = {}
t.menu.name = '名称'
t.menu.icon = '图标'
t.menu.type = '类型'
t.menu.type0 = '菜单'
t.menu.type1 = '按钮'
t.menu.sort = '排序'
t.menu.url = '路由'
t.menu.permissions = '授权标识'
t.menu.permissionsTips = '多个用逗号分隔，如：sys:menu:save,sys:menu:update'
t.menu.parentName = '上级菜单'
t.menu.parentNameDefault = '一级菜单'
t.menu.resource = '授权资源'
t.menu.resourceUrl = '资源URL'
t.menu.resourceMethod = '请求方式'
t.menu.resourceAddItem = '添加一项'

t.params = {}
t.params.paramCode = '编码'
t.params.paramValue = '值'
t.params.remark = '备注'

t.role = {}
t.role.name = '名称'
t.role.remark = '备注'
t.role.createDate = '创建时间'
t.role.menuList = '菜单授权'
t.role.deptList = '数据授权'

t.user = {}
t.user.username = '用户名'
t.user.deptName = '所属部门'
t.user.email = '邮箱'
t.user.age = '年龄'
t.user.job = '职务'
t.user.phone = '手机号'
t.user.status = '状态'
t.user.status0 = '停用'
t.user.status1 = '正常'
t.user.createTime = '创建时间'
t.user.password = '密码'
t.user.comfirmPassword = '确认密码'
t.user.realName = '真实姓名'
t.user.gender = '性别'
t.user.gender0 = '男'
t.user.gender1 = '女'
t.user.gender2 = '保密'
t.user.roleIdList = '角色配置'
t.user.validate = {}
t.user.validate.comfirmPassword = '确认密码与密码输入不一致'

export default t
