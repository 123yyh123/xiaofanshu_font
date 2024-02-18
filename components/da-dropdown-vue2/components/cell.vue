<template>
  <view class="da-dropdown-cell">
    <view
      class="da-dropdown-cell-item"
      :class="[item.checked ? 'is-actived' : '',item.disabled ? 'is-disabled' : '']"
      v-for="(item, index) in cellOptions"
      :key="index"
      @click="handleSelect(item)">
      <text class="da-dropdown-cell-item--label">{{ item.label }}</text>
      <text class="da-dropdown-cell-item--suffix">{{ item.suffix }}</text>
      <text class="da-dropdown-cell-item--check" v-if="item.checked && showIcon" />
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
      cellOptions: [],
      showIcon: false,
    }
  },
  watch: {
    dropdownItem: {
      // deep: true,
      immediate: true,
      handler: function(v) {
        if (v?.options?.length) {
          this.initData(v.options, v.value)
        } else {
          this.cellOptions = []
        }
        this.showIcon = v?.showIcon || false
      },
    },
  },
  methods: {
    initData(options, value) {
      const list = deepClone(options)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.value === value) {
          item.checked = true
          break
        }
      }
      this.cellOptions = list
    },

    handleSelect(item) {
      if (item.disabled) {
        return
      }

      if (this.dropdownItem?.prop) {
        const res = { [this.dropdownItem.prop]: item.value }
        this.$emit('success', res, item, this.dropdownIndex)
      } else {
        console.error(`菜单项${this.dropdownItem.title}未定义prop，返回内容失败`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 下拉列表
.da-dropdown-cell {
  --cell-height: 80rpx;

  width: 100%;
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;

  &-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--cell-height);
    padding: 0 24rpx;
    overflow: hidden;
    font-size: 28rpx;
    color: var(--dropdown-text-color);
    white-space: nowrap;
    border-bottom: 1rpx solid #dedede;

    &:last-child {
      border-bottom: none;
    }

    &--label {
      flex-grow: 1;
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // #ifdef H5
      :deep(> span) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // #endif
    }

    &--suffix {
      flex-grow: 1;
      margin-left: 10px;
      overflow: hidden;
      font-size: 24rpx;
      color: #999;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;

      // #ifdef H5
      :deep(> span) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // #endif
    }

    &--check {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: var(--cell-height);
      height: var(--cell-height);

      &::after {
        /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
        font-family: 'da-dropdown-iconfont' !important;
        font-size: calc(var(--cell-height) / 3 * 2);
        font-style: normal;
        content: '\e736';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &.is-actived {
      color: var(--dropdown-theme-color);
    }

    &.is-disabled {
      color: #aaa;
      background: #efefef;
    }
  }
}
</style>
