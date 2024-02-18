<template>
  <view class="da-dropdown-picker" v-if="viewCol && viewCol.length">
    <view
      class="da-dropdown-picker-inner"
      v-for="(vc, vci) in viewCol"
      :key="vci">
      <scroll-view class="da-dropdown-picker-view" scroll-y>
        <view
          class="da-dropdown-picker-item"
          :class="vr.checked ? 'is-actived' : ''"
          v-for="(vr, vri) in viewRow[vci]"
          :key="vri"
          @click="handleSelect(vr, vci, vri)">
          <text class="da-dropdown-picker-item--name">{{ vr.label }}</text>
          <text class="da-dropdown-picker-item--icon" v-if="vr.children && vr.children.length"></text>
          <text class="da-dropdown-picker-item--check" v-if="vr.checked && (!vr.children || vr.children.length === 0)" />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { deepClone } from '../utils'

export default {
  props: {
    dropdownItem: {
      type: Object,
      default: null,
    },
    dropdownIndex: {
      type: Number,
    },
  },
  data() {
    return {
      viewCol: [],
      viewRow: [],
    }
  },
  watch: {
    dropdownItem: {
      // deep: true,
      immediate: true,
      handler: function(v) {
        this.initData(v)
      },
    },
  },
  methods: {
    checkData(selected, list) {
      for (let i = 0; i < list.length; i++) {
        const k = list[i]
        for (let j = 0; j < selected.length; j++) {
          const x = selected[j]
          if (k.value === x) {
            k.checked = true
            this.viewCol.push(k.value)
            this.viewRow.push(list)
            if (k.children?.length) {
              this.checkData(selected, k.children)
            }
            break
          }
        }
      }
    },

    initData(item) {
      const list = deepClone(item?.options || [])
      if (list?.length) {
        if (item.value?.length) {
          this.viewCol = []
          this.viewRow = []

          this.checkData(item.value, list)
        } else {
          this.viewCol.push('tmpValue')
          this.viewRow.push(list)
        }
      } else {
        this.viewCol = []
        this.viewRow = []
      }
    },

    handleSelect(item, colIndex, _rowIndex) {
      let lastItem = false
      this.viewCol[colIndex] = item.value

      if (this.viewRow[colIndex]?.length) {
        this.viewRow[colIndex].forEach(k => {
          k.checked = false
        })
      }

      item.checked = true
      const list = item?.children || null

      if (list?.length) {
        this.viewCol[colIndex + 1] = 'tmpValue'
        this.viewRow[colIndex + 1] = list
        lastItem = false
      } else {
        console.warn('最后一项', item)
        lastItem = true
      }

      try {
        if (this.viewRow[colIndex + 1]?.length) {
          this.viewRow[colIndex + 1].forEach(k => {
            k.checked = false
          })
        }
      } catch (e) {
        console.warn('try clean row data', e)
        // --
      }

      if (lastItem) {
        if (this.dropdownItem?.prop) {
          const res = { [this.dropdownItem.prop]: deepClone(this.viewCol) }
          this.$emit('success', res, this.viewCol, this.dropdownIndex)
        } else {
          console.error(`菜单项${this.dropdownItem.title}未定义prop，返回内容失败`)
        }
      }

      this.$forceUpdate()
    },
  },
}
</script>

<style lang="scss" scoped>
.da-dropdown-picker {
  display: flex;
  width: 100%;
  max-height: 60vh;
  overflow: hidden;
  line-height: 1;

  &-inner {
    flex-grow: 1;
  }

  &-view {
    display: flex;

    /* #ifdef MP-ALIPAY */
    flex-direction: column;
    flex-wrap: wrap;

    /* #endif */

    width: 100%;
    height: 100%;

    + .da-dropdown-picker-view {
      border-left: 1px solid #eee;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    font-size: 24rpx;
    color: var(--dropdown-text-color);
    text-align: left;

    &--icon {
      width: 24rpx;
      height: 24rpx;

      &::after {
        /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
        font-family: 'da-dropdown-iconfont' !important;
        font-size: 24rpx;
        font-style: normal;
        content: '\e643';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &--check {
      flex-shrink: 0;
      width: 24rpx;
      height: 24rpx;

      &::after {
        /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
        font-family: 'da-dropdown-iconfont' !important;
        font-size: 24rpx;
        font-style: normal;
        content: '\e696';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &:hover {
      background: #eee;
    }

    &.is-actived {
      color: var(--dropdown-theme-color);
    }
  }
}
</style>
