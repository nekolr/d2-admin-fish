<template>
  <d2-container class="mod-sys__menu">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="$hasAnyPermission('MENU_ALL', 'MENU_POST')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      row-key="id"
      style="width: 100%;">
      <el-table-column prop="name" :label="$t('menu.name')" header-align="center" align="center"/>
      <el-table-column prop="icon" :label="$t('menu.icon')" header-align="center" align="center">
        <template slot-scope="scope">
          <d2-icon-svg class="icon-svg" v-if="scope.row.icon" :name="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="path" :label="$t('menu.url')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="createTime" :formatter="timeFormatter" :label="$t('dept.createTime')" header-align="center" align="center" />
      <el-table-column v-if="$hasAnyPermission('MENU_ALL', 'MENU_PUT', 'MENU_DELETE')" :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="$hasAnyPermission('MENU_ALL', 'MENU_PUT')" type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button v-if="$hasAnyPermission('MENU_ALL', 'MENU_DELETE')" type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './menu-add-or-update'
import dayjs from 'dayjs'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/menus',
        deleteURL: '/api/menus'
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
