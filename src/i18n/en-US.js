const t = {}

t.loading = 'Loading...'

t.brand = {}
t.brand.lg = 'Renren Security'
t.brand.mini = 'RS'

t.add = 'Add'
t.delete = 'Delete'
t.deleteBatch = 'Delete'
t.update = 'Edit'
t.query = 'Query'
t.export = 'Export'
t.handle = 'Action'
t.confirm = 'Confirm'
t.cancel = 'Cancel'
t.logout = 'Sign Out'

t.prompt = {}
t.prompt.title = 'Prompt'
t.prompt.info = 'Confirm to carry out [{handle}] operation?'
t.prompt.success = 'Succeeded'
t.prompt.failed = 'Failed'
t.prompt.deleteBatch = 'Please select delete item'
t.prompt.logout = 'Do you cancel your current account ?'

t.message = {}
t.message.logoutCancel = 'Abandoning logout users'

t.validate = {}
t.validate.required = 'Required field cannot be empty'
t.validate.format = '{attr} format error'

t.upload = {}
t.upload.text = 'Drop files here, or <em>Click Upload</em>'
t.upload.tip = 'Only support {format} format files! '
t.upload.button = 'Click to upload'

t.datePicker = {}
t.datePicker.range = 'To'
t.datePicker.start = 'Start Date'
t.datePicker.end = 'End Date'

t.fullscreen = {}
t.fullscreen.prompt = 'Your browser does not support this operation'

t.updatePassword = {}
t.updatePassword.title = 'Change Password'
t.updatePassword.username = 'Account'
t.updatePassword.password = 'Original'
t.updatePassword.newPassword = 'New Password'
t.updatePassword.comfirmPassword = 'Confirm'
t.updatePassword.validate = {}
t.updatePassword.validate.comfirmPassword = 'Confirm password is not consistent with new password input'

t.theme = {}
t.theme.d2 = 'D2Admin Classic'
t.theme.violet = 'Violet'
t.theme.line = 'Line'
t.theme.star = 'Star'
t.theme.tomorrowNightBlue = 'Tomorrow Night Blue'
t.theme.list = {}
t.theme.list.button = 'Select'
t.theme.list.buttonActive = 'Activated'

t.layout = {}
t.layout.hello = 'Hello'
t.layout.logout = 'Logout'
t.layout.updatePassword = 'Update Password'
t.layout.tooltip = {}
t.layout.tooltip.fullscreen = 'Fullscreen'
t.layout.tooltip.fullscreenActive = 'Exit Fullscreen'
t.layout.tooltip.theme = 'Theme'
t.layout.tooltip.search = 'Search'
t.layout.search = {}
t.layout.search.placeholder = 'Search Pages'
t.layout.search.tip1 = 'Press'
t.layout.search.tip2 = 'open search panel, and press'
t.layout.search.tip3 = 'close it.'

t.layoutTab = {}
t.layoutTab.index = 'Home'
t.layoutTab.noName = 'No Name'

t.contentTabs = {}
t.contentTabs.closeCurrent = 'Close Current Tab'
t.contentTabs.closeOther = 'Close Other Tabs'
t.contentTabs.closeAll = 'Close All Tabs'

/* pages */
t.notFound = {}
t.notFound.desc = 'Sorry! <em>missing</em> on the page you visited...'
t.notFound.back = 'Previous Page'
t.notFound.home = 'Home'

t.login = {}
t.login.language = 'Language'
t.login.motto = 'Time is the most precious treasure of all wealth'
t.login.form = {}
t.login.form.placeholderUsername = 'username'
t.login.form.placeholderPassword = 'password'
t.login.form.placeholderCaptcha = 'Captcha'
t.login.form.textSubmitButton = 'Sign In'
t.login.form.textForget = 'Forget'
t.login.form.textSignUp = 'Sign up'
t.login.footer = {}
t.login.footer.buttonHelp = 'Help'
t.login.footer.buttonPrivacy = 'Privacy'
t.login.footer.buttonClause = 'Clause'
t.login.copyright = {}
t.login.copyright.p1 = 'Copyright'
t.login.copyright.p2 = '2018 D2 Projects Open Source Organizational'
t.login.copyright.p3 = '@FairyEver'
t.login.ruleMessage = {}
t.login.ruleMessage.username = 'User name must be entered'
t.login.ruleMessage.password = 'Password must be entered'
t.login.ruleMessage.captcha = 'Captcha must be entered'

