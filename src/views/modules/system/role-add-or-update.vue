<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="name" :label="$t('role.name')">
        <el-input :disabled="isAdmin(dataForm.id)" v-model="dataForm.name" :placeholder="$t('role.name')"/>
      </el-form-item>
      <el-form-item prop="description" :label="$t('role.description')">
        <el-input v-model="dataForm.description" :placeholder="$t('role.description')"/>
      </el-form-item>
      <el-form-item prop="sort" :label="$t('role.sort')">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" :label="$t('role.sort')"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item size="mini" :label="$t('role.menuList')">
            <el-tree
              :data="menuList"
              :props="{ label: 'name', children: 'children', disabled: function(data, node) { return isAdmin() } }"
              node-key="id"
              ref="menuListTree"
              accordion
              show-checkbox>
            </el-tree>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item size="mini" :label="$t('role.permissionList')">
            <el-tree
              :data="permissionList"
              :props="{ label: 'name', children: 'children', disabled: function(data, node) { return isAdmin() } }"
              node-key="id"
              ref="permissionListTree"
              accordion
              show-checkbox
              check-strictly>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      menuList: [],
      permissionList: [],
      dataForm: {
        id: '',
        name: '',
        menus: [],
        sort: 0,
        permissions: [],
        description: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        name: [
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
        this.$refs.menuListTree.setCheckedKeys([])
        this.$refs.permissionListTree.setCheckedKeys([])
        Promise.all([
          this.getMenuList(),
          this.getPermissionList()
        ]).then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取菜单列表
    getMenuList () {
      return this.$axios.get('/api/menus').then(res => {
        this.menuList = res
      }).catch(() => {})
    },
    // 获取权限列表
    getPermissionList () {
      return this.$axios.get('/api/permissions').then(res => {
        this.permissionList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/api/roles/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
        this.dataForm.menus.forEach(item => this.$refs.menuListTree.setChecked(item, true))
        this.dataForm.permissions.forEach(item => this.$refs.permissionListTree.setChecked(item, true))
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.dataForm.menus = [
          ...this.$refs.menuListTree.getHalfCheckedKeys(),
          ...this.$refs.menuListTree.getCheckedKeys()
        ]
        this.dataForm.permissions = this.$refs.permissionListTree.getCheckedKeys()
        var tempMenuList = []
        var tempPermissionList = []
        this.dataForm.menus.forEach(e => tempMenuList.push({ id: e }))
        this.dataForm.permissions.forEach(e => tempPermissionList.push({ id: e }))

        this.dataForm.menus = tempMenuList
        this.dataForm.permissions = tempPermissionList

        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/roles', this.dataForm).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    },
    // 判断是否是 ADMIN 角色
    isAdmin () {
      var self = this
      if (self.dataForm.id === 1) {
        return true
      }
    }
  }
}
</script>
