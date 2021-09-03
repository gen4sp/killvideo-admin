<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-statistic
          title="New users"
          :value="total.new_users_qty"
          class="centred"
        >
        </a-statistic>
      </a-col>
      <a-col :span="6">
        <a-statistic class="centred" title="New tasks" :value="total.tasks_qty">
        </a-statistic>
      </a-col>
      <a-col :span="6">
        <a-statistic
          class="centred"
          title="Payments qty"
          :value="total.payments_qty"
        >
        </a-statistic>
      </a-col>
      <a-col :span="6">
        <a-statistic
          class="centred"
          title="Payments coins"
          :value="total.payments_sum"
        >
          <template #suffix>
            <span> coins</span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>

    <a-row> </a-row>

    <a-row>
      <a-col :span="8">
        <a-statistic class="centred" title="Media qty" :value="total.media_qty">
        </a-statistic>
      </a-col>
      <a-col :span="8">
        <a-statistic
          class="centred"
          title="Media coins"
          :value="total.meida_sum"
        >
          <template #suffix>
            <span> coins</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="8">
        <a-statistic
          class="centred"
          title="Commission coins"
          :value="total.commission_sum"
        >
          <template #suffix>
            <span> coins</span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :data-source="daily"
      :loading="loading"
      row-key="id"
    >
      <span slot="date" slot-scope="id">
        {{ getDateFromDay(id) }}
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Date',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'date' }
  },
  {
    title: 'New users',
    dataIndex: 'new_users_qty',
    key: 'new_users_qty'
  },
  {
    title: 'Payments qty',
    dataIndex: 'payments_qty',
    key: 'payments_qty'
  },
  {
    title: 'Payments coins',
    dataIndex: 'payments_sum',
    key: 'payments_sum'
  },
  {
    title: 'Tasks qty',
    dataIndex: 'tasks_qty',
    key: 'tasks_qty'
  },
  {
    title: 'Media qty',
    dataIndex: 'media_qty',
    key: 'media_qty'
  },
  {
    title: 'Media coins',
    dataIndex: 'media_sum',
    key: 'media_sum'
  },
  {
    title: 'Commission coins',
    dataIndex: 'commission_sum',
    key: 'commission_sum'
  }
]
export default {
  components: {},
  middleware: 'authguard',
  data() {
    return {
      loading: false,
      total: {},
      daily: [],
      columns
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    getDateFromDay(num) {
      return new Date(num * 24 * 60 * 60 * 1000).toDateString()
    },
    fetch() {
      this.loading = true
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/stats/'
        })
        .then((data) => {
          console.log('td ', data)
          this.loading = false
          this.total = data.data.total || {}
          this.daily = data.data.daily
        })
    }
  }
}
</script>

<style lang="scss">
.centred {
  text-align: center;
}
</style>
