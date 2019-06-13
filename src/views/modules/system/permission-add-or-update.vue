<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="name" :label="$t('permission.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('permission.name')"/>
      </el-form-item>
      <el-form-item prop="parentName" :label="$t('permission.parent')" class="menu-list">
        <el-popover v-model="permissionListVisible" ref="permissionListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="permissionList"
            :props="{ label: 'name', children: 'children' }"
            node-key="id"
            ref="permissionListTree"
            :highlight-current="true"
            :expand-on-click-node="false"
            accordion
            @current-change="permissionListTreeCurrentChangeHandle">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:permissionListPopover :readonly="true" :placeholder="$t('permission.parent')">
          <i v-if="dataForm.pid !== '0'" slot="suffix" @click.stop="deptListTreeSetDefaultHandle()" class="el-icon-circle-close el-input__icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="description" :label="$t('permission.description')">
        <el-input v-model="dataForm.description" :placeholder="$t('permission.description')"/>
      </el-form-item>
      <el-form-item prop="sort" :label="$t('permission.sort')">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" :label="$t('permission.sort')"/>
      </el-form-item>
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
      permissionList: [],
      permissionListVisible: false,
      dataForm: {
        id: '',
        name: '',
        pid: '0',
        parentName: '',
        sort: 0
      }
    }
  },
  computed: {
    dataRule () {
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.parentName = this.$t('permission.parentNameDefault')
        this.getPermissionList().then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取权限列表
    getPermissionList () {
      return this.$axios.get('/api/permissions').then(res => {
        this.permissionList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/api/permissions/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
        if (this.dataForm.pid === '0') {
          return this.permissionListTreeSetDefaultHandle()
        }
        this.$refs.permissionListTree.setCurrentKey(this.dataForm.pid)
        // 设置当前父节点的名称
        this.dataForm.parentName = this.$refs.permissionListTree.getCurrentNode().name
      }).catch(() => {})
    },
    // 上级权限树, 设置默认值
    permissionListTreeSetDefaultHandle () {
      this.dataForm.pid = '0'
      this.dataForm.parentName = this.$t('permission.parentNameDefault')
    },
    // 上级权限树, 选中
    permissionListTreeCurrentChangeHandle (data) {
      this.dataForm.pid = data.id
      this.dataForm.parentName = data.name
      this.permissionListVisible = false
    },
    // 表单提交
    dataFormSubmitHandle () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/permissions', this.dataForm).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
.mod-sys__menu {
  .menu-list,
  .icon-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }
  &-icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &-icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &-icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
}
</style>
