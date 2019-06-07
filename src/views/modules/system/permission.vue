<template>
  <d2-container class="mod-sys__menu">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_POST')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      row-key="id"
      style="width: 100%;">
      <el-table-column prop="name" :label="$t('permission.name')" header-align="center" />
      <el-table-column prop="description" :label="$t('permission.description')" header-align="center" align="center" />
      <el-table-column :label="$t('permission.type')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.name.split('_')[1] === 'SELECT'" size="mini" type="success">{{ 'GET' }}</el-tag>
          <el-tag v-else-if="scope.row.name.split('_')[1] === 'POST'" size="mini">{{ 'POST' }}</el-tag>
          <el-tag v-else-if="scope.row.name.split('_')[1] === 'PUT'" size="mini" type="warning">{{ 'PUT' }}</el-tag>
          <el-tag v-else-if="scope.row.name.split('_')[1] === 'DELETE'" size="mini" type="danger">{{ 'DELETE' }}</el-tag>
          <el-tag v-else size="mini" type="info">{{ 'ALL' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="timeFormatter" :label="$t('permission.createTime')" header-align="center" align="center" />
      <el-table-column v-if="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_PUT', 'PERMISSION_DELETE')" :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_PUT')" type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button v-if="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_DELETE')" type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './permission-add-or-update'
import dayjs from 'dayjs'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/permissions',
        deleteURL: '/api/permissions'
      },
      dataForm: {
        type: ''
      }
    }
  },
  methods: {
    // 时间格式化
    timeFormatter (row, column) {
      var time = row[column.property]
      if (time) {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  components: {
    AddOrUpdate
  }
}
</script>