t.home = {}
t.home.sysInfo = {}
t.home.sysInfo.name = 'System Name'
t.home.sysInfo.nameVal = 'renren-security [Enterprise]'
t.home.sysInfo.version = 'Version Information'
t.home.sysInfo.versionVal = process.env.VUE_APP_VERSION
t.home.sysInfo.osName = 'Operating System'
t.home.sysInfo.osVersion = 'System Version'
t.home.sysInfo.osArch = 'System Architecture'
t.home.sysInfo.processors = 'CPU Core Count'
t.home.sysInfo.totalPhysical = 'system Memory'
t.home.sysInfo.freePhysical = 'Remaining Memory'
t.home.sysInfo.memoryRate = 'Memory Usage'
t.home.sysInfo.userLanguage = 'System Language'
t.home.sysInfo.jvmName = 'JVM Information'
t.home.sysInfo.javaVersion = 'JVM Version'
t.home.sysInfo.javaHome = 'JAVA_HOME'
t.home.sysInfo.userDir = 'Working Directory'
t.home.sysInfo.javaTotalMemory = 'JVM Occupies Memory'
t.home.sysInfo.javaFreeMemory = 'JVM Free Memory'
t.home.sysInfo.javaMaxMemory = 'JVM Max Memory'
t.home.sysInfo.userName = 'Current User'
t.home.sysInfo.systemCpuLoad = 'CPU Load'
t.home.sysInfo.userTimezone = 'System Time Zone'

/* modules */
t.model = {}
t.model.name = 'Name'
t.model.key = 'Information'
t.model.version = 'Version'
t.model.createTime = 'Create Time'
t.model.lastUpdateTime = 'Update Time'
t.model.design = 'Online Design'
t.model.deploy = 'Deployment'
t.model.description = 'Description'

t.dept = {}
t.dept.name = 'Name'
t.dept.parentName = 'Superior'
t.dept.sort = 'Sort'
t.dept.parentNameDefault = 'Top Department'

t.logError = {}
t.logError.requestUri = 'Request URI'
t.logError.requestMethod = 'Request Method'
t.logError.requestParams = 'Request Parameters'
t.logError.ip = 'IP'
t.logError.userAgent = 'User Agent'
t.logError.createDate = 'Create Date'
t.logError.errorInfo = 'Exception'

t.logLogin = {}
t.logLogin.creatorName = 'Username'
t.logLogin.status = 'Status'
t.logLogin.status0 = 'Failed'
t.logLogin.status1 = 'Success'
t.logLogin.status2 = 'Locked'
t.logLogin.operation = 'User Action'
t.logLogin.operation0 = 'Login'
t.logLogin.operation1 = 'Exit'
t.logLogin.ip = 'IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = 'Create Date'

t.logOperation = {}
t.logOperation.status = 'Status'
t.logOperation.status0 = 'Failed'
t.logOperation.status1 = 'Success'
t.logOperation.creatorName = 'Username'
t.logOperation.operation = 'User Action'
t.logOperation.requestUri = 'Request URI'
t.logOperation.requestMethod = 'Request Mode'
t.logOperation.requestParams = 'Request Parameters'
t.logOperation.requestTime = 'Request Duration'
t.logOperation.ip = 'IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = 'Create Date'

t.menu = {}
t.menu.name = 'Name'
t.menu.icon = 'Icon'
t.menu.type = 'Type'
t.menu.type0 = 'Menu'
t.menu.type1 = 'Button'
t.menu.sort = 'Sort'
t.menu.url = 'Route'
t.menu.permissions = 'Auth ID'
t.menu.permissionsTips = 'Multiple separated by commas, such as: sys:menu:save,sys:menu:update'
t.menu.parentName = 'Superior'
t.menu.parentNameDefault = 'Top Menu'
t.menu.resource = 'Auth Resources'
t.menu.resourceUrl = 'Resource URL'
t.menu.resourceMethod = 'Request Method'
t.menu.resourceAddItem = 'Add an Item'

t.params = {}
t.params.paramCode = 'Code'
t.params.paramValue = 'Value'
t.params.remark = 'Remarks'

t.role = {}
t.role.name = 'Name'
t.role.remark = 'Remarks'
t.role.createDate = 'Create Date'
t.role.menuList = 'Menu Scope'
t.role.deptList = 'Data Scope'

t.user = {}
t.user.username = 'Username'
t.user.deptName = 'Department'
t.user.email = 'Email'
t.user.age = 'Age'
t.user.job = 'Job'
t.user.phone = 'Mobile'
t.user.status = 'Status'
t.user.status0 = 'Disable'
t.user.status1 = 'Enable'
t.user.createTime = 'Create Date'
t.user.password = 'Password'
t.user.comfirmPassword = 'Confirm'
t.user.realName = 'Real Name'
t.user.gender = 'Gender'
t.user.gender0 = 'Male'
t.user.gender1 = 'Female'
t.user.gender2 = 'Secure'
t.user.roleIdList = 'Role Config'
t.user.validate = {}
t.user.validate.comfirmPassword = 'Confirm password is not consistent with password input'

export default t
