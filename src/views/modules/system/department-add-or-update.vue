<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="name" :label="$t('dept.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('dept.name')"/>
      </el-form-item>
      <el-form-item prop="parentName" :label="$t('dept.parentName')" class="menu-list">
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
        <el-input v-model="dataForm.parentName" v-popover:deptListPopover :readonly="true" :placeholder="$t('dept.parentName')">
          <i v-if="dataForm.pid !== '0'" slot="suffix" @click.stop="departmentListTreeSetDefaultHandle()" class="el-icon-circle-close el-input__icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="description" :label="$t('dept.description')">
        <el-input v-model="dataForm.description" :placeholder="$t('dept.description')"/>
      </el-form-item>
      <el-form-item prop="enabled" :label="$t('dept.status')" size="mini">
        <el-radio-group v-model="dataForm.enabled">
          <el-radio :label="true">{{ $t('dept.status1') }}</el-radio>
          <el-radio :label="false">{{ $t('dept.status0') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="sort" :label="$t('dept.sort')">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" :label="$t('dept.sort')"/>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      visible: false,
      deptList: [],
      deptListVisible: false,
      dataForm: {
        id: '',
        name: '',
        pid: '0',
        parentName: '',
        description: '',
        enabled: true,
        createTime: '',
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
        this.dataForm.parentName = this.$t('dept.parentNameDefault')
        this.getDeptList().then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取菜单列表
    getDeptList () {
      return this.$axios.get('/api/departments').then(res => {
        this.deptList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/api/departments/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
        if (this.dataForm.pid === '0') {
          return this.departmentListTreeSetDefaultHandle()
        }
        this.$refs.deptListTree.setCurrentKey(this.dataForm.pid)
        // 设置当前父节点的名称
        this.dataForm.parentName = this.$refs.deptListTree.getCurrentNode().name
      }).catch(() => {})
    },
    // 上级树, 设置默认值
    departmentListTreeSetDefaultHandle () {
      this.dataForm.pid = '0'
      this.dataForm.parentName = this.$t('dept.parentNameDefault')
    },
    // 上级树, 选中
    deptListTreeCurrentChangeHandle (data) {
      this.dataForm.pid = data.id
      this.dataForm.parentName = data.name
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
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/departments', this.dataForm).then(res => {
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
