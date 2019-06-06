<template>
  <d2-container class="mod-sys__menu">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_ADD')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      row-key="id"
      style="width: 100%;">
      <table-tree-column prop="name" :label="$t('permission.name')" header-align="center" />
      <el-table-column prop="description" :label="$t('permission.description')" header-align="center" align="center" width="150" :show-overflow-tooltip="true" />
      <!-- <el-table-column prop="sort" :label="$t('menu.sort')" header-align="center" align="center"/> -->
      <el-table-column v-show="$hasAnyPermission('PERMISSION_ALL', 'PERMISSION_PUT', 'PERMISSION_DELETE')"  :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
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
import TableTreeColumn from '@/components/table-tree-column'
import AddOrUpdate from './permission-add-or-update'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/permissions',
        deleteURL: '/api/permissions'
      }
    }
  },
  components: {
    TableTreeColumn,
    AddOrUpdate
  }
}
</script>
