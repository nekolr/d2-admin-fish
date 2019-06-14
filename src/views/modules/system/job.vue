<template>
  <d2-container class="mod-sys__menu">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="$hasAnyPermission('JOB_ALL', 'JOB_POST')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column prop="name" :label="$t('job.name')" header-align="center" />
      <el-table-column prop="description" :label="$t('job.description')" header-align="center" align="center" />
      <el-table-column prop="enabled" :label="$t('job.status')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.enabled" size="mini" type="danger">{{ $t('job.status0') }}</el-tag>
          <el-tag v-else size="mini" type="success">{{ $t('job.status1') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="timeFormatter" :label="$t('job.createTime')" header-align="center" align="center" />
      <el-table-column v-if="$hasAnyPermission('JOB_ALL', 'JOB_PUT', 'JOB_DELETE')" :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="$hasAnyPermission('JOB_ALL', 'JOB_PUT')" type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button v-if="$hasAnyPermission('JOB_ALL', 'JOB_DELETE')" type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './job-add-or-update'
import dayjs from 'dayjs'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/jobs',
        deleteURL: '/api/jobs'
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
