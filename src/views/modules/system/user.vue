<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.username" :placeholder="$t('user.username')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$hasAnyPermission('USER_ALL', 'USER_ADD')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$hasAnyPermission('USER_ALL', 'USER_DELETE')" type="danger" @click="batchDeleteHandle()">{{ $t('deleteBatch') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$hasAnyPermission('USER_ALL')" type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="username" :label="$t('user.username')" sortable="custom" header-align="center" align="center"/>
      <el-table-column prop="department.name" :label="$t('user.deptName')" header-align="center" align="center"/>
      <el-table-column prop="email" :label="$t('user.email')" header-align="center" align="center"/>
      <el-table-column prop="phone" :label="$t('user.phone')" sortable="custom" header-align="center" align="center"/>
      <el-table-column prop="enabled" :label="$t('user.status')" sortable="custom" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.enabled" size="mini" type="danger">{{ $t('user.status0') }}</el-tag>
          <el-tag v-else size="mini" type="success">{{ $t('user.status1') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="timeFormatter" :label="$t('user.createTime')" sortable="custom" header-align="center" align="center" width="180"/>
      <el-table-column v-if="$hasAnyPermission('USER_ALL', 'USER_PUT', 'USER_DELETE')" :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="$hasAnyPermission('USER_ALL', 'USER_PUT')" type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button v-if="$hasAnyPermission('USER_ALL', 'USER_DELETE')" type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <!-- 分页 -->
    <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './user-add-or-update'
import dayjs from 'dayjs'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/users',
        getDataListIsPage: true,
        deleteURL: '/api/users',
        deleteIsBatch: true,
        exportURL: '/api/users'
      },
      dataForm: {
        username: ''
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 时间格式化
    timeFormatter (row, column) {
      var time = row[column.property]
      if (time) {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
}
</script>
