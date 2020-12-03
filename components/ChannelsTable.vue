<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <a slot="action">action</a>
  </a-table>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      columns: [
        {
          title: 'Title',
          width: 100,
          dataIndex: 'title',
          key: 'title',
          fixed: 'left'
        },
        {
          title: 'Sources',
          width: 100,
          dataIndex: 'sourcesCount',
          key: 'sourcesCount'
        },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  }
}
</script>

<style></style>
