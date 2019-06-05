<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="username" :label="$t('user.username')">
        <el-input v-model="dataForm.username" :placeholder="$t('user.username')"/>
      </el-form-item>
      <el-form-item prop="deptName" :label="$t('user.deptName')" class="dept-list">
        <el-popover v-model="deptListVisible" ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="deptList"
            :props="{ label: 'name', children: 'children' }"
            node-key="id"
            ref="deptListTree"
            :highlight-current="true"
            :expand-on-click-node="false"
            accordion
            @current-change="deptListTreeCurrentChangeHandle">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.deptName" v-popover:deptListPopover :readonly="true" :placeholder="$t('user.deptName')"/>
      </el-form-item>
      <el-form-item prop="jobName" :label="$t('user.job')" class="job-list">
        <el-select v-model="dataForm.jobName" @change="jobListChangeHandle" :placeholder="$t('user.job')">
          <el-option v-for="job in jobList" :key="job.id" :label="job.name" :value="job.id"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="dataForm.id ? false : true" prop="password" :label="$t('user.password')" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" :placeholder="$t('user.password')"/>
      </el-form-item>
      <el-form-item v-show="dataForm.id ? false : true" prop="comfirmPassword" :label="$t('user.comfirmPassword')" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" :placeholder="$t('user.comfirmPassword')"/>
      </el-form-item>
      <el-form-item prop="realName" :label="$t('user.realName')">
        <el-input v-model="dataForm.realName" :placeholder="$t('user.realName')"/>
      </el-form-item>
      <el-form-item prop="gender" :label="$t('user.gender')" size="mini">
        <el-radio-group v-model="dataForm.gender">
          <el-radio :label="0">{{ $t('user.gender0') }}</el-radio>
          <el-radio :label="1">{{ $t('user.gender1') }}</el-radio>
          <el-radio :label="2">{{ $t('user.gender2') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="age" :label="$t('user.age')">
        <el-input v-model="dataForm.age" :placeholder="$t('user.age')"/>
      </el-form-item>
      <el-form-item prop="email" :label="$t('user.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('user.email')"/>
      </el-form-item>
      <el-form-item prop="phone" :label="$t('user.phone')">
        <el-input v-model="dataForm.phone" :placeholder="$t('user.phone')"/>
      </el-form-item>
      <el-form-item prop="roleSelectedList" :label="$t('user.roleIdList')" class="role-list">
        <el-select v-model="dataForm.roleSelectedList" @change="roleListChangeHandle" multiple :placeholder="$t('user.roleIdList')">
          <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="enabled" :label="$t('user.status')" size="mini">
        <el-radio-group v-model="dataForm.enabled">
          <el-radio :label="false">{{ $t('user.status0') }}</el-radio>
          <el-radio :label="true">{{ $t('user.status1') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { isEmail, isMobile, isAge } from '@/libs/validate'
export default {
  data () {
    return {
      loading: false,
      visible: false,
      deptList: [],
      deptListVisible: false,
      // 用来保存所有的角色列表
      roleList: [],
      jobList: [],
      dataForm: {
        id: '',
        username: '',
        age: 22,
        department: {},
        deptName: '',
        jobName: '',
        job: {},
        password: '',
        comfirmPassword: '',
        realName: '',
        gender: 2,
        email: '',
        phone: '',
        roles: [],
        // 用来保存选中的角色列表
        roleSelectedList: [],
        enabled: true
      }
    }
  },
  computed: {
    dataRule () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        if (this.dataForm.password !== value) {
          return callback(new Error(this.$t('user.validate.comfirmPassword')))
        }
        callback()
      }
      var validateEmail = (rule, value, callback) => {
        if (/\S/.test(value)) {
          if (!isEmail(value)) {
            return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.email') })))
          }
        }
        callback()
      }
      var validatePhone = (rule, value, callback) => {
        if (/\S/.test(value)) {
          if (!isMobile(value)) {
            return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.phone') })))
          }
        }
        callback()
      }
      var validateAge = (rule, value, callback) => {
        if (!isAge(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.age') })))
        }
        callback()
      }
      return {
        username: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        realName: [
          { required: false, trigger: 'blur' }
        ],
        email: [
          { required: false, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: false, trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        age: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateAge, trigger: 'blur' }
        ],
        jobName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        roleSelectedList: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.roleList = []
        this.jobList = []
        this.dataForm.roleSelectedList = []
        Promise.all([
          this.getDeptList(),
          this.getRoleList(),
          this.getJobList()
        ]).then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取部门列表
    getDeptList () {
      return this.$axios.get('/api/departments').then(res => {
        this.deptList = res
      }).catch(() => {})
    },
    // 获取职务列表
    getJobList () {
      return this.$axios.get('/api/jobs').then(res => {
        this.jobList = res
      }).catch(() => {})
    },
    // 获取角色列表
    getRoleList () {
      return this.$axios.get('/api/roles').then(res => {
        this.roleList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/api/users/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
        this.dataForm.deptName = res.department.name
        this.dataForm.jobName = res.job.name
        this.$refs.deptListTree.setCurrentKey(this.dataForm.department.id)
        // 角色配置
        for (var i = 0; i < res.roles.length; i++) {
          this.dataForm.roleSelectedList.push(res.roles[i].id)
        }
      }).catch(() => {})
    },
    // 所属部门树, 选中
    deptListTreeCurrentChangeHandle (data, node) {
      this.dataForm.department.id = data.id
      this.dataForm.department.name = data.name
      this.dataForm.deptName = data.name
      this.deptListVisible = false
    },
    // 表单提交
    dataFormSubmitHandle () {
      // 打开 loading
      this.loading = true
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          this.loading = false
          return false
        }
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/users', {
          ...this.dataForm
        }).then(res => {
          this.loading = false
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {
          this.loading = false
        })
      })
    },
    // 角色选项变更处理
    roleListChangeHandle (selected) {
      const roles = new Map()
      var selectedRoleIds = []
      // 清空 roles
      this.dataForm.roles = []
      // 获取选中项
      selected.forEach(item => selectedRoleIds.push(item))
      // 将选中项放入 map（避免重复）
      selectedRoleIds.filter((id) => !roles.has(id) && roles.set(id, { 'id': id }))
      // 放入 roles
      roles.forEach((v, k) => this.dataForm.roles.push(v))
    },
    // 职务选项变更处理
    jobListChangeHandle (selected) {
      // 将选中项的值赋给 jobName（其实是 id 值）
      this.dataForm.jobName = selected
      this.dataForm.job = { id: selected }
    }
  }
}
</script>

<style lang="scss">
.mod-sys__user {
  .dept-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }
  .role-list {
    .el-select {
      width: 100%;
    }
  }
  .job-list {
    .el-select {
      width: 100%;
    }
  }
}
</style>
